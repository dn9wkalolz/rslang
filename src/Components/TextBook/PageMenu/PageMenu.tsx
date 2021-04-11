import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DIFFICULTY } from '../../../data/content';
import { setLeosprintPage } from '../../../store/leoSprintActions';
import { selectTextbookState, setPage } from '../../../store/textbookActions';
import './PageMenu.scss';

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
    <div className="textbook__pages--menu">
      <ul className="textbook__pages">
        {pagesButtons.map(
          (currPage) => (
            <li className="textbook__pages--item" key={currPage}>
              <button
                type="button"
                className={`textbook__pages--button ${page === currPage ? 'active' : ''}`}
                onClick={() => buttonHandler(currPage)}
              >
                {currPage + 1}
              </button>
            </li>
          ),
        )}
      </ul>
      <div className="textbook__statistics">
        <div className="textbook__statistics--item">
          {`Изучено слов на странице ${page + 1}:`}
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

export default PageMenu;
