import React from 'react';
import HeroSection from './HeroSection/HeroSection';
import VideoSection from './VideoSection/VideoSection';
import './Homepage.scss';
import FeaturesSection from './FeaturesSection/FeaturesSection';
import GamesSection from './GamesSection/GamesSection';

const HomePage: React.FC = () => (
  <main>
    <HeroSection />
    <VideoSection />
    <FeaturesSection />
    <GamesSection />
  </main>
);

export default HomePage;
