import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import HeroSection from '../Components/HomePage/HeroSection/HeroSection';
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
    render(<HeroSection />, container);
  });
  expect(container.querySelector('.homepage__hero-description').textContent).toBe(homepageContent.hero.description);
});
