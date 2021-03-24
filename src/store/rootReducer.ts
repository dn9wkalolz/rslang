import { combineReducers } from 'redux';
import { leoSprintReducer } from './leoSprintReducer';

export const rootReducer = combineReducers({
  leosprintState: leoSprintReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
