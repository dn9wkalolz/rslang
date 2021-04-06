export type SavannahActionType = {
  type: string,
  payload?: any
};

export type SavannahStateType = {
  correct: Array<{}>,
  incorrect: Array<{}>,
  current: number,
  outOfLives: boolean,
};
