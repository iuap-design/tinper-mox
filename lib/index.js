'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// import { Router, Route, createHistory } from 'react-router';

var _mobx = require('mobx');

var mobx = _interopRequireWildcard(_mobx);

var _mobxReact = require('mobx-react');

var mobxReact = _interopRequireWildcard(_mobxReact);

var _mox = require('./mox');

var _mox2 = _interopRequireDefault(_mox);

var _relation = require('./relation');

var _relation2 = _interopRequireDefault(_relation);

var _create = require('./model/create');

var _create2 = _interopRequireDefault(_create);

var _extend = require('./model/extend');

var _extend2 = _interopRequireDefault(_extend);

var _add = require('./model/add');

var _add2 = _interopRequireDefault(_add);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Top APIs
 */
exports.default = _extends({}, mobx, mobxReact, {
    // ...reactRouter,
    createModel: _create2.default,
    extendModel: _extend2.default,
    createMoxApp: _mox2.default,
    Relation: _relation2.default,
    addModel: _add2.default
});
module.exports = exports['default'];