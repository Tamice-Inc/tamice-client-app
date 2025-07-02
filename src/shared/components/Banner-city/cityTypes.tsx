export type BannerConfig = {
    backgroundImage: string;
    mobileBanner: string;
    pcBanner: string;
  };
  
  export type CityConfig = {
    [path: string]: BannerConfig;
  };
  