import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { baseUrl, DIFFICULTY, textBookContent } from '../../data/content';
import { useFetchWithCondition } from '../../helpers/requestMethods';
import { IPaginatedWordSetElem } from '../../interfaces/commonInterfaces';
import { selectSettingsState } from '../../store/settingsReducer';
import { selectVocabularyState, setVocabularyPaginatedWordSet } from '../../store/vocabularyActions';

interface IWords {
  wordElem: IPaginatedWordSetElem
}

const MyWord: React.FC<IWords> = ({ wordElem }) => {
  const { HARD, DELETED, RESTORED } = DIFFICULTY;
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
  const { isButtonsShowed, isTranslated } = useSelector(selectSettingsState);
  const dispatch = useDispatch();
  const { sections } = textBookContent;
  const learnedSection = sections[0].category;
  const hardSection = sections[1].category;
  const deletedSection = sections[2].category;
  const sound = new Audio(baseUrl + audio);

  const assignWordsetProperty = (wordEl: IPaginatedWordSetElem, difficulty: string) => {
    const updatedWordElem = {
      ...wordEl,
      userWord: {
        ...wordEl.userWord,
        difficulty,
      },
    };
    return { ...updatedWordElem };
  };

  const setHardDifficulty = (wordId: string) => {
    if (section === learnedSection) {
      const changedPaginationWordset = paginatedWordSet.map(
        (wordEl) => {
          if (wordEl._id === wordId) {
            return assignWordsetProperty(wordEl, HARD);
          }
          return wordEl;
        },
      );
      useFetchWithCondition(wordId, HARD, userWord);
      dispatch(setVocabularyPaginatedWordSet(changedPaginationWordset));
      return;
    }
    const sortedPaginationWordset = paginatedWordSet.filter((wordEl) => wordEl._id !== wordId);
    useFetchWithCondition(wordId, HARD, userWord);
    dispatch(setVocabularyPaginatedWordSet(sortedPaginationWordset));
  };

  const deleteWord = (wordId: string) => {
    const sortedPaginationWordset = paginatedWordSet.filter((wordEl) => wordEl._id !== wordId);
    useFetchWithCondition(wordId, DELETED, userWord);
    dispatch(setVocabularyPaginatedWordSet(sortedPaginationWordset));
  };

  const restoreWord = (wordId: string) => {
    const sortedPaginationWordset = paginatedWordSet.filter((wordEl) => wordEl._id !== wordId);
    useFetchWithCondition(wordId, RESTORED, userWord);
    dispatch(setVocabularyPaginatedWordSet(sortedPaginationWordset));
  };

  return (
    <div className="textbook__word">
      <div><img className="textbook__word-img" src={baseUrl + image} alt={word} /></div>
      <div className="textbook__word-cover">
        <div className="textbook__word-description">
          <span>{`${word} ${transcription} ${isTranslated ? wordTranslate : ''}`}</span>
          <button type="button" onClick={() => sound.play()}>Play</button>
        </div>
        <div className="textbook__word-meaning">
          <span><div dangerouslySetInnerHTML={{ __html: textMeaning }} /></span>
          <span><div dangerouslySetInnerHTML={{ __html: textExample }} /></span>
        </div>
        {isTranslated
          ? (
            <div className="textbook__translate">
              <span>{`${textMeaningTranslate}. `}</span>
              <span>{`${textExampleTranslate}.`}</span>
            </div>
          )
          : null}
        <div>
          {section === hardSection || !isButtonsShowed ? null : (
            <button
              disabled={userWord?.difficulty === 'hard'}
              type="button"
              onClick={() => setHardDifficulty(_id)}
            >
              Сложно
            </button>
          )}
          {section === deletedSection || !isButtonsShowed ? null : (
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
        {section === learnedSection ? (
          <div>
            {`Правильно угадано: ${wordElem.userWord?.optional.right || 0} 
                Ошибок: ${wordElem.userWord?.optional.wrong || 0}`}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MyWord;
