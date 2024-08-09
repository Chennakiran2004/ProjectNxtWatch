import { configureStore, combineReducers } from "@reduxjs/toolkit";
import gamingReducer from "../ReduxFolder/GamingSlice";
import homeReducer from "../ReduxFolder/HomeSlice";
import trendingReducer from "../ReduxFolder/TrendingSlice";
import videoDetailsReducer from "../ReduxFolder/VideoDetailsSlice";

const rootReducer = combineReducers({
  gaming: gamingReducer,
  home: homeReducer,
  trending: trendingReducer,
  videoDetails: videoDetailsReducer,
}) 

export const setupStore = (preloadedState?: any) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};


const store = setupStore()

export default store


export type AppDispatch = ReturnType<typeof setupStore>['dispatch'];

export type RootState = {
  gaming: ReturnType<typeof gamingReducer>;
  home: ReturnType<typeof homeReducer>;
  trending: ReturnType<typeof trendingReducer>;
  videoDetails: ReturnType<typeof videoDetailsReducer>;
};
