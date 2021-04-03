import { IPaginatedWordSetElem } from '../interfaces/commonInterfaces';
import {
  CHANGE_VOCABULARYPAGE,
  SET_SECTION,
  SET_VOCABULARYGROUP,
  SET_VOCABULARYPAGE,
  SET_VOCABULARYPAGEBUTTONS,
  SET_VOCABULARYPAGESWORD,
  SET_VOCABULARYPAGINATEDWORDSET,
} from './types';

export interface IAction {
  type: string
  payload: any
}
export interface IVocabularyState {
  group: number
  page: number
  section: string
  paginatedWordSet: IPaginatedWordSetElem[]
  pagesButtons: number
  pagesWord: IPaginatedWordSetElem[]
}

const initialState: IVocabularyState = {
  group: 0,
  page: 0,
  section: '{"$or":[{"userWord.difficulty":"hard"}, {"userWord.difficulty":"learned"}]}',
  paginatedWordSet: [],
  pagesButtons: 0,
  pagesWord: [],
};

export const vocabularyReducer = (state = initialState, action:IAction) => {
  switch (action.type) {
    case SET_SECTION:
      return { ...state, section: action.payload };
    case SET_VOCABULARYGROUP:
      return { ...state, group: action.payload };
    case SET_VOCABULARYPAGEBUTTONS:
      return { ...state, pagesButtons: action.payload };
    case SET_VOCABULARYPAGINATEDWORDSET:
      return { ...state, paginatedWordSet: action.payload };
    case SET_VOCABULARYPAGESWORD:
      return { ...state, pagesWord: action.payload };
    case SET_VOCABULARYPAGE:
      return { ...state, page: action.payload };
    case CHANGE_VOCABULARYPAGE:
      return { ...state, page: state.page + action.payload };
    default: return state;
  }
};
