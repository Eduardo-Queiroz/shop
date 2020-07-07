import React from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { withNavigation } from "react-navigation";
import { Container, Link, Row, Input, Title } from "~/components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Actions } from "~/redux/reducers/auth";
const { authSetFieldForm } = Actions;

const RegisterName = ({ navigation }) => {
  const dispatch = useDispatch();
  return (
    <Container>
      <KeyboardAwareScrollView>
        <Formik
          initialValues={{ name: "" }}
          onSubmit={({ name }) => {
            dispatch(authSetFieldForm({ name }));
            navigation.navigate("RegisterEmail");
          }}
          validationSchema={yup.object().shape({
            name: yup.string().required("Nome é obrigatorio"),
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
              <Title>Cadastre seu nome</Title>
              <Row />
              <Input
                idTrack="Register_Name"
                placeholder="Nome"
                autoCapitalize="none"
                value={values.name}
                onChangeText={(value) => setFieldValue("name", value)}
                onBlur={() => setFieldTouched("name")}
                error={errors.name}
                isErrorVisible={touched.name && errors.name}
              />
              <Link
                idTrack="Register_Name_Next"
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

export default withNavigation(RegisterName);
