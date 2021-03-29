import React from 'react';
import { useDispatch } from 'react-redux';
import { changeGroup } from '../../store/textbookActions';

const GroupMenu: React.FC = () => {
  const dispatch = useDispatch();
  const groups = Array.from({ length: 6 }, (el, idx) => idx);
  const buttonHandler = (group: number) => {
    dispatch(changeGroup(group));
  };
  return (
    <ul>
      {groups.map(
        (group) => (
          <li key={group}>
            <button
              type="button"
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

export default GroupMenu;
