import React from "react";
import { Subheading as RNSubheading } from "react-native-paper";
import { useCavy, wrap } from "cavy";
import { colors } from "~/styles";

export const Subheading = (props) => {
  const generateTestHook = useCavy();
  const RNSubheadingTestable = wrap(RNSubheading);
  return (
    <RNSubheadingTestable
      style={{
        color: colors.primary,
      }}
      ref={generateTestHook(props.idTrack)}
      {...props}
    >
      {props.children}
    </RNSubheadingTestable>
  );
};
