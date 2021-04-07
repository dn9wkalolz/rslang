import {
  instance,
  LogoutResponseType,
  APIResponseType,
} from './api';

type MeResponseDataType = {
  id: number
  email: string
  login: string
};

type LoginResponseDataType = {
  message: string
  name: string
  refreshToken: string
  token: string
  userId: string
};

type RegisterResponseDataType = {
  id: string
  email: string
  name: string
};

export const authAPI = {
  me() {
    return instance.get<APIResponseType<MeResponseDataType>>('auth/me').then((response) => response.data);
  },
  createUser(email: string, password: string, name: string) {
    return instance
      .post<RegisterResponseDataType | string>('users', { email, password, name })
      .then((response) => response.data);
  },
  login(email: string, password: string) {
    return instance
      .post<LoginResponseDataType | string>('signin', { email, password })
      .then((response) => response.data);
  },
  logout() {
    return instance.delete<LogoutResponseType>('auth/login').then((response) => response.data);
  },
};
