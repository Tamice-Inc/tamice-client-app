import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { cityIdState } from "../../App";
import { staticFiles } from "../index";
import { bsConfig } from "./Banner-city/bsBanner";
import { BannerConfig, CityConfig } from "./Banner-city/cityTypes";
import { lsConfig } from "./Banner-city/lsBanner";
import { nfConfig } from "./Banner-city/nfBanner";
import { nyConfig } from "./Banner-city/nyBanner";
import { sfConfig } from "./Banner-city/sfBanner";
import { hawaiiConfig } from "./Banner-city/hawaiiBanner";

import { Button, Checkbox } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import axios from "axios";
import { API } from "../../shared";

function isSameDay(date1: any, date2: any) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export const Cover = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState<string>("");
  const [cityId] = cityIdState.useState();

  let openPopUpModal = true;
  const [modalIsOpen, setModalIsOpen] = useState(openPopUpModal);
  const [popupImagePath, setPopupImagePath] = useState("");
  if (localStorage.getItem("openedPopUpModal")) {
    if (
      localStorage.getItem("openedPopUpModal") == "true" &&
      isSameDay(new Date(localStorage.getItem("openedPopUpModalTime") ?? ""), new Date())
    ) {
      openPopUpModal = false;
    }
  }

  useEffect(() => {
    const fetchPopupImg = async () => {
      const result = await axios.get(`${API}/templates/104/image`);
      console.log({ result });
      if (result.status === 200) {
        setPopupImagePath(result.data.image.url);
      }
    };
    fetchPopupImg();
  });

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  const getBannerImages = useMemo<BannerConfig>(() => {
    let config: BannerConfig | {} = {};

    if (cityId === 1) {
      config = nyConfig[currentPath as keyof CityConfig] || {};
    } else if (cityId === 36) {
      config = sfConfig[currentPath as keyof CityConfig] || {};
    } else if (cityId === 58) {
      config = lsConfig[currentPath as keyof CityConfig] || {};
    } else if (cityId === 56) {
      config = bsConfig[currentPath as keyof CityConfig] || {};
    } else if (cityId === 57) {
      config = nfConfig[currentPath as keyof CityConfig] || {};
    } else if (cityId === 59) {
      config = hawaiiConfig[currentPath as keyof CityConfig] || {};
    }

    const defaultConfig: BannerConfig = {
      backgroundImage: staticFiles.images.landing_page_banner,
      mobileBanner: staticFiles.images.toprock_mobile_bannerFont,
      pcBanner: staticFiles.images.toprock_pc_bannerFont,
    };

    return { ...defaultConfig, ...config };
  }, [currentPath, cityId]);

  const isLanding = currentPath === "/";
  const isMainPage = currentPath === "/main"; // Adjust the path accordingly
  const isPopup = popupImagePath.length > 0;
  return (
    <>
      {isLanding && isPopup && (
        <Modal open={modalIsOpen} className="flex justify-center items-center">
          <div className="w-[80vw] md:w-[400px] bg-white p-5 rounded-[30px]">
            <div className="flex justify-center items-center">
              <img src={`${popupImagePath}`} className="w-full object-cover sm:max-w-[25vw]" />
            </div>
            <div className="flex justify-end items-center">
              <Checkbox
                onChange={(e) => {
                  if (e.target.checked) {
                    // Save checked result in the LocalStorage
                    localStorage.setItem("openedPopUpModal", "true");
                    localStorage.setItem("openedPopUpModalTime", new Date().toDateString());
                  } else {
                    // Save checked result in the LocalStorage
                    localStorage.setItem("openedPopUpModal", "false");
                    localStorage.setItem("openedPopUpModalTime", new Date().toDateString());
                  }
                }}
                color="primary"
                size={window.innerWidth < 768 ? "small" : "medium"}
              />
              <p className="text-xs sm:text-sm">오늘 하루동안 이 창을 열지 않음</p>
            </div>
            <div className="flex justify-end items-center">
              <Button
                variant="contained"
                color="primary"
                size={window.innerWidth < 768 ? "small" : "medium"}
                onClick={() => setModalIsOpen(false)}
              >
                닫기
              </Button>
            </div>
          </div>
        </Modal>
      )}
      <div className="w-full">
        <div className="relative flex justify-center w-full h-1/2 ">
          <img
            className="object-cover object-center w-full h-[400px] "
            src={getBannerImages.backgroundImage}
            alt="Background"
          />

          {isMainPage && (
            <button
            className="absolute top-[70%] rounded-2xl border-white border text-white text-sm px-4 z-100"
              onClick={() => (window.location.href = "/package-tour/ba-pass")}
            >
              빅애플패스
            </button>
          )}
          <img
            className="absolute lg:hidden top-[35%] lg:top-[50%] object-cover object-center h-[90px] w-[98%]"
            src={getBannerImages.mobileBanner}
            alt="Mobile Banner"
          />
          <img
            className="absolute hidden object-cover object-center transform -translate-x-1/2 -translate-y-1/2 lg:block top-1/2 left-1/2 "
            src={getBannerImages.pcBanner}
            alt="PC Banner"
          />
        </div>
      </div>
    </>
  );
};
