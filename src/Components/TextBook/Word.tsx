import React from 'react';
import { baseUrl } from '../../data/content';
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
    id,
    page,
  } = wordElem;
  const urlBase = 'https://rslang-61.herokuapp.com/';
  const sound = new Audio(urlBase + audio);
  const token = sessionStorage.getItem('token');
  const userId = sessionStorage.getItem('userId');

  const setHardDifficulty = (wordId: string, wordPage: number) => {
    const wordDescribe = { difficulty: 'hard', optional: { wordPage } };
    fetch(`${baseUrl}users/${userId}/words/${wordId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(wordDescribe),
    })
      .then((response) => response.json())
      .then((result) => console.log(result));
  };

  const deleteWord = (wordId: string, wordPage: number) => {
    const wordDescribe = { difficulty: 'deleted', optional: { wordPage } };
    fetch(`${baseUrl}users/${userId}/words/${wordId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(wordDescribe),
    })
      .then((response) => response.json())
      .then((result) => console.log(result));
  };

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
        <div>
          <button type="button" onClick={() => setHardDifficulty(id, page)}>Сложно</button>
          <button type="button" onClick={() => deleteWord(id, page)}>Удалить</button>
        </div>
      </div>
    </div>
  );
};

export default Word;
