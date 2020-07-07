import React from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { withNavigation } from "react-navigation";
import {
  PrimaryButton,
  Input,
  Container,
  Link,
  Row,
  Title,
} from "~/components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Actions } from "~/redux/reducers/auth";
const { authLogin } = Actions;

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const pending = useSelector(({ auth: { pending } }) => pending);
  return (
    <Container>
      <KeyboardAwareScrollView>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => dispatch(authLogin(values))}
          validationSchema={yup.object().shape({
            email: yup
              .string()
              .email("Digite um e-mail válido")
              .required("Você precisa digitar seu e-mail para logar"),
            password: yup.string().required("Senha é obrigatoria"),
          })}
        >
          {({
            values,
            errors,
            setFieldValue,
            setFieldTouched,
            touched,
            isValid,
            handleSubmit,
          }) => (
            <>
              <Row />
              <Title>Login</Title>
              <Row />
              <Input
                idTrack="Login_Email"
                placeholder="E-mail"
                autoCapitalize="none"
                value={values.email}
                onChangeText={(value) => setFieldValue("email", value)}
                onBlur={() => setFieldTouched("email")}
                error={errors.email}
                isErrorVisible={touched.email && errors.email}
              />
              <Input
                idTrack="Login_Password"
                placeholder="Senha"
                autoCapitalize="none"
                secureTextEntry={true}
                value={values.password}
                onChangeText={(value) => setFieldValue("password", value)}
                onBlur={() => setFieldTouched("password")}
                error={errors.password}
                isErrorVisible={touched.password && errors.password}
                onSubmitEditing={handleSubmit}
              />
              <PrimaryButton
                idTrack="Login_Signin"
                loading={pending}
                title="Logar"
                onPress={handleSubmit}
              />
              <Row />
              <PrimaryButton
                idTrack="Login_Register"
                title="Cadastrar"
                onPress={() => navigation.navigate("RegisterName")}
              />
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </Container>
  );
};
export default withNavigation(Login);
