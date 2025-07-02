import { staticFiles } from "../../index";
import { CityConfig } from "./cityTypes"; // Adjust the import path as necessary
import { sharedBannerConfig } from "./sharedBanner";

export const lsConfig: CityConfig = {
  "/ls/main": {
    backgroundImage: staticFiles.images.ls_landing_banner,
    mobileBanner: staticFiles.images.ls_landing_mobile,
    pcBanner: staticFiles.images.ls_landing_pc,
  },
  "/ls/package-tour/ba-pass": {
    backgroundImage: staticFiles.images.ls_bigapple_pass_banner,
    mobileBanner: staticFiles.images.ls_bigapple_pass_mobile,
    pcBanner: staticFiles.images.ls_bigapple_pass_pc,
  },

  "/ls/ls-entry": {
    backgroundImage: staticFiles.images.ls_tour_banner,
    mobileBanner: staticFiles.images.ls_tour_mobile,
    pcBanner: staticFiles.images.ls_tour_pc,
  },

  "/ls/canyon-entry": {
    backgroundImage: staticFiles.images.ls_tour_banner,
    mobileBanner: staticFiles.images.ls_tour_mobile,
    pcBanner: staticFiles.images.ls_tour_pc,
  },

  "/ls/show": {
    backgroundImage: staticFiles.images.ls_campingcar_banner,
    mobileBanner: staticFiles.images.ls_campingcar_mobile,
    pcBanner: staticFiles.images.ls_campingcar_pc,
  },

  "/cy/camping-car": {
    backgroundImage: staticFiles.images.ls_campingcar_banner,
    mobileBanner: staticFiles.images.ls_campingcar_mobile,
    pcBanner: staticFiles.images.ls_campingcar_pc,
  },

  "/cy/canyon-tour": {
    backgroundImage: staticFiles.images.ls_canyon_package_banner,
    mobileBanner: staticFiles.images.ls_canyon__package_mobile,
    pcBanner: staticFiles.images.ls_canyon_package_pc,
  },
  "/cy/show": {
    backgroundImage: staticFiles.images.lv_show_banner,
    mobileBanner: staticFiles.images.lv_show__mobile,
    pcBanner: staticFiles.images.lv_show_pc,
  },

  "/lv-trip-info": {
    backgroundImage: staticFiles.images.las_event_banner,
    mobileBanner: staticFiles.images.las_event_banner_text_mobile,
    pcBanner: staticFiles.images.las_event_banner_text_pc,
  },

  // "/ls/show": {
  //   backgroundImage: staticFiles.images.ls_canyon_banner,
  //   mobileBanner: staticFiles.images.ls_canyon_mobile,
  //   pcBanner: staticFiles.images.ls_canyon_pc,
  // },

  ...sharedBannerConfig,
};
