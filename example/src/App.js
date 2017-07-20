import React, { Component } from 'react';
import PropTypes from 'prop-types';

// components
import UserLogin from './components/UserLogin';
import UserDetail from './components/UserDetail';
import Todos from './components/Todos';

import { inject, observer } from 'tinper-mox';

@inject('user')
@observer
export default class App extends Component {
    render() {
        const {user} = this.props;

        if (user.isLogin !== true) {
            return <UserLogin />;
        }

        return (
            <div>
                <UserDetail />
                <Todos />
            </div>
        );
    }
}
