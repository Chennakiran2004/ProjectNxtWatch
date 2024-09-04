import React from "react";

import { VideoDetails } from "../ReduxFolder/VideoDetailsSlice";

const SavedVideosContext = React.createContext({
  save: false,
  savedVideosList: [] as VideoDetails[],
  addVideosToSavedVideos: (video: VideoDetails) => {},
  deleteVideosFromSavedVideos: (video: VideoDetails) => {},
  updateSave: (video: VideoDetails) => {},
});

export default SavedVideosContext;
