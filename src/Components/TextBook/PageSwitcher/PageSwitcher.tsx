import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLeosprintPage } from '../../../store/leoSprintActions';
import { changePage, selectTextbookState } from '../../../store/textbookActions';
import { textBookContent } from '../../../data/content';
import './PageSwitcher.scss';

const PageSwitcher: React.FC = () => {
  const { page, group, pagesButtons } = useSelector(selectTextbookState);
  const { arrowNext, arrowPrevious } = textBookContent;
  const dispatch = useDispatch();
  const switchPage = (e: React.MouseEvent) => {
    const { name } = e.target as HTMLButtonElement;
    const payload = name === 'decrement' ? -1 : 1;
    dispatch(changePage(payload));
    dispatch(setLeosprintPage(page + payload));
  };

  return (
    <div className="textbook__page-switcher">
      <button
        name="decrement"
        type="button"
        onClick={switchPage}
        disabled={page === pagesButtons[0]}
      >
        <img src={arrowPrevious.img} alt={arrowPrevious.imgAlt} />
      </button>
      <div className="textbook__page-switcher--status">
        <h2 className="textbook__page-switcher--group">{`Группа слов №${group + 1}`}</h2>
        <h2 className="textbook__page-switcher--page">{`Страница №${page + 1}`}</h2>
      </div>
      <button
        name="increment"
        type="button"
        onClick={switchPage}
        disabled={page === pagesButtons[pagesButtons.length - 1]}
      >
        <img src={arrowNext.img} alt={arrowNext.imgAlt} />
      </button>
    </div>
  );
};

export default PageSwitcher;
