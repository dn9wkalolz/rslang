import React from 'react';
import { useSelector } from 'react-redux';
import { selectLeosprintGame } from '../../store/leoSprintActions';

const TotalScore: React.FC = () => {
  const { score } = useSelector(selectLeosprintGame);
  return <div>{`Score: ${score}`}</div>;
};

export default TotalScore;
