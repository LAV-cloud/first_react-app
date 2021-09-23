import React, { useContext, useState } from 'react';
import Context from '../context';
import './Modal.css';

export default class Modal extends React.Component {
  state = {
    isOpen: false,
  };

  render() {
    return (
      <React.Fragment>
        <button
          className="modal-btnOpen"
          onClick={() => this.setState({ isOpen: true })}
        >
          Добавить новый todo
        </button>

        {this.state.isOpen && (
          <div className="modal">
            <div className="modal-body">
              <button
                onClick={() => this.setState({ isOpen: false })}
                className="modal-btnClose"
              >
                Закрыть
              </button>
              <ModalSetting />
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

function useInput(defaultValue, type) {
  let [value, setValue] = useState(defaultValue);

  return {
    bind: {
      value,
      type,
      onChange: (e) => setValue(e.target.value),
    },
    value: () => value,
    clear: () => setValue(defaultValue),
  };
}

function ModalSetting() {
  const { addTodo } = useContext(Context);

  let [stages, setStages] = useState([]);
  let [stepByStep, setStepByStep] = useState(false);

  const title = useInput('', 'text');

  function submitHandler(e) {
    e.preventDefault();

    if (title.value().trim()) {
      addTodo(title.value(), stages, stepByStep);
      title.clear();
      setStages([]);
    }
  }

  function changeTitleStage(id, value) {
    setStages(
      stages.map((stage) => {
        if (stage.id === id) {
          stage.title = value;
        }
        return stage;
      })
    );
  }

  function addStage() {
    setStages(
      (stages = stages.concat({
        id: stages.length + 1,
        title: `Без названия ${stages.length + 1}`,
        completed: false,
      }))
    );
  }

  function removeStage(id) {
    setStages((stages = stages.filter((stage) => stage.id !== id)));
  }

  return (
    <div>
      <form className="modal-form" onSubmit={submitHandler}>
        <label className="modal-label">
          <h4 style={{ marginRight: '10px' }}>Название</h4>
          <input {...title.bind} className="modal-input" />
        </label>
        <details style={{ marginTop: '20px' }} className="list">
          <summary className="todo-title">Дополнительные настройки</summary>
          <div className="modal-other">
            <div className="modal-list">
              <button
                type="button"
                onClick={() => addStage()}
                className="modal-btnCreate"
              >
                Create stage
              </button>
              {stages.map((stage) => {
                return (
                  <ModalStage
                    stage={stage}
                    key={stage.id}
                    removeStage={removeStage}
                    changeTitleStage={changeTitleStage}
                  />
                );
              })}
            </div>
            {stages.length ? (
              <Switch
                title={'Поэтапно'}
                switcher={stepByStep}
                labelClass={'modal-label'}
                switchClass={'modal-switch'}
                toggleSwitch={() => setStepByStep((stepByStep = !stepByStep))}
              />
            ) : (
              <></>
            )}
          </div>
        </details>
        <button type="submit" className="modal-btnSubmit">
          Создать
        </button>
      </form>
    </div>
  );
}

function ModalStage({ stage, removeStage, changeTitleStage }) {
  return (
    <div className="modal-stage">
      <input
        type="text"
        value={stage.title}
        onChange={(e) => {
          changeTitleStage(stage.id, e.target.value);
        }}
      />
      <button
        onClick={() => {
          removeStage(stage.id);
        }}
        type="button"
        className="modal-btnDelete"
      >
        &times;
      </button>
    </div>
  );
}

function Switch({ title, switcher, labelClass, switchClass, toggleSwitch }) {
  return (
    <label className={labelClass}>
      <h4 style={{ marginRight: '10px' }}>{title}</h4>
      <input
        checked={switcher}
        type="checkbox"
        hidden
        onChange={() => toggleSwitch()}
      />
      <span className={switchClass} />
    </label>
  );
}
