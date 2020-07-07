import React from "react";
import { Text as RNText } from "react-native";
import { useCavy, wrap } from "cavy";
import PropTypes from "prop-types";

export const Text = (props) => {
  const generateTestHook = useCavy();
  const RNTextTestable = wrap(RNText);
  return (
    <RNTextTestable ref={generateTestHook(props.idTrack)} {...props}>
      {props.children}
    </RNTextTestable>
  );
};
