import { SET_GROUP, CHANGE_PAGE, SET_PAGE } from './types';

export function setGroup(payload: number): object {
  return { type: SET_GROUP, payload };
}

export function setPage(payload: number): object {
  return { type: SET_PAGE, payload };
}

export function changePage(payload: number): object {
  return { type: CHANGE_PAGE, payload };
}
