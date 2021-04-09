import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IPaginatedWordSetElem } from '../../../interfaces/commonInterfaces';
import {
  SavannahOutOfLives,
  SavannahWordIsCorrect,
  SavannahWordIsIncorrect,
  SavannahWordSetCurrent,
} from './SavannahWordSlice';
import './SavannahWord.scss';
import { DIFFICULTY } from '../../../data/content';
import { selectTextbookState, setPagesWord } from '../../../store/textbookActions';
import { useFetchWithCondition } from '../../../data/requestMethods';

interface ISavannahWord {
  wordElem: IPaginatedWordSetElem
  translations: string[]
}

const SavannahWord: React.FC<ISavannahWord> = ({ wordElem, translations }) => {
  const { LEARNED } = DIFFICULTY;
  const {
    word, _id, userWord, wordTranslate,
  } = wordElem;
  const [lives, setLives] = useState<number>(5);
  const pseudoLives:number = 5;
  const arrayOfLives = Array.from({ length: lives }, (v, k) => k);
  const arrayOfPseudoLives = Array.from({ length: pseudoLives }, (v, k) => k);
  const dispatch = useDispatch();
  const { pagesWord } = useSelector(selectTextbookState);

  function handleNext():void {
    dispatch(SavannahWordSetCurrent());
  }

  function takeLife() {
    setLives(lives - 1);
    if (lives === 1) {
      dispatch(SavannahOutOfLives());
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(SavannahWordIsIncorrect(wordElem));
      takeLife();
      handleNext();
    }, 7500);
    return () => clearTimeout(timer);
  }, [word]);

  const assignWordsetProperty = (
    wordEl: IPaginatedWordSetElem, difficulty: string, increment: any,
  ) => {
    if (!userWord) {
      const updatedWordElem = {
        ...wordEl,
        userWord: {
          difficulty,
          optional: { wrong: 0, right: 0 },
        },
      };
      return { ...updatedWordElem };
    }
    const { wrong, right } = wordEl.userWord.optional;
    const updatedWordElem = {
      ...wordEl,
      userWord: {
        ...wordEl.userWord,
        optional: { wrong: wrong + increment.wrong, right: right + increment.right },
      },
    };
    return { ...updatedWordElem };
  };

  const setLearnedDifficulty = (wordId: string, increment: any) => {
    const sortedPagesWord = pagesWord.map(
      (wordEl) => {
        if (wordEl._id === wordId) {
          return assignWordsetProperty(wordEl, LEARNED, increment);
        }
        return wordEl;
      },
    );
    dispatch(setPagesWord(sortedPagesWord));
  };

  function handleCheck(event:React.MouseEvent):void {
    const element = event.target as HTMLInputElement;
    const translation = element.value;

    if (translation.toLowerCase() === wordTranslate.toLowerCase()) {
      dispatch(SavannahWordIsCorrect(wordElem));
      useFetchWithCondition(_id, LEARNED, userWord, { wrong: 0, right: 1 });
      setLearnedDifficulty(_id, { wrong: 0, right: 1 });
    } else {
      dispatch(SavannahWordIsIncorrect(wordElem));
      takeLife();
      useFetchWithCondition(_id, LEARNED, userWord, { wrong: 1, right: 0 });
      setLearnedDifficulty(_id, { wrong: 1, right: 0 });
    }

    handleNext();
  }

  return (
    <div
      className="savannah__card"
      key={_id}
    >
      <div className="savannah__card--task">{word}</div>
      <div className="savannah__card--options">
        {
          translations.map((translation) => (
            <input type="button" key={translation} onClick={handleCheck} value={translation} />
          ))
        }
      </div>
      <div className="savannah__lives">
        {arrayOfLives.map((life) => (
          <div className="savannah__life" key={life} />
        ))}
      </div>
      <div className="savannah__pseudolives">
        {arrayOfPseudoLives.map((life) => (
          <div className="savannah__pseudolife" key={life} />
        ))}
      </div>
    </div>
  );
};

export default SavannahWord;
