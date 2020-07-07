export const passwordGenerator = () =>
  `millbody_test_${new Date().getUTCMilliseconds()}${Math.floor(
    Math.random() * 9999,
  )}`;
