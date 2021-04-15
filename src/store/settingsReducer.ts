import { IAction } from '../interfaces/commonInterfaces';
import { RootState } from './rootReducer';
import {
  CHANGE_SETTINGS, SET_ISTRANLASTED, SET_ISBUTTONSHOWED, TOGGLE_SETTINGS_MENU,
} from './types';

interface ISettingsState {
  settingsOpen: boolean,
  isTranslated: boolean
  isButtonsShowed: boolean
  userPhoto: string
}

const initialState: ISettingsState = {
  settingsOpen: false,
  isTranslated: true,
  isButtonsShowed: true,
  userPhoto: 'empty',
};

export const settingsReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case TOGGLE_SETTINGS_MENU:
      return { ...state, settingsOpen: !state.settingsOpen };
    case CHANGE_SETTINGS:
      return { ...state, ...action.payload };
    case SET_ISTRANLASTED:
      return { ...state, isTranslated: !state.isTranslated };
    case SET_ISBUTTONSHOWED:
      return { ...state, isButtonsShowed: !state.isButtonsShowed };
    default: return state;
  }
};

export const toggleSettingsMenu = (): object => ({ type: TOGGLE_SETTINGS_MENU });
export const changeSettings = (payload: object): object => ({ type: CHANGE_SETTINGS, payload });
export const setIsTranslated = (): object => ({ type: SET_ISTRANLASTED });
export const setIsButtonShowed = (): object => ({ type: SET_ISBUTTONSHOWED });

export const selectSettingsState = (state: RootState): ISettingsState => state.settings;
