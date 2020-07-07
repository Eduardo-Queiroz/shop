import { fork, put, takeLatest, select, call } from "redux-saga/effects";
import { Actions, Types } from "~/redux/reducers/profile";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { navigate } from "~/lib/util";

const {
  profileUser,
  profileUserPending,
  profileUserSuccess,
  profileUserError,

  profileUpdateUserPending,
  profileUpdateUserSuccess,
  profileUpdateUserError,
} = Actions;

function* profileUserRequest({ payload }) {
  try {
    const token = yield select(({ global }) => global.token);
    yield put(profileUserPending());
    // yield profile().createUserWithEmailAndPassword(email, password);
    const user = yield firestore()
      .collection("user")
      .doc(token)
      .get();
    yield put(profileUserSuccess({ user: user.data().profile }));
  } catch ({ code = "", message = "" }) {
    yield put(profileUserError(message));
  }
}

function* profileUpdateUserRequest({ payload }) {
  try {
    const token = yield select(({ global }) => global.token);
    const { email: currentEmail } = yield select(({ profile }) => profile.user);
    const form = yield select(({ profile }) => profile.formUpdateUser);
    const { email, password, name, birth } = { ...form, ...payload };
    yield put(profileUpdateUserPending());
    yield auth().signInWithEmailAndPassword(currentEmail, password);
    var user = auth().currentUser;
    user.updateEmail(email);
    user.updatePassword(password);
    // yield profile().createUserWithEmailAndPassword(email, password);
    yield firestore()
      .collection("user")
      .doc(token)
      .update({
        profile: {
          email,
          birth,
          name,
        },
      });
    yield put(profileUser());
    yield put(profileUpdateUserSuccess());
    yield call(navigate, "ShopHome");
  } catch ({ code = "", message = "" }) {
    if (code === "profile/invalid-email")
      yield put(profileUpdateUserError("Este email é invalido"));
    else yield put(profileUpdateUserError(message));
  }
}

function* watchUser() {
  yield takeLatest(Types.PROFILE_USER, profileUserRequest);
}

function* watchUpdateUser() {
  yield takeLatest(Types.PROFILE_UPDATE_USER, profileUpdateUserRequest);
}

export default function* root() {
  yield fork(watchUser);
  yield fork(watchUpdateUser);
}
