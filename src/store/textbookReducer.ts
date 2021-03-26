import { CHANGE_GROUP, CHANGE_PAGE } from './types';

export interface IAction {
  type: string
  payload: any
}
interface IInitialState {
  group: number
  page: number
}

const initialState: IInitialState = {
  group: 0,
  page: 0,
};

export const textbookReducer = (state = initialState, action:IAction) => {
  switch (action.type) {
    case CHANGE_PAGE:
      return { ...state, page: state.page + 1 };
    case CHANGE_GROUP:
      return { ...state, group: action.payload };
    default: return state;
  }
};
