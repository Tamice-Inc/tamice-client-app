import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { convertLink } from "../../../shared/components/Utils";
import React, { useEffect, useState } from "react";
import Postcode from "../../../shared/components/DaumPostcode";

export const ShuttleBusForm = ({
  title,
  content,
  formData,
  index,
  handleOnChange,
}: {
  title: string;
  content: string;
  formData: any;
  index: number;
  handleOnChange: (name: string, value: string, index: number) => void;
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
              <span className="text-red">*</span> 항공편명:
            </h1>
            <input
              type="text"
              className="h-[28px] sm:h-[40px] w-[180px] sm:w-[280px] rounded-xl border border-[1px] border-gray text-[14px]"
              value={formData?.flight_number}
              onChange={(e) => {
                handleOnChange("flight_number", e.target.value, index);
              }}
              style={{
                fontSize: fontSize,
                padding: "8px ",
              }}
            />
          </div>
          <div className="flex items-center justify-between  gap-1  p-1">
            <h1 className="text-center">
              {" "}
              <span className="text-red">*</span> 승하차 장소:
            </h1>
            <FormControl>
              {/* <InputLabel style={{ fontSize: '14px', backgroundColor:'white'}} >&nbsp; &nbsp; &nbsp; 탑승 장소를 선택해 주세요</InputLabel> */}
              <Select
                className="h-[28px] sm:h-[40px] w-[180px] sm:w-[280px] rounded-xl border border-[1px] border-gray text-[14px]"
                disableUnderline={true}
                variant="standard"
                value={formData?.pick_up_location}
                onChange={(e) =>
                  handleOnChange(
                    "pick_up_location",
                    e.target.value as string,
                    index
                  )
                }
                style={{
                  fontSize: fontSize,
                  padding: "8px ",
                }}
              >
                <MenuItem disabled style={{ fontSize: fontSize }}>
                  탑승 장소를 선택해 주세요
                </MenuItem>
                <MenuItem
                  style={{ fontSize: fontSize, minHeight: "0px" }}
                  value={"타임스퀘어"}
                >
                  {" "}
                  타임스퀘어
                </MenuItem>
                <MenuItem
                  style={{ fontSize: fontSize, minHeight: "0px" }}
                  value={"한인타운"}
                >
                  {" "}
                  한인타운
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="flex items-center justify-between  gap-1  p-1">
            <h1 className="text-center ">
              <span className="text-red">*</span> 수하물 개수:
            </h1>
            <input
              type="text"
              value={formData?.of_luggage}
              className="h-[28px] sm:h-[40px] w-[180px] sm:w-[280px] rounded-xl border border-[1px] border-gray text-[14px]"
              onChange={(e) => {
                if (!isNaN(Number(e.target.value))) {
                  handleOnChange("of_luggage", e.target.value, index);
                }
              }}
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
