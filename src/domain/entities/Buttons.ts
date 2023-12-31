export type ButtonState = {
    pressed: boolean;
    answerID: number;
};

export type ButtonsState = {
    [key: string]: ButtonState;
};

export interface ButtonsRef {
    button1: null | HTMLButtonElement;
    button2: null | HTMLButtonElement;
    button3: null | HTMLButtonElement;
}

export type GetButtons = {
    (): ButtonsState;
};
