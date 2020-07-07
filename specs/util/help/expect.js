import { getCurrentScreen } from "~/lib/util";

export const expectRoute = (route) => {
  if (route != getCurrentScreen().name) {
    console.log(
      `A navegação não foi para a tela correta(${route}), a tela final do fluxo era a ${
        getCurrentScreen().name
      }`
    );
    throw new Error(
      `A navegação não foi para a tela correta(${route}), a tela final do fluxo era a ${
        getCurrentScreen().name
      }`
    );
  }
};

export const expectBool = (bool, message = "Comparação não esperada") => {
  if (!bool) {
    console.log(message);
    throw new Error(message);
  }
};
