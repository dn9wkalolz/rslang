import { SavannahActionType, SavannahStateType } from '../../../types/SavannahTypes';

const SavannahInitialState:SavannahStateType = {
  correct: [],
  incorrect: [],
  current: 0,
  outOfLives: false,
};

export function SavannahWordIsCorrect(word:object):SavannahActionType {
  return {
    type: 'Savannah/MarkCorrect',
    payload: word,
  };
}

export function SavannahWordIsIncorrect(word:object):SavannahActionType {
  return {
    type: 'Savannah/MarkIncorrect',
    payload: word,
  };
}

export function SavannahResetResults():SavannahActionType {
  return {
    type: 'Savannah/ResetResults',
  };
}

export function SavannahWordSetCurrent():SavannahActionType {
  return {
    type: 'Savannah/UpdateCurrent',
  };
}

export function SavannahWordResetCurrent():SavannahActionType {
  return {
    type: 'Savannah/ResetCurrent',
  };
}

export function SavannahOutOfLives():SavannahActionType {
  return {
    type: 'Savannah/OutOfLives',
  };
}

export const SavannahReducer = (state = SavannahInitialState, action:SavannahActionType) => {
  switch (action.type) {
    case 'Savannah/MarkCorrect':
      return { ...state, correct: [...state.correct, action.payload] };
    case 'Savannah/MarkIncorrect':
      return { ...state, incorrect: [...state.incorrect, action.payload] };
    case 'Savannah/UpdateCurrent':
      return { ...state, current: state.current + 1 };
    case 'Savannah/ResetCurrent':
      return { ...state, current: 0 };
    case 'Savannah/ResetResults':
      return {
        ...state,
        current: 0,
        correct: [],
        incorrect: [],
        outOfLives: false,
      };
    case 'Savannah/OutOfLives':
      return { ...state, outOfLives: true };
    default:
      return state;
  }
};

export const selectSavannah = (state:any) => state.Savannah;
