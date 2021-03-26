import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeDifficulty, toggleStart } from '../../store/leoSprintActions';
import { RootState } from '../../store/rootReducer';

const StartWindow: React.FC = () => {
  const difficulty = useSelector((state: RootState) => state.leosprintState.difficulty);
  const dispatch = useDispatch();

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeDifficulty(e.target.value));
  };

  const startHandler = () => {
    dispatch(toggleStart());
  };

  return (
    <div className="leosprint__start-window">
      <h2>Leo Sprint</h2>
      <h3>Цель: указать соответствует ли слово переводу</h3>
      <button
        type="button"
        onClick={startHandler}
      >
        Начать
      </button>
      <select
        value={difficulty}
        onChange={selectHandler}
        name="difficulty"
        className="leosprint__difficulty"
      >
        <option value="0">1</option>
        <option value="1">2</option>
        <option value="2">3</option>
        <option value="3">4</option>
        <option value="4">5</option>
        <option value="5">6</option>
      </select>
    </div>
  );
};

export default StartWindow;
