import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
/// #if DEBUG
import { composeWithDevTools } from "redux-devtools-extension";
/// #endif

const reducer = {};
const middleWares = [thunk];

import { coreSlice } from "./Core";
reducer.core = coreSlice.reducer;

import { resizeSlice } from "./ResizeModule";
reducer.resize = resizeSlice.reducer;

import { counterSlice } from "./ViewElement/counter";
reducer.counter = counterSlice.reducer;

const gameReducer = combineReducers(reducer);
const gameStore = createStore(
  gameReducer,
  /// #if DEBUG
  composeWithDevTools(applyMiddleware(...middleWares)),
  /// #else
  applyMiddleware(...middleWares)
  /// #endif
);

export { gameStore };
