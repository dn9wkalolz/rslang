import { IAction, IPaginatedWordSetElem } from '../interfaces/commonInterfaces';
import {
  SET_GROUP,
  CHANGE_PAGE,
  SET_PAGE,
  SET_PAGINATEDWORDSET,
  DELETE_WORD,
  SET_PAGEBUTTONS,
  SET_PAGESWORD,
} from './types';

export interface ITextbookState {
  group: number
  page: number
  paginatedWordSet: IPaginatedWordSetElem[]
  pagesButtons: number[]
  pagesWord: IPaginatedWordSetElem[]
}

const initialState: ITextbookState = {
  group: 0,
  page: 0,
  paginatedWordSet: [],
  pagesButtons: [],
  pagesWord: [],
};

export const textbookReducer = (state = initialState, action:IAction) => {
  switch (action.type) {
    case CHANGE_PAGE:
      return { ...state, page: state.page + action.payload };
    case SET_GROUP:
      return { ...state, group: action.payload };
    case SET_PAGE:
      return { ...state, page: action.payload };
    case SET_PAGINATEDWORDSET:
      return { ...state, paginatedWordSet: action.payload };
    case SET_PAGESWORD:
      return { ...state, pagesWord: action.payload };
    case DELETE_WORD:
      return { ...state, paginatedWordSet: action.payload };
    case SET_PAGEBUTTONS:
      return { ...state, pagesButtons: action.payload };
    default: return state;
  }
};
