import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { setPage } from '../../store/textbookActions';

const PageMenu:React.FC = () => {
  const [currPage, pagesButtons]: [number, number[]] = useSelector(
    (state: RootState) => [state.textbookState.page, state.textbookState.pagesButtons],
  );
  const dispatch = useDispatch();
  const buttonHandler = (page: number) => {
    dispatch(setPage(page));
  };

  return (
    <ul className="textbook__pages">
      {pagesButtons.map(
        (group) => (
          <li key={group}>
            <button
              type="button"
              className={currPage === group ? 'textbook__button button_active' : 'textbook__button'}
              onClick={() => buttonHandler(group)}
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
