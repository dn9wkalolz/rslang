import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { incrementScore } from '../../store/actions';
import { IWordSetElem } from '../../types/leoSprintInterfaces';

interface IClickHandler {
  e: React.MouseEvent
  id?: string
  isWordsMatch: boolean
}

const LanguageQuest: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [wordSet, setWordSet] = useState<IWordSetElem[]>([]);
  const [page, setPage] = useState<number>(0);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`https://rslang-61.herokuapp.com/words?page=${page}&group=0`)
      .then((response) => response.json())
      .then(
        (result) => {
          setWordSet(result);
          setIsLoaded(true);
        },
        (err) => {
          setIsLoaded(true);
          setError(err);
        },
      );
  }, [page]);

  const scoreHandler = ({ e, isWordsMatch }: IClickHandler): void => {
    const { name } = e.target as HTMLButtonElement;
    const nameToBoolean = name === 'right';
    if (nameToBoolean === isWordsMatch) {
      dispatch(incrementScore());
    }
  };

  const getRandomIndex = (): number => Math.floor(Math.random() * wordSet.length);

  const getRandomTranslate = (): string => {
    const { wordTranslate } = wordSet[getRandomIndex()];
    return wordTranslate;
  };

  const clickHandler = ({ e, id, isWordsMatch }: IClickHandler): void => {
    scoreHandler({ e, isWordsMatch });
    if (wordSet.length === 1) {
      setIsLoaded(false);
      setPage(
        (preState) => preState + 1,
      );
      return;
    }
    setWordSet(
      (prevState) => prevState.filter((word) => word.id !== id),
    );
  };

  if (error) {
    return <div>{`Ошибка: ${error.message}`}</div>;
  }
  if (!isLoaded) {
    return <div>Loading..</div>;
  }

  const {
    image, word, wordTranslate, id,
  } = wordSet[getRandomIndex()];
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
          onClick={(e) => clickHandler({ e, id, isWordsMatch })}
        >
          неверно
        </button>
        <button
          name="right"
          type="button"
          className="leosprint__buttons__right"
          onClick={(e) => clickHandler({ e, id, isWordsMatch })}
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
