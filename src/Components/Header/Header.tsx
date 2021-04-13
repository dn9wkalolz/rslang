import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar } from '@material-ui/core';
import { header } from '../../data/content';
import './Header.scss';
import { RootState } from '../../store/rootReducer';
import { logout } from '../../store/authReducer';
import Settings from '../Settings/Settings';
import { selectSettingsState, toggleSettingsMenu } from '../../store/settingsReducer';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuth, name, userPhoto } = useSelector((state: RootState) => state.auth);
  const {
    logo, settings, pages, auth,
  } = header;
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { settingsOpen } = useSelector(selectSettingsState);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  function toggleSettings() {
    dispatch(toggleSettingsMenu());
  }

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="header">
      <div className="header__content">
        <nav className={`header__nav ${menuOpen ? 'open' : ''}`}>
          <NavLink to={logo.link} className={`header__logo ${isAuth ? 'auth' : ''}`}>
            <img src={logo.img} alt={logo.imagAlt} />
          </NavLink>
          <input type="button" className="header__nav-burger" onClick={toggleMenu} />
          <ul className="header__nav-items">
            {isAuth && pages.map((page) => (
              <li className="header__nav-item" key={page.key}>
                <NavLink exact={page.exact} activeClassName="active" to={page.link} onClick={toggleMenu}>{page.name}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="header__settings">
          <ul className="header__settings-items">
            {isAuth && (
              <li className="header__settings-item settings">
                <button type="button" onClick={toggleSettings}>
                  <img src={settings.img} alt={settings.imgAlt} />
                </button>
              </li>
            )}
            <li className="header__settings-item auth">
              {isAuth ? (
                <div className="header__settings-item--auth">
                  <NavLink className="header__settings-item--auth-link" to="/account">
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
      <div className={`settings__menu ${settingsOpen ? '' : 'hidden'}`}>
        <Settings />
      </div>
    </header>
  );
};

export default Header;
