import { getStringDate } from '../helpers/commonAppMethods';

test('get date right today date', () => {
  const d = new Date();
  const month = `${d.getMonth() + 1}`;
  const day = `${d.getDate()}`;
  const year = d.getFullYear();
  expect(getStringDate()).toBe([year, month, day].join('/'));
});
