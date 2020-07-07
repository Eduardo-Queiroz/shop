module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    "babel-plugin-styled-components",
    [
      "babel-plugin-module-resolver",
      {
        root: ["./"],
        alias: {
          "~": "./src",
          "@": "./",
        },
      },
    ],
  ],
  env: {
    production: {
      plugins: ["react-native-paper/babel"],
    },
  },
};
