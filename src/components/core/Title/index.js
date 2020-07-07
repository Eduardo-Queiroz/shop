import React from "react";
import { Title as RNTitle } from "react-native-paper";
import { useCavy, wrap } from "cavy";

export const Title = (props) => {
  const generateTestHook = useCavy();
  const RNTitleTestable = wrap(RNTitle);
  return (
    <RNTitleTestable ref={generateTestHook(props.idTrack)} {...props}>
      {props.children}
    </RNTitleTestable>
  );
};
