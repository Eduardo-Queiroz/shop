import React from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { withNavigation } from "react-navigation";
import { Container, Link, Row, Input, Title } from "~/components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Actions } from "~/redux/reducers/auth";
const { authSetFieldForm } = Actions;

const RegisterEmail = ({ navigation }) => {
  const dispatch = useDispatch();
  return (
    <Container>
      <KeyboardAwareScrollView>
        <Formik
          initialValues={{ email: "" }}
          onSubmit={({ email }) => {
            dispatch(authSetFieldForm({ email }));
            navigation.navigate("RegisterBirth");
          }}
          validationSchema={yup.object().shape({
            email: yup
              .string()
              .email("Digite um e-mail válido")
              .required("Você precisa digitar seu e-mail para logar"),
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
              <Title>Cadastre seu Email</Title>
              <Row />
              <Input
                idTrack="Register_Email"
                placeholder="E-mail"
                autoCapitalize="none"
                value={values.email}
                onChangeText={(value) => setFieldValue("email", value)}
                onBlur={() => setFieldTouched("email")}
                error={errors.email}
                isErrorVisible={touched.email && errors.email}
              />
              <Link
                idTrack="Register_Email_Next"
                title="Proximo"
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default withNavigation(RegisterEmail);
