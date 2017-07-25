# Mox

[![npm version](https://img.shields.io/npm/v/tinper-mox.svg)](https://www.npmjs.com/package/tinper-mox)
[![Build Status](https://img.shields.io/travis/iuap-design/tinper-mox/master.svg)](https://travis-ci.org/iuap-design/tinper-mox)
[![devDependency Status](https://img.shields.io/david/dev/iuap-design/tinper-mox.svg)](https://david-dm.org/iuap-design/tinper-mox#info=devDependencies)
[![NPM downloads](http://img.shields.io/npm/dm/tinper-mox.svg?style=flat)](https://npmjs.org/package/tinper-mox)


`Mox` 是一个基于 `mobx & mobx-react` 的 应用状态管理框架，遵循清晰简单的 `MVVM` 架构模式和开发体验，它将开源方案进一步封装之后可以开箱即用，性能更高。


## 快速上手示例

```js
import React from 'react';
import App from './App';

import {
    createMoxApp,
} from 'tinper-mox';

// 引入 model
import user from './models/User';
import todos from './models/Todos';

// 创建应用
createMoxApp({
    component: App,  // Root Component
    container: '#app',  // DOM Container
    models: {
        user,
        todos
    },  
    middlewares, 
    relation
});
```

## 使用文档

[关于 tinper-mox 的更多详细使用文档请移步仓库 docs 获取。](./docs/0.index.md)

## 最佳实践

[create-mox-app-boilerplate](https://github.com/iuap-design/create-mox-app-boilerplate)

## 参考资料

`tinper-mox` 的实现部分参考自 `mobx-roof & vanex`，结合项目需要支持数据层的扩展和路由的控制。


## 协议

MIT License

Copyright (c) 2017 Yonyou FED

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
