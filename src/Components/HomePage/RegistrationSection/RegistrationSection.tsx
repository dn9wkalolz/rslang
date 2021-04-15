import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import { homepageContent } from '../../../data/content';
import './RegistrationSection.scss';

const RegistrationSection: React.FC = () => {
  const { registration } = homepageContent;
  const { isAuth } = useSelector((state: RootState) => state.auth);

  return (
    <section className={`homepage__registration ${isAuth ? 'hidden' : ''}`}>
      <h2 className="homepage__registration-title">{registration.title}</h2>
      <NavLink className={`homepage__registration-button ${isAuth ? 'hidden' : ''}`} to="/register">{registration.button}</NavLink>
    </section>
  );
};

export default RegistrationSection;
