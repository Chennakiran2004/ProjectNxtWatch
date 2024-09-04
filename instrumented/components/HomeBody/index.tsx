import { FC, useContext } from "react";

import { Link } from "react-router-dom";

import { formatDistanceToNow } from "date-fns";

import ThemeContext from "../../Context/ThemeContext";

import ActiveMenuContext from "../../Context/ActiveMenuContext";

import {
  VideoCardContainer,
  Thumbnail,
  ChannelLogo,
  ThumbnailText,
  VideoTitle,
  VideoTextContainer,
  VideoDetailsContainer,
  VideoDetailsContainer2,
  VideoDetailsText,
} from "./styledComponents";

interface channel {
  name: string;
  profileImageUrl: string;
}

interface VideoDetails {
  thumbnailUrl: string;
  channel: channel;
  viewCount: string;
  title: string;
  id: string;
  publishedAt: string;
}

interface HomeBodyProps {
  videoDetails: VideoDetails;
}

const VideoCard: FC<HomeBodyProps> = ({ videoDetails }) => {
  const { thumbnailUrl, channel, viewCount, title, id, publishedAt } =
    videoDetails;

  let postedAt = formatDistanceToNow(new Date(publishedAt));
  const postedAtList = postedAt.split(" ");

  if (postedAtList.length === 3) {
    postedAtList.shift();
    postedAt = postedAtList.join(" ");
  }

  const { name, profileImageUrl } = channel;

  const themeContext = useContext(ThemeContext);
  const activeMenuContext = useContext(ActiveMenuContext);

  const theme = themeContext.isDarkTheme ? "dark" : "light";

  return (
    <VideoCardContainer as="li">
      <Link
        to={`/videos/${id}`}
        className="link"
        role="link"
        onClick={() => activeMenuContext.changeActiveMenu("initial")}
      >
        <Thumbnail src={thumbnailUrl} alt="video thumbnail" />
        <ThumbnailText>
          <div>
            <ChannelLogo src={profileImageUrl} alt="channel logo" />
          </div>
          <VideoTextContainer>
            <VideoTitle theme={theme}>{title}</VideoTitle>
            <VideoDetailsContainer>
              <VideoDetailsText>{name}</VideoDetailsText>
              <VideoDetailsContainer2>
                <VideoDetailsText>{viewCount} views</VideoDetailsText>
                <VideoDetailsText>{postedAt} ago</VideoDetailsText>
              </VideoDetailsContainer2>
            </VideoDetailsContainer>
          </VideoTextContainer>
        </ThumbnailText>
      </Link>
    </VideoCardContainer>
  );
};

export default VideoCard;
