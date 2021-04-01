import { combineReducers } from 'redux';
import { vocabularyReducer } from './vocabularyReducer';
import { OwnGameReducer } from '../Components/OwnGame/OwnGameCard/OwnGameCardSlice';
import { textbookReducer } from './textbookReducer';
import { leoSprintReducer } from './leoSprintReducer';

export const rootReducer = combineReducers({
  OwnGame: OwnGameReducer,
  leosprintState: leoSprintReducer,
  textbookState: textbookReducer,
  vocabularyState: vocabularyReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
