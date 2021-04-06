import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { header } from '../../data/content';
import './Header.scss';

const Header: React.FC = () => {
  const {
    logo, settings, pages, auth,
  } = header;
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
    <header className="header">
      <div className="header__content">
        <nav className={`header__nav ${menuOpen ? 'open' : ''}`}>
          <a href={logo.link} className="header__logo">
            <img src={logo.img} alt={logo.imagAlt} />
          </a>
          <input type="button" className="header__nav-burger" onClick={toggleMenu} />
          <ul className="header__nav-items">
            {
              pages.map((page) => (
                <li className="header__nav-item" key={page.key}>
                  <NavLink exact={page.exact} activeClassName="active" to={page.link}>{page.name}</NavLink>
                </li>
              ))
            }
          </ul>
        </nav>
        <div className="header__settings">
          <ul className="header__settings-items">
            <li className="header__settings-item settings">
              <img src={settings.img} alt={settings.imgAlt} />
            </li>
            <li className="header__settings-item auth">
              <button type="button">{auth.login}</button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
