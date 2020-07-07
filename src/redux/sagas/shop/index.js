import { call, fork, put, takeLatest, select } from "redux-saga/effects";
import { Actions, Types } from "~/redux/reducers/shop";
import Service from "~/lib/api/services/shop";
import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-community/async-storage";

const {
  shopListPending,
  shopListSuccess,
  shopListStorage,
  shopListError,

  shopListLoadMorePending,
  shopListLoadMoreSuccess,
  shopListLoadMoreError,

  shopLike,
  shopLikePending,
  shopLikeSuccess,
  shopLikeStorage,
  shopLikeError,

  shopAddLikePending,
  shopAddLikeSuccess,
  shopAddLikeError,
} = Actions;

function* shopListRequest({ payload: { nameSearch } }) {
  try {
    const shopList = yield call(AsyncStorage.getItem, "@Shop:List");
    yield put(shopListStorage({ list: JSON.parse(shopList) || [] }));

    yield put(shopListPending());
    const {
      info: { next },
      results: list,
    } = yield call(Service.list, {
      name: nameSearch,
    });
    yield put(shopLike());
    yield put(shopListSuccess({ list, next }));

    yield AsyncStorage.setItem("@Shop:List", JSON.stringify(list));
  } catch ({ message }) {
    yield put(shopListError(message));
  }
}

function* shopListLoadMoreRequest() {
  try {
    const nextPage = yield select(({ shop: { next } }) => next);
    if (nextPage) {
      yield put(shopListLoadMorePending());
      const {
        info: { next },
        results: dataNextPage,
      } = yield call(Service.listLoadMore, {
        nextPage,
      });
      yield put(shopListLoadMoreSuccess({ dataNextPage, next }));
    }
  } catch ({ message }) {
    yield put(shopListLoadMoreError(message));
  }
}

function* shopLikeRequest() {
  try {
    const token = yield select(({ global }) => global.token);

    const likes = yield AsyncStorage.getItem("@Shop:Likes");
    yield put(shopLikeStorage({ like: JSON.parse(likes) || [] }));

    yield put(shopLikePending());

    const user = yield firestore()
      .collection("user")
      .doc(token)
      .get();

    yield put(shopLikeSuccess({ like: user.data().like || [] }));

    yield AsyncStorage.setItem(
      "@Shop:Likes",
      JSON.stringify(user.data().like || [])
    );
  } catch ({ message }) {
    yield put(shopLikeError(message));
  }
}

function* shopAddLikeRequest({ payload: { id, like } }) {
  try {
    const token = yield select(({ global }) => global.token);
    yield put(shopAddLikePending());
    yield firestore()
      .collection("user")
      .doc(token)
      .update({
        like: like
          ? firestore.FieldValue.arrayRemove(id)
          : firestore.FieldValue.arrayUnion(id),
      });

    const user = yield firestore()
      .collection("user")
      .doc(token)
      .get();

    yield put(shopAddLikeSuccess({ like: user.data().like || [] }));
    yield AsyncStorage.setItem(
      "@Shop:Likes",
      JSON.stringify(user.data().like || [])
    );
  } catch ({ message }) {
    yield put(shopAddLikeError(message));
  }
}

function* watchListLoadMore() {
  yield takeLatest(Types.SHOP_LIST_LOAD_MORE, shopListLoadMoreRequest);
}

function* watchList() {
  yield takeLatest(Types.SHOP_LIST, shopListRequest);
}

function* watchListSearch() {
  yield takeLatest(Types.SHOP_SET_FIELD_NAME_SEARCH, shopListRequest);
}

function* watchLike() {
  yield takeLatest(Types.SHOP_LIKE, shopLikeRequest);
}

function* watchAddLike() {
  yield takeLatest(Types.SHOP_ADD_LIKE, shopAddLikeRequest);
}

export default function* root() {
  yield fork(watchList);
  yield fork(watchLike);
  yield fork(watchListLoadMore);
  yield fork(watchListSearch);
  yield fork(watchAddLike);
}
