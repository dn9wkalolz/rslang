import React from 'react';
import HeroSection from './HeroSection/HeroSection';
import VideoSection from './VideoSection/VideoSection';
import FeaturesSection from './FeaturesSection/FeaturesSection';
import GamesSection from './GamesSection/GamesSection';
import TeamSection from './TeamSection/TeamSection';
import RegistrationSection from './RegistrationSection/RegistrationSection';

const HomePage: React.FC = () => (
  <main>
    <HeroSection />
    <VideoSection />
    <FeaturesSection />
    <GamesSection />
    <TeamSection />
    <RegistrationSection />
  </main>
);

export default HomePage;
