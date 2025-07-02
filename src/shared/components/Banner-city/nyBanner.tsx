import { staticFiles } from "../../index";
import { CityConfig } from "./cityTypes"; // Adjust the import path as necessary
import { sharedBannerConfig } from "./sharedBanner";

export const nyConfig: CityConfig = {

  // "/": {
  //   backgroundImage: staticFiles.images.observations_banner,
  //   mobileBanner: staticFiles.images.must_see_in_ny_tour_mobile_banner,
  //   pcBanner: staticFiles.images.must_see_in_ny_tour_pc_banner,
  // },


  "/ny/sim-card": {
    backgroundImage: staticFiles.images.sim_cover_bg,
    mobileBanner: staticFiles.images.sim_mobile_bannerFont,
    pcBanner: staticFiles.images.sim_pc_bannerFont,
  },
  "/ny/musicals_view": {
    backgroundImage: staticFiles.images.musical_cover_bg,
    mobileBanner: staticFiles.images.musical_mobile_bannerFont,
    pcBanner: staticFiles.images.musical_pc_bannerFont,
  },
  "/ny/trip-info": {
    backgroundImage: staticFiles.images.ny_event_cover_bg,
    mobileBanner: staticFiles.images.ny_event_mobile_bannerFont,
    pcBanner: staticFiles.images.ny_event_pc_bannerFont,
  },
  "/ny/main": {
    backgroundImage: staticFiles.images.observations_banner,
    mobileBanner: staticFiles.images.must_see_in_ny_tour_mobile_banner,
    pcBanner: staticFiles.images.must_see_in_ny_tour_pc_banner,
  },
  "/ny/package-tour/city-pass": {
    backgroundImage: staticFiles.images.ny_city_pass,
    mobileBanner: staticFiles.images.ny_city_pass_banner_mobile,
    pcBanner: staticFiles.images.ny_city_pass_banner_pc,
  },
  "/ny/city-attractions/observations": {
    backgroundImage: staticFiles.images.observations_banner_dropdown,
    mobileBanner: staticFiles.images.observations_mobile,
    pcBanner: staticFiles.images.observations_pc,
  },
  "/ny/city-attractions/museum-gallery": {
    backgroundImage: staticFiles.images.moma_banner,
    mobileBanner: staticFiles.images.moma_banner_mobile,
    pcBanner: staticFiles.images.moma_banner_pc,
  },
  "/ny/guide-tour/doson-tour": {
    backgroundImage: staticFiles.images.doson_banner,
    mobileBanner: staticFiles.images.doson_mobile,
    pcBanner: staticFiles.images.doson_pc,
  },
  "/ny/guide-tour/manhattan-day": {
    backgroundImage: staticFiles.images.daytour_banner,
    mobileBanner: staticFiles.images.daytour_mobile,
    pcBanner: staticFiles.images.daytour_pc,
  },
  "/ny/guide-tour/un-tour": {
    backgroundImage: staticFiles.images.untour_banner,
    mobileBanner: staticFiles.images.untour_mobile,
    pcBanner: staticFiles.images.untour_pc,
  },
  "/ny/guide-tour/neighbour-tour": {
    backgroundImage: staticFiles.images.neighbour_banner,
    mobileBanner: staticFiles.images.neighbour_mobile,
    pcBanner: staticFiles.images.neighbour_pc,
  },
  "/ny/city-attractions/rides-cruises": {
    backgroundImage: staticFiles.images.cruise_cover_bg,
    mobileBanner: staticFiles.images.cruise_mobile_bannerFont,
    pcBanner: staticFiles.images.cruise_pc_bannerFont,
  },
  "/ny/city-attractions/activities": {
    backgroundImage: staticFiles.images.activity_cover_bg,
    mobileBanner: staticFiles.images.activity_pc_bannerFont,
    pcBanner: staticFiles.images.activity_mobile_bannerFont,
  },
  "/ny/city-attractions/bus": {
    backgroundImage: staticFiles.images.bus_cover_bg,
    mobileBanner: staticFiles.images.bus_pc_bannerFont,
    pcBanner: staticFiles.images.bus_mobile_bannerFont,
  },
  "/ny/city-attractions/airport": {
    backgroundImage: staticFiles.images.airport_cover_bg,
    mobileBanner: staticFiles.images.airport_mobile_bannerFont,
    pcBanner: staticFiles.images.airport_pc_bannerFont,
  },
  "/ny/package-tour/ba-pass": {
    backgroundImage: staticFiles.images.big_apple_pass_cover_bg,
    mobileBanner: staticFiles.images.big_apple_pass_mobile_bannerFont,
    pcBanner: staticFiles.images.big_apple_pass_pc_bannerFont,
  },
  "/ny/guide-tour/manhattan-night": {
    backgroundImage: staticFiles.images.NY_nighttour_banner,
    mobileBanner: staticFiles.images.NY_nighttour_mobile,
    pcBanner: staticFiles.images.NY_nighttour_pc,
  },
  "/ny/package-tour/explore-pass": {
    backgroundImage: staticFiles.images.NY_explore_pass_banner,
    mobileBanner: staticFiles.images.NY_explore_pass_mobile,
    pcBanner: staticFiles.images.NY_explore_pass_pc,
  },
  ...sharedBannerConfig,
};
