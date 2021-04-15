import React from 'react';
import Games from '../common/Games/Games';
import MyDictionary from './MyDictionary';
import MyGroupMenu from './MyGroupMenu';
import MyPageMenu from './MyPageMenu';
import SectionMenu from './SectionMenu/SectionMenu';
import VocabularyPageSwitcher from './VocabularuSwitcher';

const MyTextBook: React.FC = () => (
  <main className="textbook vocabulary">
    <SectionMenu />
    <MyGroupMenu />
    <MyPageMenu />
    <VocabularyPageSwitcher />
    <MyDictionary />
    <VocabularyPageSwitcher />
    <Games />
  </main>
);

export default MyTextBook;
