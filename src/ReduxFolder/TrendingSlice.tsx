import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import getAuthHeaders from "../Constants/getAuthHeaders";

import { getCookie } from "../Constants/storageUtilities";

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
    const jwtToken = getCookie() || "";
    const url = "https://apis.ccbp.in/videos/trending";
    const options = {
      headers: getAuthHeaders(jwtToken),
      method: "GET",
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data.videos.map((eachItem: any) => ({
      id: eachItem.id,
      channel: {
        name: eachItem.channel.name,
        profileImageUrl: eachItem.channel.profile_image_url,
      },
      publishedAt: eachItem.published_at,
      thumbnailUrl: eachItem.thumbnail_url,
      title: eachItem.title,
      viewCount: eachItem.view_count,
    }));
  }
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
