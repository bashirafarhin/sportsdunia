import axios from "axios";
import {
  FETCH_NEWS_REQUEST,
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_FAILURE,
} from "../constants/news";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export const fetchNews = (filters = {}) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_NEWS_REQUEST });
    const {
      keyword = "",
      category = "",
      from = "",
      to = "",
      author = "",
      type = "",
      page = 1,
    } = filters;

    let q = "";
    if (keyword) q += keyword;
    if (category) q += (q ? " " : "") + category;
    if (!q) q = "india";

    let url = `https://newsapi.org/v2/everything?apiKey=${API_KEY}&q=${encodeURIComponent(
      q
    )}&sortBy=publishedAt&page=${page}`;

    if (from) url += `&from=${from}`;
    if (to) url += `&to=${to}`;

    const localStorageKey = `news_cache_${encodeURIComponent(q)}_p${page}`;
    try {
      if (!navigator.onLine) { // Offline → use localStorage
        const cached = localStorage.getItem(localStorageKey);
        if (cached) {
          const data = JSON.parse(cached);
          dispatch({
            type: FETCH_NEWS_SUCCESS,
            payload: data,
          });
        } else {
          dispatch({
            type: FETCH_NEWS_FAILURE,
            payload: "No internet and no cached news available.",
          });
        }
        return;
      }

      const response = await axios.get(url);
      let filteredArticles = response.data.articles;

      // Client-side author filtering
      if (author) {
        const lowerAuthor = author.toLowerCase();
        filteredArticles = filteredArticles.filter(
          (a) => a.author && a.author.toLowerCase().includes(lowerAuthor)
        );
      }

      // Client-side type filtering
      if (type === "blog") {
        filteredArticles = filteredArticles.filter((a) =>
          a.source?.name?.toLowerCase().includes("blog")
        );
      } else if (type === "article") {
        filteredArticles = filteredArticles.filter(
          (a) => !a.source?.name?.toLowerCase().includes("blog")
        );
      }

      const resultPayload = {
        ...response.data,
        articles: filteredArticles,
      };

      // Cache to localStorage
      localStorage.setItem(localStorageKey, JSON.stringify(resultPayload));

      dispatch({
        type: FETCH_NEWS_SUCCESS,
        payload: resultPayload,
      });
    } catch (error) {
      // API failed → fallback to localStorage if available
      const cached = localStorage.getItem(localStorageKey);
      if (cached) {
        const data = JSON.parse(cached);
        dispatch({
          type: FETCH_NEWS_SUCCESS,
          payload: data,
        });
      } else {
        dispatch({
          type: FETCH_NEWS_FAILURE,
          payload: error.message || "Failed to fetch news",
        });
      }
    }
  };
};
