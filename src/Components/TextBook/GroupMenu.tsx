import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGroup } from '../../store/textbookActions';
import { textBookContent } from '../../data/content';
import { RootState } from '../../store/rootReducer';

const GroupMenu: React.FC = () => {
  const currGroup = useSelector((state: RootState) => state.textbookState.group);
  const { groups } = textBookContent;
  const dispatch = useDispatch();
  const buttonHandler = (group: number) => {
    dispatch(setGroup(group));
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

export default GroupMenu;
