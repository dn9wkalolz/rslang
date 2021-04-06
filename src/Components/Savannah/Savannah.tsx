import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectSavannah } from './SavannahWord/SavannahWordSlice';
import SavannahWord from './SavannahWord/SavannahWord';
import './Savannah.scss';
import { ownGameContent } from '../../data/content';
import SavannahResults from './SavannahResults/SavannahResults';

function Savannah(props:any) {
  const { words } = props;
  const { current, outOfLives } = useSelector(selectSavannah);
  const [translations, setTranslations] = useState<Array<[]>>([]);
  const prevCurrent = useRef<number>(0);
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

  function renderOptions() {
    setTranslations([]);
    const options = [words[current].wordTranslate];

    function randomOption(array:any) {
      const option = Math.floor(Math.random() * array.length);
      return array[option];
    }

    function shuffle(array:any) {
      return array.sort(() => Math.random() - 0.5);
    }

    while (options.length !== 4) {
      const word = randomOption(words);
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
    if (current !== words.length) {
      if (prevCurrent.current !== current) {
        renderOptions();
      }

      prevCurrent.current = current;
    }
  });

  if (current < words.length && outOfLives === false) {
    return (
      <div className="own-game savannah" ref={ref}>
        <button className="own-game__fullscreen" type="button" onClick={handleFullscreen}>
          <img src={ownGameContent.fullscreen} alt={ownGameContent.fullscreenAlt} />
        </button>
        <SavannahWord word={words[current]} words={words} translations={translations} />
      </div>
    );
  } else {
    return (
      <div className="own-game savannah" ref={ref}>
        <button className="own-game__fullscreen" type="button" onClick={handleFullscreen}>
          <img src={ownGameContent.fullscreen} alt={ownGameContent.fullscreenAlt} />
        </button>
        <SavannahResults />
      </div>
    );
  }
}

export default Savannah;
