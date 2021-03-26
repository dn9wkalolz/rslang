import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearGame } from '../../store/actions';
import { RootState } from '../../store/rootReducer';
import { IWordSetElem } from '../../types/leoSprintInterfaces';
import Answers from './Answers';

const EndWindow: React.FC = () => {
  const { right, wrong } = useSelector((state: RootState) => state.leosprintState);
  const dispatch = useDispatch();
  const onStart = () => {
    dispatch(clearGame());
  };
  return (
    <div className="leosprint__end-window">
      <h2>Ошибок</h2>
      <ul>
        {wrong.map(
          (wordElem: IWordSetElem) => (<Answers key={wordElem.id} {...{ wordElem }} />),
        )}
      </ul>
      <h2>Знаю</h2>
      <ul>
        {right.map(
          (wordElem: IWordSetElem) => (<Answers key={wordElem.id} {...{ wordElem }} />),
        )}
      </ul>
      <button type="button" onClick={onStart}>Новая Игра</button>
    </div>
  );
};

export default EndWindow;
