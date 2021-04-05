import React from 'react';
import { IWordSetElem } from '../../interfaces/commonInterfaces';

interface IAnswers {
  wordElem: IWordSetElem
}

const Word: React.FC<IAnswers> = ({ wordElem }) => {
  const {
    audio,
    word,
    transcription,
    wordTranslate,
    image, textMeaning,
    textExample,
    textMeaningTranslate,
    textExampleTranslate,
  } = wordElem;
  const urlBase = 'https://rslang-61.herokuapp.com/';
  const sound = new Audio(urlBase + audio);

  return (
    <div className="textbook__word">
      <div><img className="textbook__word-img" src={urlBase + image} alt={word} /></div>
      <div className="textbook__word-cover">
        <div className="textbook__word-description">
          <span>{`${word} ${transcription} ${wordTranslate}`}</span>
          <button type="button" onClick={() => sound.play()}>Play</button>
        </div>
        <div className="textbook__word-meaning">
          <span><div dangerouslySetInnerHTML={{ __html: textMeaning }} /></span>
          <span><div dangerouslySetInnerHTML={{ __html: textExample }} /></span>
        </div>
        <div className="textbook__translate">
          <span>{textMeaningTranslate}</span>
          <span>{textExampleTranslate}</span>
        </div>
      </div>
    </div>
  );
};

export default Word;
