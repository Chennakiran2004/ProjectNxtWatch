import { configureStore } from "@reduxjs/toolkit";

import gamingReducer from "../ReduxFolder/GamingSlice";

import homeReducer from "../ReduxFolder/HomeSlice";

import trendingReducer from "../ReduxFolder/TrendingSlice";

import videoDetailsReducer from "../ReduxFolder/VideoDetailsSlice";

const store = configureStore({
  reducer: {
    gaming: gamingReducer,
    home: homeReducer,
    trending: trendingReducer,
    videoDetails: videoDetailsReducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
