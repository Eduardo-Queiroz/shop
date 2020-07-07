import React from "react";
import { ActivityIndicator, View } from "react-native";
import { IconButton, withTheme } from "react-native-paper";

const Loader = ({ theme: { colors } }) => (
  <View
    style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 100,
    }}
  >
    <ActivityIndicator hidesWhenStopped={true} color={colors.primary} />
  </View>
);

export default withTheme(Loader);
