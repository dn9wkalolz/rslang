import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import RegistrationSection from '../Components/HomePage/RegistrationSection/RegistrationSection';
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
    render(<RegistrationSection />, container);
  });
  expect(container.querySelector('.homepage__registration-title').textContent).toBe(homepageContent.registration.title);
});
