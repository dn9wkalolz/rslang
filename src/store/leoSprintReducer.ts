import { IAction } from '../types/leoSprintInterfaces';
import { INCREMENT_SCORE } from './types';

const initialState = {
  score: 0,
};

export const leoSprintReducer = (state = initialState, action:IAction) => {
  switch (action.type) {
    case INCREMENT_SCORE:
      return { ...state, score: state.score + 1 };
    // case MOVE_NEXTWORD:
    //   return { ...state, words: state.words.slice(1) };
    // case FETCH_WORDSET:
    //   return { ...state, words: action.payload };
    default: return state;
  }
};
