import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import { homepageContent } from '../../../data/content';
import './Games.scss';

const Games: React.FC = () => {
  const { games } = homepageContent;
  const { quizes } = games;
  const { isAuth } = useSelector((state: RootState) => state.auth);

  return (
    <section className={`games ${isAuth ? 'auth' : ''}`}>
      <h2 className="games__title">{games.title}</h2>
      <h2 className="games__subtitle">{games.subtitle}</h2>
      <div className="games__description">{games.description}</div>
      <div className="games__content">
        <div className="games__image">
          <img src={games.image} alt={games.title} />
        </div>
        <div className="games__items">
          {
            quizes.map((quiz) => (
              <NavLink to={quiz.link} className="games__item" key={quiz.key}>
                <img src={quiz.img} alt={quiz.title} />
                <div className="games__text">
                  <h3>{quiz.title}</h3>
                  <p>{quiz.subtitle}</p>
                  <p>{quiz.description}</p>
                </div>
              </NavLink>
            ))
          }
        </div>
      </div>
    </section>
  );
};

export default Games;
