import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeVocabularyPage, selectVocabularyState } from '../../store/vocabularyActions';
import { IVocabularyState } from '../../store/vocabularyReducer';

const VocabularyPageSwitcher: React.FC = () => {
  const { page, group, pagesButtons }: IVocabularyState = useSelector(selectVocabularyState);
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
        Предыдущая страница
      </button>
      <div className="textbook__status">
        <h1>{`Группа слов №${group}`}</h1>
        <h2>{`Страница №${page}`}</h2>
      </div>
      <button
        name="increment"
        type="button"
        onClick={switchPage}
        disabled={page + 1 === pagesButtons || pagesButtons === 0}
      >
        Следующая страница
      </button>
    </div>
  );
};

export default VocabularyPageSwitcher;
