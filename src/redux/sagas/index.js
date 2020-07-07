import { fork, put, take, select, call, takeLatest } from "redux-saga/effects";

import auth from "./auth";
import global from "./global";
import shop from "./shop";
import profile from "./profile";

export default function* root() {
  try {
    yield fork(global);
    yield fork(auth);
    yield fork(shop);
    yield fork(profile);
  } catch (e) {
    console.error(e);
  }
}
