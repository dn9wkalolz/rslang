import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { OwnGameCardIsCorrect, OwnGameCardIsIncorrect, OwnGameCardSetCurrent } from './OwnGameCardSlice';
import { ownGameContent } from '../../../data/content';
import './OwnGameCard.scss';

function OwnGameCard(props:any) {
  const [isChecking, setIsChecking] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<string>('');
  const dispatch = useDispatch();
  const BASE_URL:string = 'https://rslang-61.herokuapp.com';
  const { word } = props;
  const ref = useRef<HTMLInputElement>(null);

  function clearInput():void {
    if (ref.current?.value) {
      ref.current.value = '';
    }
  }

  function handleCheck():void {
    if (ref.current?.value) {
      setIsChecking('checking');

      if (ref.current?.value.toLowerCase() === word.word.toLowerCase()) {
        setIsCorrect('correct');
        dispatch(OwnGameCardIsCorrect(word));
      } else {
        setIsCorrect('incorrect');
        dispatch(OwnGameCardIsIncorrect(word));
      }
    }
  }

  function handleNext():void {
    setIsChecking('checked');

    setTimeout(() => {
      setIsCorrect('');
      setIsChecking('');
      clearInput();
      dispatch(OwnGameCardSetCurrent());
    }, 650);
  }

  return (
    <div
      className={`own-game__card
      ${(isCorrect === 'correct') ? 'correct'
        : (isCorrect === 'incorrect') ? 'incorrect'
          : ''}
          ${(isChecking === 'checking') ? 'checking'
            : (isChecking === 'checked') ? 'checked'
              : ''}`}
      key={word.wordTranslate}
    >
      <div className="own-game__card--image">
        <img src={`${BASE_URL}/${word.image}`} alt={word.word} />
      </div>
      <div className="own-game__card--content">
        <h2 className="own-game__card--word">{word.word}</h2>
        <p className="own-game__card--transcription">{word.transcription}</p>
        <h2 className="own-game__card--translation">{word.wordTranslate}</h2>
      </div>
      <div className="own-game__card--form">
        <input
          className={`own-game__card--input ${isChecking ? 'disabled' : ''}`}
          type="text"
          ref={ref}
        />
        <button
          type="button"
          className={`own-game__card--check ${isChecking ? 'hidden' : ''}`}
          onClick={handleCheck}
        >
          {ownGameContent.checkButton}
        </button>
        <button type="button" className="own-game__card--next" onClick={handleNext}>{ownGameContent.nextButton}</button>
      </div>
    </div>
  );
}

export default OwnGameCard;
