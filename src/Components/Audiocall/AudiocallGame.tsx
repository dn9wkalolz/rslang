import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './AudiocallGame.scss';
import { ownGameContent } from '../../data/content';
import { WordsType } from '../../types/types';
import { RootState } from '../../store/rootReducer';
import AudiocallGameCard from './AudiocallGameCard/AudiocallGameCard';
import AudiocallGameReuslts from './AudiocallGameResults/AudiocallGameResults';
import { selectTextbookState } from '../../store/textbookActions';
import { IPaginatedWordSetElem } from '../../interfaces/commonInterfaces';

type PropsType = {
  words: WordsType
  level: number
  onPageChanged: (level: number, currentPage: number) => void
  currentPage: number
  rightAnswers: IPaginatedWordSetElem[]
  wrongAnswers: IPaginatedWordSetElem[]
};

const AudiocallGame: React.FC<PropsType> = ({
  level,
  onPageChanged,
  currentPage,
  rightAnswers,
  wrongAnswers,
}) => {
  const { pagesWord } = useSelector(selectTextbookState);
  const currentWordIndex = useSelector((state: RootState) => state.audiocall.currentWordIndex);
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const { screen } = ownGameContent;

  useEffect(() => {
    function handleChange() {
      setFullscreen(!fullscreen);
    }

    document.addEventListener('fullscreenchange', handleChange);

    return function cleanup() {
      document.removeEventListener('fullscreenchange', handleChange);
    };
  });

  function handleFullscreen() {
    if (!fullscreen) {
      ref.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  return (
    <div className="own-game audiocall" ref={ref}>
      <button className="own-game__fullscreen" type="button" onClick={handleFullscreen}>
        <img src={screen.img} alt={screen.imgAlt} />
      </button>
      {
        (currentWordIndex < pagesWord.length)
          ? (
            <AudiocallGameCard
              word={pagesWord[currentWordIndex]}
              currentWordIndex={currentWordIndex}
              words={pagesWord}
            />
          )
          : (
            <AudiocallGameReuslts
              onPageChanged={onPageChanged}
              level={level}
              currentPage={currentPage}
              rightAnswers={rightAnswers}
              wrongAnswers={wrongAnswers}
            />
          )
      }
    </div>
  );
};

export default AudiocallGame;
