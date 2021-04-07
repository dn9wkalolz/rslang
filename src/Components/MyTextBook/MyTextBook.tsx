import React from 'react';
import GamesSection from '../HomePage/GamesSection/GamesSection';
import MyDictionary from './MyDictionary';
import MyGroupMenu from './MyGroupMenu';
import MyPageMenu from './MyPageMenu';
import SectionMenu from './SectionMenu';
import VocabularyPageSwitcher from './VocabularuSwitcher';

const MyTextBook: React.FC = () => (
  <main>
    <SectionMenu />
    <MyGroupMenu />
    <MyPageMenu />
    <VocabularyPageSwitcher />
    <MyDictionary />
    <GamesSection />
  </main>
);

export default MyTextBook;
