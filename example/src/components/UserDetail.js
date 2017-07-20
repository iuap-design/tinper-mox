import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';
import {
    observer,
    inject,
} from 'tinper-mox';

@inject('user')
@observer
export default class UserDetail extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
    }

    logout() {
        this.props.user.logout();
    }

    render() {
        return (
            <div className="container">
                <div>
                    Welcome! {this.props.user.username}
                </div>
                <ul>
                    <li><label>FROM: </label>{this.props.user.from}</li>
                    <li><label>HABITS: </label>{this.props.user.habits}</li>
                </ul>
                <button onClick={::this.logout}>logout</button>
            </div>
        );
    }
}
