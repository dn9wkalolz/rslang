import { IPaginatedWordSetElem } from '../interfaces/commonInterfaces';
import { ILeosprintState } from './leoSprintReducer';
import { RootState } from './rootReducer';
import {
  INCREMENT_SCORE,
  TOGGLE_START,
  TOGGLE_END,
  HANDLE_WRONG,
  HANDLE_RIGHT,
  CLEAR_GAME,
  SET_LEOSPRINTPAGE,
} from './types';

export const selectLeosprintGame = (state: RootState): ILeosprintState => state.leosprintState;

export function incrementScore(): object {
  return { type: INCREMENT_SCORE };
}

export function toggleStart(): object {
  return { type: TOGGLE_START };
}

export function toggleEnd(): object {
  return { type: TOGGLE_END };
}

export function wrongHandler(payload: IPaginatedWordSetElem[]): object {
  return { type: HANDLE_WRONG, payload };
}

export function rightHandler(payload: IPaginatedWordSetElem[]): object {
  return { type: HANDLE_RIGHT, payload };
}

export function clearGame(): object {
  return { type: CLEAR_GAME };
}

export function setLeosprintPage(payload: number): object {
  return { type: SET_LEOSPRINTPAGE, payload };
}
