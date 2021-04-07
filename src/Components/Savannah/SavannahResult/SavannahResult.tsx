import React from 'react';
import { ownGameContent } from '../../../data/content';
import '../../OwnGame/OwnGameResult/OwnGameResult.scss';

function SavannahResult(props:any) {
  const { words } = props;
  const BASE_URL:string = 'https://rslang-61.herokuapp.com';
  const { play } = ownGameContent;

  function playAudio(audio:string) {
    return (event: React.MouseEvent) => {
      const player = new Audio(`${BASE_URL}/${audio}`);
      player.play();
      event.preventDefault();
    };
  }

  return (
    words.map((word:any) => (
      <div className="own-game__results--list-item" key={word.word}>
        <button type="button" onClick={playAudio(word.audio)}>
          <img src={play.img} alt={play.imgAlt} />
        </button>
        <span>{word.word}</span>
        <span>{word.transcription}</span>
        <span className="own-game__results--list-item__translation">{word.wordTranslate}</span>
      </div>
    ))
  );
}

export default SavannahResult;
