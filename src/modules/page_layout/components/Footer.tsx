// import { useState, useEffect } from "react";
// import axios from "axios";
// import { staticFiles, API } from "../../../shared";
// import { Logo } from "../../../shared/components/Logo";
// import { convertLink } from "../../../shared/components/Utils";
// import { Link } from "react-router-dom";
import BaseFooter from "../../../shared/components/Footer";

export const Footer = () => {
  // const id = 53; // Footer template id
  // const [data, setData] = useState<any>(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axios.get(`${API}/templates/${id}/webpage`);

  //       setData(response.data);
  //     } catch (error: any) {
  //       console.log(
  //         "Error while calling webpage tempate in footer",
  //         error,
  //         error?.message
  //       );
  //       setError(true);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // if (loading) return <Loading />;
  // if (error) return <Error error={"error" || ""} />;

  // Get baseUrl of this website
  // const baseUrl = window.location.port
  //   ? `${window.location.protocol}//${window.location.hostname}:${window.location.port}`
  //   : `${window.location.protocol}//${window.location.hostname}`;

  // Output: "https://example.com:3000" (assuming the current URL is https://example.com:3000/some/path)

  // Output: "https://example.com" (assuming the current URL is https://example.com/some/path)

  // let updatedContentString = data?.content_page?.replaceAll('href="', `href="${baseUrl}/webpage/`);
  // let updatedContentString = data?.content_page?.replace(
  //   /href="([^"]+)"/g,
  //   (match: any, hrefValue: any) => {
  //     if (hrefValue.startsWith("http")) {
  //       return match;
  //     } else {
  //       return `href="${baseUrl}/webpage/${hrefValue}"`;
  //     }
  //   }
  // );

  return (
    <div className="flex flex-col w-full gap-x-8 md:flex-row md:relative">
      <div className="flex flex-col w-full">
        <BaseFooter />
        {/* <>
          <div
            dangerouslySetInnerHTML={{
              __html: convertLink(updatedContentString || ""),
            }}
          ></div>
        </> */}
      </div>
    </div>
  );
  // return (
  //   <div className="h-auto sm:h-[350px] w-full bg-[#262424] flex flex-col items-center text-[14px]">
  //     <div className="flex flex-col sm:flex-row sm:justify-between max-w-[1300px] h-[80%] gap-8 md:gap-16 xl:gap-40 p-4 ">
  //   </div>
  // );
};

// const Loading = () => {
//   return (
//     <div className="flex items-center justify-center h-screen">
//       <div className="w-16 h-16 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
//     </div>
//   );
// };

// const Error = ({ error }: { error: string }) => {
//   // Base url
//   const baseUrl = window.location.port
//     ? `${window.location.protocol}//${window.location.hostname}:${window.location.port}`
//     : `${window.location.protocol}//${window.location.hostname}`;

//   return (
//     <div className="flex items-center justify-center h-screen flex-col gap-5">
//       <h1 className="text-xl">
//         시스템 에러 - 1분 뒤에 닫기를 눌러주시고 다시 시도해주세요!
//       </h1>
//       <button
//         className="w-[100px]  text-base font-poppins text-white bg-blue py-2 h-12 rounded text-base"
//         onClick={() => (window.location.href = baseUrl)}
//       >
//         닫기
//       </button>
//     </div>
//   );
// };
