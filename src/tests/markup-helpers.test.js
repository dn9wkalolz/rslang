import createMarkup from '../helpers/markup-helper';

test('get markup with random string', () => {
  expect(createMarkup('mystring')).toEqual({ __html: 'mystring' });
});
