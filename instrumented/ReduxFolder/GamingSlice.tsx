import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchGamingVideos } from "../utils/getGamingVideos";

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
    const result = await fetchGamingVideos()
    console.log(result)
    if (typeof result === "string") {
      return rejectWithValue(result)
    }
    return result
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
