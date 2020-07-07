import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import MainStack from "./MainStack";
import AuthStack from "./AuthStack";
import AuthLoadingNavigation from "./AuthLoadingNavigation";
import { setNavigator, logScreen } from "~/lib/util";

const RootStack = createSwitchNavigator({
  Start: {
    screen: AuthLoadingNavigation,
    navigationOptions: {
      header: null,
    },
  },
  Main: {
    screen: MainStack,
    navigationOptions: {
      header: () => null,
    },
  },
  Auth: {
    screen: AuthStack,
    navigationOptions: {
      header: null,
    },
  },
});

const Container = createAppContainer(RootStack);

const AppNavigator = () => {
  const getActiveRouteName = (navigationState) => {
    if (!navigationState) {
      return null;
    }
    const route = navigationState.routes[navigationState.index];
    // Dive into nested navigators
    if (route.routes) {
      return getActiveRouteName(route);
    }
    return {
      name: route.routeName,
      params: route.params,
      stack: navigationState.key,
    };
  };

  return (
    <Container
      ref={setNavigator}
      onNavigationStateChange={(prevState, currentState) => {
        const currentScreen = getActiveRouteName(currentState);
        const prevScreen = getActiveRouteName(prevState);
        if (prevScreen.name !== currentScreen.name) logScreen(currentScreen);
      }}
    />
  );
};
export default AppNavigator;
