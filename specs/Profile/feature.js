import { expectRoute, containsText, expectBool } from "../util";
import { login } from "../Auth/feature";
import { getCurrentToast } from "~/lib/util/toastLogger";

export const goToProfile = async (
  spec,
  { route } = {
    route: "ProfileName",
  }
) => {
  await login(spec);
  await spec.pause(1500);
  await spec.press("Shop_Header_Profile");
  expectRoute(route);
};

export const profileName = async (
  spec,
  { name, nameError, route } = {
    name: "Eduardo Queiroz",
    nameError: "",
    route: "ProfileEmail",
  }
) => {
  await spec.fillIn("Profile_Name", name);
  if (nameError) {
    const profileEmailError = await spec.findComponent(`Profile_Name_Error`);
    containsText(profileEmailError, emailError);
  }
  await spec.press("Profile_Name_Next");
  await spec.pause(500);
  expectRoute(route);
};

export const profileEmail = async (
  spec,
  { email, emailError, route } = {
    email: "e@e.com",
    emailError: "",
    route: "ProfileBirth",
  }
) => {
  await spec.fillIn("Profile_Email", email);
  if (emailError) {
    const profileEmailError = await spec.findComponent(`Profile_Email_Error`);
    containsText(profileEmailError, emailError);
  }
  await spec.press("Profile_Email_Next");
  await spec.pause(500);
  expectRoute(route);
};

export const profileBirth = async (
  spec,
  { birth, birthError, route } = {
    birth: "18/04/1997",
    birthError: "",
    route: "ProfilePassword",
  }
) => {
  await spec.fillIn("Profile_Birth", birth);
  if (birthError) {
    const profileEmailError = await spec.findComponent(`Profile_Birth_Error`);
    containsText(profileEmailError, birthError);
  }
  await spec.press("Profile_Birth_Next");
  await spec.pause(500);
  expectRoute(route);
};

export const profileNewPassword = async (
  spec,
  { password, passwordError, route, globalError } = {
    password: "teste123",
    passwordError: "",
    route: "ShopHome",
    globalError: "",
  }
) => {
  await spec.fillIn("Profile_New_Password", password);
  if (passwordError) {
    const profilePasswordError = await spec.findComponent(
      `Profile_Password_Error`
    );
    containsText(profilePasswordError, passwordError);
  }
};

export const profilePassword = async (
  spec,
  { password, passwordError, route, globalError } = {
    password: "teste123",
    passwordError: "",
    route: "ShopHome",
    globalError: "",
  }
) => {
  await spec.fillIn("Profile_Password", password);
  if (passwordError) {
    const profilePasswordError = await spec.findComponent(
      `Profile_Password_Error`
    );
    containsText(profilePasswordError, passwordError);
  }
  await spec.press("Profile_Password_Next");
  await spec.pause(10000);
  expectRoute(route);
  if (globalError) expectBool(getCurrentToast() == globalError);
};
