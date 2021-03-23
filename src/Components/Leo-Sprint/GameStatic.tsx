import React from 'react';
import Timer from './Timer';
import TotalScore from './TotalScore';

const GameStatistic: React.FC = () => (
  <div className="leosprint__gamestatistic">
    <TotalScore />
    <Timer />
  </div>
);

export default GameStatistic;
