import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTextbookState, setGroup } from '../../../store/textbookActions';
import { DIFFICULTY, textBookContent } from '../../../data/content';
import './GroupMenu.scss';

const GroupMenu: React.FC = () => {
  const { LEARNED } = DIFFICULTY;
  const { group, paginatedWordSet } = useSelector(selectTextbookState);
  const [statistic, setStatistic] = useState<number[]>([]);

  useEffect(() => {
    const learned = paginatedWordSet.filter((word) => word.userWord?.difficulty === LEARNED);
    const sortedRight = paginatedWordSet.filter((word) => word.userWord !== undefined);
    const right = sortedRight.reduce((sum, word) => sum + word.userWord.optional.right, 0);
    const wrong = sortedRight.reduce((sum, word) => sum + word.userWord.optional.wrong, 0);
    setStatistic([learned.length, right, wrong]);
  }, [group, paginatedWordSet]);

  const { groups, textbookTitle } = textBookContent;
  const dispatch = useDispatch();
  const buttonHandler = (currGroup: number) => {
    dispatch(setGroup(currGroup));
  };

  return (
    <div className="textbook__header">
      <h1 className="textbook__title">{textbookTitle}</h1>
      <ul className="textbook__groups">
        {groups.map(
          (currGroup, idx) => (
            <li key={currGroup} className="textbook__groups-section">
              <button
                type="button"
                className={`textbook__groups--button ${group === idx ? 'active' : ''}`}
                onClick={() => buttonHandler(idx)}
              >
                {currGroup}
              </button>
            </li>
          ),
        )}
      </ul>
      <div className="textbook__statistics">
        <div className="textbook__statistics--item">
          {`Изучено слов в разделе ${group + 1}:`}
          <span>{statistic[0]}</span>
        </div>
        <div className="textbook__statistics--item">
          Правильных ответов:
          <span>{statistic[1]}</span>
        </div>
        <div className="textbook__statistics--item">
          Ошибок:
          <span>{statistic[2]}</span>
        </div>
      </div>
    </div>
  );
};

export default GroupMenu;
