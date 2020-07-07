import { combineReducers } from "redux";
import { Reducer as global } from "./global";
import { Reducer as auth } from "./auth";
import { Reducer as shop } from "./shop";
import { Reducer as profile } from "./profile";

const AppReducer = combineReducers({
  global,
  auth,
  shop,
  profile,
});

const rootReducer = (state, action) => {
  switch (action.type) {
    case "AUTH_LOGOUT_SUCCESS":
      state = undefined;
      break;
  }
  return AppReducer(state, action);
};

export default rootReducer;
