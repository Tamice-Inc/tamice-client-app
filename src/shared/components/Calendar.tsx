import { Calendar as ReactCalendar } from "react-date-range";
import moment from "moment";

export const Calendar: React.FC<{ dates: Date[] }> = ({ dates }) => {
  const dayClass =
    "flex flex-col w-full h-full text-black font-medium hover:bg-blue hover:text-white rounded z-[1]";
  const selectedDayClassName = `${dayClass} bg-blue text-white`;
  const textClass = "text-xs font-normal";

  return (
    <ReactCalendar
      className="font-poppins border border-gray rounded-xl"
      showMonthAndYearPickers={false}
      color={"transparent"}
      dayContentRenderer={(date) => (
        <div
          className={
            moment(date).isSame(moment(), "day")
              ? selectedDayClassName
              : dayClass
          }
        >
          <div className={textClass + "font-medium"}>{moment(date).date()}</div>
          {dates.map((d) =>
            moment(date).isSame(moment(d), "day") ? (
              <div className={`${textClass} underline`}>
                {moment(d).format("hh:mm A")}
              </div>
            ) : null
          )}
        </div>
      )}
    />
  );
};
