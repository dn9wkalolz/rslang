import { baseUrl } from '../data/content';
import { IAction } from '../interfaces/commonInterfaces';
import { RootState } from './rootReducer';
import { SET_COUNT, SET_STATISTIC } from './types';

interface IStatistic {
  prevStatistic: Array<Array<any>>
  currCount: number
}

const initialState: IStatistic = {
  prevStatistic: [[]],
  currCount: 0,
};

export const statisticReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SET_STATISTIC:
      return { ...state, prevStatistic: action.payload, currCount: 0 };
    case SET_COUNT:
      return { ...state, currCount: state.currCount + 1 };
    default: return state;
  }
};

export const selectStatisticState = (state: RootState): IStatistic => state.statistic;

export const setStatistic = (
  userId: string | null, token: string | null,
) => async (dispatch: any) => {
  const response = await fetch(`${baseUrl}users/${userId}/statistics`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify({ optional: { stats: JSON.stringify([['Дата', 'Слов']]) } }),
  });
  const result = await response.json();
  console.log(JSON.parse(result.optional.stats));
  const payload = result.optional?.stats ? JSON.parse(result.optional?.stats) : [['Дата', 'Слов']];
  dispatch({ type: SET_STATISTIC, payload });
};

export const setCount = () => ({ type: SET_COUNT });
