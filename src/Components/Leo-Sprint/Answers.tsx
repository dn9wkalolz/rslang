import React from 'react';
import { baseUrl } from '../../data/content';
import { IPaginatedWordSetElem } from '../../interfaces/commonInterfaces';

interface IAnswers {
  words: IPaginatedWordSetElem[]
}

const Answers: React.FC<IAnswers> = ({ words }) => {
  function playAudio(audio:string) {
    return (event: React.MouseEvent) => {
      const player = new Audio(`${baseUrl}${audio}`);
      player.play();
      event.preventDefault();
    };
  }

  return (
    <>
      {words.map((word) => (
        <div className="own-game__results--list-item" key={word._id}>
          <button type="button" className="icon-volume-up" onClick={playAudio(word.audio)}>&nbsp;</button>
          <span>{word.word}</span>
          <span>{word.transcription}</span>
          <span>{word.wordTranslate}</span>
        </div>
      ))}
    </>
  );
};

export default Answers;
