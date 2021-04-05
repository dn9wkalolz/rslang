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
  const [isChecking, setIsChecking] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<string>('');
  const [lives, setLives] = useState<number>(5);
  const arrayOfLives = Array.from({ length: lives }, (v, k) => k);
  const dispatch = useDispatch();

  function handleNext():void {
    setIsChecking('checked');
    setIsCorrect('');
    setIsChecking('');
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
      setIsCorrect('incorrect');
      dispatch(SavannahWordIsIncorrect(word));
      takeLife();
      handleNext();
    }, 5000);
    return () => clearTimeout(timer);
  }, [word]);

  function handleCheck(event:React.MouseEvent):void {
    const element = event.target as HTMLInputElement;
    const translation = element.value;

    if (translation.toLowerCase() === word.wordTranslate.toLowerCase()) {
      setIsCorrect('correct');
      dispatch(SavannahWordIsCorrect(word));
    } else {
      setIsCorrect('incorrect');
      dispatch(SavannahWordIsIncorrect(word));
      takeLife();
    }

    setIsChecking('checked');
    handleNext();
  }

  return (
    <div
      className={`savannah__card
      ${(isCorrect === 'correct') ? 'correct'
        : (isCorrect === 'incorrect') ? 'incorrect'
          : ''}
          ${(isChecking === 'checked') ? 'checked'
            : ''}`}
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
          <div key={life}>{life}</div>
        ))}
      </div>
    </div>
  );
}

export default SavannahWord;
