import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  ownGameContent, textBookContent, baseUrl, DIFFICULTY,
} from '../../../data/content';
import { useFetchWithCondition } from '../../../helpers/requestMethods';
import { IPaginatedWordSetElem } from '../../../interfaces/commonInterfaces';
import { selectSettingsState } from '../../../store/settingsReducer';
import {
  changePage, changeStateWord, selectTextbookState, setPagesButtons,
} from '../../../store/textbookActions';
import './Word.scss';

interface IWords {
  wordElem: IPaginatedWordSetElem
}

const Word: React.FC<IWords> = ({ wordElem }) => {
  const { HARD, DELETED } = DIFFICULTY;
  const {
    audio,
    audioExample,
    audioMeaning,
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
  const { isButtonsShowed, isTranslated } = useSelector(selectSettingsState);
  const { paginatedWordSet, pagesWord, pagesButtons } = useSelector(selectTextbookState);
  const { play } = ownGameContent;
  const { notDifficult, difficult, trash } = textBookContent;
  const dispatch = useDispatch();

  const soundArray = [audio, audioExample, audioMeaning];
  let idx = 1;
  const sound = new Audio(baseUrl + soundArray[0]);
  const soundOnEndHandler = () => {
    if (idx < soundArray.length) {
      sound.src = baseUrl + soundArray[idx];
      sound.play();
      idx += 1;
    } else {
      sound.src = baseUrl + soundArray[0];
      idx = 1;
    }
  };
  useEffect(() => {
    sound.addEventListener('ended', soundOnEndHandler);
    return () => sound.removeEventListener('ended', soundOnEndHandler);
  }, []);

  const updatePageButtons = (currPage: number) => {
    const updatedButtons = pagesButtons.filter((pageButton) => pageButton !== currPage);
    const pagePrediction = currPage + 1;
    const changingPage = pagePrediction > updatedButtons.length ? -1 : 1;
    dispatch(setPagesButtons(updatedButtons));
    dispatch(changePage(changingPage));
  };

  const assignWordsetProperty = (wordEl: IPaginatedWordSetElem, difficulty: string) => {
    if (!userWord) {
      const updatedWordElem = {
        ...wordEl,
        userWord: {
          difficulty,
          optional: { wrong: 0, right: 0 },
        },
      };
      return { ...updatedWordElem };
    }
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
        {isButtonsShowed
          ? (
            <div className="textbook__word--content__buttons">
              <button
                disabled={userWord?.difficulty === 'hard'}
                type="button"
                onClick={() => setHardDifficulty(_id)}
              >
                <img src={userWord?.difficulty === 'hard' ? difficult.img : notDifficult.img} alt={userWord?.difficulty === 'hard' ? difficult.imgAlt : notDifficult.imgAlt} />
                <div>{difficult.title}</div>
              </button>
              <button
                type="button"
                onClick={() => deleteWord(_id, page)}
              >
                <img src={trash.img} alt={trash.imgAlt} />
                <div>{trash.title}</div>
              </button>
            </div>
          )
          : null}
      </div>
    </div>
  );
};

export default Word;
