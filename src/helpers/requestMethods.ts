import { getStringDate } from './commonAppMethods';
import { baseUrl, DIFFICULTY } from '../data/content';

export const useFetchWithCondition = (
  wordId: string, difficulty: string, userWord: any, increment?: any,
) => {
  const token = sessionStorage.getItem('token');
  const userId = sessionStorage.getItem('userId');
  const { HARD, LEARNED } = DIFFICULTY;
  if (!userWord) {
    fetch(`${baseUrl}users/${userId}/words/${wordId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        difficulty,
        optional: { wrong: increment?.wrong || 0, right: increment?.right || 0 },
      }),
    });
    return;
  }
  const { wrong, right } = userWord.optional;
  fetch(`${baseUrl}users/${userId}/words/${wordId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      difficulty: userWord.difficulty === HARD && difficulty === LEARNED ? HARD : difficulty,
      optional: {
        wrong: difficulty === LEARNED ? wrong + increment.wrong : wrong,
        right: difficulty === LEARNED ? right + increment.right : right,
      },
    }),
  });
};

export const fetchStatistic = (prevStatistic: Array<Array<any>>, count: number) => {
  const token = sessionStorage.getItem('token');
  const userId = sessionStorage.getItem('userId');
  let updatedStatistic;
  const date = getStringDate();
  const condition = prevStatistic.some((row) => row[0] === date);
  if (condition) {
    updatedStatistic = prevStatistic.map((row) => {
      if (row[0] === date) {
        return [row[0], row[1] + count];
      }
      return row;
    });
  } else if (!condition) {
    updatedStatistic = [...prevStatistic, [date, count]];
  }
  fetch(`${baseUrl}users/${userId}/statistics`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ optional: { stats: JSON.stringify(updatedStatistic) } }),
  });
};
