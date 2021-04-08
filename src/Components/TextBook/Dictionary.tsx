import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IPaginatedWordSetElem } from '../../interfaces/commonInterfaces';
import Word from './Word';
import { baseUrl, STARTWINDOWURLFILTERSTRING } from '../../data/content';
import {
  selectTextbookState,
  setPage, setPagesButtons, setPagesWord, setPaginatedWordSet,
} from '../../store/textbookActions';
import { setLeosprintPage } from '../../store/leoSprintActions';

const Dictionary: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const {
    page, group, paginatedWordSet, pagesWord,
  } = useSelector(selectTextbookState);
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    const token = sessionStorage.getItem('token');
    setIsLoaded(false);
    fetch(`${baseUrl}users/${userId}/aggregatedWords?group=${group}&wordsPerPage=600&filter=${STARTWINDOWURLFILTERSTRING}`, {
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
          const pageButtons = paginatedResults.map((word) => word.page);
          const uniquePageButtons = Array.from(new Set(pageButtons)).sort((a, b) => a - b);
          const wordSet = paginatedResults.filter((word) => word.page === page);
          dispatch(setPage(uniquePageButtons[0]));
          dispatch(setLeosprintPage(uniquePageButtons[0]));
          dispatch(setPagesButtons(uniquePageButtons));
          dispatch(setPaginatedWordSet(paginatedResults));
          dispatch(setPagesWord(wordSet));
          setIsLoaded(true);
        },
        (err) => {
          setIsLoaded(true);
          setError(err);
        },
      );
  }, [group]);

  useEffect(() => {
    const wordSet = paginatedWordSet.filter((word) => word.page === page);
    dispatch(setPagesWord(wordSet));
  }, [page, paginatedWordSet]);

  if (error) {
    return <div>{`Ошибка: ${error.message}`}</div>;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="textbook__dictionary">
      {pagesWord.map((wordElem) => (<Word key={wordElem._id} {...{ wordElem }} />))}
    </div>
  );
};

export default Dictionary;
