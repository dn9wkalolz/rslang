import { IAction } from '../interfaces/commonInterfaces';
import { RootState } from './rootReducer';
import { CHANGE_SETTINGS, SET_ISTRANLASTED, SET_ISBUTTONSHOWED } from './types';

interface ISettingsState {
  isTranslated: boolean
  isButtonsShowed: boolean
}

const initialState: ISettingsState = {
  isTranslated: true,
  isButtonsShowed: true,
};

export const settingsReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case CHANGE_SETTINGS:
      return { ...state, ...action.payload };
    case SET_ISTRANLASTED:
      return { ...state, isTranslated: !state.isTranslated };
    case SET_ISBUTTONSHOWED:
      return { ...state, isButtonsShowed: !state.isButtonsShowed };
    default: return state;
  }
};

export const changeSettings = (payload: object): object => ({ type: CHANGE_SETTINGS, payload });
export const setIsTranslated = (): object => ({ type: SET_ISTRANLASTED });
export const setIsButtonShowed = (): object => ({ type: SET_ISBUTTONSHOWED });

export const selectSettingsState = (state: RootState): ISettingsState => state.settings;
