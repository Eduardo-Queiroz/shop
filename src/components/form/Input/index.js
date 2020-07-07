import React from "react";
import { View } from "react-native";
import { HelperText } from "~/components";
import { TextInput } from "react-native-paper";
import PropTypes from "prop-types";
import { useCavy } from "cavy";

export const Input = ({
  idTrack,
  inheritRef = () => {},
  error,
  isErrorVisible,
  ...otherProps
}) => {
  const generateTestHook = useCavy();
  return (
    <View>
      <TextInput ref={generateTestHook(idTrack, inheritRef)} {...otherProps} />
      <HelperText
        type="error"
        visible={isErrorVisible}
        idTrack={`${idTrack}_Error`}
      >
        {error}
      </HelperText>
    </View>
  );
};

Input.proptypes = {
  idTrack: PropTypes.string,
};
