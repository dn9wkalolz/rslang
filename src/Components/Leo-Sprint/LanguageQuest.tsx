import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  incrementScore, rightHandler, selectLeosprintGame, setLeosprintPage, wrongHandler,
} from '../../store/leoSprintActions';
import { selectTextbookState, setPagesWord } from '../../store/textbookActions';
import { ITextbookState } from '../../store/textbookReducer';

interface IClickHandler {
  e: React.MouseEvent
  _id: string
  isWordsMatch: boolean
}

const LanguageQuest: React.FC = () => {
  const { page } = useSelector(selectLeosprintGame);
  const {
    pagesWord, paginatedWordSet, pagesButtons,
  }: ITextbookState = useSelector(selectTextbookState);
  const dispatch = useDispatch();

  useEffect(() => {
    const filteredPagesWord = paginatedWordSet.filter((word) => word.page === page);
    dispatch(setPagesWord(filteredPagesWord));
  }, [page]);

  const answerHandler = ({ e, isWordsMatch, _id }: IClickHandler): void => {
    const { name } = e.target as HTMLButtonElement;
    const answer = pagesWord.filter((word) => word._id === _id);
    const nameToBoolean = name === 'right';
    if (nameToBoolean === isWordsMatch) {
      dispatch(incrementScore());
      dispatch(rightHandler(answer));
      return;
    }
    dispatch(wrongHandler(answer));
  };

  const getRandomIndex = (): number => Math.floor(Math.random() * pagesWord.length);

  const getRandomTranslate = (): string => {
    const { wordTranslate } = pagesWord[getRandomIndex()];
    return wordTranslate;
  };

  const clickHandler = ({ e, _id, isWordsMatch }: IClickHandler): void => {
    answerHandler({ e, isWordsMatch, _id });
    if (pagesWord.length === 1) {
      const pagePrediction = page + 1;
      const changingPage = pagePrediction > pagesButtons.length - 1 ? 0 : pagePrediction;
      dispatch(setLeosprintPage(changingPage));
      return;
    }
    const filteredPagesWord = pagesWord.filter((word) => word._id !== _id);
    dispatch(setPagesWord(filteredPagesWord));
  };

  const {
    image, word, wordTranslate, _id,
  } = pagesWord[getRandomIndex()];
  const randomTranslate = getRandomTranslate();
  const isWordsMatch = wordTranslate === randomTranslate;

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
          onClick={(e) => clickHandler({ e, _id, isWordsMatch })}
        >
          неверно
        </button>
        <button
          name="right"
          type="button"
          className="leosprint__buttons__right"
          onClick={(e) => clickHandler({ e, _id, isWordsMatch })}
        >
          верно
        </button>
      </div>
    </div>
  );
};

export default LanguageQuest;

// const createUser = async (user: any) => {
//   const rawResponse = await fetch('https://rslang-61.herokuapp.com/users', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(user),
//   });
//   const content = await rawResponse.json();

//   console.log(content);
// };
// createUser({ email: 'test@user.com', password: 'qwertyuiop' });

// const getUserWord = async () => {
//   const rawResponse = await fetch(`https://rslang-61.herokuapp.com/users/${sessionStorage.getItem('userId')}/words`, {
//     method: 'GET',
//     withCredentials: true,
//     headers: {
//       Authorization: `Bearer ${sessionStorage.getItem('token')}`,
//       Accept: 'application/json',
//     },
//   });
//   const content = await rawResponse.json();
//   console.log(content);
// };
// getUserWord();

// const loginUser = async (user: any) => {
//   const rawResponse = await fetch('https://rslang-61.herokuapp.com/signin', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(user),
//   });
//   const content = await rawResponse.json();
//   sessionStorage.setItem('token', content.token);
//   sessionStorage.setItem('userId', content.userId);
// };
// loginUser({ email: 'test@user.com', password: 'qwertyuiop' });
