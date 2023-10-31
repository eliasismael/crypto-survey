// Hooks
import { useState, useRef } from "react";
// Models
import { ButtonRefs } from "../../../domain/models/Buttons";

// Data
import { questions } from "../../../infrastructure/connections/api/apiConsumer";
// Functions
import { createButtons } from "../../../application/functions/Buttons/createButtons";
import { getButtonsRefs } from "../../../application/functions/Buttons/getButtonsRefs";
import { setAllButtonsToUnpressed } from "../../../application/functions/Buttons/setAllButtonsToUnpressed";
import { registerAnswerID } from "../../../application/functions/Buttons/registerAnswerID";
import { IUser } from "../../../domain/models/User";

export const useSurveyForm = (user: IUser) => {
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [seeResultsAvailable, setSeeResultsAvaiable] = useState(false);

  const [buttons, setButtons] = useState(() => createButtons(3));
  const buttonRefs = useRef<ButtonRefs>(getButtonsRefs(buttons));

  const onSelectOptionHandler = (buttonID: string) => {
    // To uncheck the other one that can be selected before
    setAllButtonsToUnpressed(setButtons);

    // Mark the button as pressed
    setButtons((prevState) => ({
      ...prevState,
      [buttonID]: {
        ...prevState[buttonID],
        pressed: true,
      },
    }));
  };

  // When going to the next question
  const onSubmitHandler = (evt?: React.FormEvent<HTMLFormElement>) => {
    /* The event may not exist because responses are sent 
  automatically when the time is up if the user doesn't */
    evt?.preventDefault();

    setAllButtonsToUnpressed(setButtons);
    registerAnswerID(user, buttonRefs);

    const isLastQuestion =
      questions.indexOf(currentQuestion) === questions.length - 1;

    if (isLastQuestion) {
      setSeeResultsAvaiable(true);
      return;
    }

    const currentIndex = questions.indexOf(currentQuestion);
    const newQuestion = questions[currentIndex + 1];

    setCurrentQuestion(newQuestion);
  };

  return {
    currentQuestion,
    seeResultsAvailable,
    buttons,
    buttonRefs,
    onSelectOptionHandler,
    onSubmitHandler,
  };
};
