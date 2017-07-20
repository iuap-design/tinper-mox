'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addModel = addModel;
/**
 * Tips：暂未迁移提出
 * [addModel description] 初始化后再添加model
 * @param {[type]}   models   [description]
 * @param {Function} callback [description]
 */
function addModel(models, callback) {
    // 必须先执行初始化
    if (!started) {
        throw new Error('[vanex]: Init your app first!');
    }

    // 将models添加进context
    context.addModel(models);

    // 将context的data传递给ContainerComponent及其子组件
    // 目前是通过执行重新渲染的机制实现，考虑优化
    componentIns.forceUpdate(callback);
}