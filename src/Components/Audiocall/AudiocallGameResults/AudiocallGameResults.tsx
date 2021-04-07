import React from 'react';
import AudiocallGameResult from '../AudiocallGameResult/AudiocallGameResult';
import { audiocallGameContent } from '../../../data/content';
import '../../OwnGame/OwnGameResults/OwnGameResults.scss';
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
  function nextStep() {
    onPageChanged(currentPage + 1);
  }

  const {
    right,
    wrong,
    learned,
    tolearn,
    results,
    restart,
  } = audiocallGameContent;

  return (
    <div className="own-game__results">
      <div className="own-game__results--wrapper">
        <h2 className="own-game__results--title">{results}</h2>
        <div className="own-game__results--lists">
          <div className="own-game__results--list">
            <h3 className="own-game__results--subtitle">
              <img src={right.img} alt={right.imgAlt} />
              {learned}
              <span>{rightAnswers.length}</span>
            </h3>
            <AudiocallGameResult answers={rightAnswers} />
          </div>
          <div className="own-game__results--list">
            <h3 className="own-game__results--subtitle">
              <img src={wrong.img} alt={wrong.imgAlt} />
              {tolearn}
              <span>{wrongAnswers.length}</span>
            </h3>
            <AudiocallGameResult answers={wrongAnswers} />
          </div>
        </div>
        <button type="button" className="own-game__results--restart" onClick={nextStep}>{restart}</button>
      </div>
    </div>
  );
};

export default AudiocallGameResults;
