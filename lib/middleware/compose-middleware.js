'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _middleware2 = require('./middleware');

var _middleware3 = _interopRequireDefault(_middleware2);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KEYS = ['before', 'after', 'error', 'filter'];

/**
 *
 */

var ComposeMiddleware = function () {
    _createClass(ComposeMiddleware, null, [{
        key: 'toStandardMiddleware',
        value: function toStandardMiddleware() {
            var _middleware = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            if (typeof _middleware === 'function') {
                return {
                    after: _middleware
                };
            } else if ((typeof _middleware === 'undefined' ? 'undefined' : _typeof(_middleware)) === 'object') {
                var middleware = {};
                Object.keys(_middleware).forEach(function (key) {
                    if (!KEYS.includes(key)) {
                        throw new Error('[ComposeMiddleware] Middleware key must one of "' + KEYS.join(' ,') + '"');
                    }
                    // filter empty middleware
                    if (_middleware[key]) {
                        middleware[key] = _middleware[key];
                    }
                });

                if (middleware.filter) {
                    var filter = (0, _utils.toFilter)(middleware.filter);
                    delete middleware.filter;
                    // to filter function
                    return (0, _utils.mapValues)(middleware, function (res) {
                        res = Array.isArray(res) ? res : [res];
                        return res.map(function (fn) {
                            return function middlewareFilterMixin(_ref) {
                                var payload = _ref.payload;

                                if (!filter.apply(undefined, arguments)) return payload;
                                return fn.apply(undefined, arguments);
                            };
                        });
                    }, {});
                }
                return middleware;
            }
            throw new TypeError('[ComposeMiddleware] Middleware must be a function or object but get ' + _middleware);
        }
    }]);

    function ComposeMiddleware() {
        _classCallCheck(this, ComposeMiddleware);

        this._before = new _middleware3.default();
        this._after = new _middleware3.default();
        this._error = new _middleware3.default();
    }

    _createClass(ComposeMiddleware, [{
        key: 'use',
        value: function use() {
            var _this = this;

            var removes = [];

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            args.forEach(function (middleware) {
                middleware = ComposeMiddleware.toStandardMiddleware(middleware);
                Object.keys(middleware).forEach(function (pos) {
                    var cur = _this['_' + pos]; // before | after | error
                    cur.use(middleware[pos]);
                    removes.push(function () {
                        return cur.remove(middleware[pos]);
                    });
                });
            });

            return function removeMiddlewares() {
                removes.map(function (rm) {
                    return rm();
                });
            };
        }
    }, {
        key: 'execAction',
        value: function execAction(_ref2) {
            var _this2 = this;

            var actionFn = _ref2.actionFn,
                _ref2$actionArgs = _ref2.actionArgs,
                actionArgs = _ref2$actionArgs === undefined ? [] : _ref2$actionArgs,
                actionName = _ref2.actionName,
                actionContext = _ref2.actionContext;

            var args = {
                action: actionName,
                model: actionContext,
                type: actionContext + '.' + actionName
            };

            return this._before.compose(_extends({}, args, {
                payload: actionArgs,
                pos: 'before'
            })).then(function (args) {
                if (!Array.isArray(args)) {
                    throw new Error('[ComposeMiddleware] Pre middleware must return arguments');
                }

                return actionFn.apply(actionContext, args);
            }).then(function (payload) {
                return _this2._after.compose(_extends({}, args, {
                    payload: payload,
                    pos: 'after'
                }));
            }).catch(function (error) {
                return _this2._error.compose(_extends({}, args, {
                    payload: error,
                    pos: 'error'
                })).then(function (error) {
                    if (error instanceof Error) {
                        throw error;
                    }
                    return error;
                });
            });
        }
    }]);

    return ComposeMiddleware;
}();

exports.default = ComposeMiddleware;
module.exports = exports['default'];