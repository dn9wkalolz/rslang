import { instance } from './api';

const wordsAPI = {
  requestWords(level = 0, page = 0) {
    return instance
      .get(`words?page=${page}&group=${level}`)
      .then((res) => res.data);
  },
};

export default wordsAPI;
