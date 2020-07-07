import React from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Container, Link, Row, Input, Title } from "~/components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Actions } from "~/redux/reducers/profile";
const { profileUpdateUser } = Actions;

const ProfilePassword = () => {
  const dispatch = useDispatch();
  const pending = useSelector(({ profile: { pending } }) => pending);
  return (
    <Container>
      <KeyboardAwareScrollView>
        <Formik
          initialValues={{ password: "", currentPassword: "" }}
          onSubmit={({ password, currentPassword }) => {
            dispatch(profileUpdateUser({ password, currentPassword }));
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
                idTrack="Profile_Password"
                placeholder="Senha atual"
                autoCapitalize="none"
                secureTextEntry={true}
                value={values.currentPassword}
                onChangeText={(value) =>
                  setFieldValue("currentPassword", value)
                }
                onBlur={() => setFieldTouched("currentPassword")}
                error={errors.currentPassword}
                isErrorVisible={
                  touched.currentPassword && errors.currentPassword
                }
                onSubmitEditing={handleSubmit}
              />
              <Row />
              <Input
                idTrack="Profile_New_Password"
                placeholder="Nova Senha"
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
                idTrack="Profile_Password_Next"
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

export default ProfilePassword;
