import { IdToButton } from "../../../domain/models/Buttons";

const buttonCreator = (): Function => {
  let buttonNumber = 0;

  return (): IdToButton => {
    buttonNumber++;

    const button = {
      [`button${buttonNumber}`]: {
        pressed: false,
        answerID: 0,
      },
    };

    return button;
  };
};

const createButtons = (amount: number): IdToButton => {
  const buttons = {};
  const createButton = buttonCreator();

  for (let i = 0; i < amount; i++) {
    const button = createButton();
    Object.assign(buttons, button);
  }

  return buttons;
};

export { createButtons };
