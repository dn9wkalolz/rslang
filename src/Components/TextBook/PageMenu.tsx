import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLeosprintPage } from '../../store/leoSprintActions';
import { selectTextbookState, setPage } from '../../store/textbookActions';

const PageMenu:React.FC = () => {
  const { page, pagesButtons } = useSelector(selectTextbookState);
  const dispatch = useDispatch();
  const buttonHandler = (currPage: number) => {
    dispatch(setPage(currPage));
    dispatch(setLeosprintPage(currPage));
  };

  return (
    <ul className="textbook__pages">
      {pagesButtons.map(
        (group) => (
          <li key={group}>
            <button
              type="button"
              className={page === group ? 'textbook__button button_active' : 'textbook__button'}
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
