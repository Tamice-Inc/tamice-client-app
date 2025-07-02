import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import { cityIdState, cityDataState } from "../../App";
import { API, PUBLIC_URL } from "../../shared";
import { CardTypes, LocationCard, LocationCardProps } from "../../shared/components/LocationCard";
import { SpaceY } from "../../shared/components/Utils";
import { useGetAllCities } from "../../shared/hooks";

const extractParams = (url: string) => {
  const urlParams = new URLSearchParams(new URL(url).search);
  const redirect = urlParams.get("redirect");
  return { redirect };
};
// Define fakeLocations
const fakeLocations: LocationCardProps[] = [
  {
    city: "뉴욕",
    image: `${PUBLIC_URL}/images/뉴욕.svg`,
    location: "",
    type: CardTypes.CITY_LOCATION,
    cityId: 1,
  },
  {
    city: "라스베가스/캐년",
    image: `${PUBLIC_URL}/images/라스베가스-캐년.svg`,
    location: "",
    type: CardTypes.CITY_LOCATION,
    cityId: 58,
  },
  {
    city: "샌프란시스코",
    image: `${PUBLIC_URL}/images/샌프란시스코.svg`,
    location: "",
    type: CardTypes.CITY_LOCATION,
    cityId: 36,
  },
  {
    city: "나이아가라",
    image: `${PUBLIC_URL}/images/나이아가라.svg`,
    location: "",
    type: CardTypes.CITY_LOCATION,
    cityId: 57,
  },
  {
    city: "보스턴",
    image: `${PUBLIC_URL}/images/보스턴.svg`,
    location: "",
    type: CardTypes.CITY_LOCATION,
    cityId: 56,
  },

  {
    city: "하와이/LA/샌디에고",
    image: `${PUBLIC_URL}/images/Landing page_하와이,LA ,샌디에고.svg`,
    location: "",
    type: CardTypes.CITY_LOCATION,
    cityId: 59,
  },
];

export const LandingView = () => {
  // Define Global State variables
  const [cityId, setCityId] = cityIdState.useState();

  // Create a navigate instance from useNavigate Hook
  const navigate = useNavigate();

  // Function to handle navigate action
  const handleNavigate = (cityId: any, cityName: any) => {
    // set city data based selected item
    setCityId(cityId);
    localStorage.setItem("cityId", String(cityId));
    localStorage.setItem("cityName", cityName);

    // navigate to main page
    if (cityId === 1) {
      navigate("/ny/main");
    } else if (cityId === 56) {
      navigate("/boston/main");
    } else if (cityId === 36) {
      navigate("/sf/main");
    } else if (cityId === 57) {
      navigate("/nf/main");
    } else if (cityId === 58) {
      navigate("/ls/main");
    } else if (cityId === 59) {
      navigate("/hls/main");
    } else {
      navigate("/ny/main");
    }
  };

  useEffect(() => {
    const param = new URLSearchParams(window.location.search);
    const token = param.get("token");

    if (token) {
      const fetchProfile = async () => {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const result = await axios.get(`${API}/profile`, { headers });
        if (result.status === 200) {
          localStorage.setItem("authToken", token);
          localStorage.setItem("loginData", "email");
          localStorage.setItem("role", result.data.user?.roles[0]?.id);
          localStorage.setItem("useremail", result.data.user?.email);
        }
      };
      fetchProfile();
      navigate("/my-page");
    }
  });

  // Define useEffect Hooks
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  const { CitiesData } = useGetAllCities();

  const [cityData, setCityData] = useState<any>([]);
  
  useEffect(() => {
    if (CitiesData) {
      setCityData(CitiesData );
    }
  }, [CitiesData]);

  return (
    <div className="flex flex-col min-h-[600px] items-center pt-[5vh] pb-[20vh] w-full ">
      <SpaceY /> <SpaceY />
      <span className="font-medium font-poppins text-dark text-center">미국으로 떠나볼까요?</span>
      <SpaceY />
      <SpaceY /> <SpaceY />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-0 grid-cols-2">
        {fakeLocations.filter((city: any)=>
          cityData.filter((x: any) => city.cityId == x.id && x.status == "Publish")?.length > 0
        ).map((item) => (
          <div
            key={item.cityId}
            className="rounded-xl cursor-pointer drop-shadow-xl bg-white overflow-hidden h-[250px] sm:h-[350px] relative w-[170px] sm:w-[250px] m-4 relative "
            onClick={() => handleNavigate(item.cityId, item.city)}
          >
            <img
              src={item.image}
              alt={item.city}
              className="object-cover min-h-[350px] max-h-[640px]"
            />
            <div className="absolute font-bold text-white font-poppins text-darkGray top-4 left-4 text-[18px] sm:text-[25px]">
              {item.city}
            </div>
            <span className=" font-poppins text-darkGray rounded-2xl sm:display px-2 border-white border-[1px] absolute bottom-4 right-4 sm:bottom-6 sm:right-6 text-white text-[12px] sm:text-[14px]">
              보러가기
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
