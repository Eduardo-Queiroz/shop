import React from "react";
import { View, StatusBar } from "react-native";
import { withNavigation } from "react-navigation";
import { compose } from "recompose";
import { useSelector, useDispatch } from "react-redux";
import {
  SecondaryButton,
  IconButton,
  Text,
  Row,
  AlternativeInput,
} from "~/components";
import { withTheme } from "react-native-paper";
import { ContainerHeader } from "./styles";

import { Actions as AuthActions } from "~/redux/reducers/auth";
import { Actions } from "~/redux/reducers/shop";
const { authLogout } = AuthActions;
const { shopSetFieldNameSearch } = Actions;

const Header = ({ theme: { colors }, navigation }) => {
  const dispatch = useDispatch();
  const { name, nameSearch } = useSelector(({ profile: { user }, shop }) => ({
    nameSearch: shop.nameSearch,
    name: user.name,
  }));

  const logout = () => dispatch(authLogout());

  return (
    <ContainerHeader style={{ backgroundColor: colors.primary }}>
      <StatusBar barStyle="#fff" backgroundColor={colors.primary} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ padding: 14, paddingLeft: 0 }}>
          <Text style={{ color: "#fff" }}>Olá {name} (Dim. C-137)</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <IconButton
            idTrack="Shop_Header_Profile"
            size={22}
            color="#fff"
            icon="account"
            onPress={() => navigation.navigate("ProfileName")}
          />
          <IconButton
            idTrack="Shop_Header_Logout"
            size={22}
            color="#fff"
            icon="logout"
            onPress={() => logout()}
          />
        </View>
      </View>

      <AlternativeInput
        idTrack="Register_Name"
        placeholder="Pesquisar"
        value={nameSearch}
        onChangeText={(value) =>
          dispatch(shopSetFieldNameSearch({ nameSearch: value }))
        }
      />
    </ContainerHeader>
  );
};
export default compose(
  withTheme,
  withNavigation
)(Header);
