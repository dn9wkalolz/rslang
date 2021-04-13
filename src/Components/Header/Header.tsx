import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar } from '@material-ui/core';
import { header } from '../../data/content';
import './Header.scss';
import { RootState } from '../../store/rootReducer';
import { logout } from '../../store/authReducer';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuth, name, userPhoto } = useSelector((state: RootState) => state.auth);
  const {
    logo, settings, pages, auth,
  } = header;
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="header">
      <div className="header__content">
        <nav className={`header__nav ${menuOpen ? 'open' : ''}`}>
          <NavLink to={logo.link} className="header__logo">
            <img src={logo.img} alt={logo.imagAlt} />
          </NavLink>
          <input type="button" className="header__nav-burger" onClick={toggleMenu} />
          <ul className="header__nav-items">
            {isAuth && pages.map((page) => (
              <li className="header__nav-item" key={page.key}>
                <NavLink exact={page.exact} activeClassName="active" to={page.link}>{page.name}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="header__settings">
          <ul className="header__settings-items">
            {isAuth && (
              <li className="header__settings-item settings">
                <NavLink to="/settings">
                  <img src={settings.img} alt={settings.imgAlt} />
                </NavLink>
              </li>
            )}
            <li className="header__settings-item auth">
              {isAuth ? (
                <div>
                  <NavLink to="/account">
                    <Avatar src={userPhoto || undefined} />
                    {`${name} | `}
                  </NavLink>
                  <button onClick={onLogout} type="button">{auth.logout}</button>
                </div>
              ) : <NavLink to="/login">{auth.login}</NavLink>}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
