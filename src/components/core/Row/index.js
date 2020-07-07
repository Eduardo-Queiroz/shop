import React from "react";
import { View } from "react-native";

export const Row = (props) => (
  <View style={{ marginVertical: 5, flexDirection: "row" }}>
    {props.children}
  </View>
);
