import { IVocabularyState } from './vocabularyReducer';
import { IPaginatedWordSetElem } from '../interfaces/commonInterfaces';
import { RootState } from './rootReducer';
import {
  CHANGE_VOCABULARYPAGE,
  SET_SECTION,
  SET_VOCABULARYGROUP,
  SET_VOCABULARYPAGE,
  SET_VOCABULARYPAGEBUTTONS,
  SET_VOCABULARYPAGESWORD,
  SET_VOCABULARYPAGINATEDWORDSET,
} from './types';

export const selectVocabularyState = (state: RootState): IVocabularyState => state.vocabularyState;

export function setSection(payload: string): object {
  return { type: SET_SECTION, payload };
}

export function setVocabularyGroup(payload: number): object {
  return { type: SET_VOCABULARYGROUP, payload };
}

export function setVocabularyPagesButtons(payload: number): object {
  return { type: SET_VOCABULARYPAGEBUTTONS, payload };
}

export function setVocabularyPaginatedWordSet(payload: IPaginatedWordSetElem[]): object {
  return { type: SET_VOCABULARYPAGINATEDWORDSET, payload };
}

export function setVocabularyPagesWord(payload: IPaginatedWordSetElem[]): object {
  return { type: SET_VOCABULARYPAGESWORD, payload };
}

export function setVocabularyPage(payload: number): object {
  return { type: SET_VOCABULARYPAGE, payload };
}

export function changeVocabularyPage(payload: number): object {
  return { type: CHANGE_VOCABULARYPAGE, payload };
}
