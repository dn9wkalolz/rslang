import React from 'react';
import Dictionary from './Dictionary/Dictionary';
import GroupMenu from './GroupMenu/GroupMenu';
import PageMenu from './PageMenu/PageMenu';
import PageSwitcher from './PageSwitcher/PageSwitcher';
import Games from '../common/Games/Games';

const TextBook: React.FC = () => (
  <main className="textbook">
    <GroupMenu />
    <PageMenu />
    <PageSwitcher />
    <Dictionary />
    <PageSwitcher />
    <Games />
  </main>
);

export default TextBook;
