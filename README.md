# Mox

`Mox` 是一个基于 `mobx & mobx-react` 的 应用状态管理框架，遵循清晰简单的 `MVVM` 架构模式和开发体验。

## 快速上手示例

```js
import React from 'react';
import App from './App';

import {
    start,
} from 'tinper-mox';

// model
import user from './models/User';
import todos from './models/Todos';

start({
    component: App,
    container: '#root',
    models: {
        user,
        todos
    }
});
```

## 参考资料

- [mobx-roof](https://github.com/mobx-roof/mobx-roof)
- [vanex](https://github.com/abell123456/vanex)

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
