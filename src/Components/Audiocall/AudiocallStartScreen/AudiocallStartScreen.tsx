import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLastLocation } from 'react-router-last-location';
import AudiocallGame from '../AudiocallGame';
import { baseUrl, STARTWINDOWURLFILTERSTRING, audiocallGameContent } from '../../../data/content';
import { actions } from '../../../store/audiocallReduser';
import { RootState } from '../../../store/rootReducer';
import { setPagesWord } from '../../../store/textbookActions';
import Preloader from '../../common/Preloader/Preloader';
import '../../OwnGame/OwnGameChooseLevel/OwnGameChooseLevel.scss';
import { IPaginatedWordSetElem } from '../../../interfaces/commonInterfaces';

const AudiocallStartScreen: React.FC = () => {
  const {
    rightAnswers,
    wrongAnswers,
    level,
    currentPage,
    words,
  } = useSelector((state: RootState) => state.audiocall);
  const [isLoaded, setIsLoaded] = useState<string>('');
  const lastLocation = useLastLocation();
  const LEVEL_NAMES: Array<string> = audiocallGameContent.levels;
  const dispatch = useDispatch();

  function fetchData(group: number, page: number = 0): void {
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
          const pagesWord = paginatedResults
            .filter((word) => word.page === uniquePageButtons[page]);
          dispatch(setPagesWord(pagesWord));
          setIsLoaded('loaded');
        },
      );
  }

  function chooseLevel(lev: number): void {
    dispatch(actions.setLevel(lev));
    setIsLoaded('loading');
    fetchData(lev);
  }

  const onPageChanged = (lev: number, page: number) => {
    dispatch(actions.clearGame());
    if (page < 30) {
      dispatch(actions.setCurrentPage(page));
    } else {
      dispatch(actions.setCurrentPage(0));
    }
    setIsLoaded('loading');
    fetchData(lev, page);
  };

  if (isLoaded === 'loaded' || lastLocation?.pathname === '/textbook') {
    return (
      <AudiocallGame
        words={words}
        level={level}
        onPageChanged={onPageChanged}
        currentPage={currentPage}
        rightAnswers={rightAnswers}
        wrongAnswers={wrongAnswers}
      />
    );
  } else if (isLoaded === 'loading') {
    return <Preloader />;
  } else {
    return (
      <div className="own-game__choose-level audiocall">
        <h1 className="own-game__choose-level--title">{audiocallGameContent.title}</h1>
        <h2 className="own-game__choose-level--subtitle">{audiocallGameContent.chooseLevel}</h2>
        <div className="own-game__choose-level--cards">
          {LEVEL_NAMES.map((group, index) => (
            <div className="own-game__choose-level--card" key={group}>
              <button onClick={() => chooseLevel(index)} type="button">{group}</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default AudiocallStartScreen;
