const initialState:any = [];
export const OwnGameDataReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case 'OwnGame/StoreData':
      return action.payload;
    default:
      return state;
  }
};

export function OwnGameStoreData(data:any) {
  return {
    type: 'OwnGame/StoreData',
    payload: data,
  };
}

export const selectOwnGameData = (state:any) => state.OwnGameData;
