import { roundToHundreth } from "./roundNumber";

export const convertPressure = (millibars) => {
  return `${roundToHundreth(millibars * 0.02953)} in`;
};
