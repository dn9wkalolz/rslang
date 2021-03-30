import wordsAPI from '../api/words-api';
import { WordType } from '../types/types';
import { InferActionsTypes, BaseThunkType } from './rootReducer';

const initialState = {
  words: [] as Array<WordType>,
  score: 0,
  isLogin: false,
  isStart: false,
  isEnd: false,
  level: 0,
  rightAnswers: [] as Array<WordType>,
  wrongAnswers: [] as Array<WordType>,
  isFetching: false,
};

export const audiocallReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'AUDIO_CALL_SET_WORDS':
    case 'AUDIOCALL_TOGGLE_IS_FETCHING':
    case 'AUDIOCALL_TOGGLE_IS_START':
    case 'AUDIOCALL_TOGGLE_IS_END':
    case 'AUDIOCALL_SET_LEVEL':
    case 'AUDIOCALL_SET_WRONG_ANSWERS':
    case 'AUDIOCALL_SET_RIGHT_ANSWERS':
    case 'AUDIOCALL_CLEAR_GAME':
    case 'AUDIOCALL_TOGGLE_IS_LOGIN':
      return { ...state, ...action.payload };
    case 'AUDIOCALL_INCREMENT_SCORE':
      return { ...state, score: state.score + 1 };
    default: return state;
  }
};

export const actions = {
  setWords: (words: Array<WordType>) => ({
    type: 'AUDIO_CALL_SET_WORDS',
    payload: {
      words,
    },
  } as const),
  toggleIsFetching: (isFetching: boolean) => ({
    type: 'AUDIOCALL_TOGGLE_IS_FETCHING',
    payload: {
      isFetching,
    },
  } as const),
  toggleIsStart: (isStart: boolean) => ({
    type: 'AUDIOCALL_TOGGLE_IS_START',
    payload: {
      isStart,
    },
  }) as const,
  toggleIsEnd: (isEnd: boolean) => ({
    type: 'AUDIOCALL_TOGGLE_IS_END',
    payload: {
      isEnd,
    },
  }) as const,
  toggleIsLogin: (isLogin: boolean) => ({
    type: 'AUDIOCALL_TOGGLE_IS_LOGIN',
    payload: {
      isLogin,
    },
  }) as const,
  setLevel: (levelNumber: number) => ({
    type: 'AUDIOCALL_SET_LEVEL',
    payload: {
      levelNumber,
    },
  } as const),
  incrementScore: () => ({
    type: 'AUDIOCALL_INCREMENT_SCORE',
  } as const),
  setWrongAnswers: (wrongAnswers: Array<WordType>) => ({
    type: 'AUDIOCALL_SET_WRONG_ANSWERS',
    payload: {
      wrongAnswers,
    },
  } as const),
  setRightAnswers: (rightAnswers: Array<WordType>) => ({
    type: 'AUDIOCALL_SET_RIGHT_ANSWERS',
    payload: {
      rightAnswers,
    },
  } as const),
  clearGame: () => ({
    type: 'AUDIOCALL_CLEAR_GAME',
    payload: {
      words: [] as Array<WordType>,
      score: 0,
      isLogin: false,
      isStart: false,
      isEnd: false,
      level: 0,
      rightAnswers: [] as Array<WordType>,
      wrongAnswers: [] as Array<WordType>,
      isFetching: false,
    },
  } as const),
};

export const requestWords = (level: number): ThunkType => async (dispatch) => {
  dispatch(actions.toggleIsFetching(true));
  const words = await wordsAPI.requestWords(level);
  dispatch(actions.toggleIsFetching(false));
  dispatch(actions.setWords(words));
};

type ActionsType = InferActionsTypes<typeof actions>;
type InitialStateType = typeof initialState;
type ThunkType = BaseThunkType<ActionsType>;
