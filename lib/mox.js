'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.started = exports.componentIns = exports.context = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _reactDom = require('react-dom');

var _mobxReact = require('mobx-react');

var _context = require('./context');

var _context2 = _interopRequireDefault(_context);

var _relation = require('./relation');

var _relation2 = _interopRequireDefault(_relation);

var _composeMiddleware = require('./middleware/compose-middleware');

var _composeMiddleware2 = _interopRequireDefault(_composeMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContainerComponent;
var middleware = new _composeMiddleware2.default();

var context = exports.context = undefined;
var componentIns = exports.componentIns = undefined;
var started = exports.started = false;

/**
 * 如果 start 没有配置 container 选项，则返回一个可渲染的组件；
 * 如果传递了container，则执行渲染。
 * [middlewares description]
 * @type {Array}
 */

exports.default = function (_ref) {
    var component = _ref.component,
        models = _ref.models,
        container = _ref.container,
        _ref$middlewares = _ref.middlewares,
        middlewares = _ref$middlewares === undefined ? [] : _ref$middlewares,
        _ref$relation = _ref.relation,
        relation = _ref$relation === undefined ? new _relation2.default() : _ref$relation;

    exports.started = started = true;

    ContainerComponent = component;

    if (!Array.isArray(middlewares)) {
        middlewares = [middlewares];
    }

    middlewares.forEach(function (item) {
        middleware.use(item);
    });

    exports.context = context = new _context2.default(models, {
        middleware: middleware,
        relation: relation
    });

    /**
     * MoxExecComponent 由 Provider 容器组件包裹的可执行组件
     * Params:
     *  componentIns
     *  ContainerComponent
     */

    var MoxExecComponent = function (_Component) {
        _inherits(MoxExecComponent, _Component);

        function MoxExecComponent(props, context) {
            _classCallCheck(this, MoxExecComponent);

            var _this = _possibleConstructorReturn(this, (MoxExecComponent.__proto__ || Object.getPrototypeOf(MoxExecComponent)).call(this, props, context));

            exports.componentIns = componentIns = _this;
            return _this;
        }

        _createClass(MoxExecComponent, [{
            key: 'render',
            value: function render() {
                return React.createElement(
                    _mobxReact.Provider,
                    _extends({ ref: 'provider' }, context.data),
                    React.createElement(ContainerComponent, this.props.data)
                );
            }
        }]);

        return MoxExecComponent;
    }(_react.Component);

    var containerEl = container;

    /**
     * 如果传递了容器(选择器)，则执行 React 的 render 进行渲染
     * 否则直接返回一个由 Provider 包裹后的 MoxExecComponent 组件
     */
    if (containerEl) {
        if (typeof container === 'string') {
            containerEl = document.querySelector(container);
        }

        (0, _reactDom.render)(React.createElement(MoxExecComponent, null), containerEl);
    } else {
        return MoxExecComponent;
    }
};