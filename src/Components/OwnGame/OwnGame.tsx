import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectOwnGame } from './OwnGameCard/OwnGameCardSlice';
import OwnGameCard from './OwnGameCard/OwnGameCard';
import OwnGameReuslts from './OwnGameResults/OwnGameResults';
import { ownGameContent } from '../../data/content';
import './OwnGame.scss';
import { selectTextbookState } from '../../store/textbookActions';

function OwnGame() {
  const { pagesWord } = useSelector(selectTextbookState);
  const { current } = useSelector(selectOwnGame);
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
    <div className="own-game translator" ref={ref}>
      <button className="own-game__fullscreen" type="button" onClick={handleFullscreen}>
        <img src={screen.img} alt={screen.imgAlt} />
      </button>
      {
        (current < words.length)
          ? <OwnGameCard word={words[current]} />
          : <OwnGameReuslts />
      }
    </div>
  );
}

export default OwnGame;
