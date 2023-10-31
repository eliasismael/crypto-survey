export interface Buttons {
  [key: string]: Button;
}

export interface Button {
  pressed: boolean;
  answerID: number;
}

export interface ButtonsRef {
  button1: null | HTMLButtonElement;
  button2: null | HTMLButtonElement;
  button3: null | HTMLButtonElement;
}

export type GetButtons = {
  (): Buttons;
};
