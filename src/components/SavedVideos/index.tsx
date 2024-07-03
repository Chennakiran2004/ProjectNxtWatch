import { ReactElement, Component } from "react";

import { RiMenuAddLine } from "react-icons/ri";

import ThemeContext from "../../Context/ThemeContext";

import SavedVideosContext from "../../Context/SavedVideosContext";

import TrendingVideoCard from "../TrendingVideoCard";

import {
  SavedVideosMainContainer,
  SavedVideosContainer,
  SavedMenuContainer,
  IconContainer,
  MenuHeading,
  NoVideosContainer,
  NoVideosImg,
  FailureText,
  VideosList,
} from "./styledComponents";

import Layout from "../Layout";

type ThemeValue = {
  isDarkTheme: boolean;
};

class SavedVideos extends Component {
  savedList = (themeValue: ThemeValue): ReactElement => {
    const { isDarkTheme } = themeValue;
    const theme = isDarkTheme ? "dark" : "light";

    return (
      <SavedVideosContext.Consumer>
        {(value) => {
          const { savedVideosList } = value;
          if (savedVideosList.length === 0) {
            return (
              <NoVideosContainer>
                <NoVideosImg
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                  alt="no saved videos"
                />
              </NoVideosContainer>
            );
          }
          return (
            <VideosList>
              {savedVideosList.map((each: any) => (
                <TrendingVideoCard videoDetails={each} key={each.id} />
              ))}
            </VideosList>
          );
        }}
      </SavedVideosContext.Consumer>
    );
  };

  render(): ReactElement {
    return (
      <ThemeContext.Consumer>
        {(value) => {
          const { isDarkTheme } = value;
          const theme = isDarkTheme ? "dark" : "light";

          return (
            <>
              <Layout>
                <SavedVideosMainContainer>
                  <SavedMenuContainer>
                    <IconContainer>
                      <RiMenuAddLine size={20} style={{ paddingTop: "6px" }} />
                    </IconContainer>
                    <MenuHeading theme={theme}>Saved Videos</MenuHeading>
                  </SavedMenuContainer>
                  <SavedVideosContainer>
                    {this.savedList(value)}
                  </SavedVideosContainer>
                </SavedVideosMainContainer>
              </Layout>
            </>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

export default SavedVideos;
