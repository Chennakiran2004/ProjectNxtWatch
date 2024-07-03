import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import getAuthHeaders from "../Constants/getAuthHeaders";

import { getCookie } from "../Constants/storageUtilities";

interface VideoDetails {
  id: string;
  thumbnailUrl: string;
  title: string;
  viewCount: number;
}

interface GamingState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  videosList: VideoDetails[];
}

const initialState: GamingState = {
  status: "idle",
  error: null,
  videosList: [],
};

export const getGamingVideos = createAsyncThunk(
  "gaming/getGamingVideos",
  async (_, { rejectWithValue }) => {
    const jwtToken = getCookie();
    if (!jwtToken) {
      return rejectWithValue("User is not authenticated");
    }

    const url = "https://apis.ccbp.in/videos/gaming";
    const response = await fetch(url, {
      headers: getAuthHeaders(jwtToken),
    });

    if (!response.ok) {
      return rejectWithValue("Failed to fetch gaming videos");
    }

    const data = await response.json();
    return data.videos.map((eachItem: any) => ({
      id: eachItem.id,
      thumbnailUrl: eachItem.thumbnail_url,
      title: eachItem.title,
      viewCount: eachItem.view_count,
    })) as VideoDetails[];
  }
);

const GamingSlice = createSlice({
  name: "gaming",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGamingVideos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getGamingVideos.fulfilled,
        (state, action: PayloadAction<VideoDetails[]>) => {
          state.status = "succeeded";
          state.videosList = action.payload;
        }
      )
      .addCase(
        getGamingVideos.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.error = action.payload;
        }
      );
  },
});

export default GamingSlice.reducer;
