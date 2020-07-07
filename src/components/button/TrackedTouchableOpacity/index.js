import React from "react";
import { TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { useCavy } from "cavy";

export const TrackedTouchableOpacity = ({
  pending,
  idTrack,
  ref = () => {},
  children,
  ...otherProps
}) => {
  const generateTestHook = useCavy();
  return (
    <TouchableOpacity ref={generateTestHook(idTrack, ref)} {...otherProps}>
      {children}
    </TouchableOpacity>
  );
};

TrackedTouchableOpacity.proptypes = {
  idTrack: PropTypes.string,
};
