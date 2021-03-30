import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, requestWords } from '../../../store/audiocallReduser';
import { RootState } from '../../../store/rootReducer';
import Preloader from '../../common/Preloader/Preloader';
import { audiocallGameContent } from '../../../data/content';
import './AudiocallStartScreen.scss';
import AudiocallGame from '../AudiocallGame';

const AudiocallStartScreen: React.FC = () => {
  const level = useSelector((state: RootState) => state.audiocall.level);
  const isFetching = useSelector((state: RootState) => state.audiocall.isFetching);
  const words = useSelector((state: RootState) => state.audiocall.words);
  const dispatch = useDispatch();
  const LEVEL_NAMES = audiocallGameContent.levels;

  const setLevel = (levelNumber: number) => {
    dispatch(actions.setLevel(levelNumber));
    dispatch(requestWords(level));
  };

  if (isFetching) {
    return <Preloader />;
  }

  if (words.length) {
    return <AudiocallGame words={words} />;
  }

  return (
    <div className="audiocall-game__choose-level">
      <h1 className="audiocall-game__choose-level--title">{audiocallGameContent.title}</h1>
      <h3 className="audiocall-game__choose-level--description">{audiocallGameContent.description}</h3>
      <h2 className="audiocall-game__choose-level--subtitle">{audiocallGameContent.chooseLevel}</h2>
      <div className="audiocall-game__choose-level--cards">
        {LEVEL_NAMES.map((lev, index) => (
          <div className="audiocall-game__choose-level--card" key={lev}>
            <button onClick={() => setLevel(index)} type="button">{lev}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudiocallStartScreen;
