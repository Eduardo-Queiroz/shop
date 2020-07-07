import React from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Container, Link, Row, Input, Title } from "~/components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Actions } from "~/redux/reducers/auth";
const { authRegister } = Actions;

const RegisterPassword = () => {
  const dispatch = useDispatch();
  const pending = useSelector(({ auth: { pending } }) => pending);
  return (
    <Container>
      <KeyboardAwareScrollView>
        <Formik
          initialValues={{ password: "" }}
          onSubmit={({ password }) => {
            dispatch(authRegister({ password }));
          }}
          validationSchema={yup.object().shape({
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
              <Title>Cadastre sua senha</Title>
              <Row />
              <Input
                idTrack="Register_Password"
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
              <Link
                idTrack="Register_Password_Next"
                loading={pending}
                title="Cadastrar"
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default RegisterPassword;
