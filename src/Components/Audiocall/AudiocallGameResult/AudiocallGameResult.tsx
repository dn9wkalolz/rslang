import React from 'react';
import '../../common/Result/Result.scss';
import { WordsType } from '../../../types/types';
import { API_URL } from '../../../url.constants';
import { ownGameContent } from '../../../data/content';

type PropsType = {
  answers: WordsType
};

const AudiocallGameResult: React.FC<PropsType> = ({ answers }) => {
  const { play } = ownGameContent;

  function playAudio(audio: string) {
    return (event: React.MouseEvent) => {
      const player = new Audio(`${API_URL}${audio}`);
      player.play();
      event.preventDefault();
    };
  }

  return (
    <>
      {answers.map((word: any) => (
        <div className="own-game__results--list-item" key={word.word}>
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

export default AudiocallGameResult;
