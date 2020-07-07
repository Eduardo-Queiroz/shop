import React from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { withNavigation } from "react-navigation";
import { Container, Link, Row, Input, Title } from "~/components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Actions } from "~/redux/reducers/profile";
const { profileSetFieldForm } = Actions;

const ProfileName = ({ navigation }) => {
  const dispatch = useDispatch();
  const currentName = useSelector(({ profile: { user } }) => user.name);

  return (
    <Container>
      <KeyboardAwareScrollView>
        <Formik
          initialValues={{ name: currentName }}
          onSubmit={({ name }) => {
            dispatch(profileSetFieldForm({ name }));
            navigation.navigate("ProfileEmail");
          }}
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
                idTrack="Profile_Name"
                placeholder="Nome"
                autoCapitalize="none"
                value={values.name}
                onChangeText={(value) => setFieldValue("name", value)}
                onBlur={() => setFieldTouched("name")}
                error={errors.name}
                isErrorVisible={touched.name && errors.name}
              />
              <Link
                idTrack="Profile_Name_Next"
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

export default withNavigation(ProfileName);
