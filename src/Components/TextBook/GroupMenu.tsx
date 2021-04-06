import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTextbookState, setGroup } from '../../store/textbookActions';
import { DIFFICULTY, textBookContent } from '../../data/content';

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

  const { groups } = textBookContent;
  const dispatch = useDispatch();
  const buttonHandler = (currGroup: number) => {
    dispatch(setGroup(currGroup));
  };

  return (
    <div>
      <ul className="textbook__groups">
        {groups.map(
          (currGroup, idx) => (
            <li key={currGroup}>
              <button
                type="button"
                className={group === idx ? 'textbook__button button_active' : 'textbook__button'}
                onClick={() => buttonHandler(idx)}
              >
                {currGroup}
              </button>
            </li>
          ),
        )}
      </ul>
      <div>
        {`Изучено слов в разделе ${group + 1}: ${statistic[0]} 
          Правильных ответов: ${statistic[1]} 
          Ошибок: ${statistic[2]}`}
      </div>
    </div>
  );
};

export default GroupMenu;
