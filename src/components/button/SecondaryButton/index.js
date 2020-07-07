import React from "react";
import { Text } from "react-native";
import { Button } from "react-native-paper";
import { useCavy } from "cavy";

export const SecondaryButton = ({
  title,
  pending,
  idTrack,
  ref,
  style,
  ...props
}) => {
  const generateTestHook = useCavy();
  return (
    <Button
      mode="contained"
      compact
      style={{
        borderRadius: 16,
        marginRight: 10,
        paddingHorizontal: 10,
        ...style,
      }}
      ref={generateTestHook(idTrack, ref)}
      {...props}
    >
      <Text style={{ fontSize: 10 }}>{title}</Text>
    </Button>
  );
};
