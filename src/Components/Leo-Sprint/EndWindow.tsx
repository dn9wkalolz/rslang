import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ownGameContent } from '../../data/content';
import { clearGame, selectLeosprintGame } from '../../store/leoSprintActions';
import { ILeosprintState } from '../../store/leoSprintReducer';
import Answers from './Answers';

const EndWindow: React.FC = () => {
  const { right, wrong }: ILeosprintState = useSelector(selectLeosprintGame);
  const dispatch = useDispatch();
  const onStart = () => {
    dispatch(clearGame());
  };
  return (
    <div className="own-game__results">
      <div className="own-game__results--wrapper">
        <h2 className="own-game__results--title">{ownGameContent.results}</h2>
        <div className="own-game__results--lists">
          <div className="own-game__results--list">
            <h3 className="own-game__results--subtitle">{ownGameContent.learned}</h3>
            <Answers words={right} />
          </div>
          <div className="own-game__results--list">
            <h3 className="own-game__results--subtitle">{ownGameContent.tolearn}</h3>
            <Answers words={wrong} />
          </div>
        </div>
        <button type="button" className="own-game__results--restart" onClick={onStart}>Сыграть еще раз</button>
      </div>
    </div>
  );
};

export default EndWindow;
