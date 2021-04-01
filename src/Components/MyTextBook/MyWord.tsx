import React from 'react';
import { baseUrl } from '../../data/content';
import { usePutMethod } from '../../data/requestMethods';
import { IPaginatedWordSetElem } from '../../interfaces/commonInterfaces';

interface IAnswers {
  wordElem: IPaginatedWordSetElem
}

const MyWord: React.FC<IAnswers> = ({ wordElem }) => {
  const {
    audio,
    word,
    transcription,
    wordTranslate,
    image, textMeaning,
    textExample,
    textMeaningTranslate,
    textExampleTranslate,
    _id,
  } = wordElem;
  const sound = new Audio(baseUrl + audio);

  const setHardDifficulty = (wordId: string) => {
    usePutMethod(wordId, 'hard');
  };

  const deleteWord = (wordId: string) => {
    usePutMethod(wordId, 'deleted');
  };

  return (
    <div className="textbook__word">
      <div><img className="textbook__word-img" src={baseUrl + image} alt={word} /></div>
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
        <div>
          <button type="button" onClick={() => setHardDifficulty(_id)}>Сложно</button>
          <button type="button" onClick={() => deleteWord(_id)}>Удалить</button>
        </div>
      </div>
    </div>
  );
};

export default MyWord;
