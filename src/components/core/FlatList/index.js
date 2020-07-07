import React from "react";
import { FlatList as RNFlatList } from "react-native";
import { useCavy, wrap } from "cavy";

export const FlatList = ({ renderItem, trackExtractor, ...props }) => {
  const generateTestHook = useCavy();
  const ItemRender = wrap(renderItem);
  return (
    <RNFlatList
      {...props}
      renderItem={(item) => (
        <ItemRender ref={generateTestHook(trackExtractor(item))} {...item} />
      )}
    />
  );
};
