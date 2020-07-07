import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { withNavigation } from "react-navigation";
import { ActivityIndicator, StatusBar } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "~/styles";
import { styles } from "./styles";
import { Actions as GlobalActions } from "~/redux/reducers/global";
import AsyncStorage from "@react-native-community/async-storage";

const { globalInit } = GlobalActions;

const AuthLoadingNavigation = ({ navigation }) => {
  const dispatch = useDispatch();

  const checkLogin = async () => {
    try {
      const token = await AsyncStorage.getItem("@Token");
      if (token) dispatch(globalInit());
      else navigation.navigate("Login");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={[colors.primaryDark, colors.primary]}
      style={styles.container}
    >
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <ActivityIndicator hidesWhenStopped={true} color={colors.white} />
    </LinearGradient>
  );
};

export default withNavigation(AuthLoadingNavigation);
