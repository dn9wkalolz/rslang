import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { baseUrl } from '../../data/content';
import { usePostMethod, usePutMethod } from '../../data/requestMethods';
import { IPaginatedWordSetElem } from '../../interfaces/commonInterfaces';
import { RootState } from '../../store/rootReducer';
import { changeStateWord } from '../../store/textbookActions';

interface IAnswers {
  wordElem: IPaginatedWordSetElem
}

const Word: React.FC<IAnswers> = ({ wordElem }) => {
  const {
    audio,
    word,
    transcription,
    wordTranslate,
    image, textMeaning,
    textExample,
    textMeaningTranslate,
    textExampleTranslate,
    _id,
    userWord,
  } = wordElem;
  const sound = new Audio(baseUrl + audio);
  const dispatch = useDispatch();
  const paginatedWordSet: IPaginatedWordSetElem[] = useSelector(
    (state: RootState) => state.textbookState.paginatedWordSet,
  );

  const assignHardDifficylty = (wordEl: IPaginatedWordSetElem) => {
    wordEl.userWord = { difficulty: 'hard' };
    return { ...wordElem };
  };

  const setHardDifficulty = (wordId: string) => {
    const sortedPaginationWordset = paginatedWordSet.map(
      (wordEl) => {
        if (wordEl._id === wordId) {
          return assignHardDifficylty(wordEl);
        }
        return wordEl;
      },
    );
    if (userWord?.difficulty) {
      usePutMethod(wordId, 'hard');
    } else if (!userWord?.difficulty) {
      usePostMethod(wordId, 'hard');
    }
    dispatch(changeStateWord(sortedPaginationWordset));
  };

  const deleteWord = (wordId: string) => {
    const sortedPaginationWordset = paginatedWordSet.filter((wordEl) => wordEl._id !== wordId);
    if (userWord?.difficulty) {
      usePutMethod(wordId, 'deleted');
    } else if (!userWord?.difficulty) {
      usePostMethod(wordId, 'deleted');
    }
    dispatch(changeStateWord(sortedPaginationWordset));
  };

  return (
    <div className="textbook__word">
      <div><img className="textbook__word-img" src={baseUrl + image} alt={word} /></div>
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
          <button
            disabled={userWord?.difficulty === 'hard'}
            type="button"
            onClick={() => setHardDifficulty(_id)}
          >
            Сложно
          </button>
          <button
            type="button"
            onClick={() => deleteWord(_id)}
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default Word;
