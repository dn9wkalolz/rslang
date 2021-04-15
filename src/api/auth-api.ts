import {
  instance,
} from './api';

type MeResponseDataType = {
  name: string
  email: string
  id: string
};

type LoginResponseDataType = {
  message: string
  name: string
  refreshToken: string
  token: string
  userId: string
};
type UpdateResponseDataType = {
  userId: string
  name: string
  email: string
  password: string
};

type RegisterResponseDataType = {
  id: string
  email: string
  name: string
};

type SettingsResponseDataType = {
  wordsPerDay: number
  optional: {
    userPhoto: string
    isTranslated: boolean
    isButtonsShowed: boolean
  }
};

export const authAPI = {
  me(userId: string | null) {
    return instance.get<MeResponseDataType | string>(`users/${userId}`).then((response) => response.data);
  },
  getUserSettings(userId: string | null) {
    return instance
      .get<SettingsResponseDataType>(`users/${userId}/settings`)
      .then((response) => response.data);
  },
  updateUserSettings(
    userId: string | null,
    isTranslated: boolean,
    isButtonsShowed: boolean,
    userPhoto: string,
  ) {
    return instance
      .put(`users/${userId}/settings`, {
        optional: { isTranslated, isButtonsShowed, userPhoto },
      })
      .then((response) => response.data);
  },
  createUser(email: string | null, password: string | null, name: string | null) {
    return instance
      .post<RegisterResponseDataType | string>('users', { email, password, name })
      .then((response) => response.data);
  },
  updateUser(
    userId: string | null,
    name: string | null,
    email: string | null,
    password: string | null,
  ) {
    return instance.put<UpdateResponseDataType | string>(
      `users/${userId}`,
      {
        name,
        email,
        password,
      },
    )
      .then((response) => response.data);
  },
  login(email: string, password: string) {
    return instance
      .post<LoginResponseDataType>('signin', { email, password })
      .then((response) => {
        if (typeof response === 'object') {
          const { token, userId } = response.data;
          instance.defaults.headers.authorization = `Bearer ${token}`;
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('userId', userId);
        }
        return response.data;
      });
  },
  getNewToken(userID: string | null) {
    return instance
      .get(`/users/${userID}/tokens`)
      .then((response) => response.data);
  },
  logout() {
    return instance.delete('auth/login').then((response) => response.data);
  },
};
