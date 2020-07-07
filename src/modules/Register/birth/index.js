import React from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { withNavigation } from "react-navigation";
import moment from "moment";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Container, InputMask, Link, Row, Title } from "~/components";

import { Actions } from "~/redux/reducers/auth";
const { authSetFieldForm } = Actions;

const RegisterBirth = ({ navigation }) => {
  const dispatch = useDispatch();
  return (
    <Container>
      <KeyboardAwareScrollView>
        <Formik
          initialValues={{ birth: "" }}
          onSubmit={({ birth }) => {
            dispatch(authSetFieldForm({ birth }));
            navigation.navigate("RegisterPassword");
          }}
          validationSchema={yup.object().shape({
            birth: yup
              .string()
              .required("Data de nascimento é obrigatorio")
              .test("DOB", "Data incorreta", (value) =>
                moment(value, "DD/MM/YYYY", true).isValid()
              ),
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
              <Title>Qual o sua data de nascimento?</Title>
              <Row />
              <InputMask
                idTrack="Register_Birth"
                type={"datetime"}
                value={values.birth}
                options={{
                  format: "DD/MM/YYYY",
                }}
                onBlur={() => setFieldTouched("birth")}
                onChangeText={(birth) => setFieldValue("birth", birth)}
                placeholder="Digite sua data de nascimento"
                isErrorVisible={touched.birth && errors.birth}
                error={errors.birth}
                returnKeyType={"next"}
                onSubmitEditing={handleSubmit}
              />
              <Link
                idTrack="Register_Birth_Next"
                primary={isValid}
                title={"PRÓXIMO"}
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default withNavigation(RegisterBirth);
