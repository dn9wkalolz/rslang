import React from 'react';
import { IWordSetElem } from '../../types/leoSprintInterfaces';

interface IAnswers {
  wordElem: IWordSetElem
}

const Answers: React.FC<IAnswers> = ({ wordElem }) => {
  const {
    audio, word, transcription, wordTranslate,
  } = wordElem;
  const url = `https://rslang-61.herokuapp.com/${audio}`;
  const sound = new Audio(url);
  return (
    <li>
      <button type="button" onClick={() => sound.play()}>Play</button>
      {`${word} ${transcription} ${wordTranslate}`}
    </li>
  );
};

export default Answers;
