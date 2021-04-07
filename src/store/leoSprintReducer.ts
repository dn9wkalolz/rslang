import { IPaginatedWordSetElem } from '../interfaces/commonInterfaces';
import {
  INCREMENT_SCORE,
  TOGGLE_START,
  TOGGLE_END,
  HANDLE_RIGHT,
  HANDLE_WRONG,
  CLEAR_GAME,
  SET_LEOSPRINTPAGE,
} from './types';

export interface IAction {
  type: string
  payload: any
}
export interface ILeosprintState {
  score: number
  // isLogin: boolean
  isStart: boolean
  isEnd: boolean
  // difficulty: number
  right: IPaginatedWordSetElem[]
  wrong: IPaginatedWordSetElem[]
  // isLoaded: boolean
  page: number
}

const initialState: ILeosprintState = {
  score: 0,
  // isLogin: false,
  isStart: false,
  isEnd: false,
  // difficulty: 0,
  right: [],
  wrong: [],
  // isLoaded: false,
  page: 0,
};

export const leoSprintReducer = (state = initialState, action:IAction) => {
  switch (action.type) {
    case INCREMENT_SCORE:
      return { ...state, score: state.score + 1 };
    // case TOGGLE_LOGIN:
    //   return { ...state, isLogin: !state.isLogin };
    case TOGGLE_START:
      return { ...state, isStart: !state.isStart };
    case TOGGLE_END:
      return { ...state, isEnd: !state.isEnd };
    // case CHANGE_DIFFICULTY:
    //   return { ...state, difficulty: action.payload };
    case HANDLE_RIGHT:
      return { ...state, right: [...state.right, ...action.payload] };
    case HANDLE_WRONG:
      return { ...state, wrong: [...state.wrong, ...action.payload] };
    // case SET_LOADED:
    //   return { ...state, isLoaded: !state.isLoaded };
    case CLEAR_GAME:
      return {
        ...state,
        score: 0,
        isStart: false,
        isEnd: false,
        // difficulty: '0',
        right: [],
        wrong: [],
        // isLoaded: false,
      };
    case SET_LEOSPRINTPAGE:
      return { ...state, page: action.payload };
    // case FETCH_WORDSET:
    //   return { ...state, words: action.payload };
    default: return state;
  }
};
