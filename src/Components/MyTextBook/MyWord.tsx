import React from 'react';
import { baseUrl } from '../../data/content';
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
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _id,
  } = wordElem;
  const urlBase = 'https://rslang-61.herokuapp.com/';
  const sound = new Audio(urlBase + audio);
  const token = sessionStorage.getItem('token');
  const userId = sessionStorage.getItem('userId');

  const setHardDifficulty = (wordId: string) => {
    const wordDescribe = { difficulty: 'hard' };
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

  const deleteWord = (wordId: string) => {
    const wordDescribe = { difficulty: 'deleted' };
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
          <button type="button" onClick={() => setHardDifficulty(_id)}>Сложно</button>
          <button type="button" onClick={() => deleteWord(_id)}>Удалить</button>
        </div>
      </div>
    </div>
  );
};

export default MyWord;
