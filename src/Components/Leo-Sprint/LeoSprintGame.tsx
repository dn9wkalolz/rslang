import React from 'react';
import { useSelector } from 'react-redux';
import { useLastLocation } from 'react-router-last-location';
import { RootState } from '../../store/rootReducer';
import EndWindow from './EndWindow';
import GameStatistic from './GameStatic';
import LanguageQuest from './LanguageQuest';
import './leosprint.scss';
import StartWindow from './StartWindow';

const LeoSprintGame: React.FC = () => {
  const lastLocation = useLastLocation();
  const [start, end] = useSelector(
    (state: RootState) => {
      const { isStart, isEnd } = state.leosprintState;
      return [isStart, isEnd];
    },
  );
  // if (!login && !start) {
  //   return <StartWindow />;
  // }
  if (lastLocation?.pathname !== '/textbook' && !start) {
    return <StartWindow />;
  }
  if (end) {
    return <EndWindow />;
  }
  return (
    <div className="leosprint__container">
      <GameStatistic />
      <LanguageQuest />
    </div>
  );
};

export default LeoSprintGame;
