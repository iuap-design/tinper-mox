import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';

import {
    observer,
    inject,
} from 'tinper-mox';
import TodoItem from './TodoItem';

@inject('todos')
@observer
export default class Todos extends Component {
    static propTypes = {
        todos: PropTypes.object.isRequired,
    }

    render() {
        const list = this.props.todos.list;
        return (
            <div>
                <ul>
                    { list.map(todo => <TodoItem key={todo.id} todo={todo}/>) }
                </ul>
                <div>
                    Completed: {list.filter(item => item.completed).length}
                </div>
            </div>
        );
    }
}
