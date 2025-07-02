import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useParams } from "react-router-dom";

import { staticFiles } from "../../shared";
import { MainButton } from "../../shared/components/Buttons";
import { SpaceY } from "../../shared/components/Utils";
import { TicketSelector } from "../package_tour/components/PackageBuyDetail";
import { useGetTicket } from "../../shared/hooks";
import { convertLink } from "../../shared/components/Utils";


export const ProductDetailView = () => {
  // Create a navigate instance from useNavigate
  const navigate = useNavigate();

  // Define Component State Variables
  const [displayFilter, setDisplayFilter] = useState(false);

  // Fake Product Data
  const productFakeData = {
    name: "엠파이어 스테이트 빌딩 전망대",
    tourDetail:
      "엠파이어 스테이트 빌딩은 세계에서 가장 유명한 건물로 뉴욕에 있는 상징적인 건물 입니다. 전망대에 오르면 뉴욕의 전경을 한 눈에 담을 수 있고, 날씨가 좋은 날에는 미국 동부의 6개 주를 보실 수 있습니다. 전망대 뿐만 아니라 엠파이어 스테이트 빌딩이 구상된 당시부터 지금까지의 스토리를 담은 박물관도 경험하실 수 있습니다. 관광객의 안전과 편리함을 최우선으로 생각하고 있는 엠파이어 스테이트 빌딩은 한국어가 포함된 9개의 언어로 설명을 들을 수 있는 애플리케이션을 제공하고 있으며, 건물 전체에 무료 와이파이도 제공할 수 있습니다. 매일매일 운영하고 있는 엠파이어 스테이트 빌딩 전망대는 뉴욕의 핵심 관광지인 타임스퀘어와 도보거리에 위치하고 있으며 빌딩 주변에는 메이시스 백화점, 메디슨 스퀘어 가든, 펜스테이션 등 쇼핑, 공연, 대중교통을 함께 이용할 수 있는 곳들이 있습니다.",
  };

  // Get ticket from useGetTicket with API call
  const { ticket } = useGetTicket();

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

  // Define useEffect Hook
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  useEffect(() => {
    const intervalId = setInterval(checkTokenExpiration, 1000); // Check token expiration every second
    return () => clearInterval(intervalId); // Clear the interval when the component unmounts
  }, []);

  // Get baseUrl of this website
  const baseUrl = window.location.port ? `${window.location.protocol}//${window.location.hostname}:${window.location.port}` : `${window.location.protocol}//${window.location.hostname}`;

  // Output: "https://example.com:3000" (assuming the current URL is https://example.com:3000/some/path)

  // Output: "https://example.com" (assuming the current URL is https://example.com/some/path)

  // let updatedContentString = ticket?.ticket_content?.content?.replaceAll('href="', `href="${baseUrl}/webpage/`);
  let updatedContentString = ticket?.ticket_content?.content?.replace(/href="([^"]+)"/g, (match: any, hrefValue: any) => {
    if (hrefValue.startsWith('http')) {
      return match;
    } else {
      return `href="${baseUrl}/webpage/${hrefValue}"`;
    }
  });


  return (ticket && (
    <div className="flex flex-col-reverse w-full mt-16 gap-x-8 md:flex-row md:relative">
      <div className="flex flex-col w-full md:w-2/3">
        {displayFilter ? (
          <TicketSelector ticket={ticket} />
        ) : (
          <>
            <div className="w-full mb-10 font-bold font-volkhov text-[24px] hidden md:block">
              {ticket.title_kr}
            </div>

            <div
              dangerouslySetInnerHTML={{
                __html: convertLink(updatedContentString || ""),
              }}
            ></div>
          </>
        )}
        <SpaceY />
      </div>
      <div className="w-full mt-8 md:w-1/3 md:block font-poppins md:mt-0">
        <div className="md:min-h-[500px] min-h-[350px] z-50">
          <TicketSelector ticket={ticket} />
        </div>
      </div>
      <div className="w-full md:hidden mb-10 font-bold font-volkhov text-[24px]">
        {ticket.title_kr}
      </div>
    </div>
  ));
};
