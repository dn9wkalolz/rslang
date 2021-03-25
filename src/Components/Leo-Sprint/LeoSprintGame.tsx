import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import EndWindow from './EndWindow';
import GameStatistic from './GameStatic';
import LanguageQuest from './LanguageQuest';
import './leosprint.scss';
import StartWindow from './StartWindow';

const LeoSprintGame: React.FC = () => {
  const [login, start, end] = useSelector(
    (state: RootState): boolean[] => {
      const { isLogin, isStart, isEnd } = state.leosprintState;
      return [isLogin, isStart, isEnd];
    },
  );
  if (!login && !start) {
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
