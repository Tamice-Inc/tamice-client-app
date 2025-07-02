// TicketItem.js
import React, { useState } from "react";
import ShuttleBusForm from "./ShuttleBusForm";
import SimCardForm from "./SimCardForm";
import { cartState, cityIdState } from "../../../App";
import Swal from "sweetalert2";
import { API, staticFiles } from "../../../shared";
import { downloadTicket } from "../../../shared/utils/cart-utils";
import ScheduledDateComponent from "./SheduledDateComponent";

const TicketItem = ({
  ticket,
  item,
  // isMultiple,
  sameTicketNum,
  reservation,
  isLoading,
  orderNumber,
  showModal,
  handleShow,
  modalForm,
  handleChange,
  handleSubmit,
  setIsDownLoadTicket,
  isSubmitted,
  hasSubcategory,
  shuttleFormContent,
  simCardFormContent,
  simCardTicketIndex,
  setIsIssueInInventory,
  checkItemsInShoppingCart,
  index: i,
}: any) => {
  const [cart] = cartState.useState();
  const [cityId, setCityId] = cityIdState.useState();

  const handleDownloadClick = () => {
    downloadTicket(
      `${API}/reservations/${item.reservation_id}/reservation-subitems/${ticket?.subitem_id}/email`,
      ticket?.ticket_title_kr,
      setIsIssueInInventory
    );
  };

  const handleEditClick = async () => {
    if (checkItemsInShoppingCart(cart)) {
      await Swal.fire({
        icon: "warning",
        title: "장바구니에 담을 수 없습니다.",
        text: "현재 진행 중인 내역이 있습니다. 장바구니를 확인해 주세요.",
        confirmButtonText: "OK",
      });
      return;
    }

    const result = await Swal.fire({
      title: "수정하기",
      html: `구매하신 수량 ${item?.quantity}개에 대해 수정이 진행됩니다. <br>계속하시겠습니까?`,
      showCancelButton: true,
      confirmButtonText: "네",
      cancelButtonText: "아니오",
    });

    if (result.isConfirmed) {
      localStorage.setItem("Edit_Item", JSON.stringify(item));
      setCityId(ticket?.ticket_city_id);

      if (
        ["159", "160", "214", "215"].includes(
          String(ticket?.ticket_id)
        )
      ) {

        if(ticket.ticket_city_id === 1){
          window.open(
            `/ny/package-tour/${
              String(ticket?.ticket_id) === "159" ||
              String(ticket?.ticket_id) === "214"
                ? "city-pass"
                : "explore-pass"
            }?edit=true&type=booking`
          );
        }
        else if(ticket.ticket_city_id===36) {
          window.open(
            `/sf/package-tour/${
              String(ticket?.ticket_id) === "159" ||
              String(ticket?.ticket_id) === "214"
                ? "city-pass"
                : "explore-pass"
            }?edit=true&type=booking`
          );
        }
        else if(ticket.ticket_city_id===58) {
          window.open(
            `/ls/package-tour/${
              String(ticket?.ticket_id) === "159" ||
              String(ticket?.ticket_id) === "214"
                ? "city-pass"
                : "explore-pass"
            }?edit=true&type=booking`
          );
        }
        else if(ticket.ticket_city_id===59) {
          window.open(
            `/hls/package-tour/${
              String(ticket?.ticket_id) === "159" ||
              String(ticket?.ticket_id) === "214"
                ? "city-pass"
                : "explore-pass"
            }?edit=true&type=booking`
          );
        }
        else if(ticket.ticket_city_id===57) {
          window.open(
            `/nf/package-tour/${
              String(ticket?.ticket_id) === "159" ||
              String(ticket?.ticket_id) === "214"
                ? "city-pass"
                : "explore-pass"
            }?edit=true&type=booking`
          );
        }
        else if(ticket.ticket_city_id===56) {
          window.open(
            `/boston/package-tour/${
              String(ticket?.ticket_id) === "159" ||
              String(ticket?.ticket_id) === "214"
                ? "city-pass"
                : "explore-pass"
            }?edit=true&type=booking`
          );
        }
        else {
          window.open(
            `/package-tour/${
              String(ticket?.ticket_id) === "159" ||  
              String(ticket?.ticket_id) === "214"
                ? "city-pass"
                : "explore-pass"
            }?edit=true&type=booking`
          );
        }
      } else {
        window.open(
          `/product-detail/${ticket.ticket_id}?edit=true&type=booking`
        );
      }

      // window.open(
      //   `/product-detail/${ticket.ticket_id}?edit=true&type=booking`,
      //   "_blank"
      // );
    }
  };
  const individualTicketBorderStyles =
    !hasSubcategory && "pr-4 text-xs sm:text-sm sm:font-poppins ml-1 sm:ml-2 md:ml-4 pb-3 ";
// console.log(ticket, '>>TICKET<<')
  return (
    <div
      className={`${
        i == 0 ? "p-1 pl-4" : "px-4  pb-1"
      } bg-white rounded-xl  ${hasSubcategory ? "" : "mt-5 p-4 "}`}
      key={i}
    >
      {!hasSubcategory && (
          <div className="flex justify-end gap-1 sm:gap-5 text-xs lg:text-sm">
            <div className="flex items-center justify-center px-2 py-1 sm:py-2">
              {ticket?.ticket_type === "SIM card" ||
              ticket?.ticket_type == "Musicals & Shows"
                ? ""
                : item.adult_child_type}
            </div>
            <div className="flex items-center justify-center px-2 py-1 sm:py-2">
              {item.quantity}
            </div>
          </div>
        )}
      <div
        className={`grid grid-cols-2 sm:grid-cols-7 text-center text-xs lg:text-sm items-center p-1 text-black relative ${individualTicketBorderStyles}`}
      >
        <div className="flex flex-col justify-center items-start col-span-1 sm:col-span-2 text-left text-black text-sx lg:text-sm">
          <div className="text-xs lg:text-sm flex justify-center items-center">
            {ticket.additional_price_type === "Premium" ? (
              <img
                alt=""
                className="w-[10px] lg:w-[16px] sm:mt-0 absolute left-[-10px] lg:left-[-15px]"
                src={staticFiles.icons.black_medal}
              />
            ) : ticket.additional_price_type === "Premium S" ? (
              <img
                alt=""
                className="w-[10px] lg:w-[16px] sm:mt-0 absolute left-[-10px] lg:left-[-15px]"
                src={staticFiles.icons.gold_medal}
              />
            ) : ticket.additional_price_type === "Deluxe" ? (
              <img
                alt=""
                className="w-[10px] lg:w-[16px] sm:mt-0 absolute left-[-10px] lg:left-[-15px]"
                src={staticFiles.icons.blue_medal}
              />
            )  : (
              <div className=""></div>
            )}
            <button
              className="text-left cursor-pointer mr-4"
              onClick={() => {
                setCityId(ticket?.ticket_city_id);
                if (ticket?.ticket_type === "Musicals & Shows") {
                  window.open(`/musicals_view/${ticket.ticket_id}`, "_blank");
                } else {
                  if (
                    ["159", "160", "214", "215"].includes(
                      String(ticket?.ticket_id)
                    )
                  ) {

                    if(ticket.ticket_city_id === 1){
                      window.open(
                        `/ny/package-tour/${
                          String(ticket?.ticket_id) === "159" ||
                          String(ticket?.ticket_id) === "214"
                            ? "city-pass"
                            : "explore-pass"
                        }`,
                        // "_blank"
                      );
                    }
                    else if(ticket.ticket_city_id===36) {
                      window.open(
                        `/sf/package-tour/${
                          String(ticket?.ticket_id) === "159" ||
                          String(ticket?.ticket_id) === "214"
                            ? "city-pass"
                            : "explore-pass"
                        }`,
                        // "_blank"
                      );
                    }
                    else if(ticket.ticket_city_id===58) {
                      window.open(
                        `/ls/package-tour/${
                          String(ticket?.ticket_id) === "159" ||
                          String(ticket?.ticket_id) === "214"
                            ? "city-pass"
                            : "explore-pass"
                        }`,
                        // "_blank"
                      );
                    }
                    else if(ticket.ticket_city_id===59) {
                      window.open(
                        `/hls/package-tour/${
                          String(ticket?.ticket_id) === "159" ||
                          String(ticket?.ticket_id) === "214"
                            ? "city-pass"
                            : "explore-pass"
                        }`,
                        // "_blank"
                      );
                    }
                    else if(ticket.ticket_city_id===57) {
                      window.open(
                        `/nf/package-tour/${
                          String(ticket?.ticket_id) === "159" ||
                          String(ticket?.ticket_id) === "214"
                            ? "city-pass"
                            : "explore-pass"
                        }`,
                        // "_blank"
                      );
                    }
                    else if(ticket.ticket_city_id===56) {
                      window.open(
                        `/boston/package-tour/${
                          String(ticket?.ticket_id) === "159" ||
                          String(ticket?.ticket_id) === "214"
                            ? "city-pass"
                            : "explore-pass"
                        }`,
                        // "_blank"
                      );
                    }
                    else {
                      window.open(
                        `/package-tour/${
                          String(ticket?.ticket_id) === "159" ||
                          String(ticket?.ticket_id) === "214"
                            ? "city-pass"
                            : "explore-pass"
                        }`,
                        // "_blank"
                      );
                    }
                  } else {
                    window.open(
                      `/product-detail/${ticket.ticket_id}`,
                      "_blank"
                    );
                  }
                }
              }}
            >
              {!item?.hasSubcategory && item?.price_list_id
                ? item?.product_name
                : ticket?.ticket_title_kr}
              {ticket?.ticket_type == "Musicals & Shows" && (
                <div className="text-xs text-green-600 absolute w-[500px]">
                  {ticket?.seating_info}
                </div>
              )}
            </button>
          </div>
        </div>
        <div className="hidden px-6 py-2 sm:block"></div>
        <div className="text-xs lg:text-sm flex justify-end">
          <div className="font-poppins">
            <ScheduledDateComponent
              isLoading={isLoading}
              input={ticket?.rq_schedule_datetime}
              orderNumber={orderNumber}
              // isMultipe={
              //   item.tickets.filter(
              //     (t: any) =>
              //       t.ticket_id === ticket.ticket_id &&
              //       t.options_schedules.length === 0
              //   ).length > 1
              // }
              // isMultipe={isMultiple}
              isMultipe={
                sameTicketNum === 1 || ticket?.options_schedules.length !== 0
                  ? false
                  : true
              }
              subitem_id={ticket?.subitem_id}
              options_schedules={ticket?.options_schedules}
              item_quantity={item?.quantity}
              showModalProp={showModal}
              handleShow={handleShow}
              modalForm={modalForm}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              isSubmitted={isSubmitted}
              ticketName={ticket?.ticket_title_kr}
              ticketType={ticket?.ticket_type}
              ticketSentStatus={ticket?.ticket_sent_status}
            />
          </div>
          <div className="">
            {ticket?.ticket_type === "Bar/QR code" && (
              <div className="flex items-center justify-center">
                {ticket?.ticket_sent_status !== "환불완료" && (
                  <a
                    className="cursor-pointer text-blue"
                    onClick={handleDownloadClick}
                  >
                    티켓받기
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
        {/* {!hasSubcategory && (
          <div className="flex justify-end gap-1 sm:gap-5 text-xs lg:text-sm">
            <div className="flex items-center justify-center px-2 py-1 sm:py-2">
              {ticket?.ticket_type === "SIM card" ||
              ticket?.ticket_type == "Musicals & Shows"
                ? ""
                : item.adult_child_type}
            </div>
            <div className="flex items-center justify-center px-2 py-1 sm:py-2">
              {item.quantity}
            </div>
          </div>
        )} */}
      </div>
      {!hasSubcategory && ticket?.shuttle_bus_information && (
        <ShuttleBusForm
          content={shuttleFormContent}
          flight_number={ticket?.shuttle_bus_information?.flight_number}
          pick_up_location={ticket?.shuttle_bus_information?.pick_up_location}
          of_luggage={ticket?.shuttle_bus_information?.of_luggage}
        />
      )}
      {!hasSubcategory && ticket?.sim_card_information && (
        <SimCardForm
          title=""
          content={simCardFormContent}
          rq_schedule_datetime={ticket?.rq_schedule_datetime}
          delivery_option={ticket?.sim_card_information?.delivery_option}
          zip_code={ticket?.sim_card_information?.zip_code}
          address={ticket?.sim_card_information?.address}
          street={ticket?.sim_card_information?.street}
          ein={ticket?.sim_card_information?.ein}
          imei={ticket?.sim_card_information?.imei}
          notes={ticket?.sim_card_information?.notes}
        />
      )}
      {/* {!hasSubcategory && <hr className="w-full border-1 border-gray" />} */}
      {!hasSubcategory && ticket?.ticket_sent_status !== "환불완료" && ticket?.ticket_sent_status !== "발권 중" && ticket?.ticket_sent_status !== "Sent" && (
        <div className="px-3 py-4 text-xs lg:text-sm text-black">
          <button className="py-2 text-blue" onClick={handleEditClick}>
            수정하기
          </button>
        </div>
      )}
    </div>
  );
};

export default TicketItem;
