import * as mobx from 'mobx';
import * as mobxReact from 'mobx-react';

import createMoxApp from './mox';
import Relation from './relation';

import createModel from './model/create';
import extendModel from './model/extend';
import addModel from './model/add';

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
