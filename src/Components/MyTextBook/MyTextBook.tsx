import React from 'react';
import GamesSection from '../HomePage/GamesSection/GamesSection';
import MyDictionary from './MyDictionary';
import MyGroupMenu from './MyGroupMenu';
import MyPageMenu from './MyPageMenu';
import SectionMenu from './SectionMenu';

const MyTextBook: React.FC = () => (
  <div>
    <SectionMenu />
    <MyGroupMenu />
    <MyPageMenu />
    <MyDictionary />
    <GamesSection />
  </div>
);

export default MyTextBook;
