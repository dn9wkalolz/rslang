import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { setPage } from '../../store/textbookActions';

const PageMenu:React.FC = () => {
  const currPage = useSelector((state: RootState) => state.textbookState.page);
  const pageButtons = Array.from({ length: 30 }, (page, idx) => idx + 1);
  const dispatch = useDispatch();
  const buttonHandler = (page: number) => {
    dispatch(setPage(page));
  };

  return (
    <ul className="textbook__pages">
      {pageButtons.map(
        (group, idx) => (
          <li key={group}>
            <button
              type="button"
              className={currPage === idx ? 'textbook__button button_active' : 'textbook__button'}
              onClick={() => buttonHandler(idx)}
            >
              {group}
            </button>
          </li>
        ),
      )}
    </ul>
  );
};

export default PageMenu;
