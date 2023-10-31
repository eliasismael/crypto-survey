import { useState, useEffect } from "react";

interface UseSubstractTime {
  initialTime: number;
  timeoutHandler: Function;
  dependencies: any[];
}

export const useSubstractTime = (args: UseSubstractTime) => {
  const { initialTime, timeoutHandler, dependencies } = args;
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

    let interval: NodeJS.Timer = setInterval(() => {
      setTimeLeft((prevTime) => getNewTime(prevTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [...dependencies]);

  return { timeLeft };
};
