import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSection } from '../../../store/vocabularyActions';
import { textBookContent } from '../../../data/content';
import { RootState } from '../../../store/rootReducer';
import './SectionMenu.scss';

const SectionMenu: React.FC = () => {
  const currSection = useSelector((state: RootState) => state.vocabularyState.section);
  const { sections, dictionaryTitle } = textBookContent;
  const dispatch = useDispatch();
  const buttonHandler = (section: string) => {
    dispatch(setSection(section));
  };
  return (
    <div className="textbook__header">
      <h1 className="textbook__title">{dictionaryTitle}</h1>
      <ul className="textbook__sections">
        {sections.map(
          (section) => (
            <li className={`textbook__sections--item ${currSection === section.category ? 'active' : ''}`} key={section.id}>
              <button
                type="button"
                onClick={() => buttonHandler(section.category)}
              >
                {section.name}
              </button>
            </li>
          ),
        )}
      </ul>
    </div>
  );
};

export default SectionMenu;
