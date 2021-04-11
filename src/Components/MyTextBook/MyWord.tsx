import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  ownGameContent, baseUrl, DIFFICULTY, textBookContent,
} from '../../data/content';
import { useFetchWithCondition } from '../../data/requestMethods';
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
  const { play } = ownGameContent;
  const dispatch = useDispatch();
  const {
    sections, notDifficult, difficult, trash, restore,
  } = textBookContent;
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
      <div className="textbook__word--image">
        <img src={baseUrl + image} alt={word} />
      </div>
      <div className="textbook__word--content">
        <div className="textbook__word--content__wrapper">
          <div className="textbook__word-description">
            <span className="textbook__word-description--word">{`${word}`}</span>
            <span className="textbook__word-description--transcription">{`${transcription}`}</span>
            <span className="textbook__word-description--translation">{`${isTranslated ? wordTranslate : ''}`}</span>
            <button className="textbook__word-description--play" type="button" onClick={() => sound.play()}>
              <img src={play.img} alt={play.imgAlt} />
            </button>
          </div>
          <div className="textbook__word-meaning">
            <div className="textbook__word-meaning--meaning" dangerouslySetInnerHTML={{ __html: textMeaning }} />
            <div className="textbook__word-meaning--example" dangerouslySetInnerHTML={{ __html: textExample }} />
          </div>
          {isTranslated
            ? (
              <div className="textbook__word-translation">
                <div className="textbook__word-translation--meaning">{`${textMeaningTranslate}. `}</div>
                <div className="textbook__word-example">{`${textExampleTranslate}.`}</div>
              </div>
            )
            : null}
        </div>
        <div className="textbook__word--content__buttons">
          {section === hardSection || !isButtonsShowed ? null : (
            <button
              disabled={userWord?.difficulty === 'hard'}
              type="button"
              onClick={() => setHardDifficulty(_id)}
            >
              <img src={userWord?.difficulty === 'hard' ? difficult.img : notDifficult.img} alt={userWord?.difficulty === 'hard' ? difficult.imgAlt : notDifficult.imgAlt} />
              <div>{difficult.title}</div>
            </button>
          )}
          {section === deletedSection || !isButtonsShowed ? null : (
            <button
              type="button"
              onClick={() => deleteWord(_id)}
            >
              <img src={trash.img} alt={trash.imgAlt} />
              <div>{trash.title}</div>
            </button>
          )}
          <button
            type="button"
            onClick={() => restoreWord(_id)}
          >
            <img src={restore.img} alt={restore.imgAlt} />
            <div>{restore.title}</div>
          </button>
        </div>
        {section === learnedSection ? (
          <div className="textbook__word--content__statistics">
            <div className="textbook__word--content__statistics--item">
              Правильно угадано:
              <span>{wordElem.userWord?.optional.right || 0}</span>
            </div>
            <div className="textbook__word--content__statistics--item">
              Ошибок:
              <span>{wordElem.userWord?.optional.wrong || 0}</span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MyWord;
