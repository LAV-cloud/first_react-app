import React, { useContext } from 'react';
import Context from '../context';
import PropTypes from 'prop-types';

function TodoStage({ stage, id, stages, stepByStep }) {
  const { toggleStage } = useContext(Context);
  let classes = [];

  if (stage.completed) {
    classes.push('done');
  }

  return (
    <>
      {stepByStep ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            padding: '0px 20px',
          }}
        >
          <h4 style={{ margin: '10px 0px' }}>
            Этап {stages.filter((stage) => stage.completed).length + 1}/
            {stages.length}
          </h4>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <h4>Текущая задача:</h4>
            <p style={{ fontSize: '18px' }}>{stage.title}</p>
          </div>
          <button
            type="button"
            onClick={toggleStage.bind(
              null,
              id,
              stage.id,
              stages.filter((stage) => stage.completed).length + 1 ===
                stages.length
                ? true
                : false
            )}
            className="btnNext"
          >
            {stages.filter((stage) => stage.completed).length + 1 ===
            stages.length
              ? 'Закончить!'
              : 'Далее'}
          </button>
        </div>
      ) : (
        <label className="todo">
          <p style={{ width: '60%' }} className={classes.join(' ')}>
            — {stage.title}
          </p>
          <div className="todo-btns">
            <input
              checked={stage.completed}
              onChange={toggleStage.bind(null, id, stage.id, false)}
              type="checkbox"
              hidden
            />
            <span className="checkbox"></span>
          </div>
        </label>
      )}
    </>
  );
}

TodoStage.propTypes = {
  stage: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  stepByStep: PropTypes.bool.isRequired,
  stages: PropTypes.arrayOf(PropTypes.object),
};

export default TodoStage;
