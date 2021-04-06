import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectSavannah } from './SavannahWord/SavannahWordSlice';
import SavannahWord from './SavannahWord/SavannahWord';
import './Savannah.scss';
import SavannahResults from './SavannahResults/SavannahResults';

function Savannah(props:any) {
  const { words } = props;
  const { current, outOfLives } = useSelector(selectSavannah);
  const [translations, setTranslations] = useState<Array<[]>>([]);
  const prevCurrent = useRef<number>(0);

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
      <div className="savannah">
        <SavannahWord word={words[current]} words={words} translations={translations} />
      </div>
    );
  } else {
    return (
      <SavannahResults />
    );
  }
}

export default Savannah;
