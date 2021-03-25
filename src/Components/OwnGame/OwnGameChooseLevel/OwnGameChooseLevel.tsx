import React, { useState } from 'react';
import OwnGame from '../OwnGame';
import './OwnGameChooseLevel.scss';

function OwnGameChooseLevel() {
  const [isLoaded, setIsLoaded] = useState('');
  const [words, setWords] = useState([]);
  const groups = ['Изян', 'Легко', 'Норм', 'Уже сложнее', 'Сложно', 'Жесть'];
  const PAGES = 29;

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
    return <div className="own-game__choose-level--loading">Loading...</div>;
  } else {
    return (
      <div className="own-game__choose-level">
        <h2 className="own-game__choose-level--heading">Выберите уровень сложности &#128522;</h2>
        <div className="own-game__choose-level--cards">
          {groups.map((group, index) => <div className="own-game__choose-level--card" key={group}><button onClick={() => chooseLevel(index)} type="button">{group}</button></div>)}
        </div>
      </div>
    );
  }
}

export default OwnGameChooseLevel;
