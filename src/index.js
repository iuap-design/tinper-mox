import * as mobx from 'mobx';
import * as mobxReact from 'mobx-react';
// import { Router, Route, createHistory } from 'react-router';

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
    // ...reactRouter,
    createModel,
    extendModel,
    createMoxApp,
    Relation,
    addModel
};
