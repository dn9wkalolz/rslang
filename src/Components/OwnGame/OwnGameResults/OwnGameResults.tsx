import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectOwnGame,
  OwnGameCardResetCurrent,
  OwnGameCardResetIsCorrect,
  OwnGameCardResetIsIncorrect,
} from '../OwnGameCard/OwnGameCardSlice';
import OwnGameResult from '../OwnGameResult/OwnGameResult';
import './OwnGameResults.scss';

const OwnGameReuslts: React.FC = () => {
  const { correct, incorrect } = useSelector(selectOwnGame);
  const dispatch = useDispatch();

  function restartGame():void {
    dispatch(OwnGameCardResetCurrent());
    dispatch(OwnGameCardResetIsCorrect());
    dispatch(OwnGameCardResetIsIncorrect());
  }

  return (
    <div className="own-game__results">
      <div className="own-game__results--wrapper">
        <h2 className="own-game__results--title">Ваши результаты:</h2>
        <div className="own-game__results--lists">
          <div className="own-game__results--list">
            <h3 className="own-game__results--subtitle">Изучено:</h3>
            <OwnGameResult words={correct} />
          </div>
          <div className="own-game__results--list">
            <h3 className="own-game__results--subtitle">Для повторения:</h3>
            <OwnGameResult words={incorrect} />
          </div>
        </div>
        <button type="button" className="own-game__results--restart" onClick={restartGame}>Сыграть еще раз</button>
      </div>
    </div>
  );
};

export default OwnGameReuslts;
