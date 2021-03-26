import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IWordSetElem } from '../../interfaces/commonInterfaces';
import { RootState } from '../../store/rootReducer';
import Page from './Page';

const Dictionary: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [wordSet, setWordSet] = useState<IWordSetElem[]>([]);
  const [error, setError] = useState<any>(null);
  const [page, group] = useSelector(
    (state: RootState) => [state.textbookState.page, state.textbookState.group],
  );
  useEffect(() => {
    setIsLoaded(false);
    fetch(`https://rslang-61.herokuapp.com/words?page=${page}&group=${group}`)
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
  }, [group, page]);

  if (error) {
    return <div>{`Ошибка: ${error.message}`}</div>;
  }
  if (!isLoaded) {
    return <div>Loading..</div>;
  }

  return (
    <div>
      <ul>
        {wordSet.map((wordElem) => (<Page key={wordElem.id} {...{ wordElem }} />))}
      </ul>
    </div>
  );
};

export default Dictionary;
