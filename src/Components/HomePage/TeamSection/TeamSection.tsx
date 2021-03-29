import React from 'react';
import { homepageContent } from '../../../data/content';
import './TeamSection.scss';

const TeamSection: React.FC = () => {
  const { team } = homepageContent;
  const { developers } = team;

  return (
    <section className="homepage__team">
      <h2 className="homepage__team-title">{team.title}</h2>
      <div className="homepage__team-content">
        {
          developers.map((developer) => (
            <div className="homepage__team-member" key={developer.key}>
              <div className="homepage__team-member--text">
                <h3>{developer.name}</h3>
                <p>{developer.game}</p>
                <p>{developer.page}</p>
              </div>
              <img src={developer.img} alt={developer.name} />
            </div>
          ))
        }
      </div>
    </section>
  );
};

export default TeamSection;
