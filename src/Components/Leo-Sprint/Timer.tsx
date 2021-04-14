import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleEnd } from '../../store/leoSprintActions';
import { leoSprintContent } from '../../data/content';

const Timer: React.FC = () => {
  const [stopWatch, setStopwatch] = useState<number>(0);
  const dispatch = useDispatch();
  const { timer } = leoSprintContent;

  const tick = (): void => {
    setStopwatch((prev) => prev + 1);
  };

  useEffect(() => {
    if (stopWatch === 61) {
      dispatch(toggleEnd());
      return;
    }
    const id = setTimeout(tick, 1000);
    // eslint-disable-next-line consistent-return
    return () => clearTimeout(id);
  }, [stopWatch]);

  return (
    <div className="leosprint__timer">
      <img src={timer.img} alt={timer.imgAlt} />
      {stopWatch}
    </div>
  );
};

export default Timer;
