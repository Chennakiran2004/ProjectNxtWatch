import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import getAuthHeaders from "../Constants/getAuthHeaders";

import { getCookie } from "../Constants/storageUtilities";

interface VideoDetails {
  id: string;
  channel: {
    name: string;
    profileImageUrl: string;
  };
  publishedAt: string;
  viewCount: number;
  title: string;
  thumbnailUrl: string;
}

interface HomeState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  videosList: VideoDetails[];
}

const initialState: HomeState = {
  status: "idle",
  error: null,
  videosList: [],
};

export const getHomeVideos = createAsyncThunk(
  "home/getHomeVideos",
  async (searchInput: string, { rejectWithValue }) => {
    const jwtToken = getCookie();
    if (!jwtToken) {
      return rejectWithValue("User is not authenticated");
    }

    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`;
    const response = await fetch(url, {
      headers: getAuthHeaders(jwtToken),
    });

    if (response.ok) {
      const data = await response.json();
      return data.videos.map((eachItem: any) => ({
        id: eachItem.id,
        channel: {
          name: eachItem.channel.name,
          profileImageUrl: eachItem.channel.profile_image_url,
        },
        publishedAt: eachItem.published_at,
        viewCount: eachItem.view_count,
        title: eachItem.title,
        thumbnailUrl: eachItem.thumbnail_url,
      })) as VideoDetails[];
    }
  }
);

const HomeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHomeVideos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getHomeVideos.fulfilled,
        (state, action: PayloadAction<VideoDetails[] | undefined>) => {
          state.status = "succeeded";
          if (action.payload !== undefined) {
            state.videosList = action.payload;
          }
        }
      )
      .addCase(getHomeVideos.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default HomeSlice.reducer;
