import React from 'react';
import { homepageContent } from '../../../data/content';
import './HeroSection.scss';

const HeroSection: React.FC = () => {
  const { hero } = homepageContent;

  return (
    <section className="homepage__hero">
      <div className="homepage__hero-content">
        <h1 className="homepage__hero-title">
          Начни изучать
          <b> английский </b>
          прямо сейчас
        </h1>
        <div className="homepage__hero-description">{hero.description}</div>
        <button className="homepage__hero-button" type="button">{hero.button}</button>
      </div>
      <div className="homepage__hero-image">
        <img src={hero.img} alt={hero.imgAlt} />
      </div>
    </section>
  );
};

export default HeroSection;
