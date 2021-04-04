import React from 'react';
import './AudiocallGameResult.scss';
import { WordsType } from '../../../types/types';
import { API_URL } from '../../../url.constants';

type PropsType = {
  answers: WordsType
};

const AudiocallGameResult: React.FC<PropsType> = ({ answers }) => {
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
        <div className="audiocall-game__results--list-item" key={word.word}>
          <button type="button" className="icon-volume-up" onClick={playAudio(word.audio)}>pres</button>
          <span>{word.word}</span>
          <span>{word.transcription}</span>
          <span>{word.wordTranslate}</span>
        </div>
      ))}
    </>
  );
};

export default AudiocallGameResult;
