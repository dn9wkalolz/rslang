import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { changePage } from '../../store/textbookActions';

const PageSwitcher: React.FC = () => {
  const [page, group] = useSelector(
    (state: RootState) => [state.textbookState.page, state.textbookState.group],
  );
  const dispatch = useDispatch();
  const switchPage = (e: React.MouseEvent) => {
    const { name } = e.target as HTMLButtonElement;
    const payload = name === 'decrement' ? -1 : 1;
    dispatch(changePage(payload));
  };

  return (
    <div className="textbook__page-switcher">
      <button
        name="decrement"
        type="button"
        onClick={switchPage}
        disabled={page === 0}
      >
        Предыдущая страница
      </button>
      <div className="textbook__status">
        <h1>{`Группа слов №${group + 1}`}</h1>
        <h2>{`Страница №${page + 1}`}</h2>
      </div>
      <button
        name="increment"
        type="button"
        onClick={switchPage}
        disabled={page === 29}
      >
        Следующая страница
      </button>
    </div>
  );
};

export default PageSwitcher;
