import TodoList from './Todo/TodoList';
import React, { useState } from 'react';
import Context from './context';
import Modal from './Modal/Modal';
// import Loader from './loader';

function App() {
  const [todos, setTodos] = useState([]);
  // const [loading, setLoading] = useState(false);

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    );
  }

  function toggleStage(todoId, id, todoCompleted) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === todoId) {
          if (todoCompleted) {
            todo.completed = true;
          }
          todo.stages.map((stage) => {
            if (stage.id === id) {
              stage.completed = !stage.completed;
            }
            return stage;
          });
        }
        return todo;
      })
    );
  }

  function addTodo(title, stages, stepByStep) {
    setTodos(
      todos.concat([
        {
          title,
          id: todos.length + 1,
          completed: false,
          stages,
          stepByStep,
        },
      ])
    );
  }

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <Context.Provider value={{ toggleTodo, toggleStage, removeTodo, addTodo }}>
      <div className="wrapper">
        <h1 className="title">Todos:</h1>
        <Modal />
        {/* {loading && <Loader />} */}
        {todos.length ? (
          <TodoList
            title={'Все'}
            icon={'fas fa-list'}
            todos={todos}
            open={todos.length ? true : false}
          />
        ) : (
          <h2
            style={{
              color: 'rgba(255,255, 255, .4',
            }}
          >
            No todos
          </h2>
        )}
        {todos.filter((td) => !td.completed).length ? (
          <TodoList
            title={'В процессе'}
            icon={'fas fa-user-clock'}
            todos={todos.filter((td) => !td.completed)}
            open={false}
          />
        ) : (
          <></>
        )}
        {todos.filter((td) => td.completed).length ? (
          <TodoList
            title={'Завершённые'}
            icon={'fas fa-check-circle'}
            todos={todos.filter((td) => td.completed)}
            open={false}
          />
        ) : (
          <></>
        )}
      </div>
    </Context.Provider>
  );
}

export default App;
