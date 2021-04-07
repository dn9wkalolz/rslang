import React, { useState, useRef } from 'react';
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

  function handleFullscreen() {
    if (!fullscreen) {
      ref.current?.requestFullscreen();
      setFullscreen(!fullscreen);
    } else {
      document.exitFullscreen();
      setFullscreen(!fullscreen);
    }
  }

  if (current < pagesWord.length) {
    return (
      <div className="own-game translator" ref={ref}>
        <button className="own-game__fullscreen" type="button" onClick={handleFullscreen}>
          <img src={screen.img} alt={screen.imgAlt} />
        </button>
        <OwnGameCard wordElem={pagesWord[current]} />
      </div>
    );
  } else {
    return (
      <div className="own-game translator" ref={ref}>
        <button className="own-game__fullscreen" type="button" onClick={handleFullscreen}>
          <img src={screen.img} alt={screen.imgAlt} />
        </button>
        <OwnGameReuslts />
      </div>
    );
  }
}

export default OwnGame;
