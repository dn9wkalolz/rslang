import { FETCH_WORDSET, INCREMENT_SCORE, MOVE_NEXTWORD } from './types';

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

export function incrementScore() {
  return {
    type: INCREMENT_SCORE,
  };
}
