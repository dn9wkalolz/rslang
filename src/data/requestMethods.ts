import { baseUrl } from './content';

const token = sessionStorage.getItem('token');
const userId = sessionStorage.getItem('userId');

export const useFetchWithCondition = (wordId: string, difficulty: string, condition: boolean) => {
  fetch(`${baseUrl}users/${userId}/words/${wordId}`, {
    method: condition ? 'PUT' : 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ difficulty }),
  })
    .then((response) => response.json())
    .then((result) => console.log(result));
};

// export const useFetchWithCondition2 = (wordId: string, difficulty: string, userWord: any) => {
//   if (!userWord) {
//     fetch(`${baseUrl}users/${userId}/words/${wordId}`, {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${token}`,
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ difficulty, optional: {wrong: 0, right: 0} }),
//     })
//       .then((response) => response.json())
//       .then((result) => console.log(result));
//     return;
//   }
//   fetch(`${baseUrl}users/${userId}/words/${wordId}`, {
//     method: 'PUT',
//     headers: {
//       Authorization: `Bearer ${token}`,
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ difficulty, optional: {wrong: userWord.opt, right: 0} }),
//   })
//     .then((response) => response.json())
//     .then((result) => console.log(result));
// };

export const useFetchToSetWrongAnswer = (wordId: string, optional: any) => {
  fetch(`${baseUrl}users/${userId}/words/${wordId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      optional: {
        ...optional,
        wrong: optional?.wrong !== undefined ? optional?.wrong + 1 : 1,
      },
    }),
  })
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch(() => {
      fetch(`${baseUrl}users/${userId}/words/${wordId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          optional: {
            wrong: 1,
          },
        }),
      })
        .then((response) => response.json())
        .then((result) => console.log(result));
    });
};

export const useFetchToSetRightAnswer = (wordId: string, optional: any) => {
  fetch(`${baseUrl}users/${userId}/words/${wordId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      optional: {
        ...optional,
        right: optional?.right !== undefined ? optional?.right + 1 : 1,
      },
    }),
  })
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch(() => {
      fetch(`${baseUrl}users/${userId}/words/${wordId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          optional: {
            right: 1,
          },
        }),
      })
        .then((response) => response.json())
        .then((result) => console.log(result));
    });
};
