import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { header } from '../../data/content';
import './Header.scss';
import { RootState } from '../../store/rootReducer';
import { logout } from '../../store/authReducer';
import Settings from '../Settings/Settings';
import { selectSettingsState, toggleSettingsMenu } from '../../store/settingsReducer';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuth, name } = useSelector((state: RootState) => state.auth);
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

  useEffect(() => {
    // const createUser = async (user: any) => {
    //   const rawResponse = await fetch('https://rslang-61.herokuapp.com/users', {
    //     method: 'POST',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(user),
    //   });
    //   const content = await rawResponse.json();

    //   console.log(content);
    // };
    // createUser({ email: 'lopux3@user.com', password: 'qwertyuiop' });

    const loginUser = async (user: any) => {
      const rawResponse = await fetch('https://rslang-61.herokuapp.com/signin', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const content = await rawResponse.json();
      sessionStorage.setItem('token', content.token);
      sessionStorage.setItem('userId', content.userId);
    };
    loginUser({ email: 'lopux3@user.com', password: 'qwertyuiop' });
  }, []);

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
            {
              pages.map((page) => (
                <li className={`header__nav-item ${(!isAuth && !page.authFree) ? 'hidden' : ''} `} key={page.key}>
                  <NavLink exact={page.exact} activeClassName="active" to={page.link} onClick={toggleMenu}>{page.name}</NavLink>
                </li>
              ))
            }
          </ul>
        </nav>
        <div className="header__settings">
          <ul className="header__settings-items">
            <li className="header__settings-item settings">
              <button type="button" onClick={toggleSettings}>
                <img src={settings.img} alt={settings.imgAlt} />
              </button>
            </li>
            <li className="header__settings-item auth">
              {isAuth ? (
                <>
                  {name}
                  {' '}
                  <button onClick={onLogout} type="button">{auth.logout}</button>
                </>
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
