import React from 'react';
import GamesSection from '../HomePage/GamesSection/GamesSection';
import MyDictionary from './MyDictionary';
import MyTextbookGroupMenu from './MyTextBookGroupMenu';

const MyTextBook: React.FC = () => (
  <div>
    <MyTextbookGroupMenu />
    <MyDictionary />
    <GamesSection />
  </div>
);

export default MyTextBook;
