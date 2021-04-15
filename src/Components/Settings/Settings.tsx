import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '../../data/content';
import { RootState } from '../../store/rootReducer';
import {
  changeSettings, selectSettingsState, setIsButtonShowed, setIsTranslated, toggleSettingsMenu,
} from '../../store/settingsReducer';
import './Settings.scss';

const Settings: React.FC = () => {
  const { isButtonsShowed, isTranslated } = useSelector(selectSettingsState);
  const { userPhoto } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    const token = sessionStorage.getItem('token');
    fetch(`${baseUrl}users/${userId}/settings`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((result) => dispatch(changeSettings(result.optional)));
  }, []);

  const fetchSettings = () => {
    setIsLoading(true);
    const userId = sessionStorage.getItem('userId');
    const token = sessionStorage.getItem('token');
    fetch(`${baseUrl}users/${userId}/settings`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        optional: { userPhoto: userPhoto || 'empty', isTranslated, isButtonsShowed },
      }),
    })
      .then((response) => response.json())
      .then(() => {
        setIsLoading(false);
      });
  };

  const onSubmit = () => {
    fetchSettings();
    dispatch(toggleSettingsMenu());
  };

  return (
    <div className="settings__menu-popup">
      <h2 className="settings__menu-popup--title">Настройки</h2>
      <div className="settings__menu-popup--settings">
        <label htmlFor="translate" className={`translate ${isTranslated ? 'checked' : ''}`}>
          <input
            id="translate"
            name="translate"
            type="checkbox"
            onChange={() => dispatch(setIsTranslated())}
            checked={isTranslated}
          />
          отображать перевод на карточках слов
        </label>
        <label htmlFor="controls" className={`controls ${isButtonsShowed ? 'checked' : ''}`}>
          <input
            id="controls"
            name="control buttons"
            type="checkbox"
            onChange={() => dispatch(setIsButtonShowed())}
            checked={isButtonsShowed}
          />
          отображать кнопки управления карточками слов
        </label>
      </div>
      <div className="settings__menu-popup--button">
        <button
          type="button"
          onClick={onSubmit}
          disabled={isLoading}
        >
          Применить
        </button>
      </div>
      <button
        type="button"
        className="settings__menu-popup--close"
        onClick={() => dispatch(toggleSettingsMenu())}
      >
        +
      </button>
    </div>
  );
};

export default Settings;
