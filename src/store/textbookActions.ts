import { CHANGE_GROUP, CHANGE_PAGE } from './types';

export function changeGroup(payload: number): object {
  return { type: CHANGE_GROUP, payload };
}

export function changePage(): object {
  return { type: CHANGE_PAGE };
}
