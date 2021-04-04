import React from 'react';
import { useSelector } from 'react-redux';
import './AudiocallGame.scss';
import { WordsType } from '../../types/types';
import { RootState } from '../../store/rootReducer';
import AudiocallGameCard from './AudiocallGameCard/AudiocallGameCard';
import AudiocallGameReuslts from './AudiocallGameResults/AudiocallGameResults';

type PropsType = {
  words: WordsType
  onPageChanged: (page: number) => void
  currentPage: number
  rightAnswers: WordsType
  wrongAnswers: WordsType
};

const AudiocallGame: React.FC<PropsType> = ({
  words,
  onPageChanged,
  currentPage,
  rightAnswers,
  wrongAnswers,
}) => {
  const currentWordIndex = useSelector((state: RootState) => state.audiocall.currentWordIndex);

  if (currentWordIndex < words.length) {
    return (
      <div className="own-game">
        <AudiocallGameCard
          word={words[currentWordIndex]}
          currentWordIndex={currentWordIndex}
          words={words}
        />
      </div>
    );
  }

  return (
    <AudiocallGameReuslts
      onPageChanged={onPageChanged}
      currentPage={currentPage}
      rightAnswers={rightAnswers}
      wrongAnswers={wrongAnswers}
    />
  );
};

export default AudiocallGame;
