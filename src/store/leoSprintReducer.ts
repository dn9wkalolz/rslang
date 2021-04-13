import { IAction, IPaginatedWordSetElem } from '../interfaces/commonInterfaces';
import {
  INCREMENT_SCORE,
  TOGGLE_START,
  TOGGLE_END,
  HANDLE_RIGHT,
  HANDLE_WRONG,
  CLEAR_GAME,
  SET_LEOSPRINTPAGE,
} from './types';

export interface ILeosprintState {
  score: number
  isStart: boolean
  isEnd: boolean
  right: IPaginatedWordSetElem[]
  wrong: IPaginatedWordSetElem[]
  page: number
}

const initialState: ILeosprintState = {
  score: 0,
  isStart: false,
  isEnd: false,
  right: [],
  wrong: [],
  page: 0,
};

export const leoSprintReducer = (state = initialState, action:IAction) => {
  switch (action.type) {
    case INCREMENT_SCORE:
      return { ...state, score: state.score + 1 };
    case TOGGLE_START:
      return { ...state, isStart: !state.isStart };
    case TOGGLE_END:
      return { ...state, isEnd: !state.isEnd };
    case HANDLE_RIGHT:
      return { ...state, right: [...state.right, ...action.payload] };
    case HANDLE_WRONG:
      return { ...state, wrong: [...state.wrong, ...action.payload] };
    case CLEAR_GAME:
      return {
        ...state,
        score: 0,
        isStart: false,
        isEnd: false,
        right: [],
        wrong: [],
      };
    case SET_LEOSPRINTPAGE:
      return { ...state, page: action.payload };
    default: return state;
  }
};
