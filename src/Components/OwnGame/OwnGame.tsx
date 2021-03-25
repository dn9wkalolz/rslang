import React, { useState } from 'react';
import OwnGameCard from './OwnGameCard/OwnGameCard';
import './OwnGame.scss';

export default function OwnGame(props:any) {
  const { words } = props;
  const [current, setCurrent] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  function updateCurrent() {
    if (current < words.length - 1) {
      setCurrent(current + 1);
    } else {
      setIsFinished(true);
    }
  }

  if (!isFinished) {
    return (
      <div className="own-game">
        <OwnGameCard word={words[current]} updateCurrent={updateCurrent} />
      </div>
    );
  } else {
    return (
      <div>Results:</div>
    );
  }
}
