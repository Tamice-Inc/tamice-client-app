import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  cartState,
  cityDataState,
  cityIdState,
  reservationsParsedState,
  reservationsState,
} from "../../App";
import { API, staticFiles } from "../../shared";
import Error from "../../shared/components/Error";
import Loading from "../../shared/components/Loading";
import {
  subPathFromSubCategoryName,
  subPathWithAbbreviation,
} from "../../shared/constants/booking";
import { updateScheduleOptions, useGetReservations } from "../../shared/hooks";
import useParsedData from "../../shared/hooks/use-parsed-data";
import useTokenExpiration from "../../shared/hooks/use-token";
import { checkItemsInShoppingCart } from "../../shared/utils/cart-utils";
import { extractParams } from "../../shared/utils/object-utils";
import { Modal } from "./Modal";
import SubcategoryView from "./components/SubCategoryView";
import TicketViewMemo from "./components/TicketView";
import "./styles.css";

// Main component to display Booking Data
export const BookingsView = () => {
  // Global state variables
  const [cart, setCart] = cartState.useState();
  const [cityData, setCityData] = cityDataState.useState();
  const [cityId, setCityId] = cityIdState.useState();
  const [reservationsData, setReservationsData] = reservationsState.useState();
  const [reservationsParsedData, setReservationsParsedData] =
    reservationsParsedState.useState();

  // Component State variables
  const [showModal, setShowModal] = useState(-100);
  const [modalForm, setModalForm] = useState({});
  const [draftForm, setDraftForm] = useState({} as any);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDownLoadTicket, setIsDownLoadTicket] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);
  const [firstFetch, setFirstFetch] = useState(true);

  const [simCardFormContent, setSimCardFormContent] = useState<any>("");
  const [shuttleFormContent, setShuttleFormContent] = useState<any>("");
  const [hasSimCard, setHasSimCard] = useState(false);
  const [shuttleBusTickets, setShuttleBusTickets] = useState<any[]>([]);

  // Variable to check firstloading or not
  const [counter, setCounter] = useState(0);

  // Define navigate and search with default Hooks
  const navigate = useNavigate();
  const { search } = useLocation(); // ?email=jlfl94@gmail.com&order_number=4388608

  // Define searchQuery to extract variables from url
  let searchQuery: any;

  if (search) {
    searchQuery = extractParams(
      `http://localhost:${process.env.REACT_APP_PORT}/my-page${search}`
    );
  }

  //// Start Custom Functions
  // Function to handle show param change
  const handleShow = (show: number) => {
    setShowModal(show);
    if (show < 0) {
      setDraftForm({});
      setIsSubmitted(false);
    }
  };

  // Function to handle value change
  const handleChange = (event: any, key: number, index: number) => {
    const { value } = event.target;
    // console.log("event changed", { key, name, value, index });
    setDraftForm((prevForm: any) => {
      let val = prevForm[String(key)];
      if (val === undefined || !Array.isArray(val)) {
        val = new Array(3).fill(null);
      }
      val[index] = value;
      return { ...prevForm, [String(key)]: val };
    });
  };

  // Function to handle submit
  const handleSubmit = async (
    event: any,
    key: number,
    orderNumber: string,
    ticketName: string,
    allowMultipe: boolean
  ) => {
    event.preventDefault();
    // console.log("submitted", draftForm);

    const submittedForm = draftForm[String(key)];

    const isValid = submittedForm?.reduce((acc: any, item: any) => {
      return acc && typeof item === "string";
    }, true);

    if (isValid) {
      if (allowMultipe) {
        // Find items for same order number and setting schedule options at the same time
        let itemsInSameOrder = parsedData.find(
          (it: any) => it.order_number === orderNumber
        );

        let subItemIdsToSchedule: any[] = [];
        itemsInSameOrder?.items?.forEach((it: any) => {
          it.tickets.forEach((singleTicket: any) => {
            if (
              singleTicket.options_schedules.length === 0 &&
              !singleTicket.rq_schedule_datetime &&
              singleTicket.ticket_title_kr === ticketName 
              && singleTicket.ticket_sent_status === "대기 중" 
              && singleTicket.refund_status === null
            ) {
              subItemIdsToSchedule.push(singleTicket.subitem_id);
            }
          });
        });

        try {
          await Promise.all(
            subItemIdsToSchedule.map((it) => {
              return updateScheduleOptions(it, submittedForm);
            })
          );

          setIsSubmitted(true);

          subItemIdsToSchedule.forEach((it: any) => {
            setModalForm((prevForm: any) => {
              return { ...prevForm, [String(it)]: submittedForm };
            });
          });
        } catch (e) {
          setIsSubmitted(true);
          subItemIdsToSchedule.forEach((it: any) => {
            setModalForm((prevForm: any) => {
              return { ...prevForm, [String(it)]: submittedForm };
            });
          });
        }
      } else {
        try {
          const res = await updateScheduleOptions(key, submittedForm);
          setIsSubmitted(true);

          setModalForm((prevForm: any) => {
            return { ...prevForm, [String(key)]: submittedForm };
          });
        } catch (e) {
          setIsSubmitted(true);

          setModalForm((prevForm: any) => {
            return { ...prevForm, [String(key)]: submittedForm };
          });
        }
      }
    }
  };

  // Coustom Hook with API calls
  const { isLoading, isError, data } = useGetReservations(
    searchQuery,
    isSubmitted,
    firstFetch,
    isDownLoadTicket
  );


  const {
    parsedPriceOptions,
    parsedScheduleOptions,
    parsedTickets,
    parsedSubcategories,
    parsedData,
  } = useParsedData(data, isLoading, isError);

  // Start useEffect Hooks
  useEffect(() => {
    if (data) {
      if (data.reservations) {
        // Create a new array or object with the updated data
        const updatedReservations = { reservations: [...data.reservations] };
        const updatedParsedReservations = {
          reservations: [
            ...data?.reservations
              ?.slice()
              .sort((a: any, b: any) => {
                const dateComparison =
                  new Date(b?.order_date).getTime() -
                  new Date(a?.order_date).getTime();
                if (dateComparison !== 0) {
                  return dateComparison;
                }
                return b?.reservation_items[0].id - a?.reservation_items[0].id;
              })
              ?.map((reservation: any) => {
                return {
                  order_number: reservation?.order_number,
                  order_date: reservation?.order_date,
                  reservation_id: reservation.id,
                  items: reservation?.reservation_items
                    ?.slice()
                    .sort((a: any, b: any) => b?.id - a?.id)
                    ?.map((item: any) => {
                      return {
                        item_id: item?.id,
                        reservation_id: reservation?.id,
                        price_list_id: item?.price_list_id,
                        hasSubcategory: !!item?.subcategory_id,
                        product_name: parsedPriceOptions?.get(
                          String(item?.price_list_id)
                        ),
                        subcategory_name:
                          // parsedPriceOptions?.get(item?.price_list_id) ||
                          parsedSubcategories?.get(String(item?.subcategory_id))
                            ?.name,
                        subcategory_id: item?.subcategory_id,
                        adult_child_type: item?.adult_child_type,
                        child_age: item?.child_age,
                        quantity: item?.quantity,
                        price: item?.price,
                        addition: item?.addition,
                        total: item?.total,
                        refund_status: item?.refund_status,
                        tickets: item?.reservation_sub_items
                          ?.slice()
                          .sort((a: any, b: any) => b?.id - a?.id)
                          ?.map((subitem: any) => {
                            return {
                              subitem_id: subitem?.id,
                              rq_schedule_datetime:
                                subitem?.rq_schedule_datetime,
                              ticket_sent_status: subitem?.ticket_sent_status,
                              refund_status: subitem?.refund_status,
                              ticket_id: subitem?.ticket_id,
                              price: subitem?.price,
                              addition: subitem?.addition,
                              quantity: subitem?.quantity,
                              total: subitem?.total,
                              ticket_type: parsedTickets?.get(
                                String(subitem?.ticket_id)
                              )?.ticket_type,
                              ticket_title_en: parsedTickets?.get(
                                String(subitem?.ticket_id)
                              )?.title_en,
                              ticket_title_kr: parsedTickets?.get(
                                String(subitem?.ticket_id)
                              )?.title_kr,
                              additional_price_type: parsedTickets?.get(
                                String(subitem?.ticket_id)
                              )?.additional_price_type,
                              additional_price_image: parsedTickets?.get(
                                String(subitem?.ticket_id)
                              )?.additional_price_image,
                              additional_price_amount: parsedTickets?.get(
                                String(subitem?.ticket_id)
                              )?.additional_price_amount,
                            };
                          }),
                      };
                    }),
                };
              }),
          ],
        };

        // Assign the updated value to the reservations state
        setReservationsData(updatedReservations);
        localStorage.setItem(
          "reservationData",
          JSON.stringify(updatedReservations)
        );
        setReservationsParsedData(updatedParsedReservations);
        localStorage.setItem(
          "reservationParsedData",
          JSON.stringify(updatedParsedReservations)
        );
      }
    }
  }, [data]);

  useTokenExpiration();

  useEffect(() => {
    setCounter((prev) => prev + 1);

    // Check this counter to show loading spinner only for the first time loading
    if (counter == 1) {
      setFirstLoading(false);
    }

    setModalForm((prevState) => ({ ...prevState, ...parsedScheduleOptions }));
  }, [parsedScheduleOptions]);

  // Sim Card Form Webpage content
  useEffect(() => {
    // if (hasSimCard) {
    (async () => {
      try {
        const apiResponse = await axios.get(`${API}/templates/109/webpage`);

        setSimCardFormContent(apiResponse.data.content_page);
      } catch (error) {
        console.log("error:", error);
      }
    })();
    // }

    // if (shuttleBusTickets.length > 0) {
    (async () => {
      try {
        const apiResponse = await axios.get(`${API}/templates/110/webpage`);

        setShuttleFormContent(apiResponse.data.content_page);
      } catch (error) {
        console.log("error:", error);
      }
    })();
    // }
  }, [hasSimCard, shuttleBusTickets]);
  // End useEffect Hooks

  // Loading Screen
  if (isLoading && firstLoading) {
    return (
      <div className="flex flex-col w-full mt-16 bg-white gap-x-8 md:flex-row md:relative">
        <div className="flex flex-col w-full">
          <Loading />
        </div>
      </div>
    );
  }

  // Error Display when something is wrong with api call
  if (isError) {
    return (
      <div className="flex flex-col w-full mt-16 bg-white gap-x-8 md:flex-row md:relative">
        <div className="flex flex-col w-full">
          <Error error={""} />
        </div>
      </div>
    );
  }

  return (
    <>
      {parsedData && (
        <div className="flex flex-col w-full">
          {!localStorage.getItem("orderLoginNumber") && (
            <span className="p-4 mb-5 text-xl font-bold bg-white rounded-xl font-poppins">
              마이페이지
            </span>
          )}

          {localStorage.getItem("orderLoginNumber") && (
            <>
              <span className="mb-5 p-5 text-xl font-bold font-poppins bg-white rounded-xl text-black">
                마이페이지
              </span>
              <div className="flex gap-5 p-4 text-b bg-white rounded-xl">
                <div className="flex justify-end text-black text-xs lg:text-sm">
                  주문날짜: {parsedData[0]?.order_date}
                </div>
                <div className="flex justify-end text-black text-xs lg:text-sm">
                  주문번호: {parsedData[0]?.order_number}
                </div>
              </div>
            </>
          )}
          {isSubmitted && (
            <Modal>
              <div className="font-poppins">
                <div className="mb-8">
                  <img
                    alt=""
                    className="cursor-pointer"
                    src={staticFiles.icons.schedule_optionconfirm}
                  />
                </div>
                <div className="mb-16 text-xl font-medium text-center text-black">
                  티켓 준비중
                </div>
                <div className="mb-24 font-normal text-black">
                  티켓이 준비되면 이메일을 통해 티켓을 받게 됩니다. 문의사항이
                  있으시면 service@tamice.com으로 연락주세요.
                  {/* Ticket Name: <span className="font-bold">{ticketName}</span> */}
                </div>
                {/* <div className="mb-6 text-sm">감사합니다.</div> */}
                <button
                  className="w-full px-2 py-2 text-white border rounded text-medium bg-blue"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFirstFetch(false);
                  }}
                >
                  닫기
                </button>
                <div className="absolute text-lg font-medium top-2 right-2 ">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFirstFetch(false);
                    }}
                  >
                    <img
                      alt=""
                      className="cursor-pointer"
                      src={staticFiles.icons.remove}
                    />
                  </button>
                </div>
              </div>
            </Modal>
          )}
          {parsedData?.map((reservation: any, i: number) => {
            let simCardItemIndex = -1;
            let simCardTicketIndex = -1;
            return (
              <div key={i} className="w-full mb-3 sm:mb-5">
                {!localStorage.getItem("orderLoginNumber") && (
                  <div className="flex gap-5 p-4 text-black bg-white rounded-xl">
                    <div className="flex justify-end text-black text-xs lg:text-sm ">
                      주문번호: {reservation.order_number}
                    </div>
                    <div className="flex justify-end text-xs lg:text-sm text-black">
                      주문날짜: {reservation.order_date}
                    </div>
                  </div>
                )}
                {reservation?.items
                  ?.sort((a: any, b: any) => a.item_id - b.item_id)
                  .map((item: any, i: number) => {
                    if (simCardItemIndex == -1 && simCardTicketIndex == -1) {
                      if (
                        item?.tickets?.find(
                          (ticketItem: any) => ticketItem?.sim_card_information
                        )
                      ) {
                        simCardItemIndex = i;
                        simCardTicketIndex = item?.tickets?.findIndex(
                          (ticketItem: any) => ticketItem?.sim_card_information
                        );
                      }
                    }
                    var ableToEdit = item?.tickets
                      ?.sort((a: any, b: any) => a.subitem_id - b.subitem_id)
                      .map(
                        (ticket: any, i: number) =>
                          ((ticket?.ticket_type === "Bar/QR code" &&
                            !ticket?.pdf_path &&
                            ticket?.refund_status !== "환불완료" &&
                            ticket?.ticket_sent_status !== "환불완료") ||
                            (ticket?.ticket_sent_status == "Office Pickup" &&
                              (ticket?.ticket_type === "Hard copy" ||
                                ticket?.ticket_type === "SIM card")) ||
                            (ticket?.ticket_type === "Regular" &&
                              ticket?.ticket_sent_status !== "Sent" &&
                              ticket?.ticket_sent_status !== "pending" &&
                              ticket?.ticket_sent_status !== "발권 중" &&
                              ticket?.options_schedules.length !== 3 &&
                              ticket?.refund_status !== "환불완료" &&
                              ticket?.refund_status !== "In Progress")) &&
                          !(
                            ticket?.ticket_id == "159" ||
                            String(ticket?.ticket_id) == "159"
                          ) &&
                          !(
                            ticket?.ticket_id == "160" ||
                            String(ticket?.ticket_id) == "160"
                          ) &&
                          !(
                            ticket?.ticket_id == "214" ||
                            String(ticket?.ticket_id) == "214"
                          ) &&
                          !(
                            ticket?.ticket_id == "215" ||
                            String(ticket?.ticket_id) == "215"
                          ) &&
                          ticket?.type !== "City Explore Pass"
                      )
                      .includes(true);

                    if (item?.hasSubcategory) {
                      return (
                        <div className="p-1 mt-3 bg-white sm:mt-5 sm:p-4 rounded-xl text-black">
                          <SubcategoryView item={item} i={i} />
                          <TicketViewMemo
                            shuttleFormContent={shuttleFormContent}
                            simCardFormContent={simCardFormContent}
                            simCardTicketIndex={
                              simCardItemIndex == i ? simCardTicketIndex : -1
                            }
                            isLoading={isLoading}
                            orderNumber={reservation?.order_number}
                            item={item}
                            reservation={reservation}
                            showModal={showModal}
                            handleShow={handleShow}
                            modalForm={modalForm}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            setIsDownLoadTicket={setIsDownLoadTicket}
                            isSubmitted={isSubmitted}
                            hasSubcategory={true}
                          />
                          <hr className="w-full border-1 border-gray" />
                          <div className="px-5 py-4 text-xs lg:text-sm text-black">
                            {ableToEdit && (
                              <button
                                onClick={async () => {
                                  if (checkItemsInShoppingCart(cart)) {
                                    Swal.fire({
                                      icon: "warning",
                                      //title: "Oops...",
                                      title: "장바구니에 담을 수 없습니다.",
                                      text: "현재 진행 중인 내역이 있습니다. 장바구니를 확인해 주세요.",
                                      //text: "You already have items in the shopping cart, Please process the existing items first in order to proceed the Booking Edit",
                                      confirmButtonText: "OK",
                                    });
                                  } else {
                                    if (item?.quantity > 1) {
                                      Swal.fire({
                                        title: "수정하기",
                                        //text: `The entire quantity ${item?.quantity} will be reflected when editing. Do you like to proceed?`,
                                        html: `구매하신 수량 ${item?.quantity}개에 대해 수정이 진행됩니다. <br>계속하시겠습니까?`,
                                        // icon: 'question',
                                        showCancelButton: true,
                                        confirmButtonText: "네",
                                        cancelButtonText: "아니오",
                                      }).then(async (result) => {
                                        if (result.isConfirmed) {
                                          let cityName =
                                            subPathWithAbbreviation.find(
                                              (it: any) =>
                                                it.abb ==
                                                  item?.subcategory_name.split(
                                                    " "
                                                  )[0] ||
                                                it.abb ==
                                                  item?.subcategory_name?.substring(
                                                    0,
                                                    2
                                                  )
                                            )?.name;
                                          let cityId = cityData.cityData.find(
                                            (it: any) => it.name == cityName
                                          )?.id;
                                          setCityId(cityId);
                                          localStorage.setItem(
                                            "cityId",
                                            String(cityId)
                                          );
                                          localStorage.setItem(
                                            "cityName",
                                            String(cityName)
                                          );
                                          localStorage.setItem(
                                            "Edit_Item",
                                            JSON.stringify(item)
                                          );

                                          await new Promise((resolve) =>
                                            setTimeout(resolve, 1500)
                                          );

                                          console.log(item, 'ITEM')

                                          navigate(
                                            `/package-tour/${
                                              subPathFromSubCategoryName.find(
                                                (group) =>
                                                  group.name ===
                                                  item?.subcategory_name
                                              )?.subPath
                                            }?edit=${true}&type=booking`,
                                            { state: item }
                                          );

                                          if(cityId === 1){
                                            navigate(
                                              `/ny/package-tour/${
                                                subPathFromSubCategoryName.find(
                                                  (group) =>
                                                    group.name ===
                                                    item?.subcategory_name
                                                )?.subPath
                                              }?edit=${true}&type=booking`,
                                              { state: item }
                                            );
                                          }
                                          else if(cityId===36) {
                                            navigate(
                                              `/sf/package-tour/${
                                                subPathFromSubCategoryName.find(
                                                  (group) =>
                                                    group.name ===
                                                    item?.subcategory_name
                                                )?.subPath
                                              }?edit=${true}&type=booking`,
                                              { state: item }
                                            );
                                          }
                                          else if(cityId===58) {
                                            navigate(
                                              `/ls/package-tour/${
                                                subPathFromSubCategoryName.find(
                                                  (group) =>
                                                    group.name ===
                                                    item?.subcategory_name
                                                )?.subPath
                                              }?edit=${true}&type=booking`,
                                              { state: item }
                                            );
                                          }
                                          else if(cityId===59) {
                                            navigate(
                                              `/hls/package-tour/${
                                                subPathFromSubCategoryName.find(
                                                  (group) =>
                                                    group.name ===
                                                    item?.subcategory_name
                                                )?.subPath
                                              }?edit=${true}&type=booking`,
                                              { state: item }
                                            );
                                          }
                                          else if(cityId===57) {
                                            navigate(
                                              `/nf/package-tour/${
                                                subPathFromSubCategoryName.find(
                                                  (group) =>
                                                    group.name ===
                                                    item?.subcategory_name
                                                )?.subPath
                                              }?edit=${true}&type=booking`,
                                              { state: item }
                                            );
                                          }
                                          else if(cityId===56) {
                                            navigate(
                                              `/boston/package-tour/${
                                                subPathFromSubCategoryName.find(
                                                  (group) =>
                                                    group.name ===
                                                    item?.subcategory_name
                                                )?.subPath
                                              }?edit=${true}&type=booking`,
                                              { state: item }
                                            );
                                          }
                                          else {
                                            navigate(
                                              `/package-tour/${
                                                subPathFromSubCategoryName.find(
                                                  (group) =>
                                                    group.name ===
                                                    item?.subcategory_name
                                                )?.subPath
                                              }?edit=${true}&type=booking`,
                                              { state: item }
                                            );
                                          }
                                        

                                        } else if (
                                          result.dismiss ===
                                          Swal.DismissReason.cancel
                                        ) {
                                          return;
                                        }
                                      });
                                    } else {
                                      let cityName =
                                        subPathWithAbbreviation.find(
                                          (it: any) =>
                                            it.abb ==
                                              item?.subcategory_name.split(
                                                " "
                                              )[0] ||
                                            it.abb ==
                                              item?.subcategory_name?.substring(
                                                0,
                                                2
                                              )
                                        )?.name;
                                        console.log(cityName, 'CITY NAME 611')
                                      let cityId = cityData.cityData.find(
                                        (it: any) => it.name == cityName
                                      )?.id;
                                      setCityId(cityId);
                                      localStorage.setItem(
                                        "cityId",
                                        String(cityId)
                                      );
                                      localStorage.setItem(
                                        "cityName",
                                        String(cityName)
                                      );
                                      localStorage.setItem(
                                        "Edit_Item",
                                        JSON.stringify(item)
                                      );

                                      await new Promise((resolve) =>
                                        setTimeout(resolve, 1500)
                                      );

                                      if(cityId === 1){
                                        navigate(
                                          `/ny/package-tour/${
                                            subPathFromSubCategoryName.find(
                                              (group) =>
                                                group.name ===
                                                item?.subcategory_name
                                            )?.subPath
                                          }?edit=${true}&type=booking`,
                                          { state: item }
                                        );
                                      }
                                      else if(cityId===36) {
                                        navigate(
                                          `/sf/package-tour/${
                                            subPathFromSubCategoryName.find(
                                              (group) =>
                                                group.name ===
                                                item?.subcategory_name
                                            )?.subPath
                                          }?edit=${true}&type=booking`,
                                          { state: item }
                                        );
                                      }
                                      else if(cityId===58) {
                                        navigate(
                                          `/ls/package-tour/${
                                            subPathFromSubCategoryName.find(
                                              (group) =>
                                                group.name ===
                                                item?.subcategory_name
                                            )?.subPath
                                          }?edit=${true}&type=booking`,
                                          { state: item }
                                        );
                                      }
                                      else if(cityId===59) {
                                        navigate(
                                          `/hls/package-tour/${
                                            subPathFromSubCategoryName.find(
                                              (group) =>
                                                group.name ===
                                                item?.subcategory_name
                                            )?.subPath
                                          }?edit=${true}&type=booking`,
                                          { state: item }
                                        );
                                      }
                                      else if(cityId===57) {
                                        navigate(
                                          `/nf/package-tour/${
                                            subPathFromSubCategoryName.find(
                                              (group) =>
                                                group.name ===
                                                item?.subcategory_name
                                            )?.subPath
                                          }?edit=${true}&type=booking`,
                                          { state: item }
                                        );
                                      }
                                      else if(cityId===56) {
                                        navigate(
                                          `/boston/package-tour/${
                                            subPathFromSubCategoryName.find(
                                              (group) =>
                                                group.name ===
                                                item?.subcategory_name
                                            )?.subPath
                                          }?edit=${true}&type=booking`,
                                          { state: item }
                                        );
                                      }
                                      else {
                                        navigate(
                                          `/package-tour/${
                                            subPathFromSubCategoryName.find(
                                              (group) =>
                                                group.name ===
                                                item?.subcategory_name
                                            )?.subPath
                                          }?edit=${true}&type=booking`,
                                          { state: item }
                                        );
                                      }
                                    }
                                  }
                                }}
                                className="py-2 text-blue"
                              >
                                수정하기
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div>
                          <TicketViewMemo
                            shuttleFormContent={shuttleFormContent}
                            simCardFormContent={simCardFormContent}
                            simCardTicketIndex={
                              simCardItemIndex == i ? simCardTicketIndex : -1
                            }
                            orderNumber={reservation?.order_number}
                            item={item}
                            reservation={reservation}
                            showModal={showModal}
                            handleShow={handleShow}
                            modalForm={modalForm}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            setIsDownLoadTicket={setIsDownLoadTicket}
                            isSubmitted={isSubmitted}
                            hasSubcategory={false}
                          />
                        </div>
                      );
                    }
                  })}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
