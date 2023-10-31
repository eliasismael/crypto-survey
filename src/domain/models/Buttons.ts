export interface IdToButton {
  [key: string]: Button;
}

export interface Button {
  pressed: boolean;
  answerID: number;
}

export interface ButtonRefs {
  [key: string]: HTMLButtonElement | null;
}
