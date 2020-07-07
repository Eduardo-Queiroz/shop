import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { Header } from "~/components";
import { ShopHome } from "~/modules";

export default (mainStack = createStackNavigator({
  ShopHome: {
    screen: ShopHome,
    navigationOptions: {
      header: null,
    },
  },
}));
