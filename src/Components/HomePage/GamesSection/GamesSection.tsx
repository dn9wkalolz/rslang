import React from 'react';
import { NavLink } from 'react-router-dom';
import { homepageContent } from '../../../data/content';
import './GamesSection.scss';

const GamesSection: React.FC = () => {
  const { games } = homepageContent;
  const { quizes } = games;

  return (
    <section className="homepage__games">
      <h2 className="homepage__games-title">{games.title}</h2>
      <div className="homepage__games-content">
        <div className="homepage__games-image">
          <img src={games.image} alt={games.title} />
        </div>
        <div className="homepage__games-items">
          {
            quizes.map((quiz) => (
              <NavLink to={quiz.link} className="homepage__games-item" key={quiz.key}>
                <img src={quiz.img} alt={quiz.title} />
                <div className="homepage__games-text">
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

export default GamesSection;
