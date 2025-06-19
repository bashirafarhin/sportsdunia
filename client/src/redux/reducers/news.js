// src/redux/reducers/newsReducer.js
import {
  FETCH_NEWS_REQUEST,
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_FAILURE,
} from "../constants/news.js";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NEWS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_NEWS_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_NEWS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
