import axios from 'axios';
import { API_URL } from '../url.constants';

export const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}

export type LogoutResponseType = {
  data: {}
  resultCode: ResultCodesEnum
  messages: Array<string>
};

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
  data: D
  resultCode: RC
  messages: Array<string>
};
