import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DIFFICULTY } from '../../data/content';
import { useFetchWithCondition } from '../../data/requestMethods';
import {
  incrementScore, rightHandler, selectLeosprintGame, setLeosprintPage, wrongHandler,
} from '../../store/leoSprintActions';
import { selectTextbookState, setPagesWord } from '../../store/textbookActions';

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
  const dispatch = useDispatch();

  const getRandomIndex = (): number => Math.floor(Math.random() * pagesWord.length);
  const getRandomTranslate = (): string => pagesWord[getRandomIndex()].wordTranslate;

  const {
    image, word, wordTranslate, _id, userWord,
  } = pagesWord[getRandomIndex()];
  const randomTranslate = getRandomTranslate();
  const isWordsMatch = wordTranslate === randomTranslate;

  useEffect(() => {
    const filteredPagesWord = paginatedWordSet.filter((wordEl) => wordEl.page === page);
    dispatch(setPagesWord(filteredPagesWord));
  }, [page]);

  const answerHandler = ({ e, condition, id }: IClickHandler): void => {
    const { name } = e.target as HTMLButtonElement;
    const answer = pagesWord.filter((wordEl) => wordEl._id === id);
    const nameToBoolean = name === 'right';
    if (nameToBoolean === condition) {
      dispatch(incrementScore());
      dispatch(rightHandler(answer));
      useFetchWithCondition(id, LEARNED, userWord, { wrong: 0, right: 1 });
      return;
    }
    dispatch(wrongHandler(answer));
    useFetchWithCondition(id, LEARNED, userWord, { wrong: 1, right: 0 });
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
    <div className="leosprint__language-quest">
      <div><img width="200" height="200" src={`https://rslang-61.herokuapp.com/${image}`} alt={word} /></div>
      <div className="leosprint__words">
        <span className="leosprint__language-quest__en">{word}</span>
        <span className="leosprint__language-quest__ru">{randomTranslate}</span>
      </div>
      <div className="leosprint__buttons">
        <button
          name="wrong"
          type="button"
          className="leosprint__buttons__wrong"
          onClick={(e) => clickHandler({ e, id: _id, condition: isWordsMatch })}
        >
          неверно
        </button>
        <button
          name="right"
          type="button"
          className="leosprint__buttons__right"
          onClick={(e) => clickHandler({ e, id: _id, condition: isWordsMatch })}
        >
          верно
        </button>
      </div>
    </div>
  );
};

export default LanguageQuest;
