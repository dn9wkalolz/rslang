import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import { homepageContent } from '../../../data/content';
import createMarkup from '../../../helpers/markup-helper';
import './HeroSection.scss';

const HeroSection: React.FC = () => {
  const { hero } = homepageContent;
  const title = createMarkup(hero.title);
  const { isAuth } = useSelector((state: RootState) => state.auth);

  return (
    <section className="homepage__hero">
      <div className="homepage__hero-content">
        <h1 className="homepage__hero-title" dangerouslySetInnerHTML={title} />
        <div className="homepage__hero-description">{hero.description}</div>
        <button className="homepage__hero-button" type="button"><NavLink to="/register">{hero.button}</NavLink></button>
        <NavLink className={`homepage__hero-button ${isAuth ? 'hidden' : ''}`} to="/login">{hero.button}</NavLink>
      </div>
      <div className="homepage__hero-image">
        <img src={hero.img} alt={hero.imgAlt} />
      </div>
    </section>
  );
};

export default HeroSection;
