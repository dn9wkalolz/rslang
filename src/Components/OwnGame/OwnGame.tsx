import React, { useState } from 'react';
import data from './data';
import OwnGameCard from './OwnGameCard/OwnGameCard';
import './OwnGame.scss';

export default function OwnGame() {
  const [current, setCurrent] = useState(0);
  const words = data;

  function updateCurrent() {
    setCurrent(current + 1);
    console.log(current);
  }

  return (
    <div className="own-game">
      <OwnGameCard
        word={words[current]}
        updateCurrent={updateCurrent}
        key={words[current].word}
      />
    </div>
  );
}
