export const renderDirectionalArrows = (direction) => {
  switch (direction) {
    case "N":
      return "\u2191";
    case "NNE":
      return "\u2197";
    case "NE":
      return "\u2197";
    case "ENE":
      return "\u2197";
    case "SE":
      return "\u2198";
    case "SSE":
      return "\u2198";
    case "S":
      return "\u2193";
    case "SSW":
      return "\u2199";
    case "SW":
      return "\u2199";
    case "WSW":
      return "\u2199";
    case "W":
      return "\u2190";
    case "WNW":
      return "\u2196";
    case "NW":
      return "\u2196";
    case "NNW":
      return "\u2196";
  }
};
