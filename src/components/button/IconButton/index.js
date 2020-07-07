import React from "react";
import { IconButton as RNIconButton } from "react-native-paper";
import { useCavy, wrap } from "cavy";

export const IconButton = ({ idTrack, ref, ...props }) => {
  const generateTestHook = useCavy();
  const RNIconButtonTestable = wrap(RNIconButton);
  return (
    <RNIconButtonTestable ref={generateTestHook(idTrack, ref)} {...props} />
  );
};
