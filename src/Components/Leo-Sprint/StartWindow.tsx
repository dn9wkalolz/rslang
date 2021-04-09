import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  baseUrl, ownGameContent, STARTWINDOWURLFILTERSTRING, textBookContent,
} from '../../data/content';
import { IPaginatedWordSetElem } from '../../interfaces/commonInterfaces';
import { setLeosprintPage, toggleStart } from '../../store/leoSprintActions';
import { setPagesButtons, setPagesWord, setPaginatedWordSet } from '../../store/textbookActions';

const StartWindow: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const GROUPS:string[] = ownGameContent.levels;
  const dispatch = useDispatch();

  const fetchData = (group:number) => {
    const userId = sessionStorage.getItem('userId');
    const token = sessionStorage.getItem('token');
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
          const uniquePageButtons = Array.from(new Set(pageButtons));
          const pagesWord = paginatedResults.filter((word) => word.page === uniquePageButtons[0]);
          dispatch(setLeosprintPage(uniquePageButtons[0]));
          dispatch(setPagesButtons(uniquePageButtons));
          dispatch(setPaginatedWordSet(paginatedResults));
          dispatch(setPagesWord(pagesWord));
          dispatch(toggleStart());
        },
        (err) => {
          setIsLoaded(true);
          setError(err);
        },
      );
  };

  const chooseLevel = (group:number) => {
    setIsLoaded(false);
    fetchData(group);
  };

  if (error) {
    return <div>{`Ошибка: ${error.message}`}</div>;
  }
  if (!isLoaded) {
    return <div className="own-game__choose-level--loading">{ownGameContent.loading}</div>;
  }

  return (
    <div className="own-game__choose-level sprint">
      <h1 className="own-game__choose-level--title">{textBookContent.title}</h1>
      <h2 className="own-game__choose-level--subtitle">{ownGameContent.chooseLevel}</h2>
      <div className="own-game__choose-level--cards">
        {GROUPS.map((group, index) => (
          <div className="own-game__choose-level--card" key={group}>
            <button onClick={() => chooseLevel(index)} type="button">{group}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StartWindow;
