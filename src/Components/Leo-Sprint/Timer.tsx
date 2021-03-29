import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleEnd } from '../../store/leoSprintActions';
import { RootState } from '../../store/rootReducer';

const Timer: React.FC = () => {
  const [stopWatch, setStopwatch] = useState<number>(0);
  const dispatch = useDispatch();
  const isLoaded = useSelector((state: RootState) => state.leosprintState.isLoaded);
  const delay = isLoaded ? 1000 : 10000;

  const tick = (): void => {
    setStopwatch((prev) => prev + 1);
  };

  useEffect(() => {
    if (stopWatch === 10) {
      dispatch(toggleEnd());
      return;
    }
    const id = setTimeout(tick, delay);
    // eslint-disable-next-line consistent-return
    return () => clearTimeout(id);
  }, [stopWatch, isLoaded]);

  return <div className="leosprint__timer">{`Timer: ${stopWatch}`}</div>;
};

export default Timer;
