import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectVocabularyState, setVocabularyPage } from '../../store/vocabularyActions';
import '../TextBook/PageMenu/PageMenu.scss';

const MyPageMenu:React.FC = () => {
  const dispatch = useDispatch();
  const { page, pagesButtons } = useSelector(selectVocabularyState);
  const pagesButtonsArr = Array.from({ length: pagesButtons }, (el, idx) => idx + 1);
  const buttonHandler = (currPage: number) => {
    dispatch(setVocabularyPage(currPage));
  };

  return (
    <div className="textbook__pages--menu">
      <ul className="textbook__pages">
        {pagesButtonsArr.map(
          (group, idx) => (
            <li className="textbook__pages--item" key={group}>
              <button
                type="button"
                className={`textbook__pages--button ${page === idx ? 'active' : ''}`}
                onClick={() => buttonHandler(idx)}
              >
                {group}
              </button>
            </li>
          ),
        )}
      </ul>
    </div>
  );
};

export default MyPageMenu;
