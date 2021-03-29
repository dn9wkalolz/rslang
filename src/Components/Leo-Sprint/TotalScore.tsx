import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';

const TotalScore: React.FC = () => {
  const score = useSelector((state: RootState) => state.leosprintState.score);
  return <div>{`Score: ${score}`}</div>;
};

export default TotalScore;
