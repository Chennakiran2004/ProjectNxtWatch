export const activeMenuConstants = {
  initial: "initial", // changed to lowercase
  home: "home", // changed to lowercase
  trending: "trending", // changed to lowercase
  gaming: "gaming", // changed to lowercase
  savedVideos: "savedVideos", // changed to lowercase
} as const;

export type ActiveMenu = keyof typeof activeMenuConstants;

// export const activeMenuConstants = {
//   initial: "INITIAL",
//   home: "HOME",
//   trending: "TRENDING",
//   gaming: "GAMING",
//   savedVideos: "SAVED_VIDEOS",
// } as const;

// export type ActiveMenu =
//   (typeof activeMenuConstants)[keyof typeof activeMenuConstants];
