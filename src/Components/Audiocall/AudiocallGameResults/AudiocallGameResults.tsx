import React from 'react';
import AudiocallGameResult from '../AudiocallGameResult/AudiocallGameResult';
import { audiocallGameContent } from '../../../data/content';
import './AudiocallGameResults.scss';
import { WordsType } from '../../../types/types';

type PropsType = {
  onPageChanged: (page: number) => void
  currentPage: number
  rightAnswers: WordsType
  wrongAnswers: WordsType
};

const AudiocallGameResults: React.FC<PropsType> = ({
  onPageChanged,
  currentPage,
  rightAnswers,
  wrongAnswers,
}) => {
  function nextStap() {
    onPageChanged(currentPage + 1);
  }

  return (
    <div className="audiocall-game__results">
      <div className="audiocall-game__results--wrapper">
        <h2 className="audiocall-game__results--title">{audiocallGameContent.results}</h2>
        <div className="audiocall-game__results--lists">
          <div className="audiocall-game__results--list">
            <h3 className="audiocall-game__results--subtitle">{audiocallGameContent.learned}</h3>
            <AudiocallGameResult answers={rightAnswers} />
          </div>
          <div className="audiocall-game__results--list">
            <h3 className="audiocall-game__results--subtitle">{audiocallGameContent.tolearn}</h3>
            <AudiocallGameResult answers={wrongAnswers} />
          </div>
        </div>
        <button type="button" className="audiocall-game__results--restart" onClick={nextStap}>
          {audiocallGameContent.continueButton}
        </button>
      </div>
    </div>
  );
};

export default AudiocallGameResults;
