import { createStore, compose, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
//reducer
import reducers from "../reducers";
//saga
import root from "../sagas";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const composer = __DEV__
  ? composeWithDevTools(applyMiddleware(...middlewares))
  : compose(applyMiddleware(...middlewares));

export const store = createStore(reducers, composer);

sagaMiddleware.run(root);
