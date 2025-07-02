import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

import { PackageBuyDetail } from "./components/PackageBuyDetail";
import { ProductCard } from "../../shared/components/ProductCard";
import { MainButton } from "../../shared/components/Buttons";
import { useGetContents, useGetTickets } from "../../shared/hooks";
import { menuState, cityIdState } from "../../App";
import { convertLink } from "../../shared/components/Utils";


export const NYCityPassView = () => {
  // Define Global State variables
  const [menu] = menuState.useState();
  const [cityId] = cityIdState.useState();
  const [page, setPage] = useState(0);


  // Define Component State variables
  const [displayFilter, setDisplayFilter] = useState(false);

  // Create a navigate instance from useNavigate Hook
  const navigate = useNavigate();

  // Fetch content from useGetContents custom Hook with api call
  const { contents, errors } = useGetContents({
    content_id: cityId === 1 ? 159 : 214,
    menu
  });


  // Function to check auth Token Expiration
  const checkTokenExpiration = () => {
    const token = localStorage.getItem("authToken");

    if (token) {
      const decodedToken: any = jwtDecode(token);

      const currentTime = Date.now() / 1000; // Convert current time to seconds

      if (decodedToken.exp < currentTime) {
        // Token has expired, force logout here
        // For example, clear the token from local storage and redirect the user to the login page
        localStorage.removeItem("authToken");
        localStorage.removeItem("loginData");
        localStorage.removeItem("order_number");
        localStorage.removeItem("useremail");

        navigate("/");
      }
    }
  };

  // Define useEffect Hooks
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  useEffect(() => {
    const intervalId = setInterval(checkTokenExpiration, 1000); // Check token expiration every second
    return () => clearInterval(intervalId); // Clear the interval when the component unmounts
  }, []);

  if (errors) {
    // Base url
   const baseUrl = window.location.port ? `${window.location.protocol}//${window.location.hostname}:${window.location.port}` : `${window.location.protocol}//${window.location.hostname}`;

  //  return (
  //    <div className="flex items-center justify-center h-screen flex-col gap-5">
  //      <h1 className="text-xl">
  //      시스템 에러 - 1분 뒤에 닫기를 눌러주시고 다시 시도해주세요!
  //      </h1>
  //      <button className="w-[100px]  text-base font-poppins text-white bg-blue py-2 h-12 rounded text-base" onClick={() => window.location.href = baseUrl}>닫기</button>
  //    </div>
  //  );
  }

  return (
    <div className="flex flex-col-reverse w-full gap-x-8 md:flex-row">
      <div className="flex flex-col w-full mt-5 md:mt-0 md:w-2/3 gap-y-8">
        <div
          dangerouslySetInnerHTML={{
            __html: convertLink(contents?.ticket_content.content || ""),
          }}
        ></div>
        {/* <MainButton
          text={"티켓구입"}
          containerClassName="w-full block md:hidden"
          onClick={() => setDisplayFilter((prev) => !prev)}
        /> */}
      </div>
      <div className="w-full mt-8 md:w-1/3 md:block font-poppins md:mt-0">

        <PackageBuyDetail tickets={[]} handlePage={setPage} singleTicket={contents} categoryId={Number(menu[1]?.dropdownElements?.[1].category_id)} subCategoryId={Number(menu[1]?.dropdownElements?.[1].id)} subCategoryTitle={"NY City Pass"} subPath={"ny-city-pass"} />
      </div>
    </div>
  );
};
