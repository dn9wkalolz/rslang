import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { textBookContent } from '../../data/content';
import { RootState } from '../../store/rootReducer';
import { setVocabularyGroup } from '../../store/vocabularyActions';
import '../TextBook/GroupMenu/GroupMenu.scss';

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
          <li className="textbook__groups-section" key={group}>
            <button
              type="button"
              className={`textbook__groups--button ${currGroup === idx ? 'active' : ''}`}
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
