import { FC, useContext } from "react";

import { Link } from "react-router-dom";
import ThemeContext from "../../Context/ThemeContext";
import ActiveMenuContext from "../../Context/ActiveMenuContext";
import {
  VideoCardContainer,
  Thumbnail,
  ThumbnailText,
  VideoTitle,
  VideoTextContainer,
  VideoDetailsContainer,
  VideoDetailsText,
} from "./styledComponents";

interface GameDetails {
  thumbnailUrl: string;
  viewCount: string;
  title: string;
  id: string;
}

interface GamingCardBodyProps {
  gameDetails: GameDetails;
}

const GamingCardBody: FC<GamingCardBodyProps> = ({ gameDetails }) => {
  const { thumbnailUrl, viewCount, title, id } = gameDetails;

  const themeContext = useContext(ThemeContext);
  const activeMenuContext = useContext(ActiveMenuContext);

  const theme = themeContext.isDarkTheme ? "dark" : "light";

  return (
    <VideoCardContainer>
      <Link
        to={`/videos/${id}`}
        className="link"
        onClick={() => activeMenuContext.changeActiveMenu("initial")}
      >
        <Thumbnail src={thumbnailUrl} alt="video thumbnail" />
        <ThumbnailText>
          <VideoTextContainer>
            <VideoTitle theme={theme}>{title}</VideoTitle>
            <VideoDetailsContainer>
              <VideoDetailsText>
                {viewCount} Watching Worldwide
              </VideoDetailsText>
            </VideoDetailsContainer>
          </VideoTextContainer>
        </ThumbnailText>
      </Link>
    </VideoCardContainer>
  );
};

export default GamingCardBody;
