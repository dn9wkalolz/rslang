import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import TeamSection from '../Components/HomePage/TeamSection/TeamSection';
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
    render(<TeamSection />, container);
  });
  expect(container.querySelector('.homepage__team-title').textContent).toBe(homepageContent.team.title);
});
