import React from 'react';
import LanguageQuest from './LanguageQuest';
import Timer from './Timer';
import TotalScore from './TotalScore';

const GameStatistic: React.FC = () => (
  <div className="own-game__card">
    <div className="leosprint__static">
      <TotalScore />
      <Timer />
    </div>
    <LanguageQuest />
  </div>
);

export default GameStatistic;
