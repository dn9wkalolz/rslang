import React from 'react';

function SavannahResult(props:any) {
  const { words } = props;
  const BASE_URL:string = 'https://rslang-61.herokuapp.com';

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
        <button type="button" className="icon-volume-up" onClick={playAudio(word.audio)}>&nbsp;</button>
        <span>{word.word}</span>
        <span>{word.transcription}</span>
        <span>{word.wordTranslate}</span>
      </div>
    ))
  );
}

export default SavannahResult;
