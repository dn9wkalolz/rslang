import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectOwnGame,
  OwnGameCardResetResults,
} from '../OwnGameCard/OwnGameCardSlice';
import { ownGameContent } from '../../../data/content';
import './OwnGameResults.scss';
import Result from '../../common/Result/Result';

const OwnGameReuslts: React.FC = () => {
  const { correct, incorrect } = useSelector(selectOwnGame);
  const dispatch = useDispatch();
  const {
    right,
    wrong,
    learned,
    tolearn,
    results,
    restart,
  } = ownGameContent;

  function restartGame():void {
    dispatch(OwnGameCardResetResults());
  }

  return (
    <div className="own-game__results">
      <div className="own-game__results--wrapper">
        <h2 className="own-game__results--title">{results}</h2>
        <div className="own-game__results--lists">
          <div className="own-game__results--list">
            <h3 className="own-game__results--subtitle">
              <img src={right.img} alt={right.imgAlt} />
              {learned}
              <span>{correct.length}</span>
            </h3>
            <Result words={correct} />
          </div>
          <div className="own-game__results--list">
            <h3 className="own-game__results--subtitle">
              <img src={wrong.img} alt={wrong.imgAlt} />
              {tolearn}
              <span>{incorrect.length}</span>
            </h3>
            <Result words={incorrect} />
          </div>
        </div>
        <button type="button" className="own-game__results--restart" onClick={restartGame}>{restart}</button>
      </div>
    </div>
  );
};

export default OwnGameReuslts;
