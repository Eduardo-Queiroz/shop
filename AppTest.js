import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
// import OfflineNotice from "~/components/offlineNotice";
import { store } from "~/redux/store";
import Navigator from "~/navigation";

import { Tester, TestHookStore } from "cavy";
import { specs } from "./specs";

const testHookStore = new TestHookStore();
console.disableYellowBox = true;

const App = () => (
  <Tester
    specs={specs}
    store={testHookStore}
    waitTime={4000}
    startDelay={1000}
    clearAsyncStorage={true}
  >
    <ReduxProvider store={store}>
      <PaperProvider>
        <Navigator />
        {/* <OfflineNotice /> */}
      </PaperProvider>
    </ReduxProvider>
  </Tester>
);

export default App;
