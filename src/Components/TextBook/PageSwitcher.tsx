import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLeosprintPage } from '../../store/leoSprintActions';
import { changePage, selectTextbookState } from '../../store/textbookActions';

const PageSwitcher: React.FC = () => {
  const { page, group, pagesButtons } = useSelector(selectTextbookState);
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
        Предыдущая страница
      </button>
      <div className="textbook__status">
        <h1>{`Группа слов №${group + 1}`}</h1>
        <h2>{`Страница №${page}`}</h2>
      </div>
      <button
        name="increment"
        type="button"
        onClick={switchPage}
        disabled={page === pagesButtons[pagesButtons.length - 1]}
      >
        Следующая страница
      </button>
    </div>
  );
};

export default PageSwitcher;
