import { baseUrl } from './content';

export const usePutMethod = (wordId: string, difficulty: string) => {
  const token = sessionStorage.getItem('token');
  const userId = sessionStorage.getItem('userId');
  fetch(`${baseUrl}users/${userId}/words/${wordId}`, {
    method: 'PUT',
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

export const usePostMethod = (wordId: string, difficulty: string) => {
  const token = sessionStorage.getItem('token');
  const userId = sessionStorage.getItem('userId');
  fetch(`${baseUrl}users/${userId}/words/${wordId}`, {
    method: 'POST',
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
