import { createActions, createReducer } from "reduxsauce";
import { request, requestPending, requestSuccess, requestError } from "../util";

const INITIAL_STATE = {
  nameSearch: "",
  list: null,
  like: [],
  next: "",
  pending: false,
  pendingLoadMore: false,
};

const list = {
  shopList: (payload = {}) => ({
    type: "SHOP_LIST",
    payload,
  }),
  shopListStorage: (payload = {}) => ({
    type: "SHOP_LIST_STORAGE",
    payload,
  }),
  shopListSuccess: (payload) => ({
    type: "SHOP_LIST_SUCCESS",
    payload,
  }),
  shopListError: (payload) => ({
    type: "SHOP_LIST_ERROR",
    payload,
  }),
  shopListPending: () => ({
    type: "SHOP_LIST_PENDING",
  }),
};

const listLoadMore = {
  shopListLoadMore: (payload = {}) => ({
    type: "SHOP_LIST_LOAD_MORE",
    payload,
  }),
  shopListLoadMoreSuccess: (payload) => ({
    type: "SHOP_LIST_LOAD_MORE_SUCCESS",
    payload,
  }),
  shopListLoadMoreError: (payload) => ({
    type: "SHOP_LIST_LOAD_MORE_ERROR",
    payload,
  }),
  shopListLoadMorePending: () => ({
    type: "SHOP_LIST_LOAD_MORE_PENDING",
  }),
};

const like = {
  shopLike: (payload) => ({
    type: "SHOP_LIKE",
    payload,
  }),
  shopLikeStorage: (payload) => ({
    type: "SHOP_LIKE_STORAGE",
    payload,
  }),
  shopLikeSuccess: (payload) => ({
    type: "SHOP_LIKE_SUCCESS",
    payload,
  }),
  shopLikeError: (payload) => ({
    type: "SHOP_LIKE_ERROR",
    payload,
  }),
  shopLikePending: () => ({
    type: "SHOP_LIKE_PENDING",
  }),
};

const addLike = {
  shopAddLike: (payload) => ({
    type: "SHOP_ADD_LIKE",
    payload,
  }),
  shopAddLikeSuccess: (payload) => ({
    type: "SHOP_ADD_LIKE_SUCCESS",
    payload,
  }),
  shopAddLikeError: (payload) => ({
    type: "SHOP_ADD_LIKE_ERROR",
    payload,
  }),
  shopAddLikePending: () => ({
    type: "SHOP_ADD_LIKE_PENDING",
  }),
};

const setFieldNameSearch = {
  shopSetFieldNameSearch: (payload) => ({
    type: "SHOP_SET_FIELD_NAME_SEARCH",
    payload,
  }),
};

const likeOptimisticUpdate = (state, { payload: { id, like } }) => ({
  ...state,
  list: state.list.map((a) => (a.id == id ? { ...a, like: !like } : a)),
});

const joinLikeAndList = (list, like) => {
  return list.map((item) =>
    like.find((value) => item.id == value)
      ? { ...item, like: true }
      : { ...item, like: false }
  );
};

const addLikeToList = (state, { payload: { like } }) => ({
  ...state,
  like,
  list: joinLikeAndList(state.list, like),
});

const addLikeToNextPageList = (state, { payload: { dataNextPage, next } }) => ({
  ...state,
  next,
  list: [...state.list, ...joinLikeAndList(dataNextPage, state.like)],
});

export const { Types, Creators: Actions } = createActions({
  ...like,
  ...addLike,
  ...list,
  ...listLoadMore,
  ...setFieldNameSearch,
});

export const HANDLERS = {
  [Types.SHOP_SET_FIELD_NAME_SEARCH]: requestSuccess,

  [Types.SHOP_LIST]: request,
  [Types.SHOP_LIST_PENDING]: requestPending,
  [Types.SHOP_LIST_ERROR]: requestError,
  [Types.SHOP_LIST_SUCCESS]: requestSuccess,
  [Types.SHOP_LIST_STORAGE]: requestSuccess,

  [Types.SHOP_LIST_LOAD_MORE]: request,
  [Types.SHOP_LIST_LOAD_MORE_PENDING]: requestPending,
  [Types.SHOP_LIST_LOAD_MORE_ERROR]: requestError,
  [Types.SHOP_LIST_LOAD_MORE_SUCCESS]: addLikeToNextPageList,

  [Types.SHOP_LIKE]: request,
  [Types.SHOP_LIKE_PENDING]: requestPending,
  [Types.SHOP_LIKE_ERROR]: requestError,
  [Types.SHOP_LIKE_SUCCESS]: addLikeToList,
  [Types.SHOP_LIKE_STORAGE]: addLikeToList,

  [Types.SHOP_ADD_LIKE]: likeOptimisticUpdate,
  [Types.SHOP_ADD_LIKE_PENDING]: requestPending,
  [Types.SHOP_ADD_LIKE_ERROR]: requestError,
  [Types.SHOP_ADD_LIKE_SUCCESS]: requestSuccess,
};

export const Reducer = createReducer(INITIAL_STATE, HANDLERS);
