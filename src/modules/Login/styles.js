import styled from "styled-components/native";
import { colors, metrics } from "~/styles";

const Container = styled.View`
  background-color: #edf2f2;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
`;

const Content = styled.View`
  flex: 1;
  background-color: ${colors.white};
  padding: ${metrics.basePadding * 2}px;
  justify-content: space-around;
  align-items: stretch;
  flex-direction: column;
`;

export { Container, Content };
