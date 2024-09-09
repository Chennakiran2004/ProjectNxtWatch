import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { useParams } from "react-router-dom";

import { formatDistanceToNow } from "date-fns";

import { BiLike, BiDislike } from "react-icons/bi";

import { RiMenuAddLine } from "react-icons/ri";

import ReactPlayer from "react-player";

import { ThreeDots } from "react-loader-spinner";

import ThemeContext from "../../Context/ThemeContext";

import Sidebar from "../Sidebar";

import SavedVideosContext from "../../Context/SavedVideosContext";

import Header from "../Header";

import { AppDispatch, RootState } from "../../storeFolder/store";

import {
  fetchVideoDetails,
  toggleLike,
  toggleDislike,
} from "../../ReduxFolder/VideoDetailsSlice";

import {
  MainBody,
  SidebarContainer,
  FailureImg,
  FailureContainer,
  FailureText,
  RetryButton,
  LoaderContainer,
  VideoItemDetailsContainer,
  PlayerContainer,
  VideoDetailContainer,
  VideoTextContainer,
  VideoTitle,
  ViewsAndPostedContainer,
  LikesAndViewsContainer,
  ViewsText,
  Button,
  ChannelLogo,
  ChannelDetails,
  ChannelDetailsText,
  ChannelDetailsText2,
  VideoDescriptionText,
} from "./styledComponents";

const VideoItemDetails: React.FC = () => {
  const { id = "" } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { apiStatus, videoDetails, like, dislike } = useSelector(
    (state: RootState) => state.videoDetails
  );

  useEffect(() => {
    dispatch(fetchVideoDetails(id));
  }, [dispatch, id]);

  const updateLikeState = () => {
    dispatch(toggleLike());
  };

  const updateDislikeState = () => {
    dispatch(toggleDislike());
  };

  const successView = () => {
    const { publishedAt, title, videoUrl, viewCount, channel, description } =
      videoDetails;

    const { name, profileImageUrl, subscriberCount } = channel;
    let postedAt = formatDistanceToNow(new Date(publishedAt));
    const postedAtList = postedAt.split(" ");

    if (postedAtList.length === 3) {
      postedAtList.shift();
      postedAt = postedAtList.join(" ");
    }

    return (
      <ThemeContext.Consumer>
        {(value) => {
          const { isDarkTheme } = value;
          const theme = isDarkTheme ? "dark" : "light";

          const likeIsActive = like ? "active" : "not-active";
          const dislikeIsActive = dislike ? "active" : "not-active";
          return (
            <VideoDetailContainer>
              <PlayerContainer>
                <ReactPlayer
                  url={videoUrl}
                  controls
                  width="100%"
                  height="100%"
                />
              </PlayerContainer>
              <VideoTextContainer>
                <VideoTitle theme={theme}>{title}</VideoTitle>
                <LikesAndViewsContainer>
                  <ViewsAndPostedContainer>
                    <ViewsText>{viewCount} views</ViewsText>
                    <ViewsText>{postedAt} ago</ViewsText>
                  </ViewsAndPostedContainer>
                  <div>
                    <Button
                      type="button"
                      theme={likeIsActive}
                      onClick={updateLikeState}
                      data-testid="likeButton"
                    >
                      <BiLike size={20} style={{ paddingTop: "6px" }} />
                      Like
                    </Button>
                    <Button
                      type="button"
                      theme={dislikeIsActive}
                      onClick={updateDislikeState}
                      data-testid="dislikeButton"
                    >
                      <BiDislike size={20} style={{ paddingTop: "6px" }} />
                      Dislike
                    </Button>
                    <SavedVideosContext.Consumer>
                      {(val) => {
                        const { updateSave, savedVideosList } = val;
                        const present = savedVideosList.find(
                          (each) => each.id === id
                        );
                        const saveIsActive = present ? "active" : "not-active";
                        const saveText = present ? "Saved" : "Save";

                        const handleSaveClick = () => {
                          const result = updateSave(videoDetails);
                        };
                        return (
                          <Button
                            type="button"
                            theme={saveIsActive}
                            onClick={handleSaveClick}
                            data-testid="saveButton"
                          >
                            <RiMenuAddLine
                              size={20}
                              style={{ paddingTop: "6px" }}
                            />
                            {saveText}
                          </Button>
                        );
                      }}
                    </SavedVideosContext.Consumer>
                  </div>
                </LikesAndViewsContainer>
                <hr />
                <ChannelDetails>
                  <ChannelLogo src={profileImageUrl} alt="channel logo" />
                  <div>
                    <ChannelDetailsText theme={theme}>
                      {name}
                    </ChannelDetailsText>
                    <ChannelDetailsText2>{subscriberCount}</ChannelDetailsText2>
                  </div>
                </ChannelDetails>
                <VideoDescriptionText theme={theme}>
                  {description}
                </VideoDescriptionText>
              </VideoTextContainer>
            </VideoDetailContainer>
          );
        }}
      </ThemeContext.Consumer>
    );
  };
  

  const getFailureView = () => (
    <ThemeContext.Consumer>
      {(value) => {
        const { isDarkTheme } = value;
        const theme = isDarkTheme ? "dark" : "light";
        const imgUrl = isDarkTheme
          ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"
          : "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png";

        return (
          <FailureContainer>
            <FailureImg src={imgUrl} alt="failure view" />
            <FailureText theme={theme}>Oops! Something Went Wrong</FailureText>
            <RetryButton
              type="button"
              onClick={() => dispatch(fetchVideoDetails(id))}
            >
              Retry
            </RetryButton>
          </FailureContainer>
        );
      }}
    </ThemeContext.Consumer>
  );

  const loader = () => (
    <ThemeContext.Consumer>
      {(value) => {
        const { isDarkTheme } = value;
        return (
          <LoaderContainer className="loader-container" data-testid="loader">
            <ThreeDots
              color={isDarkTheme ? "#ffffff" : "#000000"}
              height="50"
              width="50"
            />
          </LoaderContainer>
        );
      }}
    </ThemeContext.Consumer>
  );

  const renderUIBasedOnAPIStatus = () => {
    switch (apiStatus) {
      case "success":
        return successView();
      case "failure":
        return getFailureView();
      case "inProgress":
        return loader();
      default:
        return <></>;
    }
  };

  return (
    <ThemeContext.Consumer>
      {(value) => {
        const { isDarkTheme } = value;
        const theme = isDarkTheme ? "dark" : "light";

        return (
          <>
            <Header />
            <MainBody>
              <SidebarContainer>
                <Sidebar />
              </SidebarContainer>
              <VideoItemDetailsContainer
                data-testid="videoItemDetails"
                theme={theme}
              >
                {renderUIBasedOnAPIStatus()}
              </VideoItemDetailsContainer>
            </MainBody>
          </>
        );
      }}
    </ThemeContext.Consumer>
  );
};

export default VideoItemDetails;
