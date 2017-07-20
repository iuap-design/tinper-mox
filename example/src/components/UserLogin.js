import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';

import {
    addModel,
    inject,
    observer,
} from 'tinper-mox';

import newAdded from '../models/newAdded';

@inject('user')
@observer
export default class UserLogin extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
    }

    login() {
        this.props.user.login(this.refs.username.value, this.refs.password.value);
    }

    render() {
        const {
            user
        } = this.props;
        const {
            loading: loginLoading,
            error: loginError
        } = user.getActionState('login');

        const errorVal = user.loginError;

        return (
            <div className="container">
              <h1> 请输入：</h1>
                <div>
                    用户名:<input ref="username" type="text" placeholder="Jack"/>
                    密码:<input ref="password" type="password" placeholder="123"/>
                    <button onClick={::this.login}>login</button>
                    {
                        loginLoading
                        ? <span>loading...</span>
                        : <span style={{ color: 'red' }}>{(loginError && loginError.message) || errorVal}</span>
                    }
                </div>
            </div>
        );
    }

    componentDidMount() {
        addModel({
            newAdded,
        });
    }
}
