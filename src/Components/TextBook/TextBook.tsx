import React from 'react';
import Dictionary from './Dictionary';
import GroupMenu from './GroupMenu';
import PageMenu from './PageMenu';
import PageSwitcher from './PageSwitcher';
import GameSection from '../HomePage/GamesSection/GamesSection';
import './textbook.scss';

const TextBook: React.FC = () => (
  <div>
    <GroupMenu />
    <PageMenu />
    <PageSwitcher />
    <Dictionary />
    <PageSwitcher />
    <GameSection />
  </div>
);

export default TextBook;
