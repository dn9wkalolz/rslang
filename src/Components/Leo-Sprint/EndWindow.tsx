import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { IWordSetElem } from '../../types/leoSprintInterfaces';

const EndWindow: React.FC = () => {
  const { right, wrong } = useSelector((state: RootState) => state.leosprintState);
  return (
    <div>
      <h2>Ошибок</h2>
      <ul>
        {wrong.map(
          (wordElem: IWordSetElem) => (
            <li key={wordElem.id}>
              {`${wordElem.word} ${wordElem.transcription} ${wordElem.wordTranslate}`}
            </li>
          ),
        )}
      </ul>
      <h2>Знаю</h2>
      <ul>
        {right.map(
          (wordElem: IWordSetElem) => (
            <li key={wordElem.id}>
              {`${wordElem.word} ${wordElem.transcription} ${wordElem.wordTranslate}`}
            </li>
          ),
        )}
      </ul>
    </div>
  );
};

export default EndWindow;
