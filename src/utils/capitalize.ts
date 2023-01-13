export const capitalize = (text) => {
  if (text) {
    return text
      .split(" ")
      .map((word) => {
        return word[0].toUpperCase().concat(word.slice(1));
      })
      .join(" ");
  }
};
