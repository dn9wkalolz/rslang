import { authAPI } from '../api/auth-api';
import { InferActionsTypes, BaseThunkType } from './rootReducer';
import { profileAPI } from '../api/profile-api';

const initialState = {
  id: null as null | string,
  userId: null as null | string,
  message: null as null | string,
  token: null as null | string,
  refreshToken: null as null | string,
  email: null as null | string,
  name: null as null | string,
  userPhoto: null as null | string,
  password: null as null | string,
  isRegister: false,
  isAuth: false,
  isFetching: false,
  isFetchingPhoto: false,
  wordsPerDay: null as null | number,
  errorMessage: null as null | string,
  optional: null as null | Object,
};

export const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'RSLANG/AUTH/SET-REGISTER-USER-DATA':
    case 'RSLANG/AUTH/SET-LOGIN-USER-DATA':
    case 'RSLANG/AUTH/SET-ERROR-MESSAGE':
    case 'RSLANG/AUTH/TOGGLE_IS_FETCHING':
    case 'RSLANG/AUTH/TOGGLE_IS_FETCHING-PHOTO':
    case 'RSLANG/AUTH/SET-LOGOUT-USER-DATA':
    case 'RSLANG/AUTH/SET-AUTH-USER-DATA':
    case 'RSLANG/AUTH/SET-USER-SETTINGS-DATA':
    case 'RSLANG/AUTH/SET-USER-PHOTO':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const actions = {
  setLoginUserData: (
    message: string | null,
    name: string | null,
    refreshToken: string | null,
    token: string | null,
    userId: string | null,
    isAuth: boolean,
  ) => ({
    type: 'RSLANG/AUTH/SET-LOGIN-USER-DATA',
    payload: {
      message,
      name,
      refreshToken,
      token,
      userId,
      isAuth,
    },
  } as const),
  setLogoutUserData: (
    message: string | null,
    name: string | null,
    refreshToken: string | null,
    token: string | null,
    userId: string | null,
    isAuth: boolean,
  ) => ({
    type: 'RSLANG/AUTH/SET-LOGOUT-USER-DATA',
    payload: {
      message,
      name,
      refreshToken,
      token,
      userId,
      isAuth,
    },
  } as const),
  setRegisterUserData: (
    id: string | null,
    name: string | null,
    email: string | null,
    isRegister: boolean,
  ) => ({
    type: 'RSLANG/AUTH/SET-REGISTER-USER-DATA',
    payload: {
      id,
      name,
      email,
      isRegister,
    },
  } as const),
  setAuthUserData: (
    name: string,
    email: string,
    userId: string,
    isAuth: boolean,
  ) => ({
    type: 'RSLANG/AUTH/SET-AUTH-USER-DATA',
    payload: {
      name,
      email,
      userId,
      isAuth,
    },
  } as const),
  setUserSettingsData: (
    wordsPerDay: number,
    optional: Object,
  ) => ({
    type: 'RSLANG/AUTH/SET-USER-SETTINGS-DATA',
    payload: {
      wordsPerDay,
      optional,
    },
  } as const),
  setErrorMessage: (
    errorMessage: string,
  ) => ({
    type: 'RSLANG/AUTH/SET-ERROR-MESSAGE',
    payload: {
      errorMessage,
    },
  } as const),
  toggleIsFetching: (isFetching: boolean) => ({
    type: 'RSLANG/AUTH/TOGGLE_IS_FETCHING',
    payload: {
      isFetching,
    },
  } as const),
  toggleIsFetchingPhoto: (isFetchingPhoto: boolean) => ({
    type: 'RSLANG/AUTH/TOGGLE_IS_FETCHING-PHOTO',
    payload: {
      isFetchingPhoto,
    },
  } as const),
  setUserPhotoSuccess: (userPhoto: string) => ({
    type: 'RSLANG/AUTH/SET-USER-PHOTO',
    payload: {
      userPhoto,
    },
  } as const),
};

export const getUserSettingsData = (userId: string | null): ThunkType => async (dispatch) => {
  dispatch(actions.toggleIsFetching(true));
  const response = await authAPI.getUserSettings(userId);
  dispatch(actions.toggleIsFetching(false));

  const { wordsPerDay, optional } = response;
  dispatch(actions.setUserPhotoSuccess(optional.userPhoto));
  dispatch(actions.setUserSettingsData(wordsPerDay, optional));
};

export const getAuthUserData = (userId: string | null): ThunkType => async (dispatch) => {
  dispatch(actions.toggleIsFetching(true));
  const response = await authAPI.me(userId);
  dispatch(actions.toggleIsFetching(false));

  if (typeof response === 'object') {
    const { name, email, id } = response;
    dispatch(actions.setAuthUserData(name, email, id, true));
  }
};

export const getNewToken = (userID: string | null): ThunkType => async (dispatch) => {
  dispatch(actions.toggleIsFetching(true));
  const response = await authAPI.getNewToken(userID);
  dispatch(actions.toggleIsFetching(false));

  if (typeof response === 'object') {
    const { token, refreshToken, userId } = response;
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('userId', userId);
    sessionStorage.setItem('refreshToken', refreshToken);
  }
};

export const login = (email: string, password: string): ThunkType => async (dispatch) => {
  dispatch(actions.toggleIsFetching(true));
  const response = await authAPI.login(email, password);
  dispatch(actions.toggleIsFetching(false));

  if (typeof response === 'object') {
    const {
      message,
      name,
      refreshToken,
      token,
      userId,
    } = response;

    sessionStorage.setItem('token', token);
    sessionStorage.setItem('userId', userId);
    dispatch(getAuthUserData(userId));
    dispatch(actions.setLoginUserData(message, name, refreshToken, token, userId, true));
    dispatch(getUserSettingsData(userId));
  }
};

export const createUser = (
  email: string | null,
  password: string | null,
  name: string | null,
): ThunkType => async (dispatch) => {
  dispatch(actions.toggleIsFetching(true));
  const response = await authAPI.createUser(email, password, name);
  dispatch(actions.toggleIsFetching(false));

  if (typeof response === 'string') {
    dispatch(actions.setErrorMessage(response));
  }
  if (typeof response === 'object') {
    const { id } = response;
    dispatch(actions.setRegisterUserData(id, name, email, true));
  }
};

export const updateUser = (
  userId: string | null,
  name: string | null,
  email: string | null,
  password: string | null,
): ThunkType => async (dispatch) => {
  dispatch(actions.toggleIsFetching(true));
  const response = await authAPI.updateUser(userId, name, email, password);
  dispatch(actions.toggleIsFetching(false));

  if (typeof response === 'string') {
    dispatch(actions.setErrorMessage(response));
  }
  if (typeof response === 'object') {
    dispatch(getAuthUserData(userId));
  }
};

export const setUserPhoto = (
  file: File,
  isTranslated: boolean,
  isButtonsShowed: boolean,
  userId: string | null,
): ThunkType => async (dispatch) => {
  dispatch(actions.toggleIsFetchingPhoto(true));
  const photoResponse = await profileAPI.setUserPhoto(file);
  const settingsResponse = await authAPI.updateUserSettings(
    userId,
    isTranslated,
    isButtonsShowed,
    photoResponse.data.secure_url,
  );
  dispatch(actions.toggleIsFetchingPhoto(false));

  if (photoResponse.statusText === 'OK' && typeof settingsResponse === 'object') {
    // dispatch(actions.setUserPhotoSuccess(photoResponse.data.secure_url));
    dispatch(getUserSettingsData(userId));
  }
};

export const logout = (): ThunkType => async (dispatch) => {
  sessionStorage.clear();
  dispatch(actions.setLogoutUserData(null, null, null, null, null, false));
};

type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes>;
