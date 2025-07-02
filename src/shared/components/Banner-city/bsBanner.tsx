import { staticFiles } from "../../index";
import { CityConfig } from "./cityTypes"; // Adjust the import path as necessary
import { sharedBannerConfig } from "./sharedBanner";

export const bsConfig: CityConfig = {
  "/boston/main": {
    backgroundImage: staticFiles.images.bos_landing_banner,
    mobileBanner: staticFiles.images.bos_landing_mobile,
    pcBanner: staticFiles.images.bos_landing_pc,
  },
  "/boston/package-tour/ba-pass": {
    backgroundImage: staticFiles.images.bos_apple_pass_banner,
    mobileBanner: staticFiles.images.bos_apple_pass_mobile,
    pcBanner: staticFiles.images.bos_apple_pass_pc,
  },
  "/boston/ivy-league": {
    backgroundImage: staticFiles.images.bos_ivy_league_banner,
    mobileBanner: staticFiles.images.bos_ivy_league_mobile,
    pcBanner: staticFiles.images.bos_ivy_league_pc,
  },

  "/boston/observation-cruise": {
    backgroundImage: staticFiles.images.bos_cruises_banner,
    mobileBanner: staticFiles.images.bos_cruises_mobile,
    pcBanner: staticFiles.images.bos_cruises_pc,
  },

  "/boston/bus": {
    backgroundImage: staticFiles.images.bos_bus_banner,
    mobileBanner: staticFiles.images.bos_bus_mobile,
    pcBanner: staticFiles.images.bos_bus_pc,
  },

  "/boston/gallery-museum": {
    backgroundImage: staticFiles.images.bos_museum_banner,
    mobileBanner: staticFiles.images.bos_museum_mobile,
    pcBanner: staticFiles.images.bos_museum_pc,
  },

  "/boston-trip-info": {
    backgroundImage: staticFiles.images.bos_event_banner,
    mobileBanner: staticFiles.images.bos_event_banner_text_mobile,
    pcBanner: staticFiles.images.bos_event_banner_text_pc,
  },

  ...sharedBannerConfig,
};
