import { IWordSetElem } from '../types/leoSprintInterfaces';
import {
  INCREMENT_SCORE,
  TOGGLE_LOGIN,
  TOGGLE_START,
  CHANGE_DIFFICULTY,
  TOGGLE_END,
  HANDLE_RIGHT,
  HANDLE_WRONG,
} from './types';

export interface IAction {
  type: string
  payload: any
}
interface IInitialState {
  score: number
  isLogin: boolean
  isStart: boolean
  isEnd: boolean
  difficulty: string
  right: IWordSetElem[]
  wrong: IWordSetElem[]
}

const initialState: IInitialState = {
  score: 0,
  isLogin: false,
  isStart: false,
  isEnd: false,
  difficulty: '0',
  right: [],
  wrong: [],
};

export const leoSprintReducer = (state = initialState, action:IAction) => {
  switch (action.type) {
    case INCREMENT_SCORE:
      return { ...state, score: state.score + 1 };
    case TOGGLE_LOGIN:
      return { ...state, isLogin: !state.isLogin };
    case TOGGLE_START:
      return { ...state, isStart: !state.isStart };
    case TOGGLE_END:
      return { ...state, isEnd: !state.isEnd };
    case CHANGE_DIFFICULTY:
      return { ...state, difficulty: action.payload };
    case HANDLE_RIGHT:
      return { ...state, right: [...state.right, ...action.payload] };
    case HANDLE_WRONG:
      return { ...state, wrong: [...state.wrong, ...action.payload] };
    // case MOVE_NEXTWORD:
    //   return { ...state, words: state.words.slice(1) };
    // case FETCH_WORDSET:
    //   return { ...state, words: action.payload };
    default: return state;
  }
};
