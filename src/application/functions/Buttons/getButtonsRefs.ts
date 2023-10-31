import {
  type IdToButton,
  type ButtonRefs,
} from "../../../domain/models/Buttons";

export function getButtonsRefs(object: IdToButton): ButtonRefs {
  const buttonIds = Object.keys(object);
  const ref: ButtonRefs = {};

  buttonIds.forEach((button) => (ref[button] = null));

  return ref;
}
