import { combineReducers } from 'redux';
import { textbookReducer } from './textbookReducer';
import { leoSprintReducer } from './leoSprintReducer';

export const rootReducer = combineReducers({
  leosprintState: leoSprintReducer,
  textbookState: textbookReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
