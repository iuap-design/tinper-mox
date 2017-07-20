'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _mobx = require('mobx');

var mobx = _interopRequireWildcard(_mobx);

var _mobxReact = require('mobx-react');

var mobxReact = _interopRequireWildcard(_mobxReact);

var _start = require('./start');

var _start2 = _interopRequireDefault(_start);

var _relation = require('./relation');

var _relation2 = _interopRequireDefault(_relation);

var _createModel = require('./model/create-model');

var _createModel2 = _interopRequireDefault(_createModel);

var _extendModel = require('./model/extend-model');

var _extendModel2 = _interopRequireDefault(_extendModel);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Top APIs
 */
exports.default = (0, _extends3.default)({}, mobx, mobxReact, {
    createModel: _createModel2.default,
    extendModel: _extendModel2.default,
    start: _start2.default,
    Relation: _relation2.default,
    addModel: _start.addModel
});
module.exports = exports['default'];