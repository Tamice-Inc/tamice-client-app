import { FormControl, MenuItem, Select } from "@material-ui/core";
import { useEffect, useState } from "react";
import Postcode from "../../../shared/components/DaumPostcode";
import { convertLink } from "../../../shared/components/Utils";

export const SimCardForm = ({
  title,
  content,
  formData,
  handleOnChange,
  setRq,
  rq,
}: {
  title: string;
  content: string;
  formData: any;
  setRq: any;
  rq: any;
  handleOnChange: (data: any) => void;
}) => {
  const [fontSize, setFontSize] = useState("14px"); // Default font size

  useEffect(() => {
    const handleResize = () => {
      // Adjust font size based on container width
      if (window.innerWidth < 1024) {
        setFontSize("10px");
      } else {
        setFontSize("14px");
      }
    };

    // Call handleResize initially and add event listener
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures effect only runs once

  function handlePostCodeChange(data: any) {
    const { zonecode, address, jibunAddress } = data;
    handleOnChange({ zip_code: zonecode, address });
  }

  return (
    <div className="p-4 bg-white rounded-xl text-xs lg:text-sm">
      <div className="p-4">{title}</div>
      <hr className="w-full border-1 border-gray" />
      <div className="p-4">
        <div
          dangerouslySetInnerHTML={{
            __html: convertLink(content || ""),
          }}
        ></div>
      </div>
      <hr className="w-full border-1 border-gray mb-4" />
      <div className="w-[65%] sm:pl-32 text-xs lg:text-sm">
        <div className="flex flex-col justify-start w-[300px] sm:w-[450px]  text-xs lg:text-sm">
          <div className="flex items-center justify-between  gap-1  p-1">
            <h1 className="text-center ">
              <span className="text-red">*</span> 개통일:
            </h1>
            <input
              type="date"
              className="h-[28px] sm:h-[40px] w-[180px] sm:w-[280px] rounded-xl border border-[1px] border-gray text-[14px]"
              value={rq}
              onChange={(e) => setRq(e.target.value)}
              style={{
                fontSize: fontSize,
                padding: "8px ",
              }}
            />
          </div>
          <div className="flex items-center justify-between gap-1 p-1">
            <h1 className="text-center ">
              <span className="text-red">*</span> 유심 수령방법:
            </h1>
            <FormControl>
              <Select
                className="h-[28px] sm:h-[40px] w-[180px] sm:w-[280px] rounded-xl border border-[1px] border-gray text-[14px]"
                disableUnderline={true}
                variant="standard"
                value={formData?.delivery_option}
                onChange={(e) =>
                  handleOnChange({ delivery_option: e.target.value as string })
                }
                style={{
                  fontSize: fontSize,
                  padding: "8px ",
                }}
              >
                <MenuItem value="" style={{ fontSize: fontSize }}>
                  유심 수령 방법을 선택해 주십시요
                </MenuItem>
                <MenuItem style={{ fontSize: fontSize }} value={"eSim"}>
                  eSIM
                </MenuItem>
                <MenuItem style={{ fontSize: fontSize }} value={"한국무료배송"}>
                  한국무료배송
                </MenuItem>
                <MenuItem style={{ fontSize: fontSize }} value={"한국지사수령"}>
                  한국지사수령
                </MenuItem>
                <MenuItem style={{ fontSize: fontSize }} value={"뉴욕지사수령"}>
                  뉴욕지사수령
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="flex items-center justify-between  gap-1  p-1">
          <h1 className="text-center">&nbsp; &nbsp;우편번호</h1>
            <div className="flex flex-row gap-4">
              <input
                type="text"
                className="h-[28px] sm:h-[40px] rounded-xl border border-[1px] border-gray text-[14px] w-[130px] sm:w-[230px] md:w-[230px] lg:w-[222px] "
                value={formData?.zip_code}
                onChange={(e) =>
                  handleOnChange({ zip_code: e.target.value as string })
                }
                style={{
                  fontSize: fontSize,
                  padding: "8px ",
                }}
              />
              <Postcode onChange={handlePostCodeChange} />
            </div>
          </div>
          <div className="flex items-center justify-between  gap-1  p-1">
            <h1 className=" text-center ">&nbsp; &nbsp;상세 주소 1</h1>
            <input
              type="text"
              className="h-[28px] sm:h-[40px]  rounded-xl  w-[180px] sm:w-[280px] border border-[1px] border-gray bg-white"
              value={formData?.address}
              onChange={(e) =>
                handleOnChange({ address: e.target.value as string })
              }
              style={{
                fontSize: fontSize,
                padding: "8px ",
              }}
            />
          </div>
          <div className="flex items-center justify-between  gap-1  p-1">
            <h1 className="text-center ">&nbsp; &nbsp;상세 주소 2</h1>
            <input
              type="text"
              className="h-[28px] sm:h-[40px]  rounded-xl  w-[180px] sm:w-[280px] border border-[1px] border-gray bg-white"
              value={formData?.street}
              onChange={(e) =>
                handleOnChange({ street: e.target.value as string })
              }
              style={{
                fontSize: fontSize,
                padding: "8px ",
              }}
            />
          </div>
          <div className="flex items-center justify-between  gap-1  p-1">
            <h1 className="text-center ">&nbsp; &nbsp;EID 넘버</h1>
            <input
              className="h-[28px] sm:h-[40px]  rounded-xl  w-[180px] sm:w-[280px] border border-[1px] border-gray bg-white"
              value={formData?.ein || ""}
              onChange={(e) => {
                if (/^\d*$/.test(e.target.value) && e.target.value.length <= 32)
                  handleOnChange({ ein: e.target.value });
              }}
              style={{
                fontSize: fontSize,
                padding: "8px ",
              }}
            />
          </div>
          <div className="flex items-center justify-between  gap-1  p-1">
            <h1 className=" text-center ">&nbsp; &nbsp;IMEI 넘버</h1>
            <input
              type="text"
              className="h-[28px] sm:h-[40px]  rounded-xl  w-[180px] sm:w-[280px] border border-[1px] border-gray bg-white"
              value={formData?.imei || ""}
              onChange={(e) => {
                if (/^\d*$/.test(e.target.value) && e.target.value.length <= 15)
                  handleOnChange({ imei: e.target.value });
              }}
              style={{
                fontSize: fontSize,
                padding: "8px ",
              }}
            />
          </div>
          <div className="flex items-center justify-between  gap-1  p-1">
            <h1 className=" text-center ">&nbsp; &nbsp;상세 요청</h1>
            <textarea
              className="p-1  rounded-xl sm:p-2  w-[180px] sm:w-[280px] border border-[1px] border-gray bg-white"
              value={formData?.notes}
              onChange={(e) => handleOnChange({ notes: e.target.value })}
              style={{
                fontSize: fontSize,
                padding: "8px ",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
