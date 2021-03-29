import { combineReducers } from 'redux';
import { OwnGameReducer } from '../Components/OwnGame/OwnGameCard/OwnGameCardSlice';
import { textbookReducer } from './textbookReducer';
import { leoSprintReducer } from './leoSprintReducer';

export const rootReducer = combineReducers({
  OwnGame: OwnGameReducer,
  leosprintState: leoSprintReducer,
  textbookState: textbookReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
