import React from 'react';
import { useSelector } from 'react-redux';
import { selectOwnGame } from './OwnGameCard/OwnGameCardSlice';
import OwnGameCard from './OwnGameCard/OwnGameCard';
import OwnGameReuslts from './OwnGameResults/OwnGameResults';
import './OwnGame.scss';

function OwnGame(props:any) {
  const { words } = props;
  const { current } = useSelector(selectOwnGame);

  if (current < 3) {
    return (
      <div className="own-game">
        <OwnGameCard word={words[current]} />
      </div>
    );
  } else {
    return (
      <OwnGameReuslts />
    );
  }
}

export default OwnGame;
