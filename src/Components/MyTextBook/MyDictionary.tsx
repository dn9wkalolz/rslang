import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IPaginatedWordSetElem } from '../../interfaces/commonInterfaces';
import { RootState } from '../../store/rootReducer';
import { baseUrl } from '../../data/content';
import MyWord from './MyWord';

const MyDictionary: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [wordSet, setWordSet] = useState<IPaginatedWordSetElem[]>([]);
  const [error, setError] = useState<any>(null);
  const section = useSelector(
    (state: RootState) => state.textbookState.section,
  );
  const userId = sessionStorage.getItem('userId');
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    setIsLoaded(false);
    fetch(`${baseUrl}users/${userId}/aggregatedWords?filter={"userWord.difficulty":"${section}"}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then(
        (result) => {
          setWordSet(result[0].paginatedResults);
          setIsLoaded(true);
        },
        (err) => {
          setIsLoaded(true);
          setError(err);
        },
      );
  }, [section]);

  if (error) {
    return <div>{`Ошибка: ${error.message}`}</div>;
  }
  if (!isLoaded) {
    return <div>Loading..</div>;
  }

  return (
    <div className="textbook__dictionary">
      {wordSet.map((wordElem) => (<MyWord key={wordElem._id} {...{ wordElem }} />))}
    </div>
  );
};

export default MyDictionary;
