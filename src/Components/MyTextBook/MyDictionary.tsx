import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IPaginatedWordSetElem } from '../../interfaces/commonInterfaces';
import { baseUrl } from '../../data/content';
import MyWord from './MyWord';
import {
  selectVocabularyState,
  setVocabularyPage,
  setVocabularyPagesButtons,
  setVocabularyPagesWord,
  setVocabularyPaginatedWordSet,
} from '../../store/vocabularyActions';
import { getPageLimit } from '../../data/commonAppMethods';

const MyDictionary: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const {
    section, group, pagesWord, paginatedWordSet, page,
  } = useSelector(selectVocabularyState);
  const dispatch = useDispatch();
  const userId = sessionStorage.getItem('userId');
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    setIsLoaded(false);
    fetch(`${baseUrl}users/${userId}/aggregatedWords?group=${group}&wordsPerPage=600&filter=${section}`, {
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
          const pageButtons = Math.ceil(paginatedResults.length / 20);
          const [min, max] = getPageLimit(page);
          const wordSet = paginatedResults.filter((_, idx) => idx >= min && idx <= max);
          const calculatedPage = page > pageButtons ? 0 : page;
          dispatch(setVocabularyPage(calculatedPage));
          dispatch(setVocabularyPagesButtons(pageButtons));
          dispatch(setVocabularyPaginatedWordSet(paginatedResults));
          dispatch(setVocabularyPagesWord(wordSet));
          setIsLoaded(true);
        },
        (err) => {
          setIsLoaded(true);
          setError(err);
        },
      );
  }, [section, group]);

  useEffect(() => {
    const pageButtons = Math.ceil(paginatedWordSet.length / 20);
    const [min, max] = getPageLimit(page);
    const wordSet = paginatedWordSet.filter((_, idx) => idx >= min && idx <= max);
    dispatch(setVocabularyPagesWord(wordSet));
    dispatch(setVocabularyPagesButtons(pageButtons));
  }, [page, paginatedWordSet]);

  if (error) {
    return <div>{`Ошибка: ${error.message}`}</div>;
  }
  if (!isLoaded) {
    return <div>Loading..</div>;
  }

  return (
    <div className="textbook__dictionary">
      {pagesWord.map((wordElem) => (<MyWord key={wordElem._id} {...{ wordElem }} />))}
    </div>
  );
};

export default MyDictionary;
