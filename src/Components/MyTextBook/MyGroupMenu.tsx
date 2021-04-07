import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { textBookContent } from '../../data/content';
import { RootState } from '../../store/rootReducer';
import { setVocabularyGroup } from '../../store/vocabularyActions';

const MyGroupMenu: React.FC = () => {
  const currGroup = useSelector((state: RootState) => state.vocabularyState.group);
  const { groups } = textBookContent;
  const dispatch = useDispatch();
  const buttonHandler = (group: number) => {
    dispatch(setVocabularyGroup(group));
  };
  return (
    <ul className="textbook__groups">
      {groups.map(
        (group, idx) => (
          <li key={group}>
            <button
              type="button"
              className={currGroup === idx ? 'textbook__button button_active' : 'textbook__button'}
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

export default MyGroupMenu;
