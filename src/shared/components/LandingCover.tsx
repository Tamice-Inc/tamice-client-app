import { Button, Checkbox } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { API, staticFiles } from "..";
import { cityIdState } from "../../App";
import { bsConfig } from "./Banner-city/bsBanner";
import { BannerConfig, CityConfig } from "./Banner-city/cityTypes";
import { lsConfig } from "./Banner-city/lsBanner";
import { nfConfig } from "./Banner-city/nfBanner";
import { nyConfig } from "./Banner-city/nyBanner";
import { sfConfig } from "./Banner-city/sfBanner";
import { hawaiiConfig } from "./Banner-city/hawaiiBanner";

// Function to compare two date objects
function isSameDay(date1: any, date2: any) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export const LandingCover = () => {
  // Define Global State Variables
  // const [cityId, setCityId] = cityIdState.useState();
  // const [cityData, setCityData] = cityDataState.useState();
  // Flag varialbe to check if the PopUp modal was opened today
  let openPopUpModal = true;
  const [cityId, setCityId] = cityIdState.useState();
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState("");
  const [popupImagePath, setPopupImagePath] = useState("");
  const [url_external, setUrlExternal] = useState("");

  const handleButtonClick = () => {
    if (cityId === 1) {
      window.location.href = "/package-tour/ba-pass";
    } else if (cityId === 36) {
      window.location.href = "/package-tour/ba-pass";
    } else {
      window.location.href = "/webpage/101";
    }
  };

  const handleButtonClickMain = () => {
    window.location.href = "/webpage/101";
  };

  useEffect(() => {
    const fetchPopupImg = async () => {
      const result = await axios.get(`${API}/templates/104/image`);
      console.log({ result });
      if (result.status === 200) {
        setPopupImagePath(result.data.image.url);
        setUrlExternal(result.data.url_external);
      }
    };
    fetchPopupImg();
  });

  useEffect(() => {
    setCurrentPath(location?.pathname);
  }, [location]);
  if (localStorage.getItem("openedPopUpModal")) {
    if (
      localStorage.getItem("openedPopUpModal") == "true" &&
      isSameDay(
        new Date(localStorage.getItem("openedPopUpModalTime") ?? ""),
        new Date()
      )
    ) {
      openPopUpModal = false;
    }
  }
  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);
  // Define state variable to decide to open the modal or not
  const [modalIsOpen, setModalIsOpen] = useState(openPopUpModal);
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
      mobileBanner: staticFiles.images.landing_page_banner_text_mobile,
      pcBanner: staticFiles.images.landing_page_banner_text_pc,
    };

    return { ...defaultConfig, ...config };
  }, [currentPath, cityId]);
  // Create a navigate instance from useNavigate Hook
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // Define useEffect Hook
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect runs only on mount and unmount

  const isMainPage = currentPath === "/main"; // Adjust the path accordingly

  return (
    <>
      <Modal open={modalIsOpen} className="flex justify-center items-center">
        <div className="w-[80vw] md:w-[400px] bg-white p-5 rounded-[30px]">
          <div className="flex justify-center items-center">
            <a
              href={
                url_external || "https://blog.naver.com/tamice/223421171777"
              }
              target="_blank"
            >
              <img
                src={popupImagePath}
                className="w-full object-cover sm:max-w-[25vw]"
              />
            </a>
          </div>
          <div className="flex justify-end items-center">
            <Checkbox
              onChange={(e) => {
                if (e.target.checked) {
                  // Save checked result in the LocalStorage
                  localStorage.setItem("openedPopUpModal", "true");
                  localStorage.setItem(
                    "openedPopUpModalTime",
                    new Date().toDateString()
                  );
                } else {
                  // Save checked result in the LocalStorage
                  localStorage.setItem("openedPopUpModal", "false");
                  localStorage.setItem(
                    "openedPopUpModalTime",
                    new Date().toDateString()
                  );
                }
              }}
              color="primary"
              size={window.innerWidth < 768 ? "small" : "medium"}
            />
            <p className="text-xs sm:text-sm">
              오늘 하루동안 이 창을 열지 않음
            </p>
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

      <div className="w-full">
        <div className="relative flex justify-center w-full h-1/2 ">
          <img
            className="object-cover object-center w-full h-[400px] "
            src={getBannerImages.backgroundImage}
            alt="Background"
          />

          {isMainPage && (
            <button
              className="absolute max-[430px]:top-[270px] top-[370px] sm:top-[370px] md:top-[370px] lg:top-[250px] rounded-2xl border-white border-[1px] text-white text-[15px] px-4 z-50"
              onClick={() => (window.location.href = "/package-tour/ba-pass")}
            >
              빅애플패스
            </button>
          )}
          <img
            className="absolute lg:hidden top-[22vh] object-cover object-center h-[90px]"
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
