import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OwnGameCardIsCorrect, OwnGameCardIsIncorrect, OwnGameCardSetCurrent } from './OwnGameCardSlice';
import { baseUrl, DIFFICULTY, ownGameContent } from '../../../data/content';
import { IPaginatedWordSetElem } from '../../../interfaces/commonInterfaces';
import { useFetchWithCondition } from '../../../data/requestMethods';
import { selectTextbookState, setPagesWord } from '../../../store/textbookActions';
import './OwnGameCard.scss';

interface IWord {
  wordElem: IPaginatedWordSetElem
}

const OwnGameCard: React.FC<IWord> = ({ wordElem }) => {
  const { LEARNED } = DIFFICULTY;
  const {
    word, _id, userWord, wordTranslate, image, transcription,
  } = wordElem;
  const [isChecking, setIsChecking] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<string>('');
  const dispatch = useDispatch();
  const ref = useRef<HTMLInputElement>(null);
  const { pagesWord } = useSelector(selectTextbookState);

  function clearInput():void {
    if (ref.current?.value) {
      ref.current.value = '';
    }
  }

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
        difficulty,
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

  function handleCheck():void {
    if (ref.current?.value) {
      setIsChecking('checking');

      if (ref.current?.value.toLowerCase() === word.toLowerCase()) {
        setIsCorrect('correct');
        dispatch(OwnGameCardIsCorrect(wordElem));
        useFetchWithCondition(_id, LEARNED, userWord, { wrong: 0, right: 1 });
        setLearnedDifficulty(_id, { wrong: 0, right: 1 });
      } else {
        setIsCorrect('incorrect');
        dispatch(OwnGameCardIsIncorrect(wordElem));
        useFetchWithCondition(_id, LEARNED, userWord, { wrong: 1, right: 0 });
        setLearnedDifficulty(_id, { wrong: 1, right: 0 });
      }
    }
  }

  function handleNext():void {
    setIsChecking('checked');

    setTimeout(() => {
      setIsCorrect('');
      setIsChecking('');
      clearInput();
      dispatch(OwnGameCardSetCurrent());
    }, 650);
  }

  return (
    <div
      className={`own-game__card
      ${(isCorrect === 'correct') ? 'correct'
        : (isCorrect === 'incorrect') ? 'incorrect'
          : ''}
          ${(isChecking === 'checking') ? 'checking'
            : (isChecking === 'checked') ? 'checked'
              : ''}`}
      key={wordTranslate}
    >
      <div className="own-game__card--image">
        <img src={`${baseUrl}${image}`} alt={word} />
      </div>
      <div className="own-game__card--content">
        <h2 className="own-game__card--word">{word}</h2>
        <p className="own-game__card--transcription">{transcription}</p>
        <h2 className="own-game__card--translation">{wordTranslate}</h2>
      </div>
      <div className="own-game__card--form">
        <input
          className={`own-game__card--input ${isChecking ? 'disabled' : ''}`}
          type="text"
          ref={ref}
        />
        <button
          type="button"
          className={`own-game__card--check ${isChecking ? 'hidden' : ''}`}
          onClick={handleCheck}
        >
          {ownGameContent.checkButton}
        </button>
        <button type="button" className="own-game__card--next" onClick={handleNext}>{ownGameContent.nextButton}</button>
      </div>
    </div>
  );
};

export default OwnGameCard;
