import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import GamesSection from '../Components/HomePage/GamesSection/GamesSection';
import { homepageContent } from '../data/content';

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.append(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('render component with constant values', () => {
  act(() => {
    render(<BrowserRouter><GamesSection /></BrowserRouter>, container);
  });
  expect(container.querySelector('.homepage__games-title').textContent).toBe(homepageContent.games.title);
});
