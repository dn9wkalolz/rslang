import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';
import { baseUrl } from '../../data/content';
import Preloader from '../common/Preloader/Preloader';
import './Statistics.scss';

const Statistic: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [statistic, setStatistic] = useState<Array<Array<any>>>([[]]);

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    const token = sessionStorage.getItem('token');
    fetch(`${baseUrl}users/${userId}/statistics`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        const resultToArray = result.optional?.stats
          ? JSON.parse(result.optional?.stats)
          : [['Дата', 'Слов'], ['пока нет слов', 0]];
        setStatistic(resultToArray);
        setIsLoaded(true);
      },
      (err) => {
        setError(err);
        setIsLoaded(true);
      });
  }, []);

  if (error) {
    return <div>{`Ошибка: ${error.message}`}</div>;
  }
  if (!isLoaded) {
    return <Preloader />;
  }

  return (
    <main className="statistics">
      <h1 className="statistics__title">Статистика</h1>
      <Chart
        width="100%"
        height="70vh"
        className="statistics__chart"
        chartType="AreaChart"
        loader={<div>Идет загрузка статистики</div>}
        data={statistic}
        options={{
          title: 'Количество изученных слов по дням',
          titleTextStyle: {
            fontName: 'Roboto', color: '#404040', fontSize: '20',
          },
          hAxis: {
            title: 'День',
            titleTextStyle: {
              color: '#404040', fontSize: '18', fontName: 'Roboto', italic: false,
            },
          },
          vAxis: {
            title: 'Количество слов',
            minValue: 0,
            titleTextStyle: {
              color: '#404040', fontSize: '18', fontName: 'Roboto', italic: false,
            },
          },
          chartArea: { width: '50%', height: '70%' },
          colors: ['#00D6E3'],
          animation: {
            startup: true,
            easing: 'linear',
            duration: 1000,
          },
        }}
      />
    </main>
  );
};

export default Statistic;
