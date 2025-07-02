import { staticFiles } from "..";
import React, { useState, useEffect } from "react";

export enum CardTypes {
  CITY_LOCATION,
  ONLY_LOCATION,
  PLACE_PRICE,
  SHOW,
  SHOW_WITH_PRICE,
  COMMUNITY,
}

export type LocationCardProps = {
  type: CardTypes;
  image: string;
  city?: string;
  location: string;
  large?: boolean;
  oldPrice?: number;
  newPrice?: number;
  windowPrice?: any;
  salePrice?: any;
  showName?: string;
  communityText?: string;
  url?: string;
  cityId?: string | number;
  miniTitle?: string;
  handleNavigate?: () => void;
};

export const LocationCard: React.FC<LocationCardProps> = ({
  city,
  image,
  location,
  large,
  type,
  oldPrice,
  newPrice,
  windowPrice,
  salePrice,
  showName,
  communityText,
  miniTitle,
  handleNavigate,
}) => {
  const width = large ? "xl:w-[800px] cursor-pointer " : "grow  cursor-pointer ";

  const [displayLocation, setDisplayLocation] = useState("");

  // Effect to handle window resizing
  useEffect(() => {
    const handleResize = () => {
      // Check window width
      if (window.innerWidth < 768) {
        // Window width is less than 500px, slice to 6 characters
        setDisplayLocation(location.length <= 8 ? location : `${location.slice(0, 8)}...`);
      } else {
        // Window width is 500px or more, slice to 12 characters
        setDisplayLocation(location.length <= 12 ? location : `${location.slice(0, 12)}...`);
      }
    };

    // Call handleResize initially and whenever the window is resized
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, [location]); // Rerun effect if location prop changes

  if (type === CardTypes.SHOW)
    return (
      <div
        className={`rounded-xl flex flex-col grow w-[170px] sm:min-w-[250px] cursor-pointer drop-shadow-xl bg-white overflow-hidden h-[250px] sm:h-[350px] `}
      >
        <img className="object-cover min-h-[185px] sm:min-h-[250px] max-[640px]:min-h-[150px]" src={image} />
        <div className="flex justify-start h-full px-4 flex-col items-start">
          {/* <img width={17} src={staticFiles.icons.location} /> */}
          <span className="  font-poppins text-darkGray text-[12px] pt-[0.5rem]">{miniTitle}</span>
          <span className=" font-poppins text-darkGray">{location}</span>
        </div>
        <span className="flex justify-end px-5 pb-3 font-poppins text-darkGray gap-x-3">
          {showName}
        </span>
      </div>
    );

  if (type === CardTypes.SHOW_WITH_PRICE)
    return (
      <div
        className={`rounded-xl flex flex-col grow w-[170px] sm:min-w-[250px] cursor-pointer drop-shadow-xl bg-white overflow-hidden h-[250px] sm:h-[350px] `}
      >
        <img className="object-cover min-h-[185px] sm:min-h-[250px] max-[640px]:min-h-[150px]" src={image} />
        <div className="flex justify-start h-full px-4 flex-col items-start">
          {/* <img width={17} src={staticFiles.icons.location} /> */}
          <span className="  font-poppins text-darkGray text-[12px] pt-[0.5rem]">{miniTitle}</span>
          <span className="font-poppins text-darkGray">{displayLocation}</span>
        </div>
        <span className="flex justify-end px-5 pb-3 font-poppins text-darkGray gap-x-3">
          {showName}
        </span>
        <div className="flex justify-end px-5 pb-3 font-poppins gap-x-3">
          <span className="text-[#999999] line-through">${windowPrice || 0}</span>
          <span className="text-blue">${salePrice || 0}</span>
        </div>
      </div>
    );

  if (type === CardTypes.PLACE_PRICE)
    return (
      <div
        className={`rounded-xl flex flex-col grow w-[170px] sm:min-w-[250px] cursor-pointer drop-shadow-xl bg-white overflow-hidden h-[250px] sm:h-[350px]`}
      >
        <img className="object-cover min-h-[185px] sm:min-h-[250px] max-[640px]:min-h-[150px]" src={image} />
        <div className="flex justify-start h-full px-4 flex-col items-start">
          {/* <img width={17} src={staticFiles.icons.location} /> */}
          <span className="  font-poppins text-darkGray text-[12px] pt-[0.5rem]">{miniTitle}</span>
          <span className=" font-poppins text-darkGray">{location}</span>
        </div>
        <div className="flex justify-end px-5 pb-3 font-poppins gap-x-3">
          <span className="text-[#999999] line-through">${oldPrice || 0}</span>
          <span className="text-blue">${newPrice || 0}</span>
        </div>
      </div>
    );

  if (type === CardTypes.CITY_LOCATION || type == CardTypes.ONLY_LOCATION)
    return (
      <div
        className={`rounded-xl flex flex-col grow w-[170px] sm:min-w-[250px] cursor-pointer drop-shadow-xl bg-white overflow-hidden h-[250px] sm:h-[350px] relative ${width}`}
        onClick={handleNavigate}
      >
        <img className="object-cover min-h-[250px] sm:min-h-[350px] relative" src={image} />

        <div className="flex justify-start h-full px-4 flex-col items-start">
          <span className="  font-poppins text-darkGray text-[12px] pt-[0.5rem]">{miniTitle}</span>
          <span className="absolute font-bold text-white font-poppins text-darkGray top-4 left-4 text-[18px] sm:text-[25px]">
            {location}
          </span>
          {/* <img width={17} src={staticFiles.icons.location} /> */}
          {city && <span className=" font-poppins text-darkGray">{city}</span>}
          {/* <button className="absolute text-sm text-white font-poppins text-darkGray bottom-2 right-4">{location}</button> */}
          <span className=" font-poppins text-darkGray rounded-2xl sm:display px-2 border-white border-[1px] absolute bottom-4 right-4 sm:bottom-6 sm:right-6 text-white text-[12px] sm:text-[14px]">
            보러가기
          </span>
        </div>
      </div>
    );

  if (type === CardTypes.COMMUNITY)
    return (
      <div
        className={`rounded-xl flex flex-col grow w-[170px] sm:min-w-[250px] cursor-pointer drop-shadow-xl bg-white overflow-hidden h-[250px] sm:h-[350px] relative grow  cursor-pointer`}
      >
        <img className="object-cover min-h-[250px] sm:min-h-[350px] relative" src={image} />
        <div className="flex justify-start h-full px-4 flex-col items-start">
          {/* <img width={17} src={staticFiles.icons.location} /> */}
          <span className="  font-poppins text-darkGray text-[12px] pt-[0.5rem]">{miniTitle}</span>
          <span className=" font-poppins text-darkGray">{location}</span>
        </div>
        <span className="px-5 pb-2 font-poppins text-darkGray">{communityText}</span>
        <span className=" font-poppins text-darkGray rounded-2xl sm:display px-2 border-white border-[1px] absolute bottom-4 right-4 sm:bottom-6 sm:right-6 text-white text-[12px] sm:text-[14px]">
          보러가기
        </span>
      </div>
    );

  return null;
};
