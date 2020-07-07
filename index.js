/**
 * @format
 */

import { AppRegistry } from "react-native";
import Config from "react-native-config";
import App from "./App";
import AppTest from "./AppTest";
import { name as appName } from "./app.json";

console.log(Config.IS_TEST);
AppRegistry.registerComponent(appName, () =>
  Config.IS_TEST == "true" ? AppTest : App
);
