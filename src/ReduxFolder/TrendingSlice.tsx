import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import getAuthHeaders from "../Constants/getAuthHeaders";

import { getCookie } from "../Constants/storageUtilities";
import { fetchTrendingVideos } from "../utils/fetchTredingVideos";

interface Video {
  id: string;
  channel: {
    name: string;
    profileImageUrl: string;
  };
  publishedAt: string;
  thumbnailUrl: string;
  title: string;
  viewCount: number;
}

interface TrendingState {
  videosList: Video[];
  apiStatus: "initial" | "inProgress" | "success" | "failure";
  error: string | null;
}

const initialState: TrendingState = {
  videosList: [],
  apiStatus: "initial",
  error: null,
};

export const getTrendingVideos = createAsyncThunk(
  "trending/getTrendingVideos",
  async () => {
    const result = await fetchTrendingVideos();
    return result;
  },
);

const TrendingSlice = createSlice({
  name: "trending",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTrendingVideos.pending, (state) => {
        state.apiStatus = "inProgress";
        state.error = null;
      })
      .addCase(getTrendingVideos.fulfilled, (state, action) => {
        state.apiStatus = "success";
        state.videosList = action.payload;
        state.error = null;
      })
      .addCase(getTrendingVideos.rejected, (state, action) => {
        state.apiStatus = "failure";
        state.error = action.error.message || "Failed to fetch data";
      });
  },
});

export default TrendingSlice.reducer;
