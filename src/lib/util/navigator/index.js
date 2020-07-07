import { StackActions, NavigationActions } from "react-navigation";

let navigator;
let _currentScreen = "";

export function setNavigator(ref) {
  navigator = ref;
}

export function navigate(routeName, params) {
  if (!navigator) return;

  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

export const getCurrentScreen = () => _currentScreen;

export const logScreen = (currentScreen) => {
  try {
    _currentScreen = currentScreen;
  } catch (error) {
    console.log(error);
  }
};
