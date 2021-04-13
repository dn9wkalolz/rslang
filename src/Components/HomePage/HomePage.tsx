import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import HeroSection from './HeroSection/HeroSection';
import VideoSection from './VideoSection/VideoSection';
import FeaturesSection from './FeaturesSection/FeaturesSection';
import TeamSection from './TeamSection/TeamSection';
import RegistrationSection from './RegistrationSection/RegistrationSection';
import Games from '../common/Games/Games';

const HomePage: React.FC = () => {
  const { isAuth } = useSelector((state: RootState) => state.auth);

  return (
    <main className="homepage">
      <HeroSection />
      <VideoSection />
      <FeaturesSection />
      {isAuth && <Games />}
      <TeamSection />
      <RegistrationSection />
    </main>
  );
};

export default HomePage;
