import { OwnGameActionType, OwnGameStateType } from '../../../types/OwnGameTypes';

const OwnGameInitialState:OwnGameStateType = {
  correct: [],
  incorrect: [],
  current: 0,
};

export function OwnGameCardIsCorrect(word:object):OwnGameActionType {
  return {
    type: 'OwnGame/MarkCorrect',
    payload: word,
  };
}

export function OwnGameCardIsIncorrect(word:object):OwnGameActionType {
  return {
    type: 'OwnGame/MarkIncorrect',
    payload: word,
  };
}

export function OwnGameCardResetResults():OwnGameActionType {
  return {
    type: 'OwnGame/ResetResults',
  };
}

export function OwnGameCardSetCurrent():OwnGameActionType {
  return {
    type: 'OwnGame/UpdateCurrent',
  };
}

export function OwnGameCardResetCurrent():OwnGameActionType {
  return {
    type: 'OwnGame/ResetCurrent',
  };
}

export const OwnGameReducer = (state = OwnGameInitialState, action:OwnGameActionType) => {
  switch (action.type) {
    case 'OwnGame/MarkCorrect':
      return { ...state, correct: [...state.correct, action.payload] };
    case 'OwnGame/MarkIncorrect':
      return { ...state, incorrect: [...state.incorrect, action.payload] };
    case 'OwnGame/UpdateCurrent':
      return { ...state, current: state.current + 1 };
    case 'OwnGame/ResetCurrent':
      return { ...state, current: 0 };
    case 'OwnGame/ResetResults':
      return {
        ...state,
        current: 0,
        correct: [],
        incorrect: [],
      };
    default:
      return state;
  }
};

export const selectOwnGame = (state:any) => state.OwnGame;
