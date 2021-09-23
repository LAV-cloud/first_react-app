import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

function TodoList({ title, icon, todos, open }) {
  return (
    <details
      style={{ padding: '20px', marginBottom: '30px' }}
      className="list"
      open={open}
    >
      <summary className="todo-title">
        {title} <i className={icon} />
      </summary>
      {todos.map((todo) => {
        return <TodoItem todo={todo} key={todo.id} />;
      })}
    </details>
  );
}

TodoList.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  open: PropTypes.bool.isRequired,
};

export default TodoList;
