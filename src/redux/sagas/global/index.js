import { fork, takeLatest, put, call } from "redux-saga/effects";
import { Toast } from "~/lib/util/toastLogger";
import { navigate } from "~/lib/util";
import AsyncStorage from "@react-native-community/async-storage";

import auth from "@react-native-firebase/auth";

import { Actions, Types } from "~/redux/reducers/global";
import { Actions as ActionsProfile } from "~/redux/reducers/profile";
const { globalInitPending, globalInitSuccess, globalInitError } = Actions;
const { profileUser } = ActionsProfile;

const filterError = ({ type }) => {
  const conditions = ["ERROR"];
  const notConditions = [];

  const isIncluded = conditions.length
    ? conditions.every((a) => type.includes(a))
    : false;
  const isNotIncluded = notConditions.length
    ? notConditions.every((a) => type.includes(a))
    : false;

  return isIncluded && !isNotIncluded;
};

function* errorHandling({ payload }) {
  try {
    Toast(payload, 2);
  } catch (e) {
    console.log(e);
  }
}

function* globalInit() {
  try {
    yield put(globalInitPending());
    const { uid } = auth().currentUser;
    yield call(AsyncStorage.setItem, "@Token", uid);
    yield put(globalInitSuccess({ token: uid }));
    yield put(profileUser());
    yield call(navigate, "ShopHome");
  } catch ({ code = "", message = "" }) {
    yield call(navigate, "Login");
    yield put(globalInitError(message));
  }
}

function* watchInit() {
  yield takeLatest(Types.GLOBAL_INIT, globalInit);
}

function* watchError() {
  yield takeLatest(filterError, errorHandling);
}

export default function* root() {
  yield fork(watchError);
  yield fork(watchInit);
}
