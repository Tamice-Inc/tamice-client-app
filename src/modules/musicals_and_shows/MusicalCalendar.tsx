import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Calendar } from "react-calendar";
import Swal from "sweetalert2";
import axios from "axios";
import { staticFiles, API } from "../../shared";
import { MainButton } from "../../shared/components/Buttons";
import { SpaceY } from "../../shared/components/Utils";
import { SelectInput } from "../../shared/components/Inputs";
import { convertLink } from "../../shared/components/Utils";
import { GetMusicalData, useGetTicket } from "../../shared/hooks";
import "../../shared/components/Musical-calendar/MusicalCalendar.css";
import { ShowBuyDetail } from "./components/ShowBuyDetail";

export const MusicalCalendar = () => {
  // Get ticketId from url param
  const { id: ticketId } = useParams();

  // Fetch ticket from useGetTicket Custom Hook
  const { ticket } = useGetTicket();

  // Define Component State Variables
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<any>("month");
  const [musicalData, setMusicalData] = useState<any>(null);
  const [dateList, setDateList] = useState([]);
  const [timeList, setTimeList] = useState<{ value: string; text: string }[]>(
    []
  );
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dateToTimesMap, setDateToTimesMap] = useState<{
    [key: string]: string[];
  }>({});
  const [webTemplateData, setWebTemplateData] = useState<any>(null);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Create a navigate instance from useNavigate
  const navigate = useNavigate();

  // Function to fetch musical Data
  async function fetchMusicalData(productCode: any) {
    try {
      const response = await axios.get(
        `${API}/product-seats?product_code=${productCode}`
      );
      const musicalData = response.data;
      console.log(musicalData);
      setMusicalData(musicalData);
      const extractedDates = musicalData?.map((data: any) => data.product_date);
      setDateList(extractedDates);
      let tempDateToTimesMap: { [key: string]: string[] } = {};
      musicalData.forEach((data: any) => {
        const formattedDate = new Date(data.product_date).toDateString();
        if (!tempDateToTimesMap[formattedDate]) {
          tempDateToTimesMap[formattedDate] = [];
        }
        if (!tempDateToTimesMap[formattedDate].includes(data.product_time)) {
          tempDateToTimesMap[formattedDate].push(data.product_time);
        }
      });
      setDateToTimesMap(tempDateToTimesMap);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  // Function to handle date click
  const handleDateClick = (date: any, selectedTimeFromCalendar?: string) => {
    const selectedDate = new Date(date);
    const formattedDate =
      (selectedDate.getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      selectedDate.getDate().toString().padStart(2, "0") +
      "/" +
      selectedDate.getFullYear();
    const filteredData = musicalData.filter((data: any) => {
      const dataDate = new Date(data.product_date);
      const dataFormattedDate =
        dataDate.getFullYear() +
        "/" +
        (dataDate.getMonth() + 1).toString().padStart(2, "0") +
        "/" +
        dataDate.getDate().toString().padStart(2, "0");
      return dataFormattedDate === formattedDate;
    });
    console.log("date", formattedDate);
    console.log("result", filteredData);
    // Use a Set to keep track of unique values based on product_id
    const uniqueProductIds = new Set();
    const updatedTimeList = [];
    for (let i = 0; i < filteredData.length; i++) {
      const productData = filteredData[i];
      const productId = productData.product_time;
      // Check if the product_id is unique
      if (!uniqueProductIds.has(productId)) {
        uniqueProductIds.add(productId);
        updatedTimeList.push({
          value: productId,
          text: productData.product_time,
        });
      }
    }
    setTimeList(updatedTimeList);
    setSelectedDate(formattedDate);
    setDate(date);
    setSelectedTime(selectedTimeFromCalendar || "");
    if (selectedTimeFromCalendar) {
      navigate(
        `/musicals-and-shows/${date}/${selectedTimeFromCalendar}/${ticketId}/${ticket?.title_en}/${ticket?.title_kr}`
      );
    }
  };
  // Function to check date is available
  const isDateAvailable = (date: any) => {
    const availableDates = dateList.map((dateStr) => new Date(dateStr));
    return availableDates.some((availableDate) => {
      return (
        date.getDate() === availableDate.getDate() &&
        date.getMonth() === availableDate.getMonth() &&
        date.getFullYear() === availableDate.getFullYear()
      );
    });
  };
  // Function to check date is clicked
  const isDateClicked = (dateValue: any) => {
    return (
      date &&
      dateValue.getDate() === date.getDate() &&
      dateValue.getMonth() === date.getMonth() &&
      dateValue.getFullYear() === date.getFullYear()
    );
  };
  // Define useEffect Hook
  useEffect(() => {
    if (ticket) {
      fetchMusicalData(
        musicalsProductCode[
          ticket?.title_en as keyof typeof musicalsProductCode
        ]
      );

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

  // useEffect(() => {
  //   if (musicalData) {
  //     const extractedDates = musicalData?.map((data: any) => data.product_date);
  //     setDateList(extractedDates);
  //     let tempDateToTimesMap: { [key: string]: string[] } = {};
  //     musicalData.forEach((data: any) => {
  //       const formattedDate = new Date(data.product_date).toDateString();
  //       if (!tempDateToTimesMap[formattedDate]) {
  //         tempDateToTimesMap[formattedDate] = [];
  //       }
  //       if (!tempDateToTimesMap[formattedDate].includes(data.product_time)) {
  //         tempDateToTimesMap[formattedDate].push(data.product_time);
  //       }
  //     });
  //     setDateToTimesMap(tempDateToTimesMap);
  //   }
  // }, [musicalData]);

  // Loading Component
  const Loading = () => {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
      </div>
    );
  };

  // Show loading spinner while fetching data from the server
  if (loading) {
    return (
      <div className="flex flex-col max-w-[1300px] w-full mb-16 px-4">
        <Loading />
      </div>
    );
  }
  return (
    <div className="flex flex-col max-w-[1300px] w-full mb-16 px-4">
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
          <div className="flex flex-row">
            <img src={staticFiles.icons.schedule} width={25} />
            <span
              className="ml-5 font-bold text-dark"
              style={{ fontSize: "16px" }}
            >
              {" "}
              <span className="text-[rgb(0,172,237)]">Calendar</span> /{" "}
              <span className="text-[#5D5D5F]">
                Seating Location & Ticket Price
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center w-full gap-x-8 md:flex-row">
        <div className="flex flex-col justify-center w-full gap-y-8">
          <div className="container-2">
            <div className="flex flex-col items-center container2-1 md:flex-row lg:items-start md:justify-center">
              <div className="bg-white calendar-container-2">
                <Calendar
                  locale="ko-KR"
                  tileClassName={({ date }) => {
                    const currentDate = new Date();
                    currentDate.setHours(0, 0, 0, 0); // Reset time to start of the day
                    return currentDate.toDateString() === date.toDateString()
                      ? "current-date"
                      : "";
                  }}
                  onViewChange={(view) => {
                    console.log("Current view:", view);
                    setViewMode(view.view);
                  }}
                  tileContent={({ date }) => {
                    if (viewMode === "month") {
                      const dateStr = date.toDateString();
                      if (isDateAvailable(date) && dateToTimesMap[dateStr]) {
                        return (
                          <div>
                            {dateToTimesMap[dateStr]
                              .filter((time) => {
                                // Get current NY time
                                let estTime: any = new Date().toLocaleString(
                                  "en-US",
                                  {
                                    timeZone: "America/New_York",
                                  }
                                );
                                estTime = new Date(estTime);
                                const selectedDate = new Date(date);
                                const formattedDate =
                                  (selectedDate.getMonth() + 1)
                                    .toString()
                                    .padStart(2, "0") +
                                  "/" +
                                  selectedDate
                                    .getDate()
                                    .toString()
                                    .padStart(2, "0") +
                                  "/" +
                                  selectedDate.getFullYear();
                                const selectedTime: any = new Date(
                                  `${formattedDate} ${time.substring(
                                    0,
                                    time.length - 2
                                  )} ${time.substring(
                                    time.length - 2,
                                    time.length
                                  )}`
                                );
                                const differenceInMilliseconds =
                                  selectedTime - estTime;
                                const differenceInMinutes = Math.floor(
                                  differenceInMilliseconds / (1000 * 60)
                                );

                                if (differenceInMinutes > 120) {
                                  return true;
                                } else {
                                  return false;
                                }
                              })
                              .map((time, idx) => (
                                <div
                                  key={idx}
                                  className={`time-slot flex flex-col pt-[5px] time-badge ${
                                    isDateClicked(date) && selectedTime === time
                                      ? "selected-time-slot-green"
                                      : "text-[#006EDC]"
                                  }`}
                                  onClick={() => {
                                    // Get current NY time
                                    let estTime: any =
                                      new Date().toLocaleString("en-US", {
                                        timeZone: "America/New_York",
                                      });
                                    estTime = new Date(estTime);
                                    const selectedDate = new Date(date);
                                    const formattedDate =
                                      (selectedDate.getMonth() + 1)
                                        .toString()
                                        .padStart(2, "0") +
                                      "/" +
                                      selectedDate
                                        .getDate()
                                        .toString()
                                        .padStart(2, "0") +
                                      "/" +
                                      selectedDate.getFullYear();
                                    const selectedTime: any = new Date(
                                      `${formattedDate} ${time.substring(
                                        0,
                                        time.length - 2
                                      )} ${time.substring(
                                        time.length - 2,
                                        time.length
                                      )}`
                                    );
                                    const differenceInMilliseconds =
                                      selectedTime - estTime;
                                    const differenceInMinutes = Math.floor(
                                      differenceInMilliseconds / (1000 * 60)
                                    );
                                    // Check if it is within 2 hours before show
                                    if (differenceInMinutes < 120) {
                                      Swal.fire({
                                        icon: "warning",
                                        // title: "Data Selection Error",
                                        text: "공연 시작 2시간 전에는 티켓을 구매할 수 없습니다. 다른 시간을 선택해주세요.",
                                      });
                                    } else {
                                      setSelectedTime(time); // Immediately set the clicked time as selected
                                      handleDateClick(date, time);
                                    }
                                  }}
                                >
                                  {time}
                                </div>
                              ))}
                          </div>
                        );
                      }
                      return null;
                    } else {
                      return null;
                    }
                  }}
                />
              </div>
              <div className="hidden w-full m-4 mt-8 md:w-1/3 xl:block font-poppins md:mt-0">
                <ShowBuyDetail />
              </div>
            </div>
          </div>
          <div
            className="p-4"
            dangerouslySetInnerHTML={{
              __html: convertLink(ticket?.ticket_content?.content || ""),
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
