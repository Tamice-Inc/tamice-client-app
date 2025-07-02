import { staticFiles } from "../../index";
import { CityConfig } from "./cityTypes"; // Adjust the import path as necessary
import { sharedBannerConfig } from "./sharedBanner";

export const hawaiiConfig: CityConfig = {
  "/hls/main": {
    backgroundImage: staticFiles.images.hawaiievent_landing_banner,
    mobileBanner: staticFiles.images.hawaiievent_landing_banner_text_mobile,
    pcBanner: staticFiles.images.hawaiievent_landing_banner_text_pc,
  },
  "/hls/package-tour/ba-pass": {
    backgroundImage: staticFiles.images.hawaii_bp_banner,
    mobileBanner: staticFiles.images.hawaii_bp_text_mobile,
    pcBanner: staticFiles.images.hawaii_bp_text_pc,
  },

  "/hls/city/hawaii": {
    backgroundImage: staticFiles.images.hawaii_banner,
    mobileBanner: staticFiles.images.hawaii_banner_text_mobile,
    pcBanner: staticFiles.images.hawaii_banner_text_pc,
  },

  "/hls/city/losangeles": {
    backgroundImage: staticFiles.images.la_banner,
    mobileBanner: staticFiles.images.la_banner_text_mobile,
    pcBanner: staticFiles.images.la_banner_text_pc,
  },

  "/hls/city/santacatalina": {
    backgroundImage: staticFiles.images.catalina_banner,
    mobileBanner: staticFiles.images.catalina_banner_text_mobile,
    pcBanner: staticFiles.images.catalina_banner_text_pc,
  },

  "/hls/city/sandiego": {
    backgroundImage: staticFiles.images.sandiego_banner,
    mobileBanner: staticFiles.images.sandiego_banner_text_mobile,
    pcBanner: staticFiles.images.sandiego_banner_text_pc,
  },

  "/hls/city/event": {
    backgroundImage: staticFiles.images.hawaiievent_banner,
    mobileBanner: staticFiles.images.hawaiievent_banner_text_mobile,
    pcBanner: staticFiles.images.hawaiievent_banner_text_pc,
  },

  ...sharedBannerConfig,
};
