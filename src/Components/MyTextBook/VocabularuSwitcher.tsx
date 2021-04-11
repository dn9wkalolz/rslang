import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeVocabularyPage, selectVocabularyState } from '../../store/vocabularyActions';
import { textBookContent } from '../../data/content';
import { IVocabularyState } from '../../store/vocabularyReducer';
import '../TextBook/PageSwitcher/PageSwitcher.scss';

const VocabularyPageSwitcher: React.FC = () => {
  const { page, group, pagesButtons }: IVocabularyState = useSelector(selectVocabularyState);
  const { arrowNext, arrowPrevious } = textBookContent;
  const dispatch = useDispatch();

  const switchPage = (e: React.MouseEvent) => {
    const { name } = e.target as HTMLButtonElement;
    const payload = name === 'decrement' ? -1 : 1;
    dispatch(changeVocabularyPage(payload));
  };

  return (
    <div className="textbook__page-switcher">
      <button
        name="decrement"
        type="button"
        onClick={switchPage}
        disabled={page === 0}
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
        disabled={page + 1 === pagesButtons || pagesButtons === 0}
      >
        <img src={arrowNext.img} alt={arrowNext.imgAlt} />
      </button>
    </div>
  );
};

export default VocabularyPageSwitcher;
