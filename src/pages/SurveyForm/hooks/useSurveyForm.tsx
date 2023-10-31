// import { useState, useRef, useEffect } from "react";
// import { Buttons } from "../../../domain/models/Buttons";
// import { ButtonsRef } from "../../../domain/models/Buttons";
// import { setAllButtonsToUnpressed } from "../../../application/use-cases/Buttons/setAllButtonsToUnpressed";
// import { questions } from "../../../infrastructure/api/apiConsumer";
// import { buttons } from "../../../application/use-cases/Buttons/getInitialStateButtons";
// import { registerAnswerID } from "../../../application/use-cases/Buttons/registerAnswerID";
// // import { useSubstractTime } from "./useSubstractTime";
// import { IUser } from "../../../domain/models/User";
// import { getIndex } from "../../../application/helpers/getIndex";

// export const useSurveyForm = ({ user }: { user: IUser }) => {
//   const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
//   const [currentOptions, setCurrentOptions] = useState();

//   const [timeLeft, setTimeLeft] = useState(0);
//   const [isIntervalActive, setIsIntervalActive] = useState(true);
//   const [seeResultsAvailable, setSeeResultsAvaiable] = useState(false);

//   // Button state (pressed and what response it contains)
//   const [buttonsState, setButtonsState] = useState<Buttons>(buttons);

//   // To determine which one was pressed
//   const buttonsRefs = useRef<ButtonsRef>({
//     button1: null,
//     button2: null,
//     button3: null,
//   });

//   const handleOptionButtonClick = (buttonID: string) => {
//     // To uncheck the other one that can be selected before
//     setAllButtonsToUnpressed(setButtonsState);

//     // Mark the button as pressed
//     setButtonsState((prevState) => ({
//       ...prevState,
//       [buttonID]: {
//         ...prevState[buttonID as keyof typeof buttonsState],
//         pressed: true,
//       },
//     }));
//   };

//   // When going to the next question
//   const onSubmitHandler = (evt?: React.FormEvent<HTMLFormElement>) => {
//     /* The event may not exist because responses are sent
//          automatically when the time is up if the user doesn't */
//     evt?.preventDefault();

//     setAllButtonsToUnpressed(setButtonsState);
//     registerAnswerID(user, buttonsRefs);

//     const isLastQuestions =
//       getIndex(questions, currentQuestion) === questions.length - 1;

//     if (isLastQuestions) {
//       setIsIntervalActive(false);
//       setSeeResultsAvaiable(true);
//     } else {
//       const currentQuestionIndex = getIndex(questions, currentQuestion);
//       const nextQuestion = questions[currentQuestionIndex + 1];
//       setCurrentQuestion(nextQuestion);
//     }
//   };

//   // const { timeLeft, isIntervalActive, setTimeLeft, setIsIntervalActive } =
//   //     useSubstractTime({
//   //         initialTime: currentQuestion.lifetimeSeconds,
//   //         timeReachZeroHandler: onSubmitHandler,
//   //         dependenciesArray: [currentOptions],
//   //     });

//   // Subtract time
//   useEffect(() => {
//     let interval: NodeJS.Timer | null = null;

//     if (isIntervalActive) {
//       setTimeLeft(currentQuestion.lifetimeSeconds);

//       interval = setInterval(() => {
//         setTimeLeft((prevTime) => {
//           if (prevTime === 0) {
//             /* If the user did not submit the answer to the current
//                         question submit it when the time reaches 0 */
//             onSubmitHandler();
//             return prevTime;
//           }

//           const newTime = prevTime - 1 >= 0 ? prevTime - 1 : 0;
//           return newTime;
//         });
//       }, 1000);
//     } else {
//       setTimeLeft(0);
//     }

//     return () => {
//       if (interval) clearInterval(interval);
//     };
//   }, [currentQuestion, isIntervalActive]);

//   return {
//     timeLeft,
//     setTimeLeft,
//     setCurrentQuestion,
//     setCurrentOptions,
//     currentQuestion,
//     currentOptions,
//     isIntervalActive,
//     setIsIntervalActive,
//     seeResultsAvailable,
//     setSeeResultsAvaiable,
//     handleOptionButtonClick,
//     getQuestionIndex,
//     onSubmitHandler,
//     buttonsState,
//     buttonsRefs,
//   };
// };
