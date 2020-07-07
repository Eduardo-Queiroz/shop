import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { withNavigation } from "react-navigation";
import { AndroidBackHandler } from "~/components";
import { Status, Icon, Container, ContainerIcon, ThemeHeader } from "./styles";

/**
 * Esse componente deve ser usado para qualquer header com icone nas laterais
 */
const Header = ({ navigation, close, closeTo, back, backTo }) => {
  /*
   * Esse icone é o close padrão
   * Caso esteja vazia ele tentará retornar uma tela na stack (pop).
   */
  const closeIcon = () => {
    if (close || closeTo)
      return (
        <ContainerIcon
          onPress={() =>
            closeTo ? navigation.navigate(closeTo) : navigation.pop()
          }
        >
          <Icon name="close" />
        </ContainerIcon>
      );
  };

  /*
   * Esse icone é o back padrão
   * Caso esteja vazia ele tentará retornar uma tela na stack (pop).
   */
  const backIcon = () => {
    if (back || backTo)
      return (
        <ContainerIcon
          onPress={() =>
            backTo ? navigation.navigate(backTo) : navigation.pop()
          }
        >
          <Icon name="arrow-left" />
        </ContainerIcon>
      );
  };

  return (
    <ThemeHeader
      typeTheme="default"
      hasIconLeft={close || closeTo}
      hasIconRight={back || backTo}
    >
      <View>
        <Status />
        <Container>
          {backIcon()}
          {closeIcon()}
        </Container>
        {(backTo || back || closeTo || close) && (
          <AndroidBackHandler backTo={backTo || closeTo} back={back || close} />
        )}
      </View>
    </ThemeHeader>
  );
};

Header.propTypes = {
  /*
   * Booleano que define se deve mostrar um icone de close a direta que quando clicado ira retornar uma tela na stack (pop).
   * Não pode existir junto ao icone generico
   */
  close: PropTypes.bool,
  /*
   * Uma string que caso esteja preechida define mostra um icone de close a direta e a tela que ira navegar.
   * Deve ser uma tela valida na navigation
   * Não pode existir junto ao icone generico
   */
  closeTo: PropTypes.string,
  /*
   * Booleano que define se deve mostrar um icone de back a esquerda que quando clicado ira retornar uma tela na stack (pop).
   */
  back: PropTypes.bool,
  /*
   * Uma string que caso esteja preechida define mostra um icone de back a esquerda e a tela que ira navegar.
   * Deve ser uma tela valida na navigation
   */
  backTo: PropTypes.string,
};

const HeaderWithNavigation = withNavigation(Header);
export { HeaderWithNavigation as Header };
