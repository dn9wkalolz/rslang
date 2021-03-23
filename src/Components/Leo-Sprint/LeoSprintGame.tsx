import React from 'react';
import GameStatistic from './GameStatic';
import LanguageQuest from './LanguageQuest';
import './leosprint.scss';

const LeoSprintGame: React.FC = () => (
  <div className="leosprint__container">
    <GameStatistic />
    <LanguageQuest />
  </div>
);

export default LeoSprintGame;
