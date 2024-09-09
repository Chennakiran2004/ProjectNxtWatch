import { Component, ReactElement } from "react";

import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Login from "./components/Login";

import Home from "./components/Home";

import Trending from "./components/Trending";

import Gaming from "./components/Gaming";

import ProtectedRoute from "./components/ProtectedRoute";

import VideoItemDetails from "./components/VideoItemDetails";

import ActiveMenuContext from "./Context/ActiveMenuContext";

import ThemeContext from "./Context/ThemeContext";

import SavedVideosContext from "./Context/SavedVideosContext";

import SavedVideos from "./components/SavedVideos";

import NotFound from "./components/NotFound";

import { VideoDetails } from "./ReduxFolder/VideoDetailsSlice";

const activeMenuConstants = {
  initial: "INITIAL",
  home: "HOME",
  trending: "TRENDING",
  gaming: "GAMING",
  savedVideos: "SAVED_VIDEOS",
} as const;

type ActiveMenu = keyof typeof activeMenuConstants;

type AppState = {
  isDarkTheme: boolean;
  activeMenu: string;
  savedVideosList: VideoDetails[];
  save: boolean;
};

class App extends Component<{}, AppState> {
  state: AppState = {
    isDarkTheme: false,
    activeMenu: activeMenuConstants.home,
    savedVideosList: [],
    save: false,
  };

  addVideosToSavedVideos = (videoDetails: VideoDetails) => {
    this.setState((previousState) => ({
      savedVideosList: [...previousState.savedVideosList, videoDetails],
    }));
  };

  deleteVideosFromSavedVideos = (videoDetails: VideoDetails) => {
    const { savedVideosList } = this.state;

    const updatedList = savedVideosList.filter(
      (eachVideo) => eachVideo.id !== videoDetails.id,
    );

    this.setState({ savedVideosList: updatedList });
  };

  updateSaveVideosList = (videoDetails: VideoDetails) => {
    const { save } = this.state;

    if (save) {
      this.deleteVideosFromSavedVideos(videoDetails);
    } else {
      this.addVideosToSavedVideos(videoDetails);
    }
  };

  updateSave = (videoDetails: VideoDetails) => {
    this.setState(
      (previousState) => ({ save: !previousState.save }),
      () => this.updateSaveVideosList(videoDetails),
    );
  };

  toggleTheme = () => {
    this.setState((prev) => ({ isDarkTheme: !prev.isDarkTheme }));
  };

  changeActiveMenu = (value: ActiveMenu) => {
    this.setState({ activeMenu: value });
  };

  render(): ReactElement {
    const { activeMenu, isDarkTheme, save, savedVideosList } = this.state;
    return (
      <ThemeContext.Provider
        value={{ isDarkTheme, toggleTheme: this.toggleTheme }}
      >
        <SavedVideosContext.Provider
          value={{
            save,
            savedVideosList,
            addVideosToSavedVideos: this.addVideosToSavedVideos,
            deleteVideosFromSavedVideos: this.deleteVideosFromSavedVideos,
            updateSave: this.updateSave,
          }}
        >
          <ActiveMenuContext.Provider
            value={{ activeMenu, changeActiveMenu: this.changeActiveMenu }}
          >
            <Router>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<ProtectedRoute />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/trending" element={<Trending />} />
                  <Route path="/gaming" element={<Gaming />} />
                  <Route path="/videos/:id" element={<VideoItemDetails />} />
                  <Route path="/saved-videos" element={<SavedVideos />} />
                </Route>
                <Route path="/not-found" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/not-found" />} />
              </Routes>
            </Router>
          </ActiveMenuContext.Provider>
        </SavedVideosContext.Provider>
      </ThemeContext.Provider>
    );
  }
}

export default App;
