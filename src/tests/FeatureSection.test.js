import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import FeaturesSection from '../Components/HomePage/FeaturesSection/FeaturesSection';
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
    render(<FeaturesSection />, container);
  });
  expect(container.querySelector('.homepage__features-title').textContent).toBe(homepageContent.features.title);
});
