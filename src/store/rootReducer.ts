import { combineReducers } from 'redux';
import { OwnGameReducer } from '../Components/OwnGame/OwnGameCard/OwnGameCardSlice';
import { textbookReducer } from './textbookReducer';
import { leoSprintReducer } from './leoSprintReducer';
import { SavannahReducer } from '../Components/Savannah/SavannahWord/SavannahWordSlice';

export const rootReducer = combineReducers({
  OwnGame: OwnGameReducer,
  leosprintState: leoSprintReducer,
  textbookState: textbookReducer,
  Savannah: SavannahReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
