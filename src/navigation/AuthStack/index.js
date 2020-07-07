import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { Header } from "~/components";
import {
  Login,
  RegisterEmail,
  RegisterPassword,
  RegisterBirth,
  RegisterName,
} from "~/modules";

export default (mainStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
  RegisterName: {
    screen: RegisterName,
    navigationOptions: {
      header: <Header back />,
    },
  },
  RegisterEmail: {
    screen: RegisterEmail,
    navigationOptions: {
      header: <Header back />,
    },
  },
  RegisterBirth: {
    screen: RegisterBirth,
    navigationOptions: {
      header: <Header back />,
    },
  },
  RegisterPassword: {
    screen: RegisterPassword,
    navigationOptions: {
      header: <Header back />,
    },
  },
}));
