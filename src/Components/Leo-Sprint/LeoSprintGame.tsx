import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLastLocation } from 'react-router-last-location';
import { RootState } from '../../store/rootReducer';
import { ownGameContent } from '../../data/content';
import EndWindow from './EndWindow';
import GameStatistic from './GameStatic';
import StartWindow from './StartWindow';
import './LeoSprintGame.scss';

const LeoSprintGame: React.FC = () => {
  const lastLocation = useLastLocation();
  const [start, end] = useSelector(
    (state: RootState) => {
      const { isStart, isEnd } = state.leosprintState;
      return [isStart, isEnd];
    },
  );
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
    console.log('here');
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
        (lastLocation?.pathname !== '/textbook' && !start) ? <StartWindow />
          : (end) ? <EndWindow />
            : <GameStatistic />
      }
    </div>
  );
};

export default LeoSprintGame;
