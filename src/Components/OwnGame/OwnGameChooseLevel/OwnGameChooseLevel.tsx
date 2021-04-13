import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLastLocation } from 'react-router-last-location';
import OwnGame from '../OwnGame';
import { baseUrl, ownGameContent, STARTWINDOWURLFILTERSTRING } from '../../../data/content';
import './OwnGameChooseLevel.scss';
import { IPaginatedWordSetElem } from '../../../interfaces/commonInterfaces';
import { setPagesWord } from '../../../store/textbookActions';
import Preloader from '../../common/Preloader/Preloader';

function OwnGameChooseLevel() {
  const [isLoaded, setIsLoaded] = useState<string>('');
  const lastLocation = useLastLocation();
  const GROUPS:Array<string> = ownGameContent.levels;
  const dispatch = useDispatch();

  function fetchData(group:number):void {
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
          dispatch(setPagesWord(pagesWord));
          setIsLoaded('loaded');
        },
      );
  }

  function chooseLevel(group:number):void {
    setIsLoaded('loading');
    fetchData(group);
  }

  if (isLoaded === 'loaded' || lastLocation?.pathname === '/textbook') {
    return <OwnGame />;
  } else if (isLoaded === 'loading') {
    return <Preloader />;
  } else {
    return (
      <div className="own-game__choose-level translator">
        <h1 className="own-game__choose-level--title">{ownGameContent.title}</h1>
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
  }
}

export default OwnGameChooseLevel;
