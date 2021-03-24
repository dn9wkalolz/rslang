const initialCardState:string = '';
export const OwnGameCardReducer = (state = initialCardState, action:any) => {
  switch (action.type) {
    case 'OwnGameCard/StoreGuess':
      return action.payload;
    default:
      return state;
  }
};

export function OwnGameCardStoreGuess(data:string) {
  return {
    type: 'OwnGameCard/StoreGuess',
    payload: data,
  };
}

export const selectOwnGameCardGuess = (state:any) => state.OwnGameCardGuess;

const initialCardIsCheckingState:boolean = false;
export const OwnGameCardIsCheckingReducer = (state = initialCardIsCheckingState, action:any) => {
  switch (action.type) {
    case 'OwnGameCard/CardIsChecking':
      return action.payload;
    default:
      return state;
  }
};

export function OwnGameStoreCardIsChecking(data:boolean) {
  return {
    type: 'OwnGameCard/CardIsChecking',
    payload: data,
  };
}

export const selectOwnGameCardIsChecking = (state:any) => state.OwnGameCardIsChecking;

const initialCardIsCorrectState:boolean = false;
export const OwnGameCardIsCorrectReducer = (state = initialCardIsCorrectState, action:any) => {
  switch (action.type) {
    case 'OwnGameCard/CardIsCorrect':
      return action.payload;
    default:
      return state;
  }
};

export function OwnGameStoreCardIsCorrect(data:boolean) {
  return {
    type: 'OwnGameCard/CardIsCorrect',
    payload: data,
  };
}

export const selectOwnGameCardIsCorrect = (state:any) => state.OwnGameCardIsCorrect;

const initialCardIsIncorrectState:boolean = false;
export const OwnGameCardIsIncorrectReducer = (state = initialCardIsIncorrectState, action:any) => {
  switch (action.type) {
    case 'OwnGameCard/CardIsIncorrect':
      return action.payload;
    default:
      return state;
  }
};

export function OwnGameStoreCardIsIncorrect(data:boolean) {
  return {
    type: 'OwnGameCard/CardIsIncorrect',
    payload: data,
  };
}

export const selectOwnGameCardIsIncorrect = (state:any) => state.OwnGameCardIsIncorrect;
