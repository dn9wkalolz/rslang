import { IPaginatedWordSetElem } from '../interfaces/commonInterfaces';
import { RootState } from './rootReducer';
import {
  SET_GROUP,
  CHANGE_PAGE,
  SET_PAGE,
  SET_PAGINATEDWORDSET,
  DELETE_WORD,
  SET_PAGEBUTTONS,
  SET_PAGESWORD,
} from './types';

export const selectTextbookState = (state: RootState) => state.textbookState;

export function setGroup(payload: number): object {
  return { type: SET_GROUP, payload };
}

export function setPage(payload: number): object {
  return { type: SET_PAGE, payload };
}

export function changePage(payload: number): object {
  return { type: CHANGE_PAGE, payload };
}

export function setPaginatedWordSet(payload: IPaginatedWordSetElem[]) {
  return { type: SET_PAGINATEDWORDSET, payload };
}

export function setPagesWord(payload: IPaginatedWordSetElem[]) {
  return { type: SET_PAGESWORD, payload };
}

export function changeStateWord(payload: IPaginatedWordSetElem[]) {
  return { type: DELETE_WORD, payload };
}

export function setPagesButtons(payload: number[]) {
  return { type: SET_PAGEBUTTONS, payload };
}
