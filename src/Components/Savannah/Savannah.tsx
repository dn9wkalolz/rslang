import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectSavannah } from './SavannahWord/SavannahWordSlice';
import SavannahWord from './SavannahWord/SavannahWord';
import './Savannah.scss';
import { ownGameContent } from '../../data/content';
import SavannahResults from './SavannahResults/SavannahResults';
import { selectTextbookState } from '../../store/textbookActions';

function Savannah() {
  const { pagesWord } = useSelector(selectTextbookState);
  const { current, outOfLives } = useSelector(selectSavannah);
  const [translations, setTranslations] = useState<string[]>([]);
  const prevCurrent = useRef<number>(0);
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

  function renderOptions() {
    setTranslations([]);
    const options = [pagesWord[current].wordTranslate];

    function randomOption(array:any) {
      const option = Math.floor(Math.random() * array.length);
      return array[option];
    }

    function shuffle(array:any) {
      return array.sort(() => Math.random() - 0.5);
    }

    while (options.length !== 4) {
      const word = randomOption(pagesWord);
      let isUnique = true;
      options.forEach((option:string) => {
        if (word.wordTranslate === option) {
          isUnique = false;
        }
      });
      if (isUnique) options.push(word.wordTranslate);
    }

    setTranslations(shuffle(options));
  }

  useEffect(() => {
    renderOptions();
  }, []);

  useEffect(() => {
    if (current !== pagesWord.length) {
      if (prevCurrent.current !== current) {
        renderOptions();
      }

      prevCurrent.current = current;
    }
  });

  if (current < pagesWord.length && outOfLives === false) {
    return (
      <div className="own-game savannah" ref={ref}>
        <button className="own-game__fullscreen" type="button" onClick={handleFullscreen}>
          <img src={screen.img} alt={screen.imgAlt} />
        </button>
        <SavannahWord wordElem={pagesWord[current]} translations={translations} />
      </div>
    );
  } else {
    return (
      <div className="own-game savannah" ref={ref}>
        <button className="own-game__fullscreen" type="button" onClick={handleFullscreen}>
          <img src={screen.img} alt={screen.imgAlt} />
        </button>
        <SavannahResults />
      </div>
    );
  }
}

export default Savannah;
