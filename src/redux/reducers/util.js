import { TrackedTouchableOpacity } from "~/components";

export const request = (state) => ({
  ...state,
});

export const requestPending = (state) => ({
  ...state,
  pending: true,
});

export const requestSuccess = (state, { payload }) => ({
  ...state,
  ...payload,
  pending: false,
});

export const requestError = (state, { payload }) => ({
  ...state,
  pending: false,
  errorMessage: payload,
});
