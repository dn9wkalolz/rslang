import React from 'react';
import homepageContent from '../../../data/content';
import './VideoSection.scss';

const VideoSection: React.FC = () => {
  const { video } = homepageContent;

  return (
    <section className="homepage__video">
      <h2 className="homepage__video-title">{video.title}</h2>
      <iframe className="homepage__video-iframe" width="560" height="315" src={video.youtube} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
    </section>
  );
};

export default VideoSection;
