import { ButtonsState } from "../../../domain/entities/Buttons";

export const setAllButtonsToUnpressed = (
    setter: React.Dispatch<React.SetStateAction<ButtonsState>>
): void => {
    setter((prevState) => {
        const buttonsUnpressed = Object.keys(prevState).reduce(
            (acc, buttonKey) => {
                acc[buttonKey as keyof typeof prevState] = {
                    ...prevState[buttonKey as keyof typeof prevState],
                    pressed: false,
                };
                return acc;
            },
            {} as typeof prevState
        );

        return buttonsUnpressed;
    });
};
