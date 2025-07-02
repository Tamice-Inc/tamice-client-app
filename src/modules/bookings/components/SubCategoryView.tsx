import { useEffect } from "react";
import Swal from "sweetalert2";

// Function to get item's data based on adult-child type
const handleAdultChild = (item: any) => {
  const adult_child_type = item?.adult_child_type;
  const child_age = item?.child_age;

  if (adult_child_type === "성인") {
    return adult_child_type;
  } else if (child_age && adult_child_type === "아동") {
    return `${adult_child_type} (Age:${child_age})`;
  } else {
    return adult_child_type;
  }
};

const SubcategoryView = ({ item, i }: any) => {
  useEffect(() => {
    return () => {
      Swal.close();
    };
  }, []);
  
  return (
    <div
      key={i}
      className="grid grid-cols-3 sm:grid-cols-7 text-xs lg:text-sm text-left sm:text-center p-1 text-black"
    >
      <div className="col-span-1 py-2 text-left sm:col-span-2 text-xs lg:text-sm">
        {item?.product_name}
      </div>
      {/* <div className="hidden px-6 py-2 sm:block"></div> */}
      <div className="hidden px-6 py-2 sm:block"></div>
      <div className="px-6 py-2 flex justify-center ">
        {item?.refund_status === "환불완료" ? "환불완료" : ""}
      </div>
      <div className="hidden px-6 py-2 sm:block"></div>
      <div className="hidden px-6 py-2 sm:block"></div>
      <div className="flex items-center justify-end gap-1 sm:gap-5">
        <div className="flex items-center justify-center px-2 py-1 sm:py-2 text-xs lg:text-sm">
          {handleAdultChild(item)}
        </div>
        <div className="flex items-center justify-center  px-2 py-1 sm:py-2 text-xs lg:text-sm">
          {item?.quantity}
        </div>
      </div>
    </div>
  );
};

export default SubcategoryView;