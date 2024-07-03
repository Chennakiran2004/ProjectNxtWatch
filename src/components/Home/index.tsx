import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../storeFolder/store";

import { getHomeVideos } from "../../ReduxFolder/HomeSlice";

import { ThreeDots } from "react-loader-spinner";

import { IoMdClose } from "react-icons/io";

import { BsSearch } from "react-icons/bs";

import ThemeContext from "../../Context/ThemeContext";

import HomeBody from "../HomeBody";

import Layout from "../Layout";

import {
  darkThemeFailureImgUrl,
  lightThemeFailureImgUrl,
} from "../../Constants/failureImageUrl";

import {
  HomeMainContainer,
  HomeContainer,
  SearchContainer,
  SearchInput,
  SearchButton,
  GetPremium,
  CloseButton,
  BannerLogo,
  BannerText,
  GetItButton,
  LoaderContainer,
  VideosList,
  NoVideosContainer,
  NoVideosImg,
  FailureText,
  RetryButton,
  FailureContainer,
  FailureImg,
} from "./styledComponents";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { status, error, videosList } = useSelector(
    (state: RootState) => state.home
  );

  const [isPopup, setIsPopup] = React.useState(true);
  const [searchInput, setSearchInput] = React.useState("");

  useEffect(() => {
    dispatch(getHomeVideos(searchInput));
  }, [dispatch, searchInput]);

  const onClickCloseBanner = () => {
    setIsPopup(false);
  };

  const updateSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const loader = () => (
    <ThemeContext.Consumer>
      {({ isDarkTheme }) => (
        <LoaderContainer className="loader-container" data-testid="loader">
          <ThreeDots
            color={isDarkTheme ? "#ffffff" : "#000000"}
            height="50"
            width="50"
          />
        </LoaderContainer>
      )}
    </ThemeContext.Consumer>
  );

  const noVideosView = () => (
    <ThemeContext.Consumer>
      {({ isDarkTheme }) => (
        <NoVideosContainer>
          <NoVideosImg
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
            alt="no videos"
          />
          <FailureText theme={isDarkTheme ? "dark" : "light"}>
            No search results found
          </FailureText>
          <FailureText theme={isDarkTheme ? "dark" : "light"}>
            Try different key words or remove search filter
          </FailureText>
          <RetryButton
            type="button"
            onClick={() => dispatch(getHomeVideos(searchInput))}
          >
            Retry
          </RetryButton>
        </NoVideosContainer>
      )}
    </ThemeContext.Consumer>
  );

  const getSuccessView = () => {
    if (videosList.length === 0) {
      return noVideosView();
    }

    return (
      <VideosList>
        {videosList.map((each: any) => (
          <HomeBody key={each.id} videoDetails={each} />
        ))}
      </VideosList>
    );
  };

  const renderUIBasedOnAPIStatus = () => {
    switch (status) {
      case "succeeded":
        return getSuccessView();
      case "failed":
        return noVideosView();
      case "loading":
        return loader();
      default:
        return null;
    }
  };

  const failureView = () => (
    <ThemeContext.Consumer>
      {({ isDarkTheme }) => (
        <FailureContainer>
          <FailureImg
            src={isDarkTheme ? darkThemeFailureImgUrl : lightThemeFailureImgUrl}
            alt="failure view"
          />
          <FailureText theme={isDarkTheme ? "dark" : "light"}>
            Oops! Something Went Wrong
          </FailureText>
          <RetryButton
            type="button"
            onClick={() => dispatch(getHomeVideos(searchInput))}
          >
            Retry
          </RetryButton>
        </FailureContainer>
      )}
    </ThemeContext.Consumer>
  );

  return (
    <ThemeContext.Consumer>
      {({ isDarkTheme }) => {
        const theme = isDarkTheme ? "dark" : "light";
        const color = isDarkTheme ? "#f9f9f9" : "#181818";

        return (
          <Layout>
            <HomeMainContainer theme={theme}>
              <HomeContainer theme={theme}>
                {isPopup && (
                  <GetPremium data-testid="banner">
                    <CloseButton
                      type="button"
                      data-testid="close"
                      onClick={onClickCloseBanner}
                    >
                      <IoMdClose size={16} />
                    </CloseButton>
                    <BannerLogo
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                      alt="nxt watch logo"
                    />
                    <BannerText>
                      Buy Nxt Watch Premium prepaid plans with UPI
                    </BannerText>
                    <GetItButton>GET IT NOW</GetItButton>
                  </GetPremium>
                )}
                <SearchContainer>
                  <SearchInput
                    theme={theme}
                    type="search"
                    placeholder="Search"
                    onChange={updateSearchInput}
                    value={searchInput}
                  />
                  <SearchButton
                    theme={theme}
                    type="button"
                    data-testid="searchButton"
                    onClick={() => dispatch(getHomeVideos(searchInput))}
                  >
                    <BsSearch color={color} />
                  </SearchButton>
                </SearchContainer>
                {renderUIBasedOnAPIStatus()}
              </HomeContainer>
            </HomeMainContainer>
          </Layout>
        );
      }}
    </ThemeContext.Consumer>
  );
};

export default Home;
