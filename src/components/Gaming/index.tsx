import React, { useEffect } from "react";

import { ThreeDots } from "react-loader-spinner";

import { IoLogoGameControllerB } from "react-icons/io";

import ThemeContext from "../../Context/ThemeContext";

import GamingBody from "../GamingBody";

import Layout from "../Layout";

import {
  darkThemeFailureImgUrl,
  lightThemeFailureImgUrl,
} from "../../Constants/failureImageUrl";

import { useDispatch, useSelector } from "react-redux";
import { getGamingVideos } from "../../ReduxFolder/GamingSlice";

import {
  GamingMainContainer,
  MainBody,
  GamingContainer,
  GamingMenuContainer,
  IconContainer,
  MenuHeading,
  LoaderContainer,
  VideosList,
  FailureContainer,
  FailureText,
  FailureImg,
  RetryButton,
} from "./styledComponents";
import { AppDispatch, RootState } from "../../storeFolder/store";

const Gaming: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { status, error } = useSelector((state: RootState) => state.gaming);
  const videosList =
    useSelector((state: RootState) => state.gaming.videosList) || [];

  useEffect(() => {
    dispatch(getGamingVideos());
  }, [dispatch]);

  const loader = (): React.ReactElement => (
    <ThemeContext.Consumer>
      {({ isDarkTheme }): React.ReactElement => {
        const theme = isDarkTheme ? "dark" : "light";
        return (
          <LoaderContainer data-testid="loader" theme={theme}>
            <ThreeDots
              color={isDarkTheme ? "#ffffff" : "#000000"}
              height={50}
              width={50}
            />
          </LoaderContainer>
        );
      }}
    </ThemeContext.Consumer>
  );

  const getSuccessView = (): React.ReactElement => (
    <VideosList data-testid="gaming-success-view">
      {videosList.map((eachVideo: any) => (
        <GamingBody key={eachVideo.id} gameDetails={eachVideo} />
      ))}
    </VideosList>
  );

  const getFailureView = (): React.ReactElement => (
    <ThemeContext.Consumer>
      {({ isDarkTheme }): React.ReactElement => {
        const theme = isDarkTheme ? "dark" : "light";
        const imgUrl = isDarkTheme
          ? darkThemeFailureImgUrl
          : lightThemeFailureImgUrl;

        return (
          <FailureContainer data-testid="gaming-failure-view">
            <FailureImg src={imgUrl} alt="failure view" />
            <FailureText theme={theme}>Oops! Something Went Wrong</FailureText>
            <FailureText theme={theme}>
              We are having some trouble to complete your request. Please try
              again
            </FailureText>
            <RetryButton
              type="button"
              onClick={() => dispatch(getGamingVideos())}
            >
              Retry
            </RetryButton>
          </FailureContainer>
        );
      }}
    </ThemeContext.Consumer>
  );

  const renderUIBasedOnAPIStatus = (): React.ReactElement => {
    switch (status) {
      case "succeeded":
        return getSuccessView();
      case "failed":
        return getFailureView();
      case "loading":
        return loader();
      default:
        return <></>;
    }
  };

  return (
    <ThemeContext.Consumer>
      {({ isDarkTheme }) => {
        const theme = isDarkTheme ? "dark" : "light";
        return (
          <>
            <Layout>
              <GamingMainContainer data-testid="gaming-container" theme={theme}>
                <MainBody>
                  <GamingContainer>
                    <GamingMenuContainer theme={theme}>
                      <IconContainer theme={theme}>
                        <IoLogoGameControllerB size={40} color="#ff0b37" />
                      </IconContainer>
                      <MenuHeading theme={theme}>Gaming</MenuHeading>
                    </GamingMenuContainer>
                    {renderUIBasedOnAPIStatus()}
                  </GamingContainer>
                </MainBody>
              </GamingMainContainer>
            </Layout>
          </>
        );
      }}
    </ThemeContext.Consumer>
  );
};

export default Gaming;
