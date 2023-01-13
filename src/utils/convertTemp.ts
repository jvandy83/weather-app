// (°C x 9/5) + 32

const convertCelsiusToFarenheit = (temp) => {
  return (temp * 9) / 5 + 32;
};

export const ctf = convertCelsiusToFarenheit;
