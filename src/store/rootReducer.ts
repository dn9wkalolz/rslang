import { Action, combineReducers } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { vocabularyReducer } from './vocabularyReducer';
import { OwnGameReducer } from '../Components/OwnGame/OwnGameCard/OwnGameCardSlice';
import { textbookReducer } from './textbookReducer';
import { leoSprintReducer } from './leoSprintReducer';
import { audiocallReducer } from './audiocallReduser';
import { SavannahReducer } from '../Components/Savannah/SavannahWord/SavannahWordSlice';
import { authReducer } from './authReducer';
import { settingsReducer } from './settingsReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  audiocall: audiocallReducer,
  OwnGame: OwnGameReducer,
  leosprintState: leoSprintReducer,
  textbookState: textbookReducer,
  vocabularyState: vocabularyReducer,
  Savannah: SavannahReducer,
  settings: settingsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type InferActionsTypes<T> = T extends {
  [key: string]: (...args: any[]) => infer U
} ? U : never;
export type BaseThunkType<A extends Action,
  R = Promise<void>> = ThunkAction<R, RootState, unknown, A>;
