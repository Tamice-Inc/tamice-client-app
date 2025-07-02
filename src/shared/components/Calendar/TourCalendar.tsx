import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import { API, staticFiles } from "../../../shared";
import "./Calendar.css";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { formatDateTime, formatTime } from "../Utils";

const tickets = (ticket: any) => {
  let dates: any[] = [];
  console.log(ticket);
  ticket.ticket_schedules.forEach((item: any) => {
    let schedules = item.ticket_schedule_exceptions;
    schedules.forEach((ele: any) => {
      let date = ele.date;
      let time = ele.time;
      if (ele.show_on_calendar && ele.show_on_calendar_exception) {
        dates.push({
          date: new Date(
            Number(date.substring(0, 4)),
            Number(date.substring(5, 7)) - 1,
            Number(date.substring(8, 10)),
            Number(time.substring(0, 2)),
            Number(time.substring(3, 5)),
            0
          ),
          time: formatTime(time),
          check: 0,
        });
      }
    });
  });

  return dates;
};

// const tickets = (ticket: any) => {
//   let dates: any[] = [];
//   if (!!ticket) {
//     ticket.ticket_schedules.forEach((elem: any) => {
//       let schedule_days = elem.week_days
//         ?.map((wd: any) =>
//           getHowManyDays(wd, elem.date_start, elem.date_end)
//         )
//         .flat()
//         ?.map((val: any) => ({
//           Day: val.day || "",
//           Date: val.date || "",
//           Time: elem.time,
//           show_on_calendar: true,
//           "Max # of People": elem.maxPeople,
//         }));
//       schedule_days.forEach((ele: any) => {
//         let date = ele.Date;
//         let time = ele.Time;
//         if (ele.show_on_calendar) {
//           dates.push({
//             date: new Date(
//               Number(date.substring(0, 4)),
//               Number(date.substring(5, 7)) - 1,
//               Number(date.substring(8, 10)),
//               Number(time.substring(0, 2)),
//               Number(time.substring(3, 5)),
//               0
//             ),
//             time: formatTime(time),
//             check: 0,
//           });
//         }
//       });
//     });
//   }
//   return dates;
// }

export enum WeekDays {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday",
}

const getHowManyDays = (day: WeekDays, start: string, end: string) => {
  const daysDiff = moment(end).diff(moment(start), "days");
  const dates = [];
  for (let i = 0; i <= daysDiff; i++) {
    const auxDay = moment(start).add(i, "days");

    if (auxDay.format("dddd") !== day) continue;
    dates.push({ day: day, date: auxDay.format("YYYY-MM-DD") });
  }
  return dates;
};

const getDateTime = (date: Date) => {
  const newDate = new Date(date);
  const timezoneOffset = newDate.getTimezoneOffset();

  // Adjust the date and time to local time
  newDate.setMinutes(newDate.getMinutes() - timezoneOffset);

  // Get the datetime string in ISO format
  const datetime = newDate.toISOString().replace(/T/, " ").replace(/\..+/, "");
  return datetime.slice(0, -3);
};

export const TourCalendar = (props: {
  ticket: any;
  filterCounter: any;
  handleClick: (date: string) => any;
  handleClickDisable: (date: string) => any;
  setIsOpen: any;
  selectedTour?: string;
}) => {
  const [date, setDate] = useState<any>(null);
  const [viewMode, setViewMode] = useState<any>("month");
  const [times, setTimes] = useState(tickets(props.ticket));
  const [matchingTime, setMatchingTime] = useState<any>(null);

  const changeColor = (matchingTime: any) => {
    const updatedTimes = times.map((timeData: any) => {
      timeData.check = 0;
      if (timeData.date.toString() === matchingTime.date.toString()) {
        props.handleClick(formatDateTime(getDateTime(matchingTime.date)));
        return { ...timeData, check: 1 };
      } else return timeData;
    });
    setTimes(updatedTimes);
  };

  const changeColorWithDisable = (matchingTime: any) => {
    const updatedTimes = times.map((timeData: any) => {
      timeData.check = 0;
      if (timeData.date.toString() === matchingTime.date.toString()) {
        props.handleClickDisable(
          formatDateTime(getDateTime(matchingTime.date))
        );
        return { ...timeData, check: 0 };
      } else return timeData;
    });
    setTimes(updatedTimes);
  };

  useEffect(() => {
    if (props.selectedTour) {
      const newDate = new Date();
      const date = props.selectedTour;
      newDate.setFullYear(
        Number(date?.substring(0, 4)),
        Number(date?.substring(5, 7)) - 1,
        Number(date?.substring(8, 10))
      );
      const hour =
        date.substring(16).trim() === "PM"
          ? Number(date?.substring(11, 13)) === 12
            ? 12
            : Number(date?.substring(11, 13)) + 12
          : Number(date?.substring(11, 13));
      newDate.setHours(hour, Number(date?.substring(14, 16)), 0, 0);
      changeColor({ date: newDate, check: 1 });
      setMatchingTime({ date: newDate, check: 1 });
    }
  }, []);


  return (
    <div className="container">
      <div className="calendar-container relative">
        <span
          className="close-button absolute top-2 right-4"
          onClick={() => {
            props.setIsOpen(false);
            if (matchingTime) {
              changeColorWithDisable(matchingTime);
            }
          }}
        >
          ✖
        </span>
        <Calendar
        locale="ko-KR"
          value={date}
          onChange={setDate}
          tileClassName={({ date }) => {
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0); // Reset time to start of the day
            return currentDate.toDateString() === date.toDateString()
              ? "current-date"
              : "";
          }}
          onViewChange={(view) => {
            console.log('Current view:', view);
            setViewMode(view.view);
          }}
          tileContent={({ date }) => {
            if (viewMode === "month") {
              const matchingTimes = times.filter(
                (timeData) => timeData.date.toDateString() === date.toDateString()
              );
              return matchingTimes.length > 0 ? (
                <div>
                  {matchingTimes.filter((item) => {
                    // Get current NY time
                    let estTime: any = new Date().toLocaleString('en-US', {timeZone: 'America/New_York'});
                    estTime = new Date(estTime);
                    const selectedDate = new Date(date);
                    const formattedDate =
                      (selectedDate.getMonth() + 1).toString().padStart(2, "0") +
                      "/" +
                      selectedDate.getDate().toString().padStart(2, "0") +
                      "/" +
                      selectedDate.getFullYear();
                    const selectedTime: any = new Date(`${formattedDate} ${item?.time.substring(0, item?.time.length - 2)} ${item?.time.substring(item?.time.length - 2, item?.time.length)}`);
                    const differenceInMilliseconds = selectedTime - estTime;
                    const differenceInMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));
  
                    if (differenceInMinutes > 120) {
                      return true;
                    } else {
                      return false;
                    }
                  }).map((matchingTime, index) => (
                    <div
                      key={index}
                      className="time-badge"
                      style={{
                        color: matchingTime.check === 0 ? "#0572f7" : "#32a852",
                        paddingTop: "5px",
                        paddingBottom: "2px",
                        textDecoration: "underline",
                      }}
                      onClick={() => {
                        setMatchingTime(matchingTime);
                        changeColor(matchingTime);
                      }}
                    >
                      {matchingTime.time}
                    </div>
                  ))}
                </div>
              ) : null;
            } else {
              return null;
            }
          }}
        />
        <div className="flex justify-center w-52 absolute bottom-[20px] m-auto left-0 right-0">
          <button
            className="px-2 py-1 mr-2 text-xs text-white bg-gray-300 rounded bg-blue sm:py-2 sm:px-4 sm:text-[15px]"
            onClick={() => {
              props.setIsOpen(false);
              if (matchingTime) {
                changeColor(matchingTime);
              }
            }}
          >
            확인
          </button>
          <button
            className="bg-[#5D5D5F] px-2 py-1 mr-2 text-xs text-white bg-gray-300 rounded bg-blue sm:py-2 sm:px-4 sm:text-[15px]"
            onClick={() => {
              props.setIsOpen(false);
              if (matchingTime) {
                changeColorWithDisable(matchingTime);
              }
            }}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

// import React, { useState } from "react";
// import Calendar from "react-calendar";
// import "./Calendar.css";
// import 'react-calendar/dist/Calendar.css';

// type CustomDate = {
//   date: Date;
//   time: string;
//   check: number;
// }

// const formatTime = (time: string) => {
//   let hour = Number(time.substring(0, 2));
//   if (hour > 12) return hour.toString() + ":" + time.substring(3, 5) + "PM"
//   else return hour.toString() + ":" + time.substring(3, 5) + "AM"
// }
// const tickets = (ticket: any) => {
//   let dates: any[] = [];
//   console.log(ticket);
//   let schedules = ticket.ticket_schedules[0].ticket_schedule_exceptions;

//   schedules.forEach((ele: any) => {
//     let date = ele.date;
//     let time = ele.time;
//     if (ele.show_on_calendar) {
//       dates.push({
//         date: new Date(
//           Number(date.substring(0, 4)),
//           Number(date.substring(5, 7)) - 1,
//           Number(date.substring(8, 10)),
//           Number(time.substring(0, 2)),
//           Number(time.substring(3, 5)),
//           0
//         ),
//         time: formatTime(time),
//         check: 0,

//       });
//     }
//   });
//   return dates;
// }

// const getDateTime = (date: Date) => {
//   const newDate = new Date(date);
//   const timezoneOffset = newDate.getTimezoneOffset();

//   // Adjust the date and time to local time
//   newDate.setMinutes(newDate.getMinutes() - timezoneOffset);

//   // Get the datetime string in ISO format
//   const datetime = newDate.toISOString().replace(/T/, ' ').replace(/\..+/, '');
//   return datetime;
// }

// export const TourCalendar = (props: { ticket: any; handleClick: (date: string) => any; setIsOpen: any }) => {
//   const [date, setDate] = useState<any>(null);
//   const [times, setTimes] = useState(tickets(props.ticket));
//   const changeColor = (matchingTime: any) => {

//     const updatedTimes = times.map((timeData: any) => {
//       timeData.check = 0;
//       if (timeData.date.toISOString() === matchingTime.date.toISOString()) {
//         props.handleClick(getDateTime(matchingTime.date));
//         return { ...timeData, check: 1 };
//       }
//       else return timeData;
//     }

//     );
//     setTimes(updatedTimes);
//   };

//   return (
//     <div className="container">
//       <div className="calendar-container">
//         <span className="close-button" onClick={() => props.setIsOpen(false)}>✖</span>
//         <Calendar
//           value={date}
//           onChange={setDate}
//           tileContent={({ date }) => {
//             const matchingTimes = times.filter((timeData) =>
//               timeData.date.toDateString() === date.toDateString()
//             );

//             return matchingTimes.length > 0 ? (
//               <div>
//                 {matchingTimes.map((matchingTime, index) => (
//                   <div
//                     key={index}
//                     className="time-badge"
//                     style={{ color: matchingTime.check === 0 ? '#0572f7' : '#32a852', padding: '8px', textDecoration: 'underline' }}
//                     onClick={() => changeColor(matchingTime)}
//                   >
//                     {matchingTime.time}
//                   </div>
//                 ))}
//               </div>
//             ) : null;
//           }}

//         />
//       </div>
//     </div>
//   );
// };
