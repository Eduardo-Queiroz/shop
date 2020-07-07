import { createActions, createReducer } from "reduxsauce";
import { request, requestPending, requestSuccess, requestError } from "../util";

const INITIAL_STATE = {
  token: "",
};

const init = {
  globalInit: (payload) => ({
    type: "GLOBAL_INIT",
    payload,
  }),
  globalInitSuccess: (payload) => ({
    type: "GLOBAL_INIT_SUCCESS",
    payload,
  }),
  globalInitError: (payload) => ({
    type: "GLOBAL_INIT_ERROR",
    payload,
  }),
  globalInitPending: () => ({
    type: "GLOBAL_INIT_PENDING",
  }),
};

export const { Types, Creators: Actions } = createActions({
  ...init,
});

export const HANDLERS = {
  [Types.GLOBAL_INIT]: request,
  [Types.GLOBAL_INIT_PENDING]: requestPending,
  [Types.GLOBAL_INIT_ERROR]: requestError,
  [Types.GLOBAL_INIT_SUCCESS]: requestSuccess,
};

export const Reducer = createReducer(INITIAL_STATE, HANDLERS);
