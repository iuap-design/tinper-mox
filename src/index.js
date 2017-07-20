import * as mobx from 'mobx';
import * as mobxReact from 'mobx-react';

import start, { addModel } from './start';

import Relation from './relation';
import createModel from './model/create';
import extendModel from './model/extend';

import router from './router'

/**
 * Top APIs
 */
export default {
    ...mobx,
    ...mobxReact,
    createModel,
    extendModel,
    start,
    Relation,
    addModel,
    router
};
