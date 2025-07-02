import { convertLink } from "../../../shared/components/Utils";

const ShuttleBusForm = ({
  content,
  flight_number,
  pick_up_location,
  of_luggage,
  title,
}: {
  content: string;
  flight_number: string;
  pick_up_location: string;
  of_luggage: string;
  title?: string;
}) => {
  return (
    <div className="p-4 bg-white rounded-xl">
      {title && <div className="p-4 text-[10px] lg:text-[14px]">{title}</div>}
      <hr className="w-full border-1 border-gray" />
      <div className="p-4 text-xs lg:text-sm">
        <div
          dangerouslySetInnerHTML={{
            __html: convertLink(content || ""),
          }}
        ></div>
      </div>
      <hr className="w-full border-1 border-gray" />
      <div className="w-[65%] sm:pl-32 text-xs lg:text-sm">
        <div className="flex flex-col justify-start w-[300px] sm:w-[450px]  text-xs lg:text-sm">
          <div className="flex items-center justify-between  gap-1  p-1">
            <h1 className=" text-center ">항공편명:</h1>
            <input
              type="text"
              value={flight_number}
              disabled
              className="p-1  rounded-xl sm:p-2  w-[180px] sm:w-[280px] "
            />
          </div>
          <div className="flex items-center justify-between  gap-1  p-1">
            <h1 className=" text-center ">승하차 장소:</h1>
            <input
              type="text"
              value={pick_up_location}
              disabled
              className="p-1  rounded-xl sm:p-2  w-[180px] sm:w-[280px] "
            />
          </div>
          <div className="flex items-center justify-between  gap-1  p-1">
            <h1 className=" text-center ">수하물 개수:</h1>
            <input
              type="text"
              value={of_luggage}
              disabled
              className="p-1  rounded-xl sm:p-2  w-[180px] sm:w-[280px] "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShuttleBusForm;
