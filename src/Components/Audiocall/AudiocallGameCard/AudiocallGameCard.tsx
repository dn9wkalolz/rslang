import React, {
  useState,
  useMemo,
  useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { audiocallGameContent, DIFFICULTY } from '../../../data/content';
import { API_URL } from '../../../url.constants';
import { getArrayRandomNumbers } from '../../../helpers/array-random-helper';
import { actions } from '../../../store/audiocallReduser';
import { IPaginatedWordSetElem } from '../../../interfaces/commonInterfaces';
import { fetchStatistic, useFetchWithCondition } from '../../../helpers/requestMethods';
import { setPagesWord } from '../../../store/textbookActions';
import './AudiocallGameCard.scss';
import { selectStatisticState, setCount, setStatistic } from '../../../store/statisticReducer';

type PropsType = {
  currentWordIndex: number
  words: IPaginatedWordSetElem[]
  word: IPaginatedWordSetElem
};

const AudiocallGameCard: React.FC<PropsType> = ({ currentWordIndex, words, word }) => {
  const { LEARNED } = DIFFICULTY;
  const { _id, userWord } = word;
  const [isChecking, setIsChecking] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<string>('');
  const dispatch = useDispatch();
  const { play, nextButton } = audiocallGameContent;
  const { prevStatistic, currCount } = useSelector(selectStatisticState);

  let timer: ReturnType<typeof setTimeout>;

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    const token = sessionStorage.getItem('token');
    dispatch(setStatistic(userId, token));
  }, []);

  useEffect(() => {
    if (currCount === 0) {
      return;
    }
    fetchStatistic(prevStatistic, currCount);
  }, [currCount]);

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
    const sortedPagesWord = words.map(
      (wordEl) => {
        if (wordEl._id === wordId) {
          return assignWordsetProperty(wordEl, LEARNED, increment);
        }
        return wordEl;
      },
    );
    dispatch(setPagesWord(sortedPagesWord));
  };

  function handleNext(): void {
    setIsChecking('checked');
    timer = setTimeout(() => {
      dispatch(actions.setCurrentWordIndex(currentWordIndex + 1));
      setIsCorrect('');
      setIsChecking('');
    }, 650);
  }

  const audioWord = useMemo(() => new Audio(API_URL + word.audio), [currentWordIndex]);

  const onPlay = () => {
    audioWord.play();
  };

  const handleKeyDown = (ev: React.KeyboardEvent) => {
    if (ev.altKey) {
      audioWord.play();
    }
  };

  const buttons = useMemo(
    () => getArrayRandomNumbers(words.length, currentWordIndex), [word],
  );

  useEffect(() => {
    onPlay();
  }, [audioWord]);

  function handleCheck(check: number): void {
    setIsChecking('checking');
    dispatch(setCount());

    if (check === currentWordIndex) {
      dispatch(actions.setRightAnswers(words[check]));
      setIsCorrect('correct');
      useFetchWithCondition(_id, LEARNED, userWord, { wrong: 0, right: 1 });
      setLearnedDifficulty(_id, { wrong: 0, right: 1 });
    } else if (check !== currentWordIndex) {
      dispatch(actions.setWrongAnswers(words[check]));
      setIsCorrect('incorrect');
      useFetchWithCondition(_id, LEARNED, userWord, { wrong: 1, right: 0 });
      setLearnedDifficulty(_id, { wrong: 1, right: 0 });
    }
  }

  useEffect(() => clearTimeout(timer), []);

  return (
    <div
      className={`audiocall__card
      ${(isCorrect === 'correct') ? 'correct' : (isCorrect === 'incorrect') ? 'incorrect' : ''}
      ${(isChecking === 'checking') ? 'checking' : (isChecking === 'checked') ? 'checked' : ''}`}
      key={word.wordTranslate}
    >
      <div
        className="audiocall__card--image"
        onClick={() => onPlay()}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
      >
        <img src={isCorrect === '' ? play.img : `${API_URL}${word.image}`} alt={word.word} />
      </div>
      <div className="own-game__card--content">
        <h2 className="audiocall__card--word">{word.word}</h2>
        <p className="audiocall__card--transcription">{word.transcription}</p>
        <h2 className="audiocall__card--translation">{word.wordTranslate}</h2>
      </div>
      <div className="audiocall__card--buttons">
        {
          buttons.map((b) => {
            const isTruth = b === currentWordIndex;
            return (
              <button
                type="button"
                disabled={isCorrect !== ''}
                className={`audiocall__card--button ${(isCorrect === 'correct' && isTruth) ? 'correct'
                  : (isCorrect === 'incorrect' && !isTruth) ? 'incorrect' : ''}`}
                onClick={() => { handleCheck(b); }}
                key={b}
              >
                {`${words[b].wordTranslate}`}
              </button>
            );
          })
        }
      </div>
      <button type="button" className="audiocall__card--next" onClick={handleNext}>
        {nextButton}
      </button>
    </div>
  );
};

export default AudiocallGameCard;
