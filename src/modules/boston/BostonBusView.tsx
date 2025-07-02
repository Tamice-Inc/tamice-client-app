import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

import { cityIdState, menuState, menuLoadingState } from "../../App";
import { ProductCard } from "../../shared/components/ProductCard";
import { useGetTickets } from "../../shared/hooks";

export const BostonBusView = () => {
  // Define Global State Variables
  const [menu] = menuState.useState();
  const [cityId] = cityIdState.useState();
  const [menuLoading, setMenuLoading] = menuLoadingState.useState();



  // Fetch tickets from useGetTickets Hook with API call
  const { tickets } = useGetTickets({
    category: cityId === 56 ? 78 : Number(menu[2]?.dropdownElements?.[0].category_id),
    subCategoryId: Number(menu[2]?.dropdownElements?.[0].id),
    menu,
    menuLoading
  });

  // Create a navigate instance from useNavigate Hook
  const navigate = useNavigate();

  // Function to check auth Token expiration
  const checkTokenExpiration = () => {
    const token = localStorage.getItem("authToken");

    if (token) {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert current time to seconds

      if (decodedToken.exp < currentTime) {
        // Token has expired, force logout here
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

  return (
    <div className="flex justify-center w-full gap-x-3">
      <div className="flex flex-col gap-y-8 w-full max-w-[1300px]">
          {tickets?.map((item:any) => (
          <ProductCard key={item.name} {...item} />
        ))}
        {/* Removed the 전체보기 button */}
      </div>
    </div>
  );
};



