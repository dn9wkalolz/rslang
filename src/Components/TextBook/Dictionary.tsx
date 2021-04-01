import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IPaginatedWordSetElem } from '../../interfaces/commonInterfaces';
import { RootState } from '../../store/rootReducer';
import Word from './Word';
import { baseUrl } from '../../data/content';
import { setPaginatedWordSet } from '../../store/textbookActions';

const Dictionary: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [wordSet, setWordSet] = useState<IPaginatedWordSetElem[]>([]);
  const [error, setError] = useState<any>(null);
  const [page, group, paginatedWordSet]: [number, number, IPaginatedWordSetElem[]] = useSelector(
    (state: RootState) => [
      state.textbookState.page,
      state.textbookState.group,
      state.textbookState.paginatedWordSet,
    ],
  );
  const userId = sessionStorage.getItem('userId');
  const token = sessionStorage.getItem('token');
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoaded(false);
    fetch(`${baseUrl}users/${userId}/aggregatedWords?group=${group}&wordsPerPage=600&filter={"$or":[{"userWord.difficulty":"hard"}, {"userWord.difficulty":"learned"}, {"userWord":null}]}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then(
        (result) => {
          const { paginatedResults }: { paginatedResults: IPaginatedWordSetElem[] } = result[0];
          dispatch(setPaginatedWordSet(paginatedResults));
          const pagesWord = paginatedResults.filter((word) => word.page === page);
          setWordSet(pagesWord);
          setIsLoaded(true);
        },
        (err) => {
          setIsLoaded(true);
          setError(err);
        },
      );
  }, [group]);

  useEffect(() => {
    const pagesWord = paginatedWordSet.filter((word) => word.page === page);
    setWordSet(pagesWord);
  }, [page, paginatedWordSet]);

  if (error) {
    return <div>{`Ошибка: ${error.message}`}</div>;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="textbook__dictionary">
      {wordSet.map((wordElem) => (<Word key={wordElem._id} {...{ wordElem }} />))}
    </div>
  );
};

export default Dictionary;
