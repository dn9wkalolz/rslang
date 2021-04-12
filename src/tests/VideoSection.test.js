import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import VideoSection from '../Components/HomePage/VideoSection/VideoSection';
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
    render(<VideoSection />, container);
  });
  expect(container.querySelector('.homepage__video-title').textContent).toBe(homepageContent.video.title);
});
