import { getUserSettingsData, getAuthUserData } from './authReducer';
import { InferActionsTypes } from './rootReducer';

const initialState = {
  initialized: false,
};

export const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'RSLANG/APP/SET-INITIALIZED-SUCCESS':
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};

const actions = {
  initializedSuccess: () => ({
    type: 'RSLANG/APP/SET-INITIALIZED-SUCCESS',
  } as const),
};

export const initialize = (userId: string | null) => (dispatch: any) => {
  const promise_1 = dispatch(getAuthUserData(userId));
  const promise_2 = dispatch(getUserSettingsData(userId));
  // const promise_3 = dispatch(getNewToken(userId));
  Promise.all([promise_1, promise_2]).then(() => {
    dispatch(actions.initializedSuccess());
  });
};

type ActionsType = InferActionsTypes<typeof actions>;
type InitialStateType = typeof initialState;
