import * as mobx from 'mobx';
import * as mobxReact from 'mobx-react';

import Mox, { addModel } from './mox';

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
    Mox,
    Relation,
    addModel
};
