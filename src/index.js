import * as mobx from 'mobx';
import * as mobxReact from 'mobx-react';

import start, { addModel } from './start';

import Relation from './relation';
import createModel from './model/create-model';
import extendModel from './model/extend-model';

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
    addModel
};
