import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchHomeVideos } from "../utils/fetchHomeVideos";

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
    const result = await fetchHomeVideos(searchInput);

    if (typeof result === "string") {
      return rejectWithValue(result);
    }
    return result;
  },
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
        },
      )
      .addCase(getHomeVideos.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default HomeSlice.reducer;
