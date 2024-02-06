interface ScreenSize {
  width: number;
  height: number;
}

export const getScreenSize = (): ScreenSize => {
  if (typeof window !== "undefined") {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  } else {
    // Default values if window is not available (e.g., during server-side rendering)
    return {
      width: 0,
      height: 0,
    };
  }
};
