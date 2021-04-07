import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  SavannahOutOfLives,
  SavannahWordIsCorrect,
  SavannahWordIsIncorrect,
  SavannahWordSetCurrent,
} from './SavannahWordSlice';
import './SavannahWord.scss';

function SavannahWord(props:any) {
  const { word, translations } = props;
  const [lives, setLives] = useState<number>(5);
  const pseudoLives:number = 5;
  const arrayOfLives = Array.from({ length: lives }, (v, k) => k);
  const arrayOfPseudoLives = Array.from({ length: pseudoLives }, (v, k) => k);
  const dispatch = useDispatch();

  function handleNext():void {
    dispatch(SavannahWordSetCurrent());
  }

  function takeLife() {
    setLives(lives - 1);
    if (lives === 1) {
      dispatch(SavannahOutOfLives());
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(SavannahWordIsIncorrect(word));
      takeLife();
      handleNext();
    }, 7500);
    return () => clearTimeout(timer);
  }, [word]);

  function handleCheck(event:React.MouseEvent):void {
    const element = event.target as HTMLInputElement;
    const translation = element.value;

    if (translation.toLowerCase() === word.wordTranslate.toLowerCase()) {
      dispatch(SavannahWordIsCorrect(word));
    } else {
      dispatch(SavannahWordIsIncorrect(word));
      takeLife();
    }

    handleNext();
  }

  return (
    <div
      className="savannah__card"
      key={word.wordTranslate}
    >
      <div className="savannah__card--task">{word.word}</div>
      <div className="savannah__card--options">
        {
          translations.map((translation:string) => (
            <input type="button" key={translation} onClick={handleCheck} value={translation} />
          ))
        }
      </div>
      <div className="savannah__lives">
        {arrayOfLives.map((life) => (
          <div className="savannah__life" key={life} />
        ))}
      </div>
      <div className="savannah__pseudolives">
        {arrayOfPseudoLives.map((life) => (
          <div className="savannah__pseudolife" key={life} />
        ))}
      </div>
    </div>
  );
}

export default SavannahWord;
