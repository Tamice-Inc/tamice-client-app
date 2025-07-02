import axios from "axios";
import download from "downloadjs";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { CartItem } from "../../App";

// Function to check if there are any items in the shopping cart
export const checkItemsInShoppingCart = ({
  childInfo,
  adultInfo,
}: {
  childInfo: CartItem[];
  adultInfo: CartItem[];
}) => {
  const combinedInfo = [...childInfo, ...adultInfo];

  if (combinedInfo.length === 0) {
    return false;
  } else if (
    combinedInfo.length > 0 &&
    combinedInfo[0].reservation_id != null
  ) {
    return false;
  } else {
    return true;
  }
};

export const downloadTicket = async (
  url: string,
  ticket_name: string,
  setIsIssueInInventory: (v: boolean) => void
) => {
  const result = await Swal.fire({
    icon: "question",
    title: "다운로드 확인",
    html: `티켓받기를 하시겠습니까?<br>티켓받기를 하시면 교환 / 변경 / 취소 / 환불이 불가능합니다.`,
    showCancelButton: true,
    confirmButtonText: "확인",
    cancelButtonText: "아니오",
  });

  if (result.isConfirmed) {
    try {
      const response = await axios({
        url,
        method: "POST",
        responseType: "blob",
      });
      const content = response.headers["content-type"];
      const currentDate = new Date();
      const formattedDateTime = `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1
      ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(
        2,
        "0"
      )}-${String(currentDate.getHours()).padStart(2, "0")}-${String(
        currentDate.getMinutes()
      ).padStart(2, "0")}-${String(currentDate.getSeconds()).padStart(2, "0")}`;
      const fileName = `${ticket_name}_${formattedDateTime}`;
      download(response.data, fileName, content);
      toast.success("Downloaded successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error: any) {
      if (error?.response?.status === 400 || error?.response?.status === 422) {
        setIsIssueInInventory(true);
      } else {
        toast.error("Something is wrong on the Server");
      }
    }
  }
};
