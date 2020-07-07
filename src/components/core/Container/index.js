import React from "react";
import { SafeAreaView, Dimensions } from "react-native";

export const Container = (props) => (
  <SafeAreaView
    style={{
      flex: 1,
      padding: 20,
      paddingTop: 0,
      backgroundColor: "#fff",
    }}
  >
    {props.children}
  </SafeAreaView>
);
