import React, { useEffect, useState } from 'react';

const Timer: React.FC = () => {
  const [stopWatch, setStopwatch] = useState<number>(0);
  useEffect(() => {
    const id = setInterval(() => {
      setStopwatch((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return <div className="leosprint__timer">{`Timer: ${stopWatch}`}</div>;
};

export default Timer;
