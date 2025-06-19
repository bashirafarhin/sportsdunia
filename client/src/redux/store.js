import { createStore, applyMiddleware, combineReducers } from "redux";
import { newsReducer } from "./reducers/news.js";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
  news: newsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;