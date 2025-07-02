import { staticFiles } from "..";
import { MainButton } from "./Buttons";
import { PUBLIC_URL } from "../../shared";
import { CardTypes, LocationCard, LocationCardProps } from "../../shared/components/LocationCard";
import { cityIdState, cityDataState } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { SpaceY } from "./Utils";
import { useLocation } from "react-router";
import { useState, useMemo } from "react";

export const InfoCover = () => {
  // Define Global State Variables
  const [cityId, setCityId] = cityIdState.useState();
  const [cityData, setCityData] = cityDataState.useState();
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState("");

  const handleButtonClick = () => {
    if (cityId === 1) {
      window.location.href = "/package-tour/ba-pass";
    } else if (cityId === 36) {
      window.location.href = "/package-tour/ba-pass";
    } else {
      window.location.href = "https://www.google.com";
    }
  };

  useEffect(() => {
    setCurrentPath(location?.pathname);
  }, [location]);
  // Create a navigate instance from useNavigate Hook
  const navigate = useNavigate();

  // Define useEffect Hook
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);
  if (cityId === 36) {
    // San Francisco mobile
    return (
      <>
        <div className="flex flex-col lg:hidden justify-between max-w-[1300px]">
          <SpaceY />
          <div className="flex flex-col">
            <div className="flex flex-col items-center w-full">
              <span className="font-poppins font-medium text-[#DF6951] hidden sm:display">
                빅애플패스로 함께하는 쉽고 편리한 여행
              </span>
            </div>
          </div>
          {/* <SpaceY /> <SpaceY /> */}
          <div className="flex justify-center relative">
            <img src={staticFiles.images.ny_main_page} />
            <div className="flex absolute bottom-2">
              <button
                className="w-[200px] rounded-2xl border-white border-[1px] bg-transparent w-full p-none text-white px-2 sm:hidden"
                onClick={handleButtonClick}
              >
                {" "}
                빅애플패스
              </button>
            </div>
            <span className="font-volkhov font-bold text-white text-xl lg:text-2xl leading-tight display sm:hidden absolute top-0 left-0 m-4">
              샌프란시스코 여행도 <br /> with.타미스
            </span>
          </div>
          {/* <SpaceY /> <SpaceY /> */}
          <div className="flex flex-col ">
            <div className="font-poppins text-dargGray hidden sm:display">
              빅애플패스는 뉴욕의 관광명소 TOP 40을 자유롭게 선택하여 최대 65%까지 할인받을 수 있는
              뉴욕 여행의 필수템이에요! 여행 경비를 절반이상 절약하고, 명소마다 일일이 티켓을
              구매하는 번거로움이 한방에 해결됩니다. E-티켓으로 원하실 때 티켓을 전송받아 편리하게
              이용하세요! 고객중심적인 유연한 환불,변경 및 다운/업그레이드 정책은 고객을 최우선으로
              생각하는 빅애플패스의 또다른 매력입니다.
            </div>
            <SpaceY />
          </div>
        </div>

        {/* SF pc */}
        <div className="max-h-[420px] hidden lg:flex justify-between px-[6.5rem] max-w-[1300px] my-4 my-[110px]">
          <div className="flex flex-col justify-between w-7/12">
            <div className="flex flex-col w-full">
              <span className="font-poppins font-medium text-[#DF6951]">
                빅애플패스로 함께하는 쉽고 편리한 여행
              </span>
              <span className="font-volkhov font-bold text-dark text-2xl lg:text-2xl leading-tight">
                샌프란시스코 여행도 <br />
                with.타미스
              </span>
            </div>

            <div className="font-poppins text-dargGray mr-20">
              샌프란시스코 빅애플패스는 샌프란시스코 자유 여행자들과 로컬들이 즐겨 찾는 관광명소로
              선정된 곳 중 자유롭게 1개~5개를 선택하여 최대 40% 까지 할인받을 수 있는 샌프란시스코
              여행의 필수템입니다. 여행 경비는 물론 긴 대기 줄도 생략할수 있으니 빅애플패스를 통해
              스마트한 샌프란시스코 여행을 즐겨보세요.
            </div>
            <div className="md:flex flex-col hidden">
              <SpaceY />
              <div className="flex">
                <MainButton
                  containerClassName="w-[200px] rounded"
                  text="빅애플패스"
                  onClick={handleButtonClick}
                />
              </div>
            </div>
          </div>

          <div className="flex w-10/12 items-end justify-end">
            <img className="max-h-[420px] min-h-[200px]" src={staticFiles.images.sf_main_page} />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* New York Mobile */}
      <div className="flex flex-col lg:hidden justify-between sm:px-[5vw] max-w-[1300px]">
        <SpaceY />
        <div className="flex flex-col">
          <div className="flex flex-col items-center w-full">
            <span className="font-poppins font-medium text-[#DF6951] hidden sm:display">
              빅애플패스로 함께하는 쉽고 편리한 여행
            </span>
          </div>
        </div>
        {/* <SpaceY /> <SpaceY /> */}
        <div className="flex justify-center relative">
          <img src={staticFiles.images.ny_main_page} />
          <div className="flex absolute bottom-2">
            <button
              className="w-[200px] rounded-2xl border-white border-[1px] bg-transparent w-full p-none text-white px-2 sm:hidden"
              onClick={handleButtonClick}
            >
              {" "}
              빅애플패스
            </button>
          </div>
          <span className="font-volkhov font-bold text-white text-xl lg:text-2xl leading-tight display sm:hidden absolute top-0 left-0 m-4">
            뉴욕 여행의 시작 <br /> with.타미스
          </span>
        </div>
        {/* <SpaceY /> <SpaceY /> */}
        <div className="flex flex-col ">
          <div className="font-poppins text-dargGray hidden sm:display">
            빅애플패스는 뉴욕의 관광명소 TOP 40을 자유롭게 선택하여 최대 65%까지 할인받을 수 있는
            뉴욕 여행의 필수템이에요! 여행 경비를 절반이상 절약하고, 명소마다 일일이 티켓을 구매하는
            번거로움이 한방에 해결됩니다. E-티켓으로 원하실 때 티켓을 전송받아 편리하게 이용하세요!
            고객중심적인 유연한 환불,변경 및 다운/업그레이드 정책은 고객을 최우선으로 생각하는
            빅애플패스의 또다른 매력입니다.
          </div>
          <SpaceY />
        </div>
      </div>
      {/* New York*/}
      <div className="max-h-[420px] hidden lg:flex justify-between px-[6.5rem] max-w-[1300px] my-4 my-[110px]">
        <div className="flex flex-col justify-between w-7/12">
          <div className="flex flex-col w-full">
            <span className="font-poppins font-medium text-[#DF6951]">
              빅애플패스로 함께하는 쉽고 편리한 여행
            </span>
            <span className="font-volkhov font-bold text-dark text-2xl lg:text-2xl leading-tight">
              뉴욕 여행의 시작 <br />
              with.타미스
            </span>
          </div>

          <div className="font-poppins text-dargGray mr-20">
            빅애플패스는 뉴욕의 관광명소 TOP 40을 자유롭게 선택하여 최대 65%까지 할인받을 수 있는
            뉴욕 여행의 필수템이에요! 여행 경비를 절반이상 절약하고, 명소마다 일일이 티켓을 구매하는
            번거로움이 한방에 해결됩니다. E-티켓으로 원하실 때 티켓을 전송받아 편리하게 이용하세요!
            고객중심적인 유연한 환불,변경 및 다운/업그레이드 정책은 고객을 최우선으로 생각하는
            빅애플패스의 또다른 매력입니다.
          </div>
          <div className="md:flex flex-col hidden">
            <SpaceY />
            <div className="flex">
              <MainButton
                containerClassName="w-[200px] rounded"
                text="빅애플패스"
                onClick={handleButtonClick}
              />
            </div>
          </div>
        </div>

        <div className="flex w-7/12 items-end justify-end">
          <img className="max-h-[420px] min-h-[200px]" src={staticFiles.images.ny_main_page} />
        </div>
      </div>
    </>
  );
};
