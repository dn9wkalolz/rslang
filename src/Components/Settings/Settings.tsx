import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '../../data/content';
import {
  changeSettings, selectSettingsState, setIsButtonShowed, setIsTranslated,
} from '../../store/settingsReducer';

const Settings: React.FC = () => {
  const { isButtonsShowed, isTranslated, userPhoto } = useSelector(selectSettingsState);
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
      .then((result) => dispatch(changeSettings(result.optional)),
        () => console.error('пока нет настроек'));
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
        optional: { userPhoto, isTranslated, isButtonsShowed },
      }),
    })
      .then((response) => response.json())
      .then(() => {
        setIsLoading(false);
      });
  };

  const onSubmit = () => {
    fetchSettings();
  };

  return (
    <div>
      <h2>Настройки</h2>
      <div>
        <label htmlFor="translate">
          <input
            name="translate"
            type="checkbox"
            onChange={() => dispatch(setIsTranslated())}
            checked={isTranslated}
          />
          отображать перевод на карточках слов
        </label>
        <label htmlFor="control buttons">
          <input
            name="control buttons"
            type="checkbox"
            onChange={() => dispatch(setIsButtonShowed())}
            checked={isButtonsShowed}
          />
          отображать кнопки управления карточками слов
        </label>
      </div>
      <div>
        <button
          type="button"
          onClick={onSubmit}
          disabled={isLoading}
        >
          Применить
        </button>
      </div>
    </div>
  );
};

export default Settings;
