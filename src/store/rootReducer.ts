import { combineReducers } from 'redux';
import { leoSprintReducer } from './leoSprintReducer';

export const rootReducer = combineReducers({
  leosprintWordset: leoSprintReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
