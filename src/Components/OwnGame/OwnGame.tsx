import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectOwnGame } from './OwnGameCard/OwnGameCardSlice';
import OwnGameCard from './OwnGameCard/OwnGameCard';
import OwnGameReuslts from './OwnGameResults/OwnGameResults';
import { ownGameContent } from '../../data/content';
import './OwnGame.scss';

function OwnGame(props:any) {
  const { words } = props;
  const { current } = useSelector(selectOwnGame);
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  function handleFullscreen() {
    if (!fullscreen) {
      ref.current?.requestFullscreen();
      setFullscreen(!fullscreen);
    } else {
      document.exitFullscreen();
      setFullscreen(!fullscreen);
    }
  }

  if (current < words.length) {
    return (
      <div className="own-game translator" ref={ref}>
        <button className="own-game__fullscreen" type="button" onClick={handleFullscreen}>
          <img src={ownGameContent.fullscreen} alt={ownGameContent.fullscreenAlt} />
        </button>
        <OwnGameCard word={words[current]} />
      </div>
    );
  } else {
    return (
      <div className="own-game translator" ref={ref}>
        <button className="own-game__fullscreen" type="button" onClick={handleFullscreen}>
          <img src={ownGameContent.fullscreen} alt={ownGameContent.fullscreenAlt} />
        </button>
        <OwnGameReuslts />
      </div>
    );
  }
}

export default OwnGame;
