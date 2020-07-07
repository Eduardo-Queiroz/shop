import { createActions, createReducer } from "reduxsauce";
import { request, requestPending, requestSuccess, requestError } from "../util";

const INITIAL_STATE = {
  formRegister: {},
  pending: 0,
};

const login = {
  authLogin: (payload) => ({
    type: "AUTH_LOGIN",
    payload,
  }),
  authLoginSuccess: (payload) => ({
    type: "AUTH_LOGIN_SUCCESS",
    payload,
  }),
  authLoginError: (payload) => ({
    type: "AUTH_LOGIN_ERROR",
    payload,
  }),
  authLoginPending: () => ({
    type: "AUTH_LOGIN_PENDING",
  }),
};

const register = {
  authRegister: (payload) => ({
    type: "AUTH_REGISTER",
    payload,
  }),
  authRegisterSuccess: () => ({
    type: "AUTH_REGISTER_SUCCESS",
  }),
  authRegisterError: (payload) => ({
    type: "AUTH_REGISTER_ERROR",
    payload,
  }),
  authRegisterPending: () => ({
    type: "AUTH_REGISTER_PENDING",
  }),
};

const authSetFieldForm = {
  authSetFieldForm: (payload) => ({
    type: "AUTH_SET_FIELD_FORM",
    payload,
  }),
};

const logout = {
  authLogout: (payload) => ({
    type: "AUTH_LOGOUT",
    payload,
  }),
  authLogoutSuccess: (payload) => ({
    type: "AUTH_LOGOUT_SUCCESS",
    payload,
  }),
  authLogoutError: (payload) => ({
    type: "AUTH_LOGOUT_ERROR",
    payload,
  }),
  authLogoutPending: () => ({
    type: "AUTH_LOGOUT_PENDING",
  }),
};

export const { Types, Creators: Actions } = createActions({
  ...login,
  ...register,
  ...authSetFieldForm,
  ...logout,
});

const clearForm = (state) => ({
  ...state,
  pending: 0,
  formRegister: {},
});

const setFieldForm = (state, { payload }) => ({
  ...state,
  formRegister: {
    ...state.formRegister,
    ...payload,
  },
});

export const HANDLERS = {
  [Types.AUTH_SET_FIELD_FORM]: setFieldForm,

  [Types.AUTH_LOGIN]: request,
  [Types.AUTH_LOGIN_PENDING]: requestPending,
  [Types.AUTH_LOGIN_ERROR]: requestError,
  [Types.AUTH_LOGIN_SUCCESS]: requestSuccess,

  [Types.AUTH_REGISTER]: request,
  [Types.AUTH_REGISTER_PENDING]: requestPending,
  [Types.AUTH_REGISTER_ERROR]: requestError,
  [Types.AUTH_REGISTER_SUCCESS]: clearForm,

  [Types.AUTH_LOGOUT]: request,
  [Types.AUTH_LOGOUT_PENDING]: requestPending,
  [Types.AUTH_LOGOUT_ERROR]: requestError,
  [Types.AUTH_LOGOUT_SUCCESS]: requestSuccess,
};

export const Reducer = createReducer(INITIAL_STATE, HANDLERS);
