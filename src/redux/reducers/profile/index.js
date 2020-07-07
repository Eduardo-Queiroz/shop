import { createActions, createReducer } from "reduxsauce";
import { request, requestPending, requestSuccess, requestError } from "../util";

const INITIAL_STATE = {
  user: "",
  formUpdateUser: {},
  pending: false,
};

const user = {
  profileUser: (payload) => ({
    type: "PROFILE_USER",
    payload,
  }),
  profileUserSuccess: (payload) => ({
    type: "PROFILE_USER_SUCCESS",
    payload,
  }),
  profileUserError: (payload) => ({
    type: "PROFILE_USER_ERROR",
    payload,
  }),
  profileUserPending: () => ({
    type: "PROFILE_USER_PENDING",
  }),
};

const updateUser = {
  profileUpdateUser: (payload) => ({
    type: "PROFILE_UPDATE_USER",
    payload,
  }),
  profileUpdateUserSuccess: () => ({
    type: "PROFILE_UPDATE_USER_SUCCESS",
  }),
  profileUpdateUserError: (payload) => ({
    type: "PROFILE_UPDATE_USER_ERROR",
    payload,
  }),
  profileUpdateUserPending: () => ({
    type: "PROFILE_UPDATE_USER_PENDING",
  }),
};

const setFieldForm = {
  profileSetFieldForm: (payload) => ({
    type: "PROFILE_SET_FIELD_FORM",
    payload,
  }),
};

export const { Types, Creators: Actions } = createActions({
  ...user,
  ...updateUser,
  ...setFieldForm,
});

const clearForm = (state) => ({
  ...state,
  pending: 0,
  formProfile: {},
});

const setFieldFormUpdateUser = (state, { payload }) => ({
  ...state,
  formUpdateUser: {
    ...state.formUpdateUser,
    ...payload,
  },
});

export const HANDLERS = {
  [Types.PROFILE_SET_FIELD_FORM]: setFieldFormUpdateUser,

  [Types.PROFILE_USER]: request,
  [Types.PROFILE_USER_PENDING]: requestPending,
  [Types.PROFILE_USER_ERROR]: requestError,
  [Types.PROFILE_USER_SUCCESS]: requestSuccess,

  [Types.PROFILE_UPDATE_USER]: request,
  [Types.PROFILE_UPDATE_USER_PENDING]: requestPending,
  [Types.PROFILE_UPDATE_USER_ERROR]: requestError,
  [Types.PROFILE_UPDATE_USER_SUCCESS]: clearForm,
};

export const Reducer = createReducer(INITIAL_STATE, HANDLERS);
