import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestWords } from '../../../store/audiocallReduser';
import { RootState } from '../../../store/rootReducer';
import Preloader from '../../common/Preloader/Preloader';
import { audiocallGameContent } from '../../../data/content';
import './AudiocallStartScreen.scss';
import AudiocallGame from '../AudiocallGame';

const AudiocallStartScreen: React.FC = () => {
  const {
    rightAnswers,
    wrongAnswers,
    level,
    currentPage,
    isFetching,
    words,
  } = useSelector((state: RootState) => state.audiocall);

  const dispatch = useDispatch();
  const LEVEL_NAMES = audiocallGameContent.levels;

  const onLevelChanged = (levelNumber: number) => {
    dispatch(requestWords(levelNumber, currentPage));
  };

  const onPageChanged = (page: number) => {
    dispatch(requestWords(level, page));
  };

  if (isFetching) {
    return <Preloader />;
  }

  if (words.length) {
    return (
      <>
        <AudiocallGame
          words={words}
          onPageChanged={onPageChanged}
          currentPage={currentPage}
          rightAnswers={rightAnswers}
          wrongAnswers={wrongAnswers}
        />
      </>
    );
  }

  return (
    <div className="audiocall-game__choose-level">
      <h1 className="audiocall-game__choose-level--title">{audiocallGameContent.title}</h1>
      <h3 className="audiocall-game__choose-level--description">{audiocallGameContent.description}</h3>
      <h2 className="audiocall-game__choose-level--subtitle">{audiocallGameContent.chooseLevel}</h2>
      <div className="audiocall-game__choose-level--cards">
        {LEVEL_NAMES.map((lev, index) => (
          <div className="audiocall-game__choose-level--card" key={lev}>
            <button onClick={() => onLevelChanged(index)} type="button">{lev}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudiocallStartScreen;
