import * as mobx from 'mobx';
import * as mobxReact from 'mobx-react';

import createMoxApp, { addModel } from './mox';

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
    createMoxApp,
    Relation,
    addModel
};
