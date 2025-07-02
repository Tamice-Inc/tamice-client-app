import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { API } from "../../shared";
import { staticFiles } from "../../shared";
import { SpaceY } from "../../shared/components/Utils";
import { ServiceCard, ServiceCardProps } from "./components/ServiceCard";
import { CartView } from "../cart/CartView";
import { convertLink } from "../../shared/components/Utils";


export const WebPageView = () => {
  // Get id from the given url params
  let { id } = useParams();

  // Define Component State variables
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define useEffect Hook
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios
          .get(
            `${API}/templates/${id}/webpage`,
          );

        setData(response.data)
      } catch (error: any) {
        console.log(error);
        setError(error?.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Show Loading Spinner while fetching data from the server
  if (loading) return (
    <div className="flex flex-col w-full mt-16 gap-x-8 md:flex-row md:relative">
      <div className="flex flex-col w-full">
        <Loading />
      </div>
    </div>
  );

  // Show error whene there is error in the api call
  if (error) return (
    <div className="flex flex-col w-full mt-16 gap-x-8 md:flex-row md:relative">
      <div className="flex flex-col w-full">
        <Error error={error || ""} />
      </div>
    </div>
  );

  // Get baseUrl of this website
  const baseUrl = window.location.port ? `${window.location.protocol}//${window.location.hostname}:${window.location.port}` : `${window.location.protocol}//${window.location.hostname}`;

  // Output: "https://example.com:3000" (assuming the current URL is https://example.com:3000/some/path)

  // Output: "https://example.com" (assuming the current URL is https://example.com/some/path)
  // let updatedContentString = data?.content_page?.replaceAll('href="', `href="${baseUrl}/webpage/`);
  let updatedContentString = data?.content_page?.replace(/href="([^"]+)"/g, (match: any, hrefValue: any) => {
    if (hrefValue.startsWith('http')) {
      return match;
    } else {
      return `href="${baseUrl}/webpage/${hrefValue}"`;
    }
  });

  return (
    <div className="flex flex-col w-full mt-16 gap-x-8 md:flex-row md:relative">
      <div className="flex flex-col w-full">
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: convertLink(updatedContentString || ""),
            }}
          ></div>
        </>
        <SpaceY />
      </div>
    </div>
  );
};

// Loading Component
const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-16 h-16 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
    </div>
  );
};

// Error Component
const Error = ({ error }: { error: string }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-xl">시스템 문제가 발생했습니다. 잠시 후 다시 시도해주세요! {error}</h1>
    </div>
  );
};
