import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleEnd } from '../../store/actions';

const Timer: React.FC = () => {
  const [stopWatch, setStopwatch] = useState<number>(0);
  const dispatch = useDispatch();

  const tick = (): void => {
    setStopwatch((prev) => prev + 1);
  };

  useEffect(() => {
    if (stopWatch === 61) {
      dispatch(toggleEnd());
      return;
    }
    setTimeout(tick, 1000);
  }, [stopWatch]);

  return <div className="leosprint__timer">{`Timer: ${stopWatch}`}</div>;
};

export default Timer;
