'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('../utils');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Middleware = function () {
    function Middleware(middleware) {
        _classCallCheck(this, Middleware);

        this.middleware = [];

        this.use(middleware);
    }

    /**
     * Add middleware
     * @param  {Function|Array<Function>} middleware
     */


    _createClass(Middleware, [{
        key: 'use',
        value: function use() {
            var middleware = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            if (!Array.isArray(middleware)) {
                middleware = [middleware];
            }
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = middleware[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var fn = _step.value;

                    if (!(0, _utils.isFunction)(fn)) {
                        throw new TypeError('Middleware must be composed of functions!');
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            this.middleware = [].concat(_toConsumableArray(this.middleware), _toConsumableArray(middleware));
        }
    }, {
        key: 'remove',
        value: function remove() {
            var _this = this;

            var middleware = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            if (!Array.isArray(middleware)) {
                middleware = [middleware];
            }

            middleware.forEach(function (item) {
                var index = _this.middleware.indexOf(item);
                _this.middleware.splice(index, 1);
            });
        }
    }, {
        key: 'isEmpty',
        value: function isEmpty() {
            return this.middleware.length === 0;
        }

        /**
         * Compose all middleware
         * @param {object} arg
         * @return {Promise}
         */

    }, {
        key: 'compose',
        value: function compose() {
            var arg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            return this.middleware.reduce(function (pm, fn) {
                return pm.then(function (payload) {
                    return fn(_extends({}, arg, {
                        payload: payload
                    }));
                });
            }, Promise.resolve(arg.payload));
        }
    }]);

    return Middleware;
}();

exports.default = Middleware;
module.exports = exports['default'];