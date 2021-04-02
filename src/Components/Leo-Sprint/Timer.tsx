import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleEnd } from '../../store/leoSprintActions';

const Timer: React.FC = () => {
  const [stopWatch, setStopwatch] = useState<number>(0);
  const dispatch = useDispatch();

  const tick = (): void => {
    setStopwatch((prev) => prev + 1);
  };

  useEffect(() => {
    if (stopWatch === 10) {
      dispatch(toggleEnd());
      return;
    }
    const id = setTimeout(tick, 1000);
    // eslint-disable-next-line consistent-return
    return () => clearTimeout(id);
  }, [stopWatch]);

  return <div className="leosprint__timer">{`Timer: ${stopWatch}`}</div>;
};

export default Timer;
