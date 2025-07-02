import { staticFiles } from "../../index";
import { CityConfig } from "./cityTypes"; // Adjust the import path as necessary

export const sharedBannerConfig:CityConfig = {
    "/cart": {
        backgroundImage: staticFiles.images.Cart_banner,
        mobileBanner: staticFiles.images.Cart_mobile,
        pcBanner: staticFiles.images.Cart_pc,
      },
      "/musicals_view": {
        backgroundImage: staticFiles.images.musical_cover_bg,
        mobileBanner: staticFiles.images.musical_mobile_bannerFont,
        pcBanner: staticFiles.images.musical_pc_bannerFont,
      },
      "/user/log-in": {
        backgroundImage: staticFiles.images.login_banner,
        mobileBanner: staticFiles.images.login_banner_mobile,
        pcBanner: staticFiles.images.login_banner_pc,
      },
      "/about": {
        backgroundImage: staticFiles.images.tamice_page_cover_bg,
        mobileBanner: staticFiles.images.tamice_page_mobile_bannerFont,
        pcBanner: staticFiles.images.tamice_page_pc_bannerFont,
      },
      "/sim-card": {
        backgroundImage: staticFiles.images.sim_cover_bg,
        mobileBanner: staticFiles.images.sim_mobile_bannerFont,
        pcBanner: staticFiles.images.sim_pc_bannerFont,
      },
      "/trip-info": {
        backgroundImage: staticFiles.images.ny_event_cover_bg,
        mobileBanner: staticFiles.images.ny_event_mobile_bannerFont,
        pcBanner: staticFiles.images.ny_event_pc_bannerFont,
      },
      "/user/sign-up": {
        backgroundImage: staticFiles.images.signup_banner,
        mobileBanner: staticFiles.images.sign_up_mobile,
        pcBanner: staticFiles.images.sign_up_pc,
      },
      "/user/register": {
        backgroundImage: staticFiles.images.signup_banner,
        mobileBanner: staticFiles.images.sign_up_mobile,
        pcBanner: staticFiles.images.sign_up_pc,
      },
      "/user/forgot-password": {
        backgroundImage: staticFiles.images.signup_banner,
        mobileBanner: staticFiles.images.sign_up_mobile,
        pcBanner: staticFiles.images.sign_up_pc,
      },
      "/user/non-member-order-lookup": {
        backgroundImage: staticFiles.images.my_page_cover_bg,
        mobileBanner: staticFiles.images.my_page_mobile_bannerFont,
        pcBanner: staticFiles.images.my_page_pc_bannerFont,
      },
      "/my-page": {
        backgroundImage: staticFiles.images.my_page_cover_bg,
        mobileBanner: staticFiles.images.my_page_mobile_bannerFont,
        pcBanner: staticFiles.images.my_page_pc_bannerFont,
      },
};
