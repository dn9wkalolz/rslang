import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWordset, moveNextWord } from '../../store/actions';
import { RootState } from '../../store/rootReducer';
import { IWordSetElem } from '../../types/leoSprintInterfaces';

const LanguageQuest: React.FC = () => {
  const dispatch = useDispatch();
  const wordSet: IWordSetElem = useSelector((state: RootState) => state.leosprintWordset.words[0]);
  useEffect(() => {
    dispatch(fetchWordset());
  }, []);
  const clickHandler = () => {
    dispatch(moveNextWord());
  };
  return (
    <div className="leosprint__language-quest">
      <div><img width="200" height="200" src={`https://rslang-61.herokuapp.com/${wordSet.image}`} alt={wordSet.word} /></div>
      <div className="leosprint__words">
        <span className="leosprint__language-quest__en">{wordSet.word}</span>
        <span className="leosprint__language-quest__ru">{wordSet.wordTranslate}</span>
      </div>
      <div className="leosprint__buttons">
        <button type="button" className="leosprint__buttons__wrong" onClick={clickHandler}>неверно</button>
        <button type="button" className="leosprint__buttons__right" onClick={clickHandler}>верно</button>
      </div>
    </div>
  );
};

export default LanguageQuest;
