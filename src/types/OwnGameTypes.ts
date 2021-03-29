export type OwnGameActionType = {
  type: string,
  payload?: any
};

export type OwnGameStateType = {
  correct: Array<{}>,
  incorrect: Array<{}>,
  current: number,
};
