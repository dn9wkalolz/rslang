// export interface IWordSetElem {
//   id: string
//   group: number
//   page: number
//   word: string
//   image: string
//   audio: string
//   audioMeaning: string
//   audioExample: string
//   textMeaning: string
//   textExample: string
//   transcription: string
//   wordTranslate: string
//   textMeaningTranslate: string
//   textExampleTranslate: string
// }

interface IOptional {
  wrong: number
  right: number
}

export interface IUserWord {
  difficulty: string
  optional: IOptional
}
export interface IPaginatedWordSetElem {
  _id: string
  group: number
  page: number
  word: string
  image: string
  audio: string
  audioMeaning: string
  audioExample: string
  textMeaning: string
  textExample: string
  transcription: string
  wordTranslate: string
  textMeaningTranslate: string
  textExampleTranslate: string
  userWord: IUserWord
}
