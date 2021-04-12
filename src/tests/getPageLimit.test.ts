import { getPageLimit } from '../helpers/commonAppMethods';

test('get page limit depending on page', () => {
  expect(getPageLimit(0)).toEqual([0, 19]);
  expect(getPageLimit(1)).toEqual([20, 39]);
  expect(getPageLimit(2)).toEqual([40, 59]);
});
