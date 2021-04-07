import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSection } from '../../store/vocabularyActions';
import { textBookContent } from '../../data/content';
import { RootState } from '../../store/rootReducer';

const SectionMenu: React.FC = () => {
  const currSection = useSelector((state: RootState) => state.vocabularyState.section);
  const { sections } = textBookContent;
  const dispatch = useDispatch();
  const buttonHandler = (section: string) => {
    dispatch(setSection(section));
  };
  return (
    <ul className="textbook__groups">
      {sections.map(
        (section) => (
          <li key={section.id}>
            <button
              type="button"
              className={currSection === section.category ? 'textbook__button button_active' : 'textbook__button'}
              onClick={() => buttonHandler(section.category)}
            >
              {section.name}
            </button>
          </li>
        ),
      )}
    </ul>
  );
};

export default SectionMenu;
