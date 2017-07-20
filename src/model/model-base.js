import {
    extendObservable,
    autorun,
    toJS,
    runInAction,
    action,
    isObservableArray,
} from 'mobx';

import {
    mapValues,
    deepMapValues,
    each,
    isRegExp,
} from '../utils';

let count = 0;

export default class MobxModel {
    static uuid = 0

    constructor(initData = {}, middleware, autorunMap = {}, constants = {}) {
        if (
            this.constructor !== MobxModel &&
            this.constructor.uuid === Object.getPrototypeOf(this.constructor).uuid
        ) {
            throw new Error('[MobxModel] Can not immediately extend from MobxModel.');
        }

        // 保存action状态
        this._actionStates = {};

        // 保存当前传进来的中间件
        this._middleware = middleware;
        this._id = count++;

        Object.keys(initData).forEach((key) => {
            if (constants[key] !== undefined) {
                throw new Error(`[MobxModel] data key "${key}" is defined in constants`);
            }
        });

        // check keys
        this._dataKeys = Object.keys(initData).concat(Object.keys(constants));

        this._checkDataKeys();

        // add constants
        const _constants = mapValues(constants, (value) => {
            return {
                enumerable: true,
                configurable: true,
                writable: false,
                value,
            };
        });

        // 将常量赋值给Model实例
        Object.defineProperties(this, _constants);

        // 将initData copy给实例，同时将其转变为observable
        extendObservable(this, initData);

        // 自动执行的函数map
        each(autorunMap, autorunFn => {
            autorun(autorunFn, this);
        });
    }

    getID() {
        return this._id;
    }

    get dataKeys() {
        return this._dataKeys;
    }

    set middleware(middleware) {
        this._middleware = middleware;
    }
    get middleware() {
        return this._middleware;
    }

    getActionState(actionName) {
        if (!this[actionName]) {
            throw new Error('[MobxModel] Undefined action: ', actionName);
        }

        if (!this._actionStates[actionName]) {
            this.setActionState(actionName);
        }

        return this._actionStates[actionName];
    }

    toJS(key) {
        function parse(val) {
            if (val instanceof MobxModel) {
                return val.toJS();
            }
            if (Array.isArray(val) || isObservableArray(val)) {
                return val.map(item => parse(item));
            } else if (isRegExp(val)) {
                return val;
            } else if (val && typeof val === 'object') {
                return mapValues(val, (item) => parse(item));
            }

            return toJS(val);
        }

        if (key) {
            return parse(this[key]);
        }

        return this._dataKeys.reduce((json, key) => {
            json[key] = parse(this[key]);
            return json;
        }, {});
    }

    toJSON(key) {
        return this.toJS(key);
    }

    stringify() {
        return JSON.stringify(this.toJS());
    }

    each(fn) {
        this._dataKeys.map((key) => {
            fn(this[key], key, this);
        });
    }

    toString() {
        return this.constructor.name;
    }

    _checkDataKeys() {
        this._dataKeys.forEach((dataKey) => {
            if (this[dataKey]) {
                throw new Error(`[MobxModel] Data key "${dataKey}" is defined in prototype methods.`);
            }
        });
    }

    set(key, val) {
        if (typeof key === 'string') {
            this[key] = val;
        } else {
            // 运行一次，在给实例同步的同时，触发React Component的重新渲染
            runInAction(() => deepMapValues(key, item => item, this));
        }

        return this;
    }

    setActionState(actionName, val) {
        extendObservable(this._actionStates, {
            [actionName]: val || {
                loading: false,
                error: null
            }
        });
    }
}

// 同步数据处理
export function toMobxSyncActions(syncs) {
    return mapValues(syncs, (actionFn, actionName) => {
        return function mobxAction(...actionArgs) {
            return action(actionFn).apply(this, actionArgs);
        };
    });
}

// 对effects的处理
export function toMobxAsyncActions(actions) {
    // 其实就是对每一个开发者定义的Model中的action包装成mobxAction
    return mapValues(actions, (actionFn, actionName) => {
        return function mobxAction(...actionArgs) {
            const actionContext = this;

            // 1. add loading state and save the pre error
            this.setActionState(actionName, {
                loading: true,
                error: this.getActionState(actionName).error
            });

            // 2. exec action with hooks
            return this._middleware.execAction({
                    actionFn: action(actionFn),
                    actionName,
                    actionArgs,
                    actionContext
                })
                .then(payload => {
                    // 3. loaded success
                    this.setActionState(actionName, {
                        loading: false,
                        error: null
                    });

                    return payload;
                }).catch(error => {
                    // 4. loaded error
                    this.setActionState(actionName, {
                        loading: false,
                        error
                    });

                    throw error;
                });
        };
    });
}

export function isMobxModelClass(target) {
    return target === MobxModel || target.prototype instanceof MobxModel;
}
