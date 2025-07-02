import { convertLink } from "../../../shared/components/Utils";

const SimCardForm = ({
  content,
  rq_schedule_datetime,
  delivery_option,
  zip_code,
  address,
  street,
  ein,
  imei,
  notes,
  title,
}: {
  content: string;
  rq_schedule_datetime: string;
  delivery_option: string;
  zip_code: string;
  address: string;
  street: string;
  ein: string;
  imei: string;
  notes: string;
  title: string;
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  return (
    <div className="p-4 bg-white rounded-xl">
      <div className="p-4 text-[10px] lg:text-[14px]">{title}</div>
      <hr className="w-full border-1 border-gray" />
      <div className="p-4 text-xs lg:text-sm">
        <div
          className="text-black"
          dangerouslySetInnerHTML={{
            __html: convertLink(content || ""),
          }}
        ></div>
      </div>
      <hr className="w-full border-1 border-gray" />
      <div className="w-[65%] sm:pl-32 text-xs lg:text-sm">
        <div className="flex flex-col justify-start w-[300px] sm:w-[450px]  text-xs lg:text-sm">
          <div className=" flex items-center justify-between  gap-1  p-1">
            <h1 className=" text-center text-xs lg:text-sm">개통일</h1>
            <input
              type="text"
              value={formatDate(rq_schedule_datetime)}
              disabled
              className="p-1  rounded-xl sm:p-2  w-[180px] sm:w-[280px]"
            />
          </div>
          <div className="flex items-center justify-between  gap-1  p-1">
            <h1 className=" text-center ">유심 수령방법</h1>
            <textarea
              value={delivery_option}
              disabled
              className="p-1  rounded-xl sm:p-2  w-[180px] sm:w-[280px] "
            />
          </div>
          <div className="flex items-center justify-between  gap-1  p-1">
            <h1 className=" text-center ">우편번호</h1>
            <input
              type="text"
              value={zip_code}
              disabled
              className="p-1  rounded-xl sm:p-2  w-[180px] sm:w-[280px] "
            />
          </div>
          <div className="flex items-center justify-between  gap-1  p-1 ">
            <h1 className=" text-center ">상세 주소 1</h1>
            <input
              type="text"
              value={address}
              disabled
              className="p-1  rounded-xl sm:p-2  w-[180px] sm:w-[280px] "
            />
          </div>
          <div className="flex items-center justify-between  gap-1  p-1 ">
            <h1 className="text-center ">상세 주소 2</h1>
            <input
              type="text"
              value={street}
              disabled
              className="p-1  rounded-xl sm:p-2  w-[180px] sm:w-[280px] "
            />
          </div>
          <div className="flex items-center justify-between  gap-1  p-1">
            <h1 className="text-center ">EIN 넘버</h1>
            <input
              type="text"
              value={ein}
              disabled
              className="p-1  rounded-xl sm:p-2  w-[180px] sm:w-[280px] "
            />
          </div>
          <div className="flex items-center justify-between  gap-1  p-1">
            <h1 className=" text-center ">IMEI 넘버</h1>
            <input
              type="text"
              value={imei}
              disabled
              className="p-1  rounded-xl sm:p-2  w-[180px] sm:w-[280px] "
            />
          </div>
          <div className="flex items-center justify-between  gap-1  p-1">
            <h1 className=" text-center ">상세 요청</h1>
            <textarea
              value={notes}
              disabled
              className="p-1  rounded-xl sm:p-2  w-[180px] sm:w-[280px] "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimCardForm;
