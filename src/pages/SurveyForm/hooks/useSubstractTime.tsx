import { useState, useEffect } from "react";

export const useSubstractTime = (
  initialTime: number,
  intervalTime: number,
  timeoutHandler: Function,
  dependencies: any[],
  stopTime: boolean[]
) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  let interval: NodeJS.Timer;

  useEffect(() => {
    const isCounterActive = stopTime.every((element) => !element);

    if (isCounterActive) {
      setTimeLeft(initialTime);

      const getNewTime = (prevTime: number) => {
        if (prevTime === 0) {
          timeoutHandler();
          return prevTime;
        }

        return prevTime - 1;
      };

      interval = setInterval(() => {
        setTimeLeft((prevTime) => getNewTime(prevTime));
      }, intervalTime);
    }

    return () => {
      clearInterval(interval);
    };
  }, [...dependencies, ...stopTime]);

  return timeLeft;
};
