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

const mockVideos: VideoDetails[] = [
    {
      id: "1",
      channel: {
        name: "Mock Channel 1",
        profileImageUrl: "https://example.com/mock1.jpg",
      },
      publishedAt: "2024-08-08",
      viewCount: 10,
      title: "Mock Video 1",
      thumbnailUrl: "https://example.com/mock1.jpg",
    },
  ];

export const fetchHomeVideos = async (searchInput: string): Promise<VideoDetails[] | string> => {
  if (process.env.IS_JEST) {
    return mockVideos;
  }

  const jwtToken = getCookie();
  if (!jwtToken) {
    return "User is not authenticated";
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
  } else {
    return "Failed to fetch videos";
  }
};
