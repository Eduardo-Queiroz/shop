import { createStackNavigator } from "react-navigation-stack";
import { ProfileStack, ShopStack } from "../Stacks";

export default (mainStack = createStackNavigator({
  ShopStack: {
    screen: ShopStack,
    navigationOptions: {
      header: null,
    },
  },
  ProfileStack: {
    screen: ProfileStack,
    navigationOptions: {
      header: null,
    },
  },
}));
