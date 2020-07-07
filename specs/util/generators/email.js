export const emailGenerator = () =>
  `teste${new Date().getUTCMilliseconds()}${Math.floor(
    Math.random() * 9999
  )}@teste.com.br`;
