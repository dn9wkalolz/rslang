import instance from './api';

const wordsAPI = {
  requestWords(page = 0, group = 0) {
    return instance
      .get(`words?page=${page}&group=${group}`)
      .then((res) => res.data);
  },
};

export default wordsAPI;
