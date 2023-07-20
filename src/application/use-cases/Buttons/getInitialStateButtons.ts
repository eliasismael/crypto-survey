import { ButtonsState, GetButtons } from "../../../domain/entities/Buttons";

const getInitialStateButtons: GetButtons = (): ButtonsState => {
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

export const buttons: ButtonsState = getInitialStateButtons();
