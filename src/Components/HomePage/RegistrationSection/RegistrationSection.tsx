import React from 'react';
import { NavLink } from 'react-router-dom';
import { homepageContent } from '../../../data/content';
import './RegistrationSection.scss';

const RegistrationSection: React.FC = () => {
  const { registration } = homepageContent;

  return (
    <section className="homepage__registration">
      <h2 className="homepage__registration-title">{registration.title}</h2>
      <button className="homepage__registration-button" type="button"><NavLink to="/register">{registration.button}</NavLink></button>
    </section>
  );
};

export default RegistrationSection;
