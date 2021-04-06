import { authAPI } from '../api/auth-api';
import { InferActionsTypes, BaseThunkType } from './rootReducer';

const initialState = {
  id: null as null | string,
  userId: null as null | string,
  message: null as null | string,
  token: null as null | string,
  refreshToken: null as null | string,
  email: null as null | string,
  name: null as null | string,
  isRegister: false,
  isAuth: false,
  isFetching: false,
  errorMessage: null as null | string,
};

export const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'RSLANG/AUTH/SET-REGISTER-USER-DATA':
    case 'RSLANG/AUTH/SET-LOGIN-USER-DATA':
    case 'RSLANG/AUTH/SET-ERROR-MESSAGE':
    case 'RSLANG/AUTH/TOGGLE_IS_FETCHING':
    case 'RSLANG/AUTH/SET-LOGOUT-USER-DATA':
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
};

export const login = (email: string, password: string): ThunkType => async (dispatch) => {
  const response = await authAPI.login(email, password);

  if (typeof response === 'object') {
    const {
      message,
      name,
      refreshToken,
      token,
      userId,
    } = response;
    dispatch(actions.setLoginUserData(message, name, refreshToken, token, userId, true));
  }
};

export const createUser = (
  email: string,
  password: string,
  name: string,
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

export const logout = (): ThunkType => async (dispatch) => {
  dispatch(actions.setLogoutUserData(null, null, null, null, null, false));
};

type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes>;
