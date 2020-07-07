import React from "react";
import { HelperText as RNHelperText } from "react-native-paper";
import { useCavy, wrap } from "cavy";

export const HelperText = (props) => {
  const generateTestHook = useCavy();
  const RNHelperTextTestable = wrap(RNHelperText);
  return (
    <RNHelperTextTestable ref={generateTestHook(props.idTrack)} {...props}>
      {props.children}
    </RNHelperTextTestable>
  );
};
