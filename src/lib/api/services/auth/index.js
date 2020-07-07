// @flow

import { AsyncStorage } from "react-native";

class AuthService {
  login = async ({ email, password }) => {
    const user = JSON.parse(await AsyncStorage.getItem("@Auth:" + email));
    if (user && user.password == password) return user;
    else throw new Error("Usuario não encontrado");
  };
  register = async ({ email, password }) => {
    await AsyncStorage.setItem(
      "@Auth:" + email,
      JSON.stringify({
        email,
        password,
      })
    );
  };
}
export default new AuthService();
