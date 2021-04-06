import React from 'react';
import loader from '../../../assets/img/circular-loading.svg';
import './Preloader.scss';

const Preloader: React.FC = () => (
  <div className="preloader">
    <img className="preloader__circularLoading" src={loader} alt="loader" />
  </div>
);

export default Preloader;
