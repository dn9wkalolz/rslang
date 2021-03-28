import React from 'react';
import { homepageContent } from '../../../data/content';
import './FeaturesSection.scss';

const FeaturesSection: React.FC = () => {
  const { features } = homepageContent;
  const { pluses } = features;

  return (
    <section className="homepage__features">
      <h2 className="homepage__features-title">{features.title}</h2>
      <div className="homepage__features-content">
        <div className="homepage__features-pluses">
          {
            pluses.map((plus:any) => (
              <div className="homepage__features-plus" key={plus.key}>
                <div className="homepage__features-plus--wrapper">
                  <div className="homepage__features-plus--content">
                    <img src={plus.img} alt={plus.text} />
                    <p>{plus.text}</p>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        <div className="homepage__features-image">
          <img src={features.image} alt={features.title} />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
