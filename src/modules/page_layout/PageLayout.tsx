import { ReactNode, useEffect } from "react";
import { Cover } from "../../shared/components/Cover";
// import { CoverWithoutText } from "../../shared/components/CoverNoText";
import { InfoCover } from "../../shared/components/InfoCover";
import { LandingCover } from "../../shared/components/LandingCover";
import { ShowCover } from "../../shared/components/ShowCover";
import { Footer } from "./components/Footer";
import { Top } from "./components/Top";
import { cityIdState } from "../../App";
import { useLocation } from "react-router-dom";

export enum CoverTypes {
  NORMAL,
  NORMAL_WITHOUT_TEXT,
  INFO,
  SHOWS,
  NONE,
  LANDING,
}

export const PageLayout: React.FC<{
  children: ReactNode;
  cover?: CoverTypes;
  backgroundColor?: string;
}> = ({ children, cover, backgroundColor = "bg-transparent" }) => {
  const [cityId, setCityId] = cityIdState.useState();
  const location = useLocation();

  // If there is no city state in localstorage
  useEffect(() => {
    // if(cityId === 1){
      if(location?.pathname.split("/")?.length > 2){
        let pathname = location?.pathname.split("/")?.[1]
        const CITY_ID_ROUTES =
          {
            "ny": 1, 
            "sf": 36,
            "boston": 56,
            "nf": 57,
            "ls": 58,
            "cy": 58,
            "hls": 59
          }
        //@ts-ignore
        var routeCityId = CITY_ID_ROUTES[pathname]
        if(routeCityId){
          setCityId(routeCityId)
          localStorage.setItem("cityId", String(routeCityId))
        }
      }
    // }
  },[])

  return (
    <div
      className={`flex flex-col items-center min-h-screen bg-[#F7F8FA] bg-no-repeat`}
    >
      <Top />
      {cover === CoverTypes.NORMAL && <Cover />}
      {cover === CoverTypes.NORMAL_WITHOUT_TEXT && <Cover />}
      {cover === CoverTypes.INFO && <InfoCover />}
      {cover === CoverTypes.LANDING && <LandingCover />}
      {cover === CoverTypes.SHOWS && <Cover />}
      <div
        className={` lg:max-w-[1300px] max-w-[800px] w-full flex justify-center p-2`}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
};
