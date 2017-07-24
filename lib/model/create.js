'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createModel;

var _modelBase = require('./model-base');

var _modelBase2 = _interopRequireDefault(_modelBase);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var uuid = 0;

function createModel(_ref) {
    var Parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _modelBase2.default;

    var name = _ref.name,
        _ref$data = _ref.data,
        data = _ref$data === undefined ? {} : _ref$data,
        _ref$constants = _ref.constants,
        constants = _ref$constants === undefined ? {} : _ref$constants,
        _ref$privates = _ref.privates,
        privates = _ref$privates === undefined ? {} : _ref$privates,
        _ref$autorun = _ref.autorun,
        autorun = _ref$autorun === undefined ? {} : _ref$autorun,
        _ref$syncs = _ref.syncs,
        syncs = _ref$syncs === undefined ? {} : _ref$syncs,
        _ref$effects = _ref.effects,
        effects = _ref$effects === undefined ? {} : _ref$effects,
        others = _objectWithoutProperties(_ref, ['name', 'data', 'constants', 'privates', 'autorun', 'syncs', 'effects']);

    var mobxSyncs = (0, _modelBase.toMobxSyncActions)(syncs);
    var mobxAsyncs = (0, _modelBase.toMobxAsyncActions)(effects);

    if (!(0, _modelBase.isMobxModelClass)(Parent)) {
        throw new Error('[createModel] Parent class must extend From MobxModel.');
    }
    if (!name) {
        throw new Error('[createModel] need a name.');
    }

    function MobxModel() {
        var _initData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var middleware = arguments[1];
        var _autorun = arguments[2];
        var _constants = arguments[3];

        (0, _utils.classCallCheck)(this, MobxModel);

        if (typeof data === 'function') {
            throw new Error('[createModel] `data` can not be a function, please use `init` instead.');
        }

        // Object.getPrototypeOf(MobxModel)指向_MobxModel的构造函数
        var res = (0, _utils.possibleConstructorReturn)(this, Object.getPrototypeOf(MobxModel).call(this, _extends({}, data, _initData), middleware, _extends({}, autorun, _autorun), _extends({}, constants, _constants)));

        return res;
    }
    MobxModel.uuid = ++uuid;
    MobxModel.syncs = syncs;
    MobxModel.effects = effects;
    MobxModel.autorun = autorun;
    (0, _utils.inherits)(MobxModel, Parent);

    // Define MobxModel name
    Object.defineProperties(MobxModel, {
        name: {
            enumerable: false,
            configurable: true,
            writable: false,
            value: (0, _utils.nameToUpperCase)(name)
        }
    });

    MobxModel.prototype = Object.assign(MobxModel.prototype, others, privates, mobxSyncs, mobxAsyncs);

    return MobxModel;
}
module.exports = exports['default'];