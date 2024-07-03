import React, { Component, ReactElement } from "react";

import { ThreeDots } from "react-loader-spinner";

import { IoLogoGameControllerB } from "react-icons/io";

import ThemeContext from "../../Context/ThemeContext";

import GamingBody from "../GamingBody";

import apiStatusConstants from "../../Constants/apiStatusConstants";

import Layout from "../Layout";

import {
  darkThemeFailureImgUrl,
  lightThemeFailureImgUrl,
} from "../../Constants/failureImageUrl";

import getAuthHeaders from "../../Constants/getAuthHeaders";

import { getCookie } from "../../Constants/storageUtilities";

import fetchApi from "../../Constants/fetchUtilities";

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

interface VideoDetails {
  id: string;
  thumbnailUrl: string;
  title: string;
  viewCount: number;
}

type GamingState = {
  apiStatus: string;
  videosList: VideoDetails[];
};

class Gaming extends Component<{}, GamingState> {
  state: GamingState = {
    apiStatus: apiStatusConstants.initial,
    videosList: [],
  };

  componentDidMount(): void {
    this.getVideos();
  }

  loader = (): ReactElement => (
    <ThemeContext.Consumer>
      {(value): ReactElement => {
        const { isDarkTheme } = value;
        const theme = isDarkTheme ? "dark" : "light";
        return (
          <LoaderContainer theme={theme}>
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

  getVideos = async (): Promise<void> => {
    this.setState({ apiStatus: apiStatusConstants.inProgress });

    const jwtToken = getCookie() || "";

    const url = "https://apis.ccbp.in/videos/gaming";
    const options = {
      headers: getAuthHeaders(jwtToken),
      method: "GET",
    };

    const response = await fetchApi(url, options);

    if (response.success) {
      const updatedData = response.data.videos.map((eachItem: any) => ({
        id: eachItem.id,
        thumbnailUrl: eachItem.thumbnail_url,
        title: eachItem.title,
        viewCount: eachItem.view_count,
      }));
      this.setState({
        videosList: updatedData,
        apiStatus: apiStatusConstants.success,
      });
    } else {
      this.setState({ apiStatus: apiStatusConstants.failure });
    }
  };

  getSuccessView = (): ReactElement => {
    const { videosList } = this.state;

    return (
      <VideosList>
        {videosList.map((eachVideo: any) => (
          <GamingBody key={eachVideo.id} gameDetails={eachVideo} />
        ))}
      </VideosList>
    );
  };

  getFailureView = (): ReactElement => (
    <ThemeContext.Consumer>
      {(value): ReactElement => {
        const { isDarkTheme } = value;
        const theme = isDarkTheme ? "dark" : "light";
        const imgUrl = isDarkTheme
          ? darkThemeFailureImgUrl
          : lightThemeFailureImgUrl;

        return (
          <FailureContainer>
            <FailureImg src={imgUrl} alt="failure view" />

            <FailureText theme={theme}>Oops! Something Went Wrong</FailureText>
            <FailureText theme={theme}>
              We are having some trouble to complete your request. Please try
              again
            </FailureText>
            <RetryButton type="button" onClick={this.getVideos}>
              Retry
            </RetryButton>
          </FailureContainer>
        );
      }}
    </ThemeContext.Consumer>
  );

  renderUIBasedOnAPIStatus = (): ReactElement => {
    const { apiStatus } = this.state;
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.getSuccessView();
      case apiStatusConstants.failure:
        return this.getFailureView();
      case apiStatusConstants.inProgress:
        return this.loader();
      default:
        return <></>;
    }
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
                <GamingMainContainer data-testid="gaming" theme={theme}>
                  <MainBody>
                    <GamingContainer>
                      <GamingMenuContainer theme={theme}>
                        <IconContainer theme={theme}>
                          <IoLogoGameControllerB size={40} color="#ff0b37" />
                        </IconContainer>
                        <MenuHeading theme={theme}>Gaming</MenuHeading>
                      </GamingMenuContainer>
                      {this.renderUIBasedOnAPIStatus()}
                    </GamingContainer>
                  </MainBody>
                </GamingMainContainer>
              </Layout>
            </>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

export default Gaming;
