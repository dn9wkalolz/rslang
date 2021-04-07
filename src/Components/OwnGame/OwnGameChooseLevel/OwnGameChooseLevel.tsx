import React, { useState } from 'react';
import OwnGame from '../OwnGame';
import { ownGameContent } from '../../../data/content';
import './OwnGameChooseLevel.scss';

function OwnGameChooseLevel() {
  const [isLoaded, setIsLoaded] = useState<string>('');
  const [words, setWords] = useState([]);
  const GROUPS:Array<string> = ownGameContent.levels;
  const PAGES:number = 29;

  function choosePage(max:number):number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function fetchData(group:number):void {
    const page = choosePage(PAGES);

    fetch(`https://rslang-61.herokuapp.com/words?page=${page}&group=${group}`)
      .then((response) => response.json())
      .then((data) => {
        setWords(data);
        setIsLoaded('loaded');
      });
  }

  function chooseLevel(group:number):void {
    setIsLoaded('loading');
    fetchData(group);
  }

  if (isLoaded === 'loaded') {
    return <OwnGame words={words} />;
  } else if (isLoaded === 'loading') {
    return <div className="own-game__choose-level--loading">{ownGameContent.loading}</div>;
  } else {
    return (
      <div className="own-game__choose-level translator">
        <h1 className="own-game__choose-level--title">{ownGameContent.title}</h1>
        <h2 className="own-game__choose-level--subtitle">{ownGameContent.chooseLevel}</h2>
        <div className="own-game__choose-level--cards">
          {GROUPS.map((group, index) => (
            <div className="own-game__choose-level--card" key={group}>
              <button onClick={() => chooseLevel(index)} type="button">{group}</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default OwnGameChooseLevel;
