import getAuthHeaders from "../Constants/getAuthHeaders";

import { getCookie } from "../Constants/storageUtilities";

export const fetchTrendingVideos = async () => {
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
