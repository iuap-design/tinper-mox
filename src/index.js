import * as mobx from 'mobx';
import * as mobxReact from 'mobx-react';
import * as reactRouter from 'react-router';

import createMoxApp from './mox';
import Relation from './relation';

import createModel from './model/create';
import extendModel from './model/extend';
import addModel from './model/add';

// import router from './router'

/**
 * Top APIs
 */
export default {
    ...mobx,
    ...mobxReact,
    ...reactRouter,
    createModel,
    extendModel,
    createMoxApp,
    Relation,
    addModel
};
