import wordsAPI from '../api/words-api';
import { WordsType, WordType } from '../types/types';
import { InferActionsTypes, BaseThunkType } from './rootReducer';

const initialState = {
  words: [] as WordsType,
  currentWordIndex: 0,
  score: 0,
  isLogin: false,
  isStart: false,
  isEnd: false,
  level: 0,
  currentPage: 0,
  rightAnswers: [] as WordsType,
  wrongAnswers: [] as WordsType,
  isFetching: false,
};

export const audiocallReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'AUDIO_CALL_SET_WORDS':
    case 'AUDIOCALL_TOGGLE_IS_FETCHING':
    case 'AUDIOCALL_TOGGLE_IS_START':
    case 'AUDIOCALL_TOGGLE_IS_END':
    case 'AUDIOCALL_SET_LEVEL':
    case 'AUDIOCALL_CLEAR_GAME':
    case 'AUDIOCALL_TOGGLE_IS_LOGIN':
    case 'AUDIOCALL_SET_CURRENT_WORD_INDEX':
    case 'AUDIOCALL_SET_CURRENT_PAGE':
      return { ...state, ...action.payload };
    case 'AUDIOCALL_INCREMENT_SCORE':
      return { ...state, score: state.score + 1 };
    case 'AUDIOCALL_SET_WRONG_ANSWERS':
      return { ...state, wrongAnswers: [...state.wrongAnswers, action.wrongAnswer] };
    case 'AUDIOCALL_SET_RIGHT_ANSWERS':
      return { ...state, rightAnswers: [...state.rightAnswers, action.rightAnswer] };
    default: return state;
  }
};

export const actions = {
  setWords: (words: WordsType) => ({
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
  setLevel: (level: number) => ({
    type: 'AUDIOCALL_SET_LEVEL',
    payload: {
      level,
    },
  } as const),
  setCurrentWordIndex: (currentWordIndex: number) => ({
    type: 'AUDIOCALL_SET_CURRENT_WORD_INDEX',
    payload: {
      currentWordIndex,
    },
  } as const),
  incrementScore: () => ({
    type: 'AUDIOCALL_INCREMENT_SCORE',
  } as const),
  setCurrentPage: (currentPage: number) => ({
    type: 'AUDIOCALL_SET_CURRENT_PAGE',
    payload: {
      currentPage,
    },
  } as const),
  setWrongAnswers: (wrongAnswer: WordType) => ({
    type: 'AUDIOCALL_SET_WRONG_ANSWERS',
    wrongAnswer,
  } as const),
  setRightAnswers: (rightAnswer: WordType) => ({
    type: 'AUDIOCALL_SET_RIGHT_ANSWERS',
    rightAnswer,
  } as const),
  clearGame: () => ({
    type: 'AUDIOCALL_CLEAR_GAME',
    payload: {
      ...initialState,
    },
  } as const),
};

export const requestWords = (level: number, currentPage: number): ThunkType => async (dispatch) => {
  dispatch(actions.clearGame());
  dispatch(actions.toggleIsFetching(true));
  dispatch(actions.setLevel(level));
  dispatch(actions.setCurrentPage(currentPage));

  const words = await wordsAPI.requestWords(level, currentPage);

  dispatch(actions.toggleIsFetching(false));
  dispatch(actions.setWords(words));
};

type ActionsType = InferActionsTypes<typeof actions>;
type InitialStateType = typeof initialState;
type ThunkType = BaseThunkType<ActionsType>;
