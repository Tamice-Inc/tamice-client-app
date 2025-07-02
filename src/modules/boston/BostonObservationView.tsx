import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

import { cityIdState, menuState, menuLoadingState } from "../../App";
import { ProductCard } from "../../shared/components/ProductCard";
import { useGetTickets } from "../../shared/hooks";


export const BostonObservationsView = () => {
  // Define Global State Variables
  const [menu] = menuState.useState();
  const [cityId] = cityIdState.useState();
  const [menuLoading, setMenuLoading] = menuLoadingState.useState();

  // Define Component State Variables
  // const [page, setPage] = useState(5);
  // const [isShowing, setIsShowing] = useState(true);

  // Fetch tickets from useGetTickets Hook with API call
  const { tickets } = useGetTickets({
    category: cityId == 56 ? 77 : Number(menu[2]?.dropdownElements?.[0].category_id),
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
        // For example, clear the token from local storage and redirect the user to the login page
        localStorage.removeItem("authToken");
        localStorage.removeItem("loginData");
        localStorage.removeItem("order_number");
        localStorage.removeItem("useremail");

        navigate("/");
      }
    }
  };

  // Function to handle click event
// const handleClick = () => {
//   if (tickets) {
//     setPage(tickets.length); // Set the page number to the total number of tickets
//     setIsShowing(false); // Hide the "Load More" button
//   }
// };

  // Define useEffect Hooks
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  useEffect(() => {
    const intervalId = setInterval(checkTokenExpiration, 1000); // Check token expiration every second
    return () => clearInterval(intervalId); // Clear the interval when the component unmounts
  }, []);

  // useEffect(() => {
  //   setPage(5);
  // }, [cityId])


  return (
    <div className="flex justify-center w-full gap-x-3">
      <div className="flex flex-col gap-y-8 w-full max-w-[1300px]">
           {tickets?.map((item:any) => (
          <ProductCard key={item.name} {...item} />
        ))}
      {/* {isShowing ?
          <div className="flex justify-center text-base text-blue hover:cursor-pointer hover:underline font-poppins" onClick={handleClick}>전체보기</div> :
          <></>
        } */}
      </div>
    </div>
  );
};
