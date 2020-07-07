import React from "react";
import { View } from "react-native";
import { HelperText } from "~/components";
import { TextInput } from "react-native-paper";
import { TextInputMask } from "react-native-masked-text";
import PropTypes from "prop-types";
import { useCavy } from "cavy";

export const InputMask = ({
  idTrack,
  ref = () => {},
  error,
  isErrorVisible,
  ...otherProps
}) => {
  const generateTestHook = useCavy();
  return (
    <View>
      <TextInput
        {...otherProps}
        ref={generateTestHook(idTrack)}
        render={(props) => <TextInputMask {...props} />}
      />
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
InputMask.proptypes = {
  idTrack: PropTypes.string,
};
