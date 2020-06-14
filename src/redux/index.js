import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {rootReducer} from './reducers/rootReducer'


const initialState = {};
const enhancers = [];
const middleware = [thunk];

const composeFunc =
  process.env.NODE_ENV === "development" ? composeWithDevTools : compose;

const composedEnhancers = composeFunc(
  applyMiddleware(...middleware),
  ...enhancers
);

export const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
);