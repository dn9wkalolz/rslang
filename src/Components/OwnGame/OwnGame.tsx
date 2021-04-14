import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OwnGameCardResetResults, selectOwnGame } from './OwnGameCard/OwnGameCardSlice';
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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(OwnGameCardResetResults());
  }, []);

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
        (current < pagesWord.length)
          ? <OwnGameCard wordElem={pagesWord[current]} />
          : <OwnGameReuslts />
      }
    </div>
  );
}

export default OwnGame;
