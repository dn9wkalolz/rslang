import React from 'react';
import { useSelector } from 'react-redux';
import './AudiocallGame.scss';
import { WordsType } from '../../types/types';
import { RootState } from '../../store/rootReducer';

type PropsType = {
  words: WordsType
};

const AudiocallGame: React.FC<PropsType> = ({ words }) => {
  const currentWordIndex = useSelector((state: RootState) => state.audiocall.currentWordIndex);

  if (currentWordIndex < words.length) {
    return (
      <div className="own-game">
        <h1>Audiocall Card </h1>
      </div>
    );
  }

  return (
    <h1>OwnGameReuslts </h1>
  );
};

export default AudiocallGame;
