import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { changePage } from '../../store/textbookActions';

const PageSwitcher: React.FC = () => {
  const page = useSelector((state: RootState) => state.textbookState.page);
  const dispatch = useDispatch();
  const switchPage = () => {
    dispatch(changePage());
  };
  return (
    <div>
      <button type="button">Предыдущая страница</button>
      <span>{page}</span>
      <button type="button" onClick={switchPage}>Следующая страница</button>
    </div>
  );
};

export default PageSwitcher;
