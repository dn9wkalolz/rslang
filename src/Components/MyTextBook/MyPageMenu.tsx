import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { setVocabularyPage } from '../../store/vocabularyActions';

const MyPageMenu:React.FC = () => {
  const dispatch = useDispatch();
  const [currPage, pagesButtonsCount]: [number, number] = useSelector(
    (state: RootState) => [state.vocabularyState.page, state.vocabularyState.pagesButtons],
  );
  const pagesButtons = Array.from({ length: pagesButtonsCount }, (el, idx) => idx + 1);
  const buttonHandler = (page: number) => {
    dispatch(setVocabularyPage(page));
  };

  return (
    <ul className="textbook__pages">
      {pagesButtons.map(
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

export default MyPageMenu;
