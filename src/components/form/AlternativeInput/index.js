import React from "react";
import { View } from "react-native";
import { HelperText } from "~/components";
import { TextInput } from "react-native-paper";
import PropTypes from "prop-types";
import { useCavy } from "cavy";

export const AlternativeInput = ({
  idTrack,
  inheritRef = () => {},
  error,
  isErrorVisible,
  ...otherProps
}) => {
  const generateTestHook = useCavy();
  return (
    <TextInput
      type="outlined"
      style={{ borderRadius: 4, height: 45 }}
      ref={generateTestHook(idTrack, inheritRef)}
      {...otherProps}
    />
  );
};

AlternativeInput.proptypes = {
  idTrack: PropTypes.string,
};
