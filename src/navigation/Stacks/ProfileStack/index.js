import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { Header } from "~/components";
import {
  ProfileEmail,
  ProfilePassword,
  ProfileBirth,
  ProfileName,
} from "~/modules";

export default (mainStack = createStackNavigator({
  ProfileName: {
    screen: ProfileName,
    navigationOptions: {
      header: <Header back />,
    },
  },
  ProfileEmail: {
    screen: ProfileEmail,
    navigationOptions: {
      header: <Header back />,
    },
  },
  ProfileBirth: {
    screen: ProfileBirth,
    navigationOptions: {
      header: <Header back />,
    },
  },
  ProfilePassword: {
    screen: ProfilePassword,
    navigationOptions: {
      header: <Header back />,
    },
  },
}));
