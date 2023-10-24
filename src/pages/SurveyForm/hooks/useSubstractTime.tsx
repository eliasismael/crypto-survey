// import { useState, useEffect } from "react";

// interface UseSubstractTime {
//     initialTime: number;
//     timeReachZeroHandler: Function;
//     dependenciesArray: any[];
// }

// export const useSubstractTime = (args: UseSubstractTime) => {
//     const { initialTime, timeReachZeroHandler, dependenciesArray } = args;

//     const [timeLeft, setTimeLeft] = useState(0);
//     const [isIntervalActive, setIsIntervalActive] = useState(true);

//     useEffect(() => {
//         let interval: NodeJS.Timer | null = null;

//         if (isIntervalActive) {
//             setTimeLeft(initialTime);

//             interval = setInterval(() => {
//                 setTimeLeft((prevTime) => {
//                     if (prevTime === 0) {
//                         /* If the user did not submit the answer to the current
//                         question submit it when the time reaches 0 */
//                         // onSubmitHandler();
//                         timeReachZeroHandler();
//                         return prevTime;
//                     }

//                     const newTime = prevTime - 1 >= 0 ? prevTime - 1 : 0;
//                     return newTime;
//                 });
//             }, 1000);
//         } else {
//             setTimeLeft(0);
//         }

//         return () => {
//             if (interval) clearInterval(interval);
//         };
//     }, [...dependenciesArray, isIntervalActive]);

//     return { timeLeft, isIntervalActive, setTimeLeft, setIsIntervalActive };
// };
