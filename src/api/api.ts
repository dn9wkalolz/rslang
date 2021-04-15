import axios from 'axios';
import { API_URL, API_CLOUDINARY_URL } from '../url.constants';

const token = sessionStorage.getItem('token');

export const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  },
});

export const instanceWithClodinaryUrl = axios.create({
  baseURL: API_CLOUDINARY_URL,
});
