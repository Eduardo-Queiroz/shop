import { expectRoute, containsText, expectBool } from "../util";
import { navigate } from "~/lib/util";
import { getCurrentToast } from "~/lib/util/toastLogger";
import { emailGenerator, passwordGenerator } from "../util";

export const goToRegister = async (
  spec,
  { route } = {
    route: "RegisterName",
  }
) => {
  navigate("Login");
  await spec.press("Login_Register");
  expectRoute(route);
};

export const registerName = async (
  spec,
  { name, nameError, route } = {
    name: "Eduardo Queiroz",
    nameError: "",
    route: "RegisterEmail",
  }
) => {
  await spec.fillIn("Register_Name", name);
  if (nameError) {
    const registerEmailError = await spec.findComponent(`Register_Name_Error`);
    containsText(registerEmailError, emailError);
  }
  await spec.press("Register_Name_Next");
  await spec.pause(500);
  expectRoute(route);
};

export const registerEmail = async (
  spec,
  { email, emailError, route } = {
    email: emailGenerator(),
    emailError: "",
    route: "RegisterBirth",
  }
) => {
  await spec.fillIn("Register_Email", email);
  if (emailError) {
    const registerEmailError = await spec.findComponent(`Register_Email_Error`);
    containsText(registerEmailError, emailError);
  }
  await spec.press("Register_Email_Next");
  await spec.pause(500);
  expectRoute(route);
};

export const registerBirth = async (
  spec,
  { birth, birthError, route } = {
    birth: "18/04/1997",
    birthError: "",
    route: "RegisterPassword",
  }
) => {
  await spec.fillIn("Register_Birth", birth);
  if (birthError) {
    const registerEmailError = await spec.findComponent(`Register_Birth_Error`);
    containsText(registerEmailError, birthError);
  }
  await spec.press("Register_Birth_Next");
  await spec.pause(500);
  expectRoute(route);
};

export const registerPassword = async (
  spec,
  { password, passwordError, route, globalError } = {
    password: "teste123",
    passwordError: "",
    route: "ShopHome",
    globalError: "",
  }
) => {
  await spec.fillIn("Register_Password", password);
  if (passwordError) {
    const registerPasswordError = await spec.findComponent(
      `Register_Password_Error`
    );
    containsText(registerPasswordError, passwordError);
  }
  await spec.press("Register_Password_Next");
  await spec.pause(10000);
  expectRoute(route);
  if (globalError) expectBool(getCurrentToast() == globalError);
};
