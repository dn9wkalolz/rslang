import { IPaginatedWordSetElem } from '../interfaces/commonInterfaces';
import {
  SET_GROUP, CHANGE_PAGE, SET_PAGE, SET_SECTION, SET_PAGINATEDWORDSET, DELETE_WORD,
} from './types';

export function setGroup(payload: number): object {
  return { type: SET_GROUP, payload };
}

export function setPage(payload: number): object {
  return { type: SET_PAGE, payload };
}

export function changePage(payload: number): object {
  return { type: CHANGE_PAGE, payload };
}

export function setSection(payload: string): object {
  return { type: SET_SECTION, payload };
}

export function setPaginatedWordSet(payload: IPaginatedWordSetElem[]) {
  return { type: SET_PAGINATEDWORDSET, payload };
}

export function changeStateWord(payload: IPaginatedWordSetElem[]) {
  return { type: DELETE_WORD, payload };
}
