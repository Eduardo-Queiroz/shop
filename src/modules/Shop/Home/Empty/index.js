import React from "react";
import { View } from "react-native";
import { Paragraph } from "react-native-paper";

const Empty = () => (
  <View
    style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 100,
    }}
  >
    <Paragraph>Nenhum produto para listar</Paragraph>
  </View>
);

export default Empty;
