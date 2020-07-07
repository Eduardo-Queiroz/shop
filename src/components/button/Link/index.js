import React from "react";
import { Button } from "react-native-paper";
import { useCavy } from "cavy";

export const Link = ({ title, pending, idTrack, ref, ...props }) => {
  const generateTestHook = useCavy();
  return (
    <Button mode="text" ref={generateTestHook(idTrack, ref)} {...props}>
      {title}
    </Button>
  );
};
