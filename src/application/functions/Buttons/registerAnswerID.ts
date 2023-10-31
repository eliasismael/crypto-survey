import { IUser } from "../../../domain/models/User";
import { ButtonsRef } from "../../../domain/models/Buttons";

export const registerAnswerID = (
  user: IUser,
  buttonsRefs: React.MutableRefObject<ButtonsRef>
): void => {
  const buttons: HTMLButtonElement[] = Object.values(buttonsRefs.current);

  const pressedButton = buttons.find((button) =>
    button.classList.contains("MuiButton-outlinedSecondary")
  );

  // pressedButton may not exist if responses were sent automatically, so we use "?" here
  const answerID = pressedButton?.getAttribute("data-answerid");
  const result = Number(answerID) || -1;

  user.addAnswerID(result);
};
