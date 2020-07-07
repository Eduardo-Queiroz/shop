import React from "react";
import { Paragraph as RNParagraph } from "react-native-paper";
import { useCavy, wrap } from "cavy";

export const Paragraph = (props) => {
  const generateTestHook = useCavy();
  const RNParagraphTestable = wrap(RNParagraph);
  return (
    <RNParagraphTestable ref={generateTestHook(props.idTrack)} {...props}>
      {props.children}
    </RNParagraphTestable>
  );
};
