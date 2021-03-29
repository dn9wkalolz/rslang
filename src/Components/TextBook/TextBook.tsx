import React from 'react';

import Dictionary from './Dictionary';
import GroupMenu from './GroupMenu';
import PageSwitcher from './PageSwitcher';

const TextBook: React.FC = () => (
  <div>
    <GroupMenu />
    <Dictionary />
    <PageSwitcher />
  </div>
);

export default TextBook;
