import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { baseUrl, DIFFICULTY } from '../../data/content';
import { useFetchWithCondition } from '../../data/requestMethods';
import { IPaginatedWordSetElem } from '../../interfaces/commonInterfaces';
import {
  changePage, changeStateWord, selectTextbookState, setPagesButtons,
} from '../../store/textbookActions';

interface IWords {
  wordElem: IPaginatedWordSetElem
}

const Word: React.FC<IWords> = ({ wordElem }) => {
  const { HARD, DELETED } = DIFFICULTY;
  const {
    audio,
    page,
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
  const { paginatedWordSet, pagesWord, pagesButtons } = useSelector(selectTextbookState);

  const sound = new Audio(baseUrl + audio);
  const dispatch = useDispatch();

  const updatePageButtons = (currPage: number) => {
    const updatedButtons = pagesButtons.filter((pageButton) => pageButton !== currPage);
    const pagePrediction = currPage + 1;
    const changingPage = pagePrediction > updatedButtons.length ? -1 : 1;
    dispatch(setPagesButtons(updatedButtons));
    dispatch(changePage(changingPage));
  };

  const assignWordsetProperty = (wordEl: IPaginatedWordSetElem, difficulty: string) => {
    if (!userWord) {
      wordEl.userWord = { difficulty, optional: { wrong: 0, right: 0 } };
      return { ...wordElem };
    }
    wordEl.userWord = { ...wordEl.userWord, difficulty };
    return { ...wordElem };
  };

  const setHardDifficulty = (wordId: string) => {
    const sortedPaginationWordset = paginatedWordSet.map(
      (wordEl) => {
        if (wordEl._id === wordId) {
          return assignWordsetProperty(wordEl, HARD);
        }
        return wordEl;
      },
    );
    useFetchWithCondition(wordId, HARD, userWord);
    dispatch(changeStateWord(sortedPaginationWordset));
  };

  const deleteWord = (wordId: string, currPage: number) => {
    const sortedPaginationWordset = paginatedWordSet.filter((wordEl) => wordEl._id !== wordId);
    useFetchWithCondition(wordId, DELETED, userWord);
    if (pagesWord.length === 1) {
      updatePageButtons(currPage);
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
            onClick={() => deleteWord(_id, page)}
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default Word;
