import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DIFFICULTY } from '../../data/content';
import { setLeosprintPage } from '../../store/leoSprintActions';
import { selectTextbookState, setPage } from '../../store/textbookActions';

const PageMenu:React.FC = () => {
  const { LEARNED } = DIFFICULTY;
  const {
    page, pagesButtons, pagesWord, group,
  } = useSelector(selectTextbookState);
  const [statistic, setStatistic] = useState<number[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const learned = pagesWord.filter((word) => word.userWord?.difficulty === LEARNED);
    const sortedRight = pagesWord.filter((word) => word.userWord !== undefined);
    const right = sortedRight.reduce((sum, word) => sum + word.userWord?.optional.right, 0);
    const wrong = sortedRight.reduce((sum, word) => sum + word.userWord?.optional.wrong, 0);
    setStatistic([learned.length, right, wrong]);
  }, [page, group, pagesWord]);

  const buttonHandler = (currPage: number) => {
    dispatch(setPage(currPage));
    dispatch(setLeosprintPage(currPage));
  };

  return (
    <div>
      <ul className="textbook__pages">
        {pagesButtons.map(
          (currPage) => (
            <li key={currPage}>
              <button
                type="button"
                className={page === currPage ? 'textbook__button button_active' : 'textbook__button'}
                onClick={() => buttonHandler(currPage)}
              >
                {currPage}
              </button>
            </li>
          ),
        )}
      </ul>
      <div>
        {`Изучено слов на странице ${page}: ${statistic[0]} 
          Правильных ответов: ${statistic[1]} 
          Ошибок: ${statistic[2]}`}
      </div>
    </div>
  );
};

export default PageMenu;
