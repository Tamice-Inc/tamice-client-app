import { staticFiles } from "../../index";
import { CityConfig } from "./cityTypes"; // Adjust the import path as necessary
import { sharedBannerConfig } from "./sharedBanner";


export const sfConfig: CityConfig = {
  "/sf/main": {
    backgroundImage: staticFiles.images.must_see_in_sf_tour_banner,
    mobileBanner: staticFiles.images.must_see_in_sf_tour_banner_mobile_text,
    pcBanner: staticFiles.images.must_see_in_sf_tour_banner_pc_text,
  },
  "/sf/city-attractions/museum-gallery": {
    backgroundImage: staticFiles.images.moma_banner,
    mobileBanner: staticFiles.images.moma_banner_mobile,
    pcBanner: staticFiles.images.moma_banner_pc,
  },
  "/sf/package-tour/ba-pass": {
    backgroundImage: staticFiles.images.sf_bigapple_pass,
    mobileBanner: staticFiles.images.sf_bigapple_pass_banner_mobile,
    pcBanner: staticFiles.images.sf_bigapple_pass_banner_pc,
  },
  "/sf/package-tour/city-pass": {
    backgroundImage: staticFiles.images.sf_city_pass,
    mobileBanner: staticFiles.images.sf_city_pass_banner_mobile,
    pcBanner: staticFiles.images.sf_city_pass_banner_pc,
  },
  "/sf/package-tour/explore-pass": {
    backgroundImage: staticFiles.images.sf_explore_pass,
    mobileBanner: staticFiles.images.sf_explore_banner_mobile,
    pcBanner: staticFiles.images.sf_explore_banner_pc,
  },
  "/sf/city-attractions/activities": {
    backgroundImage: staticFiles.images.SF_Activity_banner,
    mobileBanner: staticFiles.images.SF_Activity_mobile,
    pcBanner: staticFiles.images.SF_Activity_pc,
  },
  // "/sf/city-attractions/observations": {
  //   backgroundImage: staticFiles.images.Bigbus_banner,
  //   mobileBanner: staticFiles.images.Bigbus_mobile,
  //   pcBanner: staticFiles.images.Bigbus_pc,
  // },
  "/sf/city-attractions/cruise-bustour": {
    backgroundImage: staticFiles.images.Bigbus_banner,
    mobileBanner: staticFiles.images.Bigbus_mobile,
    pcBanner: staticFiles.images.Bigbus_pc,
  },
  "/sf/sf-trip-info": {
    backgroundImage: staticFiles.images.sf_event_cover_bg,
    mobileBanner: staticFiles.images.sf_event_mobile_bannerFont,
    pcBanner: staticFiles.images.sf_event_pc_bannerFont,
  },
  "/sf-trip-info": {
    backgroundImage: staticFiles.images.sf_event_cover_bg,
    mobileBanner: staticFiles.images.sf_event_mobile_bannerFont,
    pcBanner: staticFiles.images.sf_event_pc_bannerFont,
  },
  "/sf/guide-tour/sf-museum": {
    backgroundImage: staticFiles.images.sf_museum_cover_bg,
    mobileBanner: staticFiles.images.sf_museum_mobile_bannerFont,
    pcBanner: staticFiles.images.sf_museum_pc_bannerFont,
  },
  ...sharedBannerConfig,
};
