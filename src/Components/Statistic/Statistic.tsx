import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';
import { baseUrl } from '../../data/content';

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
    return <div>Loading...</div>;
  }

  return (
    <Chart
      width="500px"
      height="300px"
      chartType="AreaChart"
      loader={<div>Loading Chart</div>}
      data={statistic}
      options={{
        title: 'Количество изученных слов по дням',
        hAxis: { title: 'День', titleTextStyle: { color: '#333' } },
        vAxis: { title: 'Количество слов', minValue: 0 },
        chartArea: { width: '50%', height: '70%' },
      }}
    />
  );
};

export default Statistic;
