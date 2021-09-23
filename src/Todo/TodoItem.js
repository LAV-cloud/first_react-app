import React, { useContext } from 'react';
import Context from '../context';
import PropTypes from 'prop-types';
import TodoStage from './TodoStage';

function TodoItem({ todo }) {
  const { removeTodo, toggleTodo } = useContext(Context);
  const classes = [];

  if (todo.completed) {
    classes.push('done');
  }

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
    >
      {todo.stages.length ? (
        <>
          {todo.stages.filter((stage) => !stage.completed).length ||
          !todo.stepByStep ? (
            <details className="list" style={{ width: '95%' }}>
              <summary className="todo-title">
                <label className="todo">
                  <h3
                    style={{
                      fontSize: '18px',
                      width: '60%',
                    }}
                    className={classes.join(' ')}
                  >
                    {todo.title}
                  </h3>
                  <div className="todo-btns">
                    <input
                      checked={todo.completed}
                      onChange={toggleTodo.bind(null, todo.id)}
                      type="checkbox"
                      hidden
                    />
                    <span className="checkbox"></span>
                    <button
                      onClick={removeTodo.bind(null, todo.id)}
                      className="delete"
                    >
                      &times;
                    </button>
                  </div>
                </label>
              </summary>
              {todo.stepByStep ? (
                <TodoStage
                  id={todo.id}
                  stepByStep={todo.stepByStep}
                  stages={todo.stages}
                  stage={todo.stages.filter((stage) => !stage.completed)[0]}
                  key={Math.random() * 100000}
                />
              ) : (
                <>
                  {todo.stages.map((stage) => {
                    return (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                        }}
                      >
                        <TodoStage
                          id={todo.id}
                          stepByStep={todo.stepByStep}
                          stage={stage}
                          key={stage.id}
                        />
                      </div>
                    );
                  })}
                </>
              )}
            </details>
          ) : (
            <div style={{ padding: '0px 20px', width: '95%' }}>
              <label className="todo">
                <h3
                  style={{ fontSize: '18px', width: '60%' }}
                  className={classes.join(' ')}
                >
                  {todo.title}
                </h3>
                <div className="todo-btns">
                  <input
                    checked={todo.completed}
                    onChange={toggleTodo.bind(null, todo.id)}
                    type="checkbox"
                    hidden
                  />
                  <span className="checkbox"></span>
                  <button
                    onClick={removeTodo.bind(null, todo.id)}
                    className="delete"
                  >
                    &times;
                  </button>
                </div>
              </label>
            </div>
          )}
        </>
      ) : (
        <div style={{ padding: '0px 20px', width: '95%' }}>
          <label className="todo">
            <h3
              style={{ fontSize: '18px', width: '60%' }}
              className={classes.join(' ')}
            >
              {todo.title}
            </h3>
            <div className="todo-btns">
              <input
                checked={todo.completed}
                onChange={toggleTodo.bind(null, todo.id)}
                type="checkbox"
                hidden
              />
              <span className="checkbox"></span>
              <button
                onClick={removeTodo.bind(null, todo.id)}
                className="delete"
              >
                &times;
              </button>
            </div>
          </label>
        </div>
      )}
    </div>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
};

export default TodoItem;
