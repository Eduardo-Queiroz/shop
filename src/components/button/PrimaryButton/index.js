import React from "react";
import { Button } from "react-native-paper";
import { useCavy } from "cavy";

export const PrimaryButton = ({ title, pending, idTrack, ref, ...props }) => {
  const generateTestHook = useCavy();
  return (
    <Button mode="contained" ref={generateTestHook(idTrack, ref)} {...props}>
      {title}
    </Button>
  );
};
