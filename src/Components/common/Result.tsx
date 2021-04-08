import React from 'react';
import '../OwnGame/OwnGameResult/OwnGameResult.scss';
import { baseUrl, ownGameContent } from '../../data/content';
import { IPaginatedWordSetElem } from '../../interfaces/commonInterfaces';

interface IWords {
  words: IPaginatedWordSetElem[]
}

const Result: React.FC<IWords> = ({ words }) => {
  const { play } = ownGameContent;

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
          <button type="button" onClick={playAudio(word.audio)}>
            <img src={play.img} alt={play.imgAlt} />
          </button>
          <span>{word.word}</span>
          <span>{word.transcription}</span>
          <span className="own-game__results--list-item__translation">{word.wordTranslate}</span>
        </div>
      ))}
    </>
  );
};

export default Result;
