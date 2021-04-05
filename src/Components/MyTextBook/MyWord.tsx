import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { baseUrl, textBookContent } from '../../data/content';
import { useFetchWithCondition } from '../../data/requestMethods';
import { IPaginatedWordSetElem } from '../../interfaces/commonInterfaces';
import { selectVocabularyState, setVocabularyPaginatedWordSet } from '../../store/vocabularyActions';

interface IWords {
  wordElem: IPaginatedWordSetElem
}

const MyWord: React.FC<IWords> = ({ wordElem }) => {
  const dispatch = useDispatch();
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
  const { section, paginatedWordSet } = useSelector(selectVocabularyState);
  const { sections } = textBookContent;
  const hardSection = sections[1].category;
  const deletedSection = sections[2].category;
  const sound = new Audio(baseUrl + audio);

  const setHardDifficulty = (wordId: string) => {
    const sortedPaginationWordset = paginatedWordSet.filter((wordEl) => wordEl._id !== wordId);
    useFetchWithCondition(wordId, 'hard', true);
    dispatch(setVocabularyPaginatedWordSet(sortedPaginationWordset));
  };

  const deleteWord = (wordId: string) => {
    const sortedPaginationWordset = paginatedWordSet.filter((wordEl) => wordEl._id !== wordId);
    useFetchWithCondition(wordId, 'deleted', true);
    dispatch(setVocabularyPaginatedWordSet(sortedPaginationWordset));
  };

  const restoreWord = (wordId: string) => {
    const sortedPaginationWordset = paginatedWordSet.filter((wordEl) => wordEl._id !== wordId);
    useFetchWithCondition(wordId, 'restored', true);
    dispatch(setVocabularyPaginatedWordSet(sortedPaginationWordset));
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
          {section === hardSection ? null : (
            <button
              disabled={userWord?.difficulty === 'hard'}
              type="button"
              onClick={() => setHardDifficulty(_id)}
            >
              Сложно
            </button>
          )}
          {section === deletedSection ? null : (
            <button
              type="button"
              onClick={() => deleteWord(_id)}
            >
              Удалить
            </button>
          )}
          <button
            type="button"
            onClick={() => restoreWord(_id)}
          >
            Восстановить
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyWord;
