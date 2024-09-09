import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getCookie } from "../Constants/storageUtilities";

import getAuthHeaders from "../Constants/getAuthHeaders";

export type VideoDetails = {
  id: string;
  description: string;
  publishedAt: string;
  thumbnailUrl: string;
  title: string;
  videoUrl: string;
  viewCount: number;
  channel: {
    name: string;
    profileImageUrl: string;
    subscriberCount: number;
  };
};

type VideoDetailsState = {
  apiStatus: string;
  videoDetails: VideoDetails;
  like: boolean;
  dislike: boolean;
};

const initialState: VideoDetailsState = {
  apiStatus: "initial",
  videoDetails: {
    id: "",
    description: "",
    publishedAt: "",
    thumbnailUrl: "",
    title: "",
    videoUrl: "",
    viewCount: 0,
    channel: {
      name: "",
      profileImageUrl: "",
      subscriberCount: 0,
    },
  },
  like: false,
  dislike: false,
};

export const fetchVideoDetails = createAsyncThunk(
  "videoDetails/fetchVideoDetails",
  async (id: string) => {
    const url = `https://apis.ccbp.in/videos/${id}`;
    const jwtToken = getCookie() || "";
    const options = {
      headers: getAuthHeaders(jwtToken),
      method: "GET",
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to fetch video details");
    }
    const data = await response.json();
    return data.video_details;
  },
);

const videoDetailsSlice = createSlice({
  name: "videoDetails",
  initialState,
  reducers: {
    toggleLike(state) {
      state.like = !state.like;
      state.dislike = false;
    },
    toggleDislike(state) {
      state.dislike = !state.dislike;
      state.like = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideoDetails.pending, (state) => {
        state.apiStatus = "inProgress";
      })
      .addCase(fetchVideoDetails.fulfilled, (state, action) => {
        const videoDetails = action.payload;
        state.videoDetails = {
          id: videoDetails.id,
          description: videoDetails.description,
          publishedAt: videoDetails.published_at,
          thumbnailUrl: videoDetails.thumbnail_url,
          title: videoDetails.title,
          videoUrl: videoDetails.video_url,
          viewCount: videoDetails.view_count,
          channel: {
            name: videoDetails.channel.name,
            profileImageUrl: videoDetails.channel.profile_image_url,
            subscriberCount: videoDetails.channel.subscriber_count,
          },
        };
        state.apiStatus = "success";
      })
      .addCase(fetchVideoDetails.rejected, (state) => {
        state.apiStatus = "failure";
      });
  },
});

export const { toggleLike, toggleDislike } = videoDetailsSlice.actions;

export default videoDetailsSlice.reducer;
