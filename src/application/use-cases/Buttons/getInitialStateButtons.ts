import { Buttons } from "../../../domain/models/Buttons";
import { GetButtons } from "../../../domain/models/Buttons";

export const getInitialStateButtons: GetButtons = (): Buttons => {
  return {
    button1: {
      pressed: false,
      answerID: 0,
    },
    button2: {
      pressed: false,
      answerID: 0,
    },
    button3: {
      pressed: false,
      answerID: 0,
    },
  };
};

// const buttonsCreator = () => {
//   let buttonNumber = 0;

//   return function (): Buttons {
//     buttonNumber++;

//     return {
//       [`button${buttonNumber}`]: {
//         pressed: false,
//         answerID: 0,
//       },
//     };
//   };
// };

// export const createButton = buttonsCreator();

export const buttons: Buttons = getInitialStateButtons();
