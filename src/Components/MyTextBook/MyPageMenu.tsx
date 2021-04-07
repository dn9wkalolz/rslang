import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectVocabularyState, setVocabularyPage } from '../../store/vocabularyActions';

const MyPageMenu:React.FC = () => {
  const dispatch = useDispatch();
  const { page, pagesButtons } = useSelector(selectVocabularyState);
  const pagesButtonsArr = Array.from({ length: pagesButtons }, (el, idx) => idx + 1);
  const buttonHandler = (currPage: number) => {
    dispatch(setVocabularyPage(currPage));
  };

  return (
    <ul className="textbook__pages">
      {pagesButtonsArr.map(
        (group, idx) => (
          <li key={group}>
            <button
              type="button"
              className={page === idx ? 'textbook__button button_active' : 'textbook__button'}
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
