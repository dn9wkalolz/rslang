import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearGame, selectLeosprintGame } from '../../store/leoSprintActions';
import { ILeosprintState } from '../../store/leoSprintReducer';
import Answers from './Answers';

const EndWindow: React.FC = () => {
  const { right, wrong }: ILeosprintState = useSelector(selectLeosprintGame);
  const dispatch = useDispatch();
  const onStart = () => {
    dispatch(clearGame());
  };
  return (
    <div className="leosprint__end-window">
      <h2>Ошибок</h2>
      <ul>
        {wrong.map(
          (wordElem) => (<Answers key={wordElem._id} {...{ wordElem }} />),
        )}
      </ul>
      <h2>Знаю</h2>
      <ul>
        {right.map(
          (wordElem) => (<Answers key={wordElem._id} {...{ wordElem }} />),
        )}
      </ul>
      <button type="button" onClick={onStart}>Новая Игра</button>
    </div>
  );
};

export default EndWindow;
