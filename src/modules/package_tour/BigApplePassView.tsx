import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cityIdState, menuLoadingState, menuState, pageNumState } from "../../App";
import { API, staticFiles } from "../../shared";
import { ProductCard } from "../../shared/components/ProductCard";
import { useGetTickets } from "../../shared/hooks";
import { PackageBuyDetail } from "./components/PackageBuyDetail";
import axios from "axios";

export const BigApplePassView = () => {
  // Define Global State variables
  const [menu] = menuState.useState();
  const [cityId] = cityIdState.useState();
  const [totalNum, setTotalNum] = pageNumState.useState();
  const [menuLoading, setMenuLoading] = menuLoadingState.useState();

  // Define component State variables
  const [displayFilter, setDisplayFilter] = useState(false);
  const [page, setPage] = useState(totalNum);
  const [isShowing, setIsShowing] = useState(true);
  const [tickets, setTickets] = useState<any>([]);
  const [isFirst, setIsFirst] = useState(true);

  // Create a navigate instance from useNavigate Hook
  const navigate = useNavigate();

  // Get Tickets from useGetTickets custom Hook with api call
  const { tickets: allTickets } = useGetTickets({
    category: Number(menu[1]?.dropdownElements?.[0].category_id),
    subCategoryId: Number(menu[1]?.dropdownElements?.[0].id),
    menu,
    menuLoading,
  });

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

  // Function to handle button click
// const handleClick = () => {
//   if (tickets) {
//     setPage(tickets.length); // Set the page number to the total number of tickets
//     setIsShowing(false); // Hide the "Load More" button
//   }
// };

  // **control number of tickets to display**
  // const handleClick = () => {
  //   if (!!tickets) {
  //     if (tickets.length <= page + 5) {
  //       setPage(tickets.length);
  //       setTotalNum(tickets.length);
  //       setIsShowing(false);
  //     } else {
  //       setPage(page + 5);
  //       setTotalNum(page + 5);
  //     }
  //   }
  // }

  // Define useEffect Hooks to handle several conditions
  useEffect(() => {
    // console.log("tickets are ", tickets);
    const intervalId = setInterval(checkTokenExpiration, 1000); // Check token expiration every second
    return () => clearInterval(intervalId); // Clear the interval when the component unmounts
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  useEffect(() => {
    setPage(totalNum || 5);
  }, [cityId]);

  useEffect(() => {
    setTickets(allTickets);
    return () => {
      setTickets([]);
    };
  }, [allTickets]);

  // Check if allTickets is defined and not empty before slicing
  // const tickets = allTickets?.slice(0, 10000) || [];

  const [bigApplePassImage, setBigApplePassImage] = useState('');


  useEffect(() => {
    const updateImage = async() => {
      let imageSrc;
      // Check both cityId and window width to determine the appropriate image source
      if (window.innerWidth < 768) {
        switch (cityId) {
          case 1:
            imageSrc = fetchMobileImage(123);
            break;
          case 36:
            imageSrc = fetchMobileImage(129);
            break;
          case 56:
            imageSrc = fetchMobileImage(133);
            break;
          case 57:
            imageSrc = fetchMobileImage(131);
            break;
          case 58:
            imageSrc = fetchMobileImage(125);
            break;
          case 59:
            imageSrc = fetchMobileImage(127);
            break;
          default:
            imageSrc = fetchMobileImage(123); // Default to NY Big Apple Pass Price Mobile
        }
      } else {
        switch (cityId) {
          case 1:
            imageSrc = fetchDesktopImage(122);
            break;
          case 36:
            imageSrc = fetchDesktopImage(128);
            break;
          case 56:
            imageSrc = fetchDesktopImage(132);
            break;
          case 57:
            imageSrc = fetchDesktopImage(130);
            break;
          case 58:
            imageSrc = fetchDesktopImage(124);
            break;
          case 59:
            imageSrc = fetchDesktopImage(126);
            break;
          default:
            imageSrc = fetchDesktopImage(122); // Default to NY Big Apple Pass Price Desktop
        }
      }
      setBigApplePassImage(await imageSrc);
    };

    updateImage();
    window.addEventListener("resize", updateImage);

    return () => window.removeEventListener("resize", updateImage);
  }, [cityId]);

  const fetchMobileImage = async (id:any) => {
    try {
      const response = await axios.get(`${API}/templates/${id}/image`);
      return response.data.image.url; // Assuming the API returns a url field in the response
    } catch (error) {
      console.error('Error fetching mobile image:', error);
      return ''; // Return empty string on error
    }
  };

  const fetchDesktopImage = async (id:any) => {
    try {
      const response = await axios.get(`${API}/templates/${id}/image`);
      return response.data.image.url; // Assuming the API returns a url field in the response
    } catch (error) {
      console.error('Error fetching desktop image:', error);
      return ''; // Return empty string on error
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center mb-8">
        <img src={bigApplePassImage} width="100%" alt="big apple pass price" />
      </div>
      <div className="flex flex-col-reverse w-full gap-x-8 md:flex-row">
        <div className="flex flex-col w-full md:w-2/3 gap-y-8">
          {displayFilter ? (
            <PackageBuyDetail
              tour={true}
              handlePage={setPage}
              allTickets={tickets}
              tickets={tickets?.slice(0, page) || []}
            />
          ) : (
            tickets?.map((item: any) => <ProductCard key={item.name} {...item} />) 
          )}
          {/* {isShowing ? (
            <div
              className="flex justify-center text-base text-blue hover:cursor-pointer hover:underline font-poppins"
              onClick={handleClick}
            >
              전체보기
            </div>
          ) : (
            <></>
          )} */}
          {/* <MainButton
          text={"티켓구입"}
          containerClassName="w-full block md:hidden"
          onClick={() => setDisplayFilter((prev) => !prev)}
        /> */}
        </div>
        <div className="w-full mt-8 md:w-1/3 md:block font-poppins md:mt-0">
          <PackageBuyDetail
            tour={true}
            handlePage={setPage}
            allTickets={tickets}
            tickets={tickets || []} // Use the updated tickets array
            categoryId={Number(menu[1]?.dropdownElements?.[0].category_id)}
            subCategoryId={Number(menu[1]?.dropdownElements?.[0].id)}
            subCategoryTitle={"SF Big Apple Pass"}
            subPath={"ba-pass"}
          />
        </div>
      </div>
    </>
  );
};
