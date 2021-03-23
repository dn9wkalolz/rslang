import { FETCH_WORDSET, MOVE_NEXTWORD } from './types';

export function fetchWordset(): Function {
  return async (dispatch: any) => {
    const response = await fetch('https://rslang-61.herokuapp.com/words');
    const json = await response.json();
    dispatch({ type: FETCH_WORDSET, payload: json });
  };
}

export function moveNextWord(): object {
  return {
    type: MOVE_NEXTWORD,
  };
}
