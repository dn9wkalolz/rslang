import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ownGameContent } from '../../data/content';
import { clearGame, selectLeosprintGame } from '../../store/leoSprintActions';
import { ILeosprintState } from '../../store/leoSprintReducer';
import Result from '../common/Result/Result';

const EndWindow: React.FC = () => {
  const {
    right: correct,
    wrong: incorrect,
    learned,
    tolearn,
    results,
    restart,
  } = ownGameContent;
  const { right, wrong }: ILeosprintState = useSelector(selectLeosprintGame);
  const dispatch = useDispatch();

  const onStart = () => {
    dispatch(clearGame());
  };

  return (
    <div className="own-game__results">
      <div className="own-game__results--wrapper">
        <h2 className="own-game__results--title">{results}</h2>
        <div className="own-game__results--lists">
          <div className="own-game__results--list">
            <h3 className="own-game__results--subtitle">
              <img src={correct.img} alt={correct.imgAlt} />
              {learned}
              <span>{right.length}</span>
            </h3>
            <Result words={right} />
          </div>
          <div className="own-game__results--list">
            <h3 className="own-game__results--subtitle">
              <img src={incorrect.img} alt={incorrect.imgAlt} />
              {tolearn}
              <span>{wrong.length}</span>
            </h3>
            <Result words={wrong} />
          </div>
        </div>
        <button type="button" className="own-game__results--restart" onClick={onStart}>{restart}</button>
      </div>
    </div>
  );
};

export default EndWindow;
