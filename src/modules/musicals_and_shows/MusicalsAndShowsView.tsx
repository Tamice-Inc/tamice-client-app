import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { ShowBuyDetail } from "./components/ShowBuyDetail";
import { ShowCard } from "./components/ShowCard";

import { musicState } from "../../App";
import { API, staticFiles } from "../../shared";
import { convertLink } from "../../shared/components/Utils";
import { GetMusicalData, useGetTicket } from "../../shared/hooks";

export const MusicalsAndShowsView = () => {
  // Product Codes
  const musicalsProductCode = {
    Chicago: "CHICAGO",
    MJ: "MJMUSICAL3",
    //"Back to the Future: The Musical": "BACKFUTURE",
    "Harry Potter and the Cursed Child": "CURSEDCHIL",
    "Moulin Rouge! The Musical": "MOULIN",
    Wicked: "WICKED3",
    Aladdin: "ALADDIN",
    //"Kimberly Akimbo": "KIMAKIMBO",
    "The Lion King": "LIONKING3",
    Hamilton: "HAMILTON3",
    "& Juliet": "ANDJULIET",
    //"Blue Man Group": "BLUEMAN",
    SIX: "SIX3",
    "The Book of Mormon": "BKMORMONTM",
    //"Sweeney Todd": "SWEENYTOD2",
    SPAMALOT: "SPAMALOT2",
    //Notebook: "NOTEBOOK",
    Hadestown: "HADESTOWN",
    "Buena Vista Social Club": "BUENAVISTA",
    "Cabaret at the Kit Kit Club": "CABARET24",
    "The Great Gatsby": "GATSBY",
    "Hell's Kitchen": "HELLSKITCH",
    "Mamma Mia!": "MAMMAMIA25",
    "Maybe Happy Ending": "MAYBEHAPP",
    "Stranger Things: The First Shadow": "STRANGERTH",
    "The Outsiders": "OUTSIDERS",
  };

  const webPageIds = {
    Chicago: 60,
    MJ: 61,
    //"Back to the Future: The Musical": 62,
    "Harry Potter and the Cursed Child": 63,
    "Moulin Rouge! The Musical": 64,
    Wicked: 65,
    Aladdin: 66,
    //"Kimberly Akimbo": 68,
    "The Lion King": 69,
    Hamilton: 70,
    "& Juliet": 71,
    //"Blue Man Group": 72,
    SIX: 73,
    "The Book of Mormon": 74,
    //"Sweeney Todd": 75,
    SPAMALOT: 76,
    //Notebook: 77,
    Hadestown: 78,
    "Buena Vista Social Club": 138,
    "Cabaret at the Kit Kit Club": 143,
    "The Great Gatsby": 139,
    "Hell's Kitchen": 144,
    "Mamma Mia!": 140,
    "Maybe Happy Ending": 141,
    "Stranger Things: The First Shadow": 142,
    "The Outsiders": 145, //145 for production
  };

  // Define Global State Variable
  const [selectedMusic, setSelectedMusic] = musicState.useState();

  // Define Component State Variables
  const [dataList, setDataList] = useState([{}]);
  const [dateValue, setDateValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [webTemplateData, setWebTemplateData] = useState<any>(null);

  // Define search to get params from the url
  const { search } = useLocation(); // ?edit=true&cartId=1690069215841

  // Get param values from the url params
  let { date, time, id, name, kr_name } = useParams();

  // Fetch ticket from useGetTicket Custom Hook
  const { ticket } = useGetTicket();

  // Store the extracted result
  const searchQuery = extractParams(
    `http://localhost:${process.env.REACT_APP_PORT}/my-page${search}`
  );

  // Fetch musical data from GetMusicalData Custom Hook with API call
  const { musicalData, isLoading } = GetMusicalData(
    musicalsProductCode[ticket?.title_en as keyof typeof musicalsProductCode]
  );

  // Modify time based on edit value from the search query
  if (searchQuery?.edit) {
    time = `${time?.split(" ")[0]}${time?.split(" ")[1] == "am" ? "AM" : "PM"}`;
  }

  // Function to filter musical data
  const filterMusicalData = () => {
    if (musicalData && date && time) {
      const selectedDate = new Date(date);
      const formattedDate =
        selectedDate.getFullYear() +
        "/" +
        (selectedDate.getMonth() + 1).toString().padStart(2, "0") +
        "/" +
        selectedDate.getDate().toString().padStart(2, "0");
      const changeDate = formattedDate.split("/");
      setDateValue(changeDate[1] + "/" + changeDate[2] + "/" + changeDate[0]);

      const filteredData = musicalData.filter((data: any) => {
        const dataDate = new Date(data.product_date);
        const dataFormattedDate =
          dataDate.getFullYear() +
          "/" +
          (dataDate.getMonth() + 1).toString().padStart(2, "0") +
          "/" +
          dataDate.getDate().toString().padStart(2, "0");
        return (
          dataFormattedDate === formattedDate && time === data.product_time
        );
      });

      setDataList(filteredData);
    } else {
      // Handle the case when musicalData, date, or time are not available
      setDataList([]);
    }
  };
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  // Define useEffect Hooks
  useEffect(() => {
    filterMusicalData();
  }, [date, time, isLoading]);

  useEffect(() => {
    if (window.innerWidth < 768) {
      window.scrollTo(0, 500); // For mobile devices
    } else {
      window.scrollTo(0, 800); // For other devices
    }
  }, [navigate]);

  useEffect(() => {
    if (searchQuery?.music_id) {
      setSelectedMusic({ music_id: searchQuery?.music_id });
    } else {
      setSelectedMusic({ music_id: "" });
    }
  }, []);

  useEffect(() => {
    if (ticket) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `${API}/templates/${
              webPageIds[ticket?.title_en as keyof typeof webPageIds] || 60
            }/webpage`
          );

          setWebTemplateData(response.data);
        } catch (error: any) {
          console.log(error);
          setError(error?.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [ticket]);

  return (
    <div>
      {isLoading && (
        <div className="fixed top-0 left-0 z-[600] flex items-center justify-center w-full h-screen bg-black bg-opacity-25">
          <div className="w-16 h-16 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
        </div>
      )}
      <div
        className="flex w-full py-12 sm:flex gap-x-4 px-[25px]"
        onClick={() => {}}
      >
        <div className="flex flex-col font-poppins gap-y-3">
          <span
            className="mb-10 font-bold text-dark"
            style={{ fontSize: "24px" }}
          >
            {ticket?.title_en} [{ticket?.title_kr}]
          </span>
          <div
            dangerouslySetInnerHTML={{
              __html: convertLink(webTemplateData?.content_page || ""),
            }}
          ></div>
          <div className="flex flex-row mt-8 mb-5">
            <img src={staticFiles.icons.schedule} width={25} />
            <span
              className="ml-5 font-bold text-dark"
              style={{ fontSize: "16px" }}
            >
              {" "}
              <span
                className="cursor-pointer text-[#5D5D5F]"
                onClick={handleBack}
              >
                Calendar
              </span>{" "}
              /{" "}
              <span className="text-[rgb(0,172,237)]">
                Seating Location & Ticket Price
              </span>
            </span>
          </div>
          <div className="font-bold">
            {dateValue}, {time}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center w-full gap-x-6 md:flex-row">
        <div className="flex flex-col w-full md:w-2/3 gap-y-12">
          <div className="flex flex-col w-full py-4 bg-white gap-x-4 border-style rounded-[20px] shadow-2xl border-gray-300">
            {/* <div className="flex w-full item-left">
              <p className="font-bold" style={{ fontSize: 30, margin: 20 }}>
                {name}
              </p>
            </div>
            <div className="ml-[20px] mb-16">
              <div className="flex flex-row mt-8 mb-16">
                <img src={staticFiles.icons.schedule} width={25} />
                <span className="ml-5 font-bold text-dark" style={{ fontSize: "16px" }}>
              {" "}
              <span className="cursor-pointer text-[#5D5D5F]" onClick={handleBack}>Calendar</span> / <span className="text-[rgb(0,172,237)]">Seating Location & Ticket Price</span>
            </span>
              </div>
              <div className="font-bold">
                {dateValue}, {time}
              </div>
            </div> */}
            <div className="flex items-center hidden w-full font-bold bg-white sm:flex gap-x-4 text-dark">
              <div className="w-1/12 "></div>
              <div className="flex-col w-5/12 ml-12 font-poppins">
                <span className="text-[#5D5D5F]">Seating Location</span>
              </div>
              {/* <div className="flex flex-col w-3/12 font-poppins">
                <span className="text-[#5D5D5F]">Window Price</span>
              </div> */}
              <div className="w-5/12 p-2 flex-colgap-y-7">
                <div className="flex-col text-center">
                  <span className="font-poppins text-[#5D5D5F]">
                    tamice Price
                  </span>
                </div>
              </div>
            </div>
            {isLoading ? (
              <div className="flex items-center justify-center">Loading...</div>
            ) : (
              dataList
                ?.sort((a: any, b: any) => Number(a.price) - Number(b.price))
                ?.map((item: any, index: number) => (
                  <ShowCard
                    key={index}
                    {...item}
                    state={selectedMusic.music_id}
                  />
                ))
            )}
          </div>
        </div>
        <div className="w-full mt-8 md:w-1/3 md:block font-poppins md:mt-0">
          <ShowBuyDetail
            name={kr_name}
            kr_name={kr_name}
            quantity={Number(searchQuery?.quantity) || 1}
          />
        </div>
      </div>
      <div className="max-w-[1300px] w-full mt-16 px-4">
        <div
          dangerouslySetInnerHTML={{
            __html: convertLink(ticket?.ticket_content?.content || ""),
          }}
        ></div>
      </div>
    </div>
  );
};

// Function to extract params from urls
const extractParams = (url: string) => {
  const urlParams = new URLSearchParams(new URL(url).search);
  const edit = urlParams.get("edit");
  const cartId = urlParams.get("cartId");
  const type = urlParams.get("type");
  const music_id = urlParams.get("music_id");
  const quantity = urlParams.get("quantity");

  return { edit, cartId, type, music_id, quantity };
};
