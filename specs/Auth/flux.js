import { emailGenerator, passwordGenerator } from "../util";
import { login, logout } from "./feature";
export default function(spec) {
  spec.describe("Auth Flux", () => {
    spec.it("it should login with success", async () => {
      await login(spec);
    });
    spec.it("it should login and logout with success", async () => {
      await login(spec);
      await logout(spec);
    });
    spec.it("it should failed login because user not exists", async () => {
      await login(spec, {
        login: emailGenerator(),
        password: passwordGenerator(),
        route: "Login",
        globalError: "Usuario ou senha incorretos",
      });
    });
    spec.it("it should failed login because dont have password", async () => {
      await login(spec, {
        login: emailGenerator(),
        passwordError: "Senha é obrigatoria",
        route: "Login",
      });
    });
    spec.it("it should failed login because is a invalid email", async () => {
      await login(spec, {
        login: "teste",
        password: "teste",
        loginError: "Digite um e-mail válido",
        route: "Login",
      });
    });
    spec.it("it should failed login because dont have email", async () => {
      await login(spec, {
        password: "teste",
        loginError: "Você precisa digitar seu e-mail para logar",
        route: "Login",
      });
    });
  });
}
