import React, { useState, useRef } from 'react';
import './OwnGameCard.scss';

function OwnGameCard(props:any) {
  const [isChecking, setIsChecking] = useState('');
  const [isCorrect, setIsCorrect] = useState('');

  const baseURL = 'https://rslang-61.herokuapp.com';
  const { word, updateCurrent } = props;
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
      } else {
        setIsCorrect('incorrect');
      }
    }
  }

  function handleNext():void {
    setIsChecking('checked');

    setTimeout(() => {
      setIsCorrect('');
      setIsChecking('');
      clearInput();
      updateCurrent();
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
        <img src={`${baseURL}/${word.image}`} alt={word.word} />
      </div>
      <h2 className="own-game__card--word">{word.word}</h2>
      <p className="own-game__card--transcription">{word.transcription}</p>
      <h2 className="own-game__card--translation">{word.wordTranslate}</h2>
      <div className="own-game__card--form">
        <input
          className={`own-game__card--input ${isChecking ? 'disabled' : ''}`}
          type="text"
          ref={ref}
        />
        <button
          type="button"
          className={`own-game__card--check ${isChecking ? 'disabled' : ''}`}
          onClick={() => handleCheck()}
        >
          Проверим?
        </button>
      </div>
      <button type="button" className="own-game__card--next" onClick={() => handleNext()}>Следующее слово</button>
    </div>
  );
}

export default OwnGameCard;
