import { call, fork, put, takeLatest, select } from "redux-saga/effects";
import { Actions, Types } from "~/redux/reducers/auth";
import { Actions as GlobalActions } from "~/redux/reducers/global";
import Service from "~/lib/api/services/auth";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { navigate } from "~/lib/util";

const {
  authLoginPending,
  authLoginSuccess,
  authLoginError,

  authRegisterPending,
  authRegisterSuccess,
  authRegisterError,

  authLogoutPending,
  authLogoutSuccess,
  authLogoutError,
} = Actions;

const { globalInit } = GlobalActions;

function* authLoginRequest({ payload: { email, password } }) {
  try {
    yield put(authLoginPending());
    yield auth().signInWithEmailAndPassword(email, password);
    yield put(globalInit());
    yield put(authLoginSuccess());
  } catch ({ code = "", message = "" }) {
    if (code === "auth/user-not-found")
      yield put(authLoginError("Usuario ou senha incorretos"));
    else yield put(authLoginError(message));
  }
}

function* authRegisterRequest({ payload }) {
  try {
    const form = yield select(({ auth }) => auth.formRegister);
    const { email, password, name, birth } = { ...form, ...payload };
    yield put(authRegisterPending());
    const { user } = yield auth().createUserWithEmailAndPassword(
      email,
      password
    );
    yield firestore()
      .collection("user")
      .doc(user.uid)
      .set({
        profile: {
          email,
          birth,
          name,
        },
      });
    yield put(globalInit());
    yield put(authRegisterSuccess());
  } catch ({ code = "", message = "" }) {
    if (code === "auth/email-already-in-use")
      yield put(authRegisterError("Este email ja esta em uso"));
    else if (code === "auth/invalid-email")
      yield put(authRegisterError("Este email é invalido"));
    else yield put(authRegisterError(message));
  }
}

function* authLogoutRequest({ payload }) {
  try {
    yield put(authLogoutPending());
    yield auth().signOut();
    yield put(authLogoutSuccess());
    navigate("Login");
  } catch ({ message = "" }) {
    yield put(authLogoutError(message));
  }
}

function* watchLogin() {
  yield takeLatest(Types.AUTH_LOGIN, authLoginRequest);
}

function* watchRegister() {
  yield takeLatest(Types.AUTH_REGISTER, authRegisterRequest);
}

function* watchLogout() {
  yield takeLatest(Types.AUTH_LOGOUT, authLogoutRequest);
}

export default function* root() {
  yield fork(watchLogin);
  yield fork(watchRegister);
  yield fork(watchLogout);
}
