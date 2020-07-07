import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "~/styles";
import { StatusBar } from "react-native";
import styled, { ThemeProvider } from "styled-components/native";

const Themes = [
  {
    type: "default",
    iconColor: "#000",
    backgroundColor: colors.white,
    statusStyle: "dark-content",
    statusBackground: "#fff",
  },
];

const Container = styled.View`
  background-color: ${(props) => props.theme.backgroundColor};
  padding: 20px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  z-index: 1;
`;

const ContainerIcon = styled.TouchableOpacity.attrs(() => ({
  hitSlop: { top: 10, bottom: 10, left: 20, right: 20 },
}))`
  flex-direction: row;
`;

const Icon = styled(MaterialIcon)`
  color: ${(props) => props.theme.iconColor};
  font-size: 25;
`;

const Status = styled(StatusBar).attrs(({ theme }) => ({
  barStyle: theme.statusStyle,
  backgroundColor: theme.statusBackground,
}))``;

const ThemeHeader = styled(ThemeProvider).attrs(({ typeTheme }) => ({
  theme: {
    ...Themes.find((a) => a.type == typeTheme),
  },
}))``;

export { Status, Icon, Container, ContainerIcon, ThemeHeader };
