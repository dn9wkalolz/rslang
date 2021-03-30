import {
  SET_GROUP, CHANGE_PAGE, SET_PAGE, SET_SECTION,
} from './types';

export interface IAction {
  type: string
  payload: any
}
interface IInitialState {
  group: number
  page: number
  section: string
}

const initialState: IInitialState = {
  group: 0,
  page: 0,
  section: 'hard',
};

export const textbookReducer = (state = initialState, action:IAction) => {
  switch (action.type) {
    case CHANGE_PAGE:
      return { ...state, page: state.page + action.payload };
    case SET_GROUP:
      return { ...state, group: action.payload };
    case SET_PAGE:
      return { ...state, page: action.payload };
    case SET_SECTION:
      return { ...state, section: action.payload };
    default: return state;
  }
};
