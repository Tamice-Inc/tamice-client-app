import { staticFiles } from "../../index";
import { CityConfig } from "./cityTypes"; // Adjust the import path as necessary
import { sharedBannerConfig } from "./sharedBanner";

export const nfConfig: CityConfig = {
  "/nf/main": {
    backgroundImage: staticFiles.images.nf_landing_banner,
    mobileBanner: staticFiles.images.nf_landing_mobile,
    pcBanner: staticFiles.images.nf_landing_pc,
  },
  "/nf/package-tour/ba-pass": {
    backgroundImage: staticFiles.images.nf_big_apple_pass_banner,
    mobileBanner: staticFiles.images.nf_big_apple_pass_mobile,
    pcBanner: staticFiles.images.nf_big_apple_pass_pc,
  },
  "/nf/cruise": {
    backgroundImage: staticFiles.images.nf_cruise_banner,
    mobileBanner: staticFiles.images.nf_cruise_mobile,
    pcBanner: staticFiles.images.nf_cruise_pc,
  },
  "/nf/entry": {
    backgroundImage: staticFiles.images.nf_entry_banner,
    mobileBanner: staticFiles.images.nf_entry_mobile,
    pcBanner: staticFiles.images.nf_entry_pc,
  },
  "/nf/activity": {
    backgroundImage: staticFiles.images.nf_activity_banner,
    mobileBanner: staticFiles.images.nf_activity_mobile,
    pcBanner: staticFiles.images.nf_activity_pc,
  },
  "/nf/tour": {
    backgroundImage: staticFiles.images.nf_tour_banner,
    mobileBanner: staticFiles.images.nf_tour_mobile,
    pcBanner: staticFiles.images.nf_tour_pc,
  },

  "/nf/sim": {
    backgroundImage: staticFiles.images.nf_sim_banner,
    mobileBanner: staticFiles.images.nf_sim_mobile,
    pcBanner: staticFiles.images.nf_sim_pc,
  },
  "/nf-trip-info": {
    backgroundImage: staticFiles.images.nf_event_banner,
    mobileBanner: staticFiles.images.nf_event_banner_text_mobile,
    pcBanner: staticFiles.images.nf_event_banner_text_pc,
  },
 
 
   ...sharedBannerConfig,
};
