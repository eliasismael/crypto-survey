import { useState, useEffect } from "react";

export const useSubstractTime = (
  initialTime: number,
  intervalTime: number,
  timeoutHandler: Function,
  dependencies: any[]
) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    setTimeLeft(initialTime);

    const getNewTime = (prevTime: number) => {
      if (prevTime === 0) {
        timeoutHandler();
        return prevTime;
      }

      return prevTime - 1;
    };

    let interval = setInterval(() => {
      setTimeLeft((prevTime) => getNewTime(prevTime));
    }, intervalTime);

    return () => clearInterval(interval);
  }, [...dependencies]);

  return timeLeft;
};
