import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLastLocation } from 'react-router-last-location';
import { ownGameContent } from '../../data/content';
import EndWindow from './EndWindow';
import GameStatistic from './GameStatic';
import StartWindow from './StartWindow';
import './LeoSprintGame.scss';
import { selectLeosprintGame } from '../../store/leoSprintActions';

const LeoSprintGame: React.FC = () => {
  const lastLocation = useLastLocation();
  const { isStart, isEnd } = useSelector(selectLeosprintGame);
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
    <div className="own-game leosprint" ref={ref}>
      <button className="own-game__fullscreen" type="button" onClick={handleFullscreen}>
        <img src={screen.img} alt={screen.imgAlt} />
      </button>
      {
        (lastLocation?.pathname !== '/textbook' && !isStart) ? <StartWindow />
          : (isEnd) ? <EndWindow />
            : <GameStatistic />
      }
    </div>
  );
};

export default LeoSprintGame;
