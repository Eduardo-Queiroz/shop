import RNToast from "react-native-simple-toast";
let _currentToast = "";
export const Toast = (message) => {
  _currentToast = message;
  RNToast.show(message, 2);
};

export const getCurrentToast = () => _currentToast;
