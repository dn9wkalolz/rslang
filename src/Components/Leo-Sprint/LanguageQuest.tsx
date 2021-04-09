import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DIFFICULTY, leoSprintContent } from '../../data/content';
import { fetchStatistic, useFetchWithCondition } from '../../data/requestMethods';
import { IPaginatedWordSetElem } from '../../interfaces/commonInterfaces';
import {
  incrementScore, rightHandler, selectLeosprintGame, setLeosprintPage, wrongHandler,
} from '../../store/leoSprintActions';
import { selectStatisticState, setCount, setStatistic } from '../../store/statisticReducer';
import { changeStateWord, selectTextbookState, setPagesWord } from '../../store/textbookActions';

interface IClickHandler {
  e: React.MouseEvent
  id: string
  condition: boolean
}

const LanguageQuest: React.FC = () => {
  const { LEARNED } = DIFFICULTY;
  const { page } = useSelector(selectLeosprintGame);
  const {
    pagesWord, paginatedWordSet, pagesButtons,
  } = useSelector(selectTextbookState);
  const { prevStatistic, currCount } = useSelector(selectStatisticState);
  const dispatch = useDispatch();
  const { rightButton, wrongButton } = leoSprintContent;

  const getRandomIndex = (): number => Math.floor(Math.random() * pagesWord.length);
  const getRandomTranslate = (): string => pagesWord[getRandomIndex()].wordTranslate;

  const {
    image, word, wordTranslate, _id, userWord,
  } = pagesWord[getRandomIndex()];
  const randomTranslate = getRandomTranslate();
  const isWordsMatch = wordTranslate === randomTranslate;

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    const token = sessionStorage.getItem('token');
    dispatch(setStatistic(userId, token));
  }, []);

  useEffect(() => {
    if (currCount === 0) {
      return;
    }
    fetchStatistic(prevStatistic, currCount);
  }, [currCount]);

  useEffect(() => {
    const filteredPagesWord = paginatedWordSet.filter((wordEl) => wordEl.page === page);
    dispatch(setPagesWord(filteredPagesWord));
  }, [page]);

  const assignWordsetProperty = (
    wordEl: IPaginatedWordSetElem, difficulty: string, increment: any,
  ) => {
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
    const { wrong, right } = wordEl.userWord.optional;
    const updatedWordElem = {
      ...wordEl,
      userWord: {
        ...wordEl.userWord,
        optional: { wrong: wrong + increment.wrong, right: right + increment.right },
      },
    };
    return { ...updatedWordElem };
  };

  const setLearnedDifficulty = (wordId: string, increment: any) => {
    const sortedPaginationWordset = paginatedWordSet.map(
      (wordEl) => {
        if (wordEl._id === wordId) {
          return assignWordsetProperty(wordEl, LEARNED, increment);
        }
        return wordEl;
      },
    );
    dispatch(changeStateWord(sortedPaginationWordset));
  };

  const answerHandler = ({ e, condition, id }: IClickHandler): void => {
    const { name } = e.target as HTMLButtonElement;
    const answer = pagesWord.filter((wordEl) => wordEl._id === id);
    const nameToBoolean = name === 'right';
    dispatch(setCount());
    if (nameToBoolean === condition) {
      dispatch(incrementScore());
      dispatch(rightHandler(answer));
      useFetchWithCondition(id, LEARNED, userWord, { wrong: 0, right: 1 });
      setLearnedDifficulty(id, { wrong: 0, right: 1 });
      return;
    }
    dispatch(wrongHandler(answer));
    useFetchWithCondition(id, LEARNED, userWord, { wrong: 1, right: 0 });
    setLearnedDifficulty(id, { wrong: 1, right: 0 });
  };

  const clickHandler = ({ e, condition, id }: IClickHandler): void => {
    answerHandler({ e, condition, id });
    if (pagesWord.length === 1) {
      const pagePrediction = page + 1;
      const changingPage = pagePrediction > pagesButtons.length - 1 ? 0 : pagePrediction;
      dispatch(setLeosprintPage(changingPage));
      return;
    }
    const filteredPagesWord = pagesWord.filter((wordEl) => wordEl._id !== id);
    dispatch(setPagesWord(filteredPagesWord));
  };

  return (
    <div className="leosprint__quest">
      <div className="own-game__card--image">
        <img src={`https://rslang-61.herokuapp.com/${image}`} alt={word} />
      </div>
      <div className="own-game__card--content">
        <h2 className="own-game__card--word">{word}</h2>
        <h2 className="own-game__card--translation">{randomTranslate}</h2>
      </div>
      <div className="leosprint__buttons">
        <button
          name="wrong"
          type="button"
          className="leosprint__button wrong"
          onClick={(e) => clickHandler({ e, id: _id, condition: isWordsMatch })}
        >
          {wrongButton}
        </button>
        <button
          name="right"
          type="button"
          className="leosprint__button right"
          onClick={(e) => clickHandler({ e, id: _id, condition: isWordsMatch })}
        >
          {rightButton}
        </button>
      </div>
    </div>
  );
};

export default LanguageQuest;
