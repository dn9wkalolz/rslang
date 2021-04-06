import React, {
  useState,
  useMemo,
  useEffect,
} from 'react';
import { useDispatch } from 'react-redux';
import { audiocallGameContent } from '../../../data/content';
import './AudiocallGameCard.scss';
import { API_URL } from '../../../url.constants';
import { WordsType, WordType } from '../../../types/types';
import { getArrayRandomNumbers } from '../../../helpers/array-random-helper';
import playImage from '../../../assets/img/Play.svg';
import { actions } from '../../../store/audiocallReduser';

type PropsType = {
  currentWordIndex: number
  words: WordsType
  word: WordType
};

const AudiocallGameCard: React.FC<PropsType> = ({ currentWordIndex, words, word }) => {
  const [isChecking, setIsChecking] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<string>('');
  const dispatch = useDispatch();

  let timer: ReturnType<typeof setTimeout>;

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

    if (check === currentWordIndex) {
      dispatch(actions.setRightAnswers(words[check]));
      setIsCorrect('correct');
    } else if (check !== currentWordIndex) {
      dispatch(actions.setWrongAnswers(words[check]));
      setIsCorrect('incorrect');
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
        <img src={isCorrect === '' ? playImage : `${API_URL}${word.image}`} alt={word.word} />
      </div>
      <h2 className="audiocall__card--word">{word.word}</h2>
      <p className="audiocall__card--transcription">{word.transcription}</p>
      <h2 className="audiocall__card--translation">{word.wordTranslate}</h2>
      <div className="audiocall__card--buttons">
        {
          buttons.map((b, ind) => {
            const isTruth = b === currentWordIndex;
            return (
              <button
                type="button"
                disabled={isCorrect !== ''}
                className={(isCorrect === 'correct' && isTruth) ? 'audiocall__card--button'
                  : (isCorrect === 'incorrect' && !isTruth) ? 'audiocall__card--button' : 'button'}
                onClick={() => { handleCheck(b); }}
                key={b}
              >
                {`${ind + 1}) ${words[b].wordTranslate}`}
              </button>
            );
          })
        }
      </div>
      <button type="button" className="audiocall__card--next" onClick={handleNext}>
        {audiocallGameContent.nextButton}
      </button>
    </div>
  );
};

export default AudiocallGameCard;
