import { IdToButton } from "../../../domain/models/Buttons";

export const setAllButtonsToUnpressed = (
  set: React.Dispatch<React.SetStateAction<IdToButton>>
) => {
  set((prevState) => {
    const entries = Object.entries(prevState);
    const newEntries = entries.map(([key, value]) => [
      key,
      { ...value, pressed: false },
    ]);

    const newState = Object.fromEntries(newEntries);

    return newState;
  });
};
