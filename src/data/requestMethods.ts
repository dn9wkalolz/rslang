import { baseUrl, DIFFICULTY } from './content';

const token = sessionStorage.getItem('token');
const userId = sessionStorage.getItem('userId');

export const useFetchWithCondition = (
  wordId: string, difficulty: string, userWord: any, increment?: any,
) => {
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
    })
      .then((response) => response.json())
      .then((result) => console.log(result));
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
  })
    .then((response) => response.json())
    .then((result) => console.log(result));
};
