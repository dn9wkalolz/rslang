import { IWordSetElem } from '../interfaces/commonInterfaces';
import {
  FETCH_WORDSET,
  INCREMENT_SCORE,
  TOGGLE_LOGIN,
  TOGGLE_START,
  CHANGE_DIFFICULTY,
  TOGGLE_END,
  HANDLE_WRONG,
  HANDLE_RIGHT,
  SET_LOADED,
  CLEAR_GAME,
} from './types';

export function fetchWordset(): Function {
  return async (dispatch: any) => {
    const response = await fetch('https://rslang-61.herokuapp.com/words');
    const json = await response.json();
    dispatch({ type: FETCH_WORDSET, payload: json });
  };
}

export function incrementScore(): object {
  return {
    type: INCREMENT_SCORE,
  };
}

export function toggleLogin(): object {
  return { type: TOGGLE_LOGIN };
}

export function toggleStart(): object {
  return { type: TOGGLE_START };
}

export function toggleEnd(): object {
  return { type: TOGGLE_END };
}

export function changeDifficulty(payload: string): object {
  return { type: CHANGE_DIFFICULTY, payload };
}

export function wrongHandler(payload: IWordSetElem[]): object {
  return { type: HANDLE_WRONG, payload };
}

export function rightHandler(payload: IWordSetElem[]): object {
  return { type: HANDLE_RIGHT, payload };
}

export function setLoaded(): object {
  return { type: SET_LOADED };
}

export function clearGame(): object {
  return { type: CLEAR_GAME };
}
