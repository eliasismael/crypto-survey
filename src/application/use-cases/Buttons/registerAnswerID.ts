import { UserModel } from "../../../domain/entities/User";
import { ButtonsRef } from "../../../domain/entities/Buttons";

export const registerAnswerID = (
    userInstance: UserModel,
    buttonsRefs: React.MutableRefObject<ButtonsRef>
): void => {
    const buttonElements: HTMLButtonElement[] = Object.values(
        buttonsRefs.current
    );

    const pressedButton = buttonElements.find((buttonElement) =>
        buttonElement.classList.contains("MuiButton-outlinedSecondary")
    );

    const answerID = pressedButton?.getAttribute("data-answerid");
    // pressedButton may not exist if responses were sent automatically, so we use "?" here

    const result = Number(answerID) || -1;

    userInstance.addAnswerID(result);
};
