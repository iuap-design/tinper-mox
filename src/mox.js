import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';

import MoxContext from './context';
import MoxRelation from './relation';

import ComposeMiddleware from './middleware/compose-middleware';

var ContainerComponent;
var middleware = new ComposeMiddleware

export var context;
export var componentIns;
export var started = false;

/**
 * 如果 start 没有配置 container 选项，则返回一个可渲染的组件；
 * 如果传递了container，则执行渲染。
 * [middlewares description]
 * @type {Array}
 */
export default({
    component,
    models,
    container,
    middlewares = [],
    relation = new MoxRelation
}) => {
    started = true;

    ContainerComponent = component;

    if(!Array.isArray(middlewares)) {
        middlewares = [middlewares];
    }

    middlewares.forEach(item => {
        middleware.use(item);
    });

    context = new MoxContext(models, {
        middleware,
        relation,
    });

    /**
     * MoxExecComponent 由 Provider 容器组件包裹的可执行组件
     * Params:
     *  componentIns
     *  ContainerComponent
     */
    class MoxExecComponent extends Component {
        constructor(props, context) {
            super(props, context);

            componentIns = this;
        }

        render() {
            return (
                <Provider ref="provider" {...context.data}>
                    <ContainerComponent {...this.props.data} />
                </Provider>
            );
        }
    }

    let containerEl = container;

    /**
     * 如果传递了容器(选择器)，则执行 React 的 render 进行渲染
     * 否则直接返回一个由 Provider 包裹后的 MoxExecComponent 组件
     */
    if(containerEl) {
        if (typeof(container) === 'string') {
            containerEl = document.querySelector(container);
        }

        render(<MoxExecComponent />, containerEl);
    } else {
        return MoxExecComponent;
    }
};
