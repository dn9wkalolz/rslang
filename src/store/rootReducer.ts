import { combineReducers } from 'redux';
import { OwnGameReducer } from '../Components/OwnGame/OwnGameCard/OwnGameCardSlice';

export const rootReducer = combineReducers({
  OwnGame: OwnGameReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
