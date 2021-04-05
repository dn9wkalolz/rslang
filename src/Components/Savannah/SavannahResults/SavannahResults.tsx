import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSavannah,
  SavannahResetResults,
} from '../SavannahWord/SavannahWordSlice';
import SavannahResult from '../SavannahResult/SavannahResult';
import { ownGameContent } from '../../../data/content';

const SavannahResults: React.FC = () => {
  const { correct, incorrect } = useSelector(selectSavannah);
  const dispatch = useDispatch();

  function restartGame():void {
    dispatch(SavannahResetResults());
  }

  return (
    <div className="own-game__results">
      <div className="own-game__results--wrapper">
        <h2 className="own-game__results--title">{ownGameContent.results}</h2>
        <div className="own-game__results--lists">
          <div className="own-game__results--list">
            <h3 className="own-game__results--subtitle">{ownGameContent.learned}</h3>
            <SavannahResult words={correct} />
          </div>
          <div className="own-game__results--list">
            <h3 className="own-game__results--subtitle">{ownGameContent.tolearn}</h3>
            <SavannahResult words={incorrect} />
          </div>
        </div>
        <button type="button" className="own-game__results--restart" onClick={restartGame}>Сыграть еще раз</button>
      </div>
    </div>
  );
};

export default SavannahResults;
