import React from 'react';
import { useSelector } from 'react-redux';
import { selectLeosprintGame } from '../../store/leoSprintActions';
import { leoSprintContent } from '../../data/content';

const TotalScore: React.FC = () => {
  const { score } = useSelector(selectLeosprintGame);
  const { result } = leoSprintContent;

  return (
    <div className="leosprint__score">
      <img src={result.img} alt={result.imgAlt} />
      {score}
    </div>
  );
};

export default TotalScore;
