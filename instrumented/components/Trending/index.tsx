import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillFire } from "react-icons/ai";
import { ThreeDots } from "react-loader-spinner";
import TrendingVideoCard from "../TrendingVideoCard";
import ThemeContext from "../../Context/ThemeContext";
import { getTrendingVideos } from "../../ReduxFolder/TrendingSlice";
import {
  darkThemeFailureImgUrl,
  lightThemeFailureImgUrl,
} from "../../Constants/failureImageUrl";
import Layout from "../Layout";
import {
  MainBody,
  TrendingContainer,
  TrendingMenuContainer,
  IconContainer,
  MenuHeading,
  LoaderContainer,
  FailureContainer,
  FailureImg,
  FailureText,
  RetryButton,
  VideosList,
  TrendingMainContainer,
} from "./styledComponents";
import { AppDispatch, RootState } from "../../storeFolder/store";

const Trending = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { videosList, apiStatus, error } = useSelector(
    (state: RootState) => state.trending
  );
  const { isDarkTheme } = useContext(ThemeContext);

  useEffect(() => {
    dispatch(getTrendingVideos());
  }, [dispatch]);

  const renderUIBasedOnAPIStatus = () => {
    switch (apiStatus) {
      case "success":
        return (
          <VideosList data-testid="trending-success-view">
            {videosList && videosList.length > 0 ? (
              videosList.map((video: any) => (
                <TrendingVideoCard videoDetails={video} key={video.id} />
              ))
            ) : (
              <p>No videos available</p>
            )}
          </VideosList>
        );

      case "failure":
        return (
          <FailureContainer data-testid="failure-container">
            <FailureImg
              src={
                isDarkTheme ? darkThemeFailureImgUrl : lightThemeFailureImgUrl
              }
              alt="failure view"
            />
            <FailureText theme={isDarkTheme ? "dark" : "light"}>
              {error || "Oops! Something Went Wrong"}
            </FailureText>
            <RetryButton
              type="button"
              onClick={() => dispatch(getTrendingVideos())}
            >
              Retry
            </RetryButton>
          </FailureContainer>
        );
      case "inProgress":
        return (
          <LoaderContainer className="loader-container" data-testid="loader">
            <ThreeDots
              color={isDarkTheme ? "#ffffff" : "#000000"}
              height="50"
              width="50"
            />
          </LoaderContainer>
        );
      default:
        return <></>;
    }
  };

  return (
    <Layout>
      <TrendingMainContainer
        data-testid="trending"
        theme={isDarkTheme ? "dark" : "light"}
      >
        <MainBody>
          <TrendingContainer data-testid="trending-container">
            <TrendingMenuContainer theme={isDarkTheme ? "dark" : "light"}>
              <IconContainer theme={isDarkTheme ? "dark" : "light"}>
                <AiFillFire size={40} color="#ff0b37" />
              </IconContainer>
              <MenuHeading theme={isDarkTheme ? "dark" : "light"}>
                Trending
              </MenuHeading>
            </TrendingMenuContainer>
            {renderUIBasedOnAPIStatus()}
          </TrendingContainer>
        </MainBody>
      </TrendingMainContainer>
    </Layout>
  );
};

export default Trending;
