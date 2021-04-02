import React from 'react';
import { baseUrl } from '../../data/content';
import { IPaginatedWordSetElem } from '../../interfaces/commonInterfaces';

interface IAnswers {
  wordElem: IPaginatedWordSetElem
}

const Answers: React.FC<IAnswers> = ({ wordElem }) => {
  const {
    audio, word, transcription, wordTranslate,
  } = wordElem;
  const sound = new Audio(baseUrl + audio);
  return (
    <li>
      <button type="button" onClick={() => sound.play()}>Play</button>
      {`${word} ${transcription} ${wordTranslate}`}
    </li>
  );
};

export default Answers;
