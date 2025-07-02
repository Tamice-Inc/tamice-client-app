import { useDaumPostcodePopup } from "react-daum-postcode";

type PostcodeProps = {
  onChange: (data: any) => void;
};

const Postcode = ({ onChange }: PostcodeProps) => {
  const open = useDaumPostcodePopup();

  const handleComplete = (data: any) => {
    onChange(data);
    // if (data.addressType === "R") {
    //   if (data.bname !== "") {
    //     extraAddress += data.bname;
    //   }
    //   if (data.buildingName !== "") {
    //     extraAddress +=
    //       extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
    //   }
    //   fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    // }

    // console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <button className="text-white bg-green-600 px-2 rounded w-1/3" type="button" onClick={handleClick}>
      검색
    </button>
  );
};

export default Postcode;
