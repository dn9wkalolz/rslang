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
      <button className="homepage__registration-button" type="button"><NavLink to="/register">{registration.button}</NavLink></button>
<!--       <NavLink className="homepage__registration-button" to="/login">{registration.button}</NavLink> -->
    </section>
  );
};

export default RegistrationSection;
