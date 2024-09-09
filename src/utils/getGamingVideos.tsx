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
export const fetchGamingVideos = async (): Promise<VideoDetails[] | string> => {
  const jwtToken = getCookie();
  if (!jwtToken) {
    return "User is not authenticated";
  }

  const url = "https://apis.ccbp.in/videos/gaming";
  const response = await fetch(url, {
    headers: getAuthHeaders(jwtToken),
    method: "GET",
  });

  if (response.ok) {
    const data = await response.json();
    return data.videos.map((eachItem: any) => ({
      id: eachItem.id,
      thumbnailUrl: eachItem.thumbnail_url,
      title: eachItem.title,
      viewCount: eachItem.view_count,
    })) as VideoDetails[];
  } else {
    return "Failed to fetch gaming videos";
  }
};
