export const activeMenuConstants = {
  initial: "initial",
  home: "home",
  trending: "trending",
  gaming: "gaming",
  savedVideos: "savedVideos",
} as const;

export type ActiveMenu = keyof typeof activeMenuConstants;
