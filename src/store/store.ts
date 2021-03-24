import { createStore, combineReducers } from 'redux';
import { OwnGameDataReducer } from '../Components/OwnGame/OwnGameSlice';
import {
  OwnGameCardReducer,
  OwnGameCardIsCheckingReducer,
  OwnGameCardIsCorrectReducer,
  OwnGameCardIsIncorrectReducer,
} from '../Components/OwnGame/OwnGameCard/OwnGameCardSlice';

const store = createStore(combineReducers({
  OwnGameData: OwnGameDataReducer,
  OwnGameCardGuess: OwnGameCardReducer,
  OwnGameCardIsChecking: OwnGameCardIsCheckingReducer,
  OwnGameCardIsCorrect: OwnGameCardIsCorrectReducer,
  OwnGameCardIsIncorrect: OwnGameCardIsIncorrectReducer,
}));

export default store;
