import React from 'react';
import { footer } from '../../data/content';
import './Footer.scss';

const Footer: React.FC = () => {
  const { course, developers } = footer;

  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__logo">
          <a href={course.link} target="_blank" rel="noreferrer">
            <img src={course.img} alt={course.imgAlt} />
          </a>
        </div>
        <div className="footer__developers">
          {
            developers.map((developer) => (
              <a className="footer__developer" href={developer.github} target="_blank" rel="noreferrer" key={developer.key}>
                <img src={footer.githubLogo} alt={developer.name} />
                <h3>{developer.name}</h3>
              </a>
            ))
          }
        </div>
        <div className="footer__year">{footer.year}</div>
      </div>
    </footer>
  );
};

export default Footer;
