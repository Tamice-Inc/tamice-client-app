import "@progress/kendo-theme-default/dist/all.css";
import axios from "axios";
import moment from "moment";
import React, { ChangeEvent, useEffect, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Modal from "react-modal";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { CartItem, cartState, cityIdState, menuState } from "../../../App";
import { API, staticFiles } from "../../../shared";
import { MainButton } from "../../../shared/components/Buttons";
import { TourCalendar } from "../../../shared/components/Calendar/TourCalendar";
import { SelectInput } from "../../../shared/components/Inputs";
import { MultiTourCalendar } from "../../../shared/components/Multi-calendar/MultiTourCalendar";
import { ProductCardProps } from "../../../shared/components/ProductCard";
import {
  convertLink,
  formatDateTime,
  formatDateTimePMTo00,
} from "../../../shared/components/Utils";
import { useGetPackagePriceOptions } from "../../../shared/hooks";
import { MedalEnum } from "../../cart/components/CardInfo";

type IncludesInfoProps = {
  isIncluded: boolean;
  isSelected: boolean;
  canEdit: boolean;
  hasGoldStar?: boolean;
  hasDate?: boolean;
  name: string;
  premiumType: string;
  onClick: () => void;
  setIsOpenModal: any;
  index: number;
  setOrder: any;
};

type cartData = {
  adultInfo: CartItem[];
  childInfo: CartItem[];
  selectInfo?: any[];
};

const IncludesInfo: React.FC<IncludesInfoProps> = ({
  hasDate,
  canEdit,
  isIncluded,
  isSelected,
  name,
  premiumType,
  onClick,
  setIsOpenModal,
  index,
  setOrder,
}) => (
  <div
    onClick={
      canEdit
        ? (e) => {
            onClick();
          }
        : undefined
    }
    title="package-ticket"
    className="pg-ticket-lists w-full flex items-center cursor-pointer hover:bg-[rgb(240,240,240)] py-2"
  >
    <div className="flex items-center w-1/12">
      <img
        alt=""
        className="w-4 md:w-5"
        src={
          isIncluded
            ? staticFiles.icons.green_check
            : staticFiles.icons.black_check
        }
      />
    </div>
    <div className="flex items-center w-2/12">
      {hasDate}
      {premiumType === "Premium" ? (
        <img alt="" className="mr-1" src={staticFiles.icons.black_medal} />
      ) : premiumType === "Premium S" ? (
        <img alt="" className="mr-1" src={staticFiles.icons.gold_medal} />
      ) : premiumType === "Deluxe" ? (
        <img alt="" className="mr-1" src={staticFiles.icons.blue_medal} />
      ) : (
        <div className="mr-1"></div>
      )}

      {hasDate && (
        <img
          alt=""
          onClick={
            canEdit
              ? (e) => {
                  e.stopPropagation();
                  setOrder(index);
                  setIsOpenModal(true);
                }
              : undefined
          }
          className="w-4 md:w-5"
          src={
            isIncluded && isSelected
              ? staticFiles.icons.greenCalendar
              : staticFiles.icons.calendar
          }
        />
      )}
    </div>
    <div className="flex w-9/12">
      <span className="text-sm text-[#5D5D5F]">{name}</span>
    </div>
  </div>
);

//// Start Global custom functions that can be used in both exporting components below Start////
const extractParams = (url: string) => {
  const urlParams = new URLSearchParams(new URL(url).search);
  const edit = urlParams.get("edit");
  const cartId = urlParams.get("cartId");
  const type = urlParams.get("type");
  return { edit, cartId, type };
};

const calculateAdditionalPrice = (selectedTicketIds: any, tickets: any) => {
  return selectedTicketIds.reduce((acc: any, ticketId: any) => {
    const ticket = tickets.find((item: any) => item.id === ticketId);
    const premiumPrice =
      ticket?.additional_price_type === "Premium"
        ? Number(ticket?.premiumPrice)
        : 0;
    const premiumSPrice =
      ticket?.additional_price_type === "Premium S"
        ? Number(ticket?.premiumSPrice)
        : 0;
    const deluxPrice =
      ticket?.additional_price_type === "Deluxe"
        ? Number(ticket?.deluxPrice)
        : 0;
    return acc + premiumPrice + premiumSPrice + deluxPrice;
  }, 0);
};

const calculateTotalPrice = (
  selectedAdultChildType: string,
  selectedPriceOptionId: any,
  additionalPrice: number,
  filterCounter: number,
  packagePriceOptions: any
) => {
  const priceOption = packagePriceOptions.find(
    (item: any) => item.value === selectedPriceOptionId
  );
  const adultPrice =
    selectedAdultChildType === "성인"
      ? (Number(priceOption?.adult_price || 0) + additionalPrice) *
        filterCounter
      : 0;
  const childPrice =
    selectedAdultChildType === "아동"
      ? (Number(priceOption?.child_price || 0) + additionalPrice) *
        filterCounter
      : 0;
  return adultPrice + childPrice;
};

const checkDoubleBookingEdit = (
  {
    childInfo,
    adultInfo,
  }: {
    childInfo: CartItem[];
    adultInfo: CartItem[];
  },
  reservation_id: any
) => {
  let result = false;

  if (reservation_id) {
    const combinedInfo = [...childInfo, ...adultInfo];

    result = combinedInfo.some(
      (info) => info.reservation_id === reservation_id
    );
  }

  return result;
};

const checkIsEditItems = ({
  childInfo,
  adultInfo,
}: {
  childInfo: CartItem[];
  adultInfo: CartItem[];
}) => {
  let result = false;

  const combinedInfo = [...childInfo, ...adultInfo];

  result = combinedInfo.some((info) => info.reservation_id !== null);

  return result;
};
//// End Global custom functions that can be used in both exporting components below End////

// Custom Loading Component
const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-16 h-16 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
    </div>
  );
};

// Custom Total Price Display Component
const TotalPriceCom = ({ totalPrice }: any) => {
  if (Number.isNaN(totalPrice)) {
    return <div>No Price</div>;
  }
  return <div>${totalPrice}</div>;
};

// Custom Filter Counter Component
const FilterCounterCom = ({ filterCounter }: any) => {
  return <div>{filterCounter}</div>;
};

//// Start Define Exporting Components that can be used in other pages or components Start////
// PackageBuyDetail Component For Multiple Tickets
export const PackageBuyDetail = ({
  handlePage,
  tickets,
  singleTicket,
  allTickets,
  categoryId,
  subCategoryId,
  subCategoryTitle,
  subPath,
  tour,
  ticket,
}: {
  handlePage?: any;
  allTickets?: any;
  tickets: ProductCardProps[];
  singleTicket?: any;
  categoryId?: any;
  subCategoryId?: any;
  subCategoryTitle?: string;
  subPath?: string;
  tour?: boolean;
  ticket?: any;
}) => {
  // Global State Variables
  const [cart, setCart] = cartState.useState();
  const [menu] = menuState.useState();
  const [cityId] = cityIdState.useState();

  // Get Search Params from url and defind navigate
  const { search } = useLocation(); // ?edit=true&cartId=1690069215841
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  // const location = useLocation();
  // const item = location.state;

  // Component State Variables definition Start
  const [filterCounter, setFilterCounter] = useState<number>(1); // user selected ticket count
  const [selectedPriceOptionId, setSelectedPriceOptionId] =
    useState<string>(""); // price option id e.g. 88, 89, 90
  const [selectedAdultChildType, setSelectedAdultChildType] = useState<
    "성인" | "아동"
  >("성인"); // adult or child
  const [maxLimit, setMaxLimit] = useState(0);
  const [selectedPriceOption, setSelectedPriceOption] = useState({} as any);
  const [selectedOriginPriceOption, setSelectedOriginPriceOption] = useState(
    {} as any
  );
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedTicketIds, setSelectedTicketIds] = useState<string[]>([]); // id of selected tickets
  const [noneditableTicketIds, setNoneditableTicketIds] = useState<string[]>(
    []
  );
  const [selectedOriginTicketIds, setSelectedOriginTicketIds] = useState<
    string[]
  >([]); // id of selected original tickets
  const [cartBookingCount, setCartBookingCount] = useState(0);
  const [editLoading, setEditLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [selectedTour, setSelectedTour] = useState<any>([]);
  const [order, setOrder] = useState(0);
  const [availabilityError, setAvailabilityError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // Component State Variables definition End

  // Define reservationsData and reservationsParsedData to use when the user is going to do Booking Edit.
  // const [reservationsData] = reservationsState.useState();
  let reservationsData: any;
  const localReservationData = localStorage.getItem("reservationData");
  reservationsData = localReservationData
    ? JSON.parse(localReservationData)
    : null;
  // const [reservationsParsedData] = reservationsParsedState.useState();
  let reservationsParsedData: any;
  const localReservationParsedData = localStorage.getItem(
    "reservationParsedData"
  );
  reservationsParsedData = localReservationParsedData
    ? JSON.parse(localReservationParsedData)
    : null;

  // Get packagePriceOptions from custom Hook with api call
  const {
    isLoading,
    isError,
    data: packagePriceOptions,
  } = useGetPackagePriceOptions(subCategoryId, categoryId);

  // Define item value to use in edit cases
  let item: any;

  // Get SearchQuery from the current url
  const searchQuery = extractParams(
    `http://localhost:${process.env.REACT_APP_PORT}/my-page${search}`
  );

  if (search) {
    if (searchQuery?.edit) {
      // In the edit case, if there is Edit_Item in LocalStorage, assign that to item after parsing.
      const localitem = localStorage.getItem("Edit_Item");
      item = localitem ? JSON.parse(localitem) : null;
      console.log(localitem, "LOCAL 331")
    }
  }

  // Navigate to landing page if there are no edit Items and this is edit case assuming that this user is not logged in yet.
  if (!item && searchQuery?.edit && searchQuery?.type !== "cart") {
    localStorage.removeItem("authToken");
    localStorage.removeItem("loginData");
    localStorage.removeItem("order_number");
    localStorage.removeItem("useremail");

    navigate("/");
  }

  // Define useEffect Hooks Start
  useEffect(() => {
    const additionalPrice = calculateAdditionalPrice(
      selectedTicketIds,
      tickets
    );
    // Calculate total price for big apple pass pages. Consider these subCategoryId == "233" || subCategoryId == "235" || subCategoryId == "236" for Boston, Niagara and Las vegas
    if (
      (menu[1]?.dropdownElements?.[1] &&
        subCategoryId !== menu[1]?.dropdownElements?.[1].id) ||
      subCategoryId == "233" ||
      subCategoryId == "235" ||
      subCategoryId == "236" ||
      subCategoryId == "241" 
    ) {
      if (packagePriceOptions && selectedPriceOptionId) {
        const calculatedTotalPrice = calculateTotalPrice(
          selectedAdultChildType,
          selectedPriceOptionId,
          additionalPrice,
          filterCounter,
          packagePriceOptions
        );
        console.log(calculatedTotalPrice, '367')
        setTotalPrice(calculatedTotalPrice);
      }
    } else {
      if (packagePriceOptions) {
        if (selectedAdultChildType === "성인") {
          console.log( 'ELSE if', packagePriceOptions[0].adult_price * filterCounter)
          setTotalPrice(packagePriceOptions[0].adult_price * filterCounter);
        } else {
          console.log( 'ELSE else', packagePriceOptions[0].child_price * filterCounter)

          setTotalPrice(packagePriceOptions[0].child_price * filterCounter);
        }
      }
    }
  }, [
    selectedPriceOptionId,
    selectedAdultChildType,
    filterCounter,
    selectedTicketIds,
    tickets,
    packagePriceOptions,
  ]);

  useEffect(() => {
    if (!isLoading && !isError && packagePriceOptions) {
      const searchQuery = extractParams(
        `http://localhost:${process.env.REACT_APP_PORT}/my-page${search}`
      );

      if (
        searchQuery?.edit &&
        (searchQuery?.type === "cart" || searchQuery?.type === "cart booking")
      ) {
        let cartData = localStorage.getItem("CART_DATA")
          ? JSON.parse(localStorage.getItem("CART_DATA") || "")
          : { adultInfo: [], childInfo: [] };

        if (cart.adultInfo.length > 0 || cart.childInfo.length > 0) {
          const { adultInfo, childInfo }: cartData = cart;
          const cartItemsToEdit = [...adultInfo, ...childInfo]?.filter(
            (obj) => obj?.cartId === searchQuery?.cartId
          );

          const priceOption = packagePriceOptions.filter(
            (option: any) => option.value === cartItemsToEdit[0]?.priceOptionId
          )[0];

          setFilterCounter(cartItemsToEdit[0]?.quantity);
          setSelectedPriceOptionId(cartItemsToEdit[0]?.priceOptionId || "");
          setSelectedAdultChildType(
            cartItemsToEdit[0]?.adult_child_type || "성인"
          );
          setMaxLimit(priceOption?.quantity);
          setSelectedPriceOption(priceOption);
          if (
            cartItemsToEdit[0]?.subCategoryName !== "city-pass" &&
            cartItemsToEdit[0]?.subCategoryName !== "explore-pass"
          ) {
            if (searchQuery?.type === "cart booking") {
              setSelectedTicketIds(
                cartItemsToEdit.map(
                  (item) => item.ticket_id?.split("+")[0] || ""
                )
              );
              // Set more pages to show based on item.tickets
              let ticketsToDisplay = cartItemsToEdit.map((com: any) =>
                Number(com?.ticket_id?.split("+")[0])
              );
              let maxTicketId = Math.max(...ticketsToDisplay);
              handlePage(
                allTickets?.findIndex(
                  (it: any) => it.id === maxTicketId.toString()
                ) < 5
                  ? 5
                  : allTickets?.findIndex(
                      (it: any) => it.id === maxTicketId.toString()
                    ) + 1
              );

              handleCartItems(cartItemsToEdit, "cartbooking");
            } else {
              setSelectedTicketIds(
                cartItemsToEdit.map((item) => item.ticket_id || "")
              );
              // Set more pages to show based on item.tickets
              let ticketsToDisplay = cartItemsToEdit.map((com: any) =>
                Number(com?.ticket_id)
              );
              let maxTicketId = Math.max(...ticketsToDisplay);
              handlePage(
                allTickets?.findIndex(
                  (it: any) => it.id === maxTicketId.toString()
                ) < 5
                  ? 5
                  : allTickets?.findIndex(
                      (it: any) => it.id === maxTicketId.toString()
                    ) + 1
              );

              handleCartItems(cartItemsToEdit, "cart");
            }
          }
          setSelectedOriginTicketIds(
            item?.tickets.map((com: any) => String(com?.ticket_id) || "")
          );
        }
      }

      if (searchQuery?.edit && searchQuery?.type === "booking") {
        const priceOption = packagePriceOptions.filter(
          (option: any) =>
            option.value === item?.price_list_id ||
            String(option.value) === String(item?.price_list_id)
        )[0];

        setFilterCounter(Number(item?.quantity));
        setSelectedPriceOptionId(String(item?.price_list_id) || "");
        setSelectedAdultChildType(item?.adult_child_type || "성인");
        setMaxLimit(priceOption?.quantity);
        setSelectedPriceOption(priceOption);
        setSelectedOriginPriceOption(priceOption);
        setSelectedTicketIds(
          item?.tickets.map((ticket: any) => String(ticket?.ticket_id) || "")
        );

        setNoneditableTicketIds(
          item?.tickets.map((ticket: any) =>
            ticket.options_schedules.length !== 0
              ? String(ticket?.ticket_id)
              : ""
          )
        );
        // Set more pages to show based on item.tickets
        let ticketsToDisplay = item?.tickets.map((com: any) =>
          Number(com?.ticket_id)
        );
        let maxTicketId = Math.max(...ticketsToDisplay);

        handlePage(
          allTickets?.findIndex((it: any) => it.id === maxTicketId.toString()) <
            5
            ? 5
            : allTickets?.findIndex(
                (it: any) => it.id === maxTicketId.toString()
              ) + 1
        );

        setSelectedOriginTicketIds(
          item?.tickets.map((com: any) => String(com?.ticket_id) || "")
        );

        handleCartItems(item?.tickets, "booking");
      }

      setEditLoading(true);
    }
  }, [isLoading, isError, packagePriceOptions, allTickets]);

  useEffect(() => {
    if (!isLoading && !isError && packagePriceOptions) {
      const searchQuery = extractParams(
        `http://localhost:${process.env.REACT_APP_PORT}/my-page${search}`
      );

      if (!searchQuery?.edit) {
        setSelectedPriceOptionId(packagePriceOptions[0]?.value);
        setMaxLimit(packagePriceOptions[0]?.quantity);
        setSelectedPriceOption(packagePriceOptions[0]);
      }
    }
  }, [cityId, isLoading, isError, packagePriceOptions]);

  useEffect(() => {
    return () => {
      setFilterCounter(1);
      setSelectedPriceOptionId("");
      setSelectedAdultChildType("성인");
      setMaxLimit(0);
      setSelectedPriceOption({});
      setTotalPrice(0);
      setSelectedTicketIds([]);
      Swal.close();
    };
  }, []);

  useEffect(() => {
    setSelectedTour([]);
    setSelectedTicketIds([]);
  }, [cityId]);
  // Define useEffect Hooks End

  // Define Custom Functions Start
  const handleReset = () => {
    setFilterCounter(1);
    setSelectedTicketIds([]);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // handleCart({ bookingDate });
  };

  const handleClick = (date: string, id: string): Promise<void> => {
    return new Promise((resolve) => {
      setSelectedTour((prevState: any) => {
        if (prevState.length !== 0) {
          let flg = false;
          const newArray = prevState.map((obj: any) => {
            if (Object.keys(obj)[0] === id) {
              flg = true;
              return { [id]: date };
            } else {
              return obj;
            }
          });
          if (flg) return newArray;
          else return [...newArray, { [id]: date }];
        } else {
          return [{ [id]: date }];
        }
      });
      resolve();
    });
  };

  const handleClickDisable = (date: string, id: string): Promise<void> => {
    return new Promise((resolve) => {
      setSelectedTour((prevState: any) => {
        const newArray = prevState.filter(
          (obj: any) => Object.keys(obj)[0] !== id
        );
        return newArray;
      });
      resolve();
    });
  };

  async function handleCartItems(cartItemsToEdit: any, type: string) {
    console.log("cartItemsToEdit", cartItemsToEdit);
    for (const it of cartItemsToEdit) {
      console.log("date");
      if (type === "cart") {
        if (it.tour_date && it.ticket_id) {
          await handleClick(it.tour_date, it.ticket_id);
        }
      } else if (type === "cartbooking") {
        if (it.tour_date && it.ticket_id) {
          await handleClick(
            formatDateTimePMTo00(it.tour_date),
            it.ticket_id?.split("+")[0]
          );  
        }
      } else {
        if (it.rq_schedule_datetime && it.ticket_id) {
          await handleClick(
            formatDateTimePMTo00(it.rq_schedule_datetime),
            it.ticket_id
          );
        }
      }
    }
  }

  const handleQuantityCounter = (prev: number, action: "INC" | "DEC") => {
    if (action === "DEC" && prev === 1) {
      toast.warning("수량은 1 이상이어야 합니다.");
      return;
    }
    if (action === "DEC") setFilterCounter(prev - 1);
    if (action === "INC") setFilterCounter(prev + 1);
  };

  const handleUpdateCart = (adultOrder: any, childOrder: any) => {
    let isEdited = checkDoubleBookingEdit(cart, item?.reservation_id);
    if (searchQuery?.type == "cart booking" && cartBookingCount == 0) {
      isEdited = false;
      setCartBookingCount(1);
      console.log(totalPrice < item?.total, totalPrice, item.total, 'LINE 649')
    }
    if (item && totalPrice < item?.total && searchQuery?.type !== "cart") {
      console.log((item), 'LINE 642');
      console.log(totalPrice, item?.total, 'LINE 643' )
      Swal.fire({
        icon: "error",
        // title: "Oops...",
        // text: "Downgrading is not allowed!",
        // title: "다운그레이드 요청",
        // text: "Downgrading is not allowed!",
        title: "다운그레이드 요청",
        html: `다운그레이드는 <a href="https://pf.kakao.com/_AAelu" style="color:#009eef; text-decoration: underline;" target="_blank">타미스 카카오톡 채널</a> 혹은 이메일 (<a href="mailto:service@tamice.com">service@tamice.com</a>) 로 문의해 주세요.`,
      });
    } else if (
      item &&
      totalPrice == item?.total &&
      searchQuery?.type != "cart booking"
    ) {
      if(adultOrder.filter((ticket:any) => ticket.ticket_type == "Shuttle bus" || ticket.ticket_type == "SIM card")?.length > 0 || childOrder.filter((ticket:any) => ticket.ticket_type == "Shuttle bus" || ticket.ticket_type == "SIM card")?.length > 0){
        let rawData: any = localStorage.getItem("CART_DATA");
        if (!rawData) {
          rawData = JSON.stringify({
            adultInfo: [],
            childInfo: [],
            selectInfo: [],
          });
        }
        if (rawData) {
          const { adultInfo, childInfo, selectInfo }: cartData =
            JSON.parse(rawData);

          const searchQuery = extractParams(
            `http://localhost:${process.env.REACT_APP_PORT}/my-page${search}`
          );

          let adultInfoToConcat = adultInfo;
          let childInfoToConcat = childInfo;

          if (
            searchQuery?.edit &&
            (searchQuery?.type == "cart" || searchQuery?.type == "cart booking")
          ) {
            adultInfoToConcat = adultInfoToConcat.filter(
              (ticket) => ticket.cartId !== searchQuery?.cartId
            );
            childInfoToConcat = childInfoToConcat.filter(
              (ticket) => ticket.cartId !== searchQuery?.cartId
            );
          }

          localStorage.setItem(
            "CART_DATA",
            JSON.stringify({
              adultInfo: adultInfoToConcat.concat(adultOrder),
              childInfo: childInfoToConcat.concat(childOrder),
              selectInfo,
            })
          );

          setCart({
            adultInfo: adultInfoToConcat.concat(adultOrder),
            childInfo: childInfoToConcat.concat(childOrder),
            selectInfo,
          });

          if (
            searchQuery?.edit &&
            (searchQuery?.type == "cart" || searchQuery?.type == "cart booking")
          ) {
            toast.info("상품을 성공적으로 업데이트하셨습니다!");
          } else {
            toast.success("장바구니에 담았습니다.");
          }
        }
      }else{
        Swal.fire({
          // title: "Do you want to update?",
          // text: "You have no balance to pay and the change will be updated in My Page.",
          title: "상품을 변경하시겠습니까?",
          text: "'예' 를 클릭하시면 선택하신 상품으로 변경됩니다.",
          icon: "question",
          showCancelButton: true,
          // confirmButtonText: "OK",
          // cancelButtonText: "No",
          confirmButtonText: "예",
          cancelButtonText: "아니오",
        }).then(async (result) => {
          if (result.isConfirmed) {
            Swal.fire({
              icon: "info",
              // title: "Updating now...",
              // text: "Please Wait!",
              title: "변경 중입니다!",
              text: "잠시만 기다려 주세요!",
              showConfirmButton: false,
              confirmButtonText: "",
            });
  
            const token = localStorage.getItem("authToken");
            const orderLoginData = localStorage.getItem("orderLoginNumber");
            const orderLoginEmail = localStorage.getItem("orderLoginEmail");
  
            if (token || orderLoginData) {
              let items: any = [];

              if (!reservationsData) {
                localStorage.removeItem("authToken");
                localStorage.removeItem("loginData");
                localStorage.removeItem("order_number");
                localStorage.removeItem("useremail");

                navigate("/");
              }

              let reservations = reservationsData.reservations;

              let currentReservation: any =
                reservations[
                  reservations.findIndex(
                    (it: any) => it.id === item.reservation_id
                  )
                ];

              let currentItemBeforeUpdate: any =
                currentReservation?.reservation_items.filter(
                  (it: any) => it.id == item.item_id
                );

              let otherItems = currentReservation.reservation_items.filter(
                (it: any) => it.id !== item.item_id
              );
              let otherItemsTosend = otherItems.map((data: any) => ({
                id: data.id,
                adult_child_type: data.adult_child_type,
                child_age: data.child_age,
                price: parseFloat(data.price) || 0,
                quantity: parseInt(data.quantity),
                ticket_sent_status: data.ticket_sent_status,
                ticket_sent_date: data.ticket_sent_date,
                refund_status: data.refund_status,
                refund_sent_date: data.refund_sent_date,
                reservation_id: parseFloat(data.reservation_id),
                category_id: parseFloat(data.category_id),
                subcategory_id: parseFloat(data.subcategory_id),
                price_list_id: parseFloat(data.price_list_id),
                sub_items:
                  data.reservation_sub_items?.map((subitem: any) => ({
                    id: subitem.id,
                    rq_schedule_datetime: subitem.rq_schedule_datetime,
                    ticket_id: subitem.ticket_id,
                    refund_status: subitem.refund_status,
                  })) || [],
              }));

              items.push(...otherItemsTosend);
              const localitem = localStorage.getItem("Edit_Item");
              //@ts-ignore
              var oldCart = localitem && JSON.parse(localitem);
              var theT = oldCart?.tickets?.filter((x: any) =>
                selectedTicketIds.includes(x.ticket_id + "")
              );

              let currentItem: any = {
                id: item.item_id,
                adult_child_type: selectedAdultChildType,
                child_age: item.child_age,

                price: item.price,
                quantity: filterCounter,

                ticket_sent_status: null,
                ticket_sent_date: null,
                refund_status: null,
                refund_sent_date: null,

                reservation_id: item.reservation_id,

                category_id: categoryId,
                subcategory_id: subCategoryId,
                price_list_id: selectedPriceOption?.value,

                sub_items: [
                  ...selectedTicketIds.map((it: any, index: number) => {
                    const newTicket = tickets.find(
                      (ticket: any) => ticket.id === it
                    );
                    let newDate = null;
                    if (
                      newTicket?.ticket_type === "Guide Tour" ||
                      newTicket?.ticket_type === "Shuttle bus"
                    ) {
                      const tour = selectedTour.find((obj: any) =>
                        obj.hasOwnProperty(newTicket.id)
                      );
                      newDate = formatDateTimePMTo00(
                        tour[parseInt(newTicket.id)]
                      );
                    }

                    return {
                      id: theT.find((x: any) => x.ticket_id == it + "")
                        ? index < item.tickets.length
                          ? theT.find((x: any) => x.ticket_id == it + "")
                              .subitem_id
                          : null
                        : null,
                      rq_schedule_datetime:
                        item.tickets.findIndex(
                          (ticket: any) => String(ticket.ticket_id) === it
                        ) === -1
                          ? newDate
                          : item.tickets[
                              item.tickets.findIndex(
                                (ticket: any) => String(ticket.ticket_id) === it
                              )
                            ]?.rq_schedule_datetime,
                      ticket_id: String(it),
                      refund_status:
                        item.tickets.findIndex(
                          (ticket: any) => String(ticket.ticket_id) === it
                        ) === -1
                          ? null
                          : item.tickets[
                              item.tickets.findIndex(
                                (ticket: any) => String(ticket.ticket_id) === it
                              )
                            ]?.refund_status,
                    };
                  }),
                ],
              };

              items.push(currentItem);

              try {
                const result = await axios.put(
                  `${API}/reservations/user-create/${item.reservation_id}`,
                  {
                    items,
                    stripe_token: null,
                  }
                );

                if (result.status === 200) {
                  await Swal.fire({
                    icon: "success",
                    // title: "Success!",
                    // text: "My Page will have the update. Please check.",
                    title: "변경이 완료되었습니다.",
                    text: "마이페이지에서 변경된 상품을 확인해 주세요.",
                    showConfirmButton: true,
                    confirmButtonText: "마이페이지로 이동하기",
                  });

                  if (token) {
                    navigate("/my-page");
                  } else {
                    navigate(
                      `/my-page?email=${orderLoginEmail}&order_number=${orderLoginData}`
                    );
                  }
                } else {
                  Swal.fire({
                    icon: "warning",
                    // title: "Something wrong!",
                    // text: "Please try again!",
                    title: "예기치 못한 오류가 발생했습니다.",
                    html: `이 메세지가 반복해서 나타날 경우, <a href="https://pf.kakao.com/_AAelu" style="color:#009eef; text-decoration: underline;" target=”blank”> 타미스 카카오톡 채널 </a> 혹은 이메일 (service@tamice.com) 로 문의해 주세요.`,
                    confirmButtonText: "OK",
                  });
                }
              } catch (error) {
                console.log("error", error);
                Swal.fire({
                  icon: "warning",
                  // title: "Something wrong!",
                  // text: "Please try again!",
                  title: "예기치 못한 오류가 발생했습니다.",
                  html: `이 메세지가 반복해서 나타날 경우, <a href="https://pf.kakao.com/_AAelu" style="color:#009eef; text-decoration: underline;" target=”blank”> 타미스 카카오톡 채널 </a> 혹은 이메일 (service@tamice.com) 로 문의해 주세요.`,
                  confirmButtonText: "OK",
                });
              }
            }
            
  
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            return;
          }
        });
      }
    } else if (isEdited) {
      Swal.fire({
        icon: "error",
        //title: "Oops...",
        title: "수정 완료",
        // text: "You already Edited, please check Shopping Cart!",
        text: "수정이 완료되었습니다. 장바구니를 확인해 주세요.",
      });
    } else {
      let rawData: any = localStorage.getItem("CART_DATA");
      if (!rawData) {
        rawData = JSON.stringify({
          adultInfo: [],
          childInfo: [],
          selectInfo: [],
        });
      }
      if (rawData) {
        const { adultInfo, childInfo, selectInfo }: cartData =
          JSON.parse(rawData);

        const searchQuery = extractParams(
          `http://localhost:${process.env.REACT_APP_PORT}/my-page${search}`
        );

        let adultInfoToConcat = adultInfo;
        let childInfoToConcat = childInfo;

        if (
          searchQuery?.edit &&
          (searchQuery?.type == "cart" || searchQuery?.type == "cart booking")
        ) {
          adultInfoToConcat = adultInfoToConcat.filter(
            (ticket) => ticket.cartId !== searchQuery?.cartId
          );
          childInfoToConcat = childInfoToConcat.filter(
            (ticket) => ticket.cartId !== searchQuery?.cartId
          );
        }

        localStorage.setItem(
          "CART_DATA",
          JSON.stringify({
            adultInfo: adultInfoToConcat.concat(adultOrder),
            childInfo: childInfoToConcat.concat(childOrder),
            selectInfo,
          })
        );

        setCart({
          adultInfo: adultInfoToConcat.concat(adultOrder),
          childInfo: childInfoToConcat.concat(childOrder),
          selectInfo,
        });

        if (
          searchQuery?.edit &&
          (searchQuery?.type == "cart" || searchQuery?.type == "cart booking")
        ) {
          toast.info("상품을 성공적으로 업데이트하셨습니다!");
        } else {
          toast.success("장바구니에 담았습니다.");
        }
      }
    }
  };

  const handleAddToTheCart = async () => {
    // Set addingToCart to true
    console.log(maxLimit,selectedTicketIds, 'MAXX')
    console.log(subCategoryId, menu[1], 'MENU')
    setAddingToCart(true);

    if (filterCounter < 1) {
      toast.warning("Cannot add items. Please choose more than 1 quantity");
      setAddingToCart(false);
      return;
    } else if (
      selectedTicketIds.length < maxLimit &&
      subCategoryId === Number(menu[1]?.dropdownElements?.[0].id)
    ) {
      toast.warning(
        // `Please choose ${maxLimit - selectedTicketIds.length} more tickets`
        `입장지 ${maxLimit - selectedTicketIds.length}개를 더 선택해 주세요.`
      );
      setAddingToCart(false);
      return;
    } else if (selectedTicketIds.length > maxLimit) {
      toast.warning(`${maxLimit}개의 입장지 선택만 가능합니다`);
      setAddingToCart(false);
      return;
    }

    // Check availability for guide tour tickets
    let guideTickets: any = [];
    for (const el of selectedTicketIds) {
      let date = selectedTour.find((obj: any) => obj.hasOwnProperty(el));

      if (!!date) {
        date = date[parseInt(el)];
      }
      const ticketToCheck = tickets?.find(
        (ticket: any) => ticket.id == el || String(ticket.id) == el
      );

      if (
        date &&
        (tickets?.find(
          (ticket: any) => ticket.id == el || String(ticket.id) == el
        )?.ticket_type == "Guide Tour" ||
          tickets?.find(
            (ticket: any) => ticket.id == el || String(ticket.id) == el
          )?.ticket_type == "Shuttle bus")
      ) {
        guideTickets.push({
          id: el,
          date,
          type: tickets?.find(
            (ticket: any) => ticket.id == el || String(ticket.id) == el
          )?.ticket_type,
        });
      }
    }
    if (guideTickets.length) {
      // Check if multiple guide tour tickets with the selected amount are available
      try {
        const payload = {
          quantity: filterCounter,
          reservation:
            searchParams.get("edit") && item ? item?.reservation_id : null,
          tickets: [
            ...guideTickets.map((one: any) => {
              // Format data into 2023-12-22 17:16:00
              const [datePart, timePart, modifier] = (
                one.date || "2024-01-28 10:00 AM"
              )?.split(" ");
              let temphours = parseInt(timePart.split(":")[0], 10);

              // Adjust hours for 12-hour AM/PM format
              if (modifier === "PM" && temphours < 12) {
                temphours += 12;
              } else if (modifier === "AM" && temphours === 12) {
                temphours = 0;
              }

              // Zero-pad the hours if it becomes single digit after conversion
              const formattedHours = String(temphours).padStart(2, "0");
              const tempminutes = timePart?.split(":")[1];
              const ISODateString = `${datePart}T${formattedHours}:${tempminutes}:00`;

              const date = new Date(ISODateString);

              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, "0");
              const day = String(date.getDate()).padStart(2, "0");
              const hours = String(date.getHours()).padStart(2, "0");
              const minutes = String(date.getMinutes()).padStart(2, "0");
              const formattedDatetimeString = `${year}-${month}-${day} ${hours}:${minutes}:00`;
              console.log("one", one);
              console.log("formattedDatetimeString", formattedDatetimeString);
              return {
                ticket_id: one.id,
                datetime: formattedDatetimeString,
                ticket_type: one.type,
                ticket_sent_status:
                  searchParams.get("edit") && item
                    ? item?.tickets?.find((x: any) => +x.ticket_id === +one.id)
                        ?.ticket_sent_status || null
                    : null,
              };
            }),
          ],
        };

        // Validate before sending apis below
        await axios.post(`${API}/validate-bap`, payload);
      } catch (error: any) {
        console.log(error);
        if (error?.response?.status === 500) {
          setErrorMessage(
            "<div>시스템 문제가 발생했습니다. 잠시 후 다시 시도해주세요!</div>"
          );

          setAvailabilityError(true);
          setAddingToCart(false);
          return;
        }

        setErrorMessage(error?.response?.data);
        setAvailabilityError(true);
        setAddingToCart(false);
        return;
      }

      // Guide tour ticker pick api call
      // try {
      //   const apiRequests = guideTickets.map((item: any) => {
      //     // Format data into 2023-12-22 17:16:00
      //     const [datePart, timePart, modifier] = (
      //       item.date || "2024-01-28 10:00 AM"
      //     )?.split(" ");
      //     let temphours = parseInt(timePart.split(":")[0], 10);

      //     // Adjust hours for 12-hour AM/PM format
      //     if (modifier === "PM" && temphours < 12) {
      //       temphours += 12;
      //     } else if (modifier === "AM" && temphours === 12) {
      //       temphours = 0;
      //     }

      //     // Zero-pad the hours if it becomes single digit after conversion
      //     const formattedHours = String(temphours).padStart(2, "0");
      //     const tempminutes = timePart?.split(":")[1];
      //     const ISODateString = `${datePart}T${formattedHours}:${tempminutes}:00`;

      //     const date = new Date(ISODateString);
      //     const year = date.getFullYear();
      //     const month = String(date.getMonth() + 1).padStart(2, "0");
      //     const day = String(date.getDate()).padStart(2, "0");
      //     const hours = String(date.getHours()).padStart(2, "0");
      //     const minutes = String(date.getMinutes()).padStart(2, "0");
      //     const formattedDatetimeString = `${year}-${month}-${day} ${hours}:${minutes}:00`;

      //     return axios.get(
      //       `${API}/tickets/${item.id}/guide-tour-pick?quantity=${filterCounter}&datetime=${formattedDatetimeString}`
      //     );
      //   });

      //   // Wait until all api requests are called
      //   await Promise.all(apiRequests);
      // } catch (error: any) {
      //   if (error?.response?.status === 500) {
      //     setErrorMessage(
      //       "<div>시스템 문제가 발생했습니다. 잠시 후 다시 시도해주세요!</div>"
      //     );
      //     setAvailabilityError(true);
      //     setAddingToCart(false);
      //     return;
      //   }

      //   console.log("error in TourCalendar:", error?.response?.data);
      //   setErrorMessage(error?.response?.data);
      //   setAvailabilityError(true);
      //   setAddingToCart(false);
      //   return;
      // }
    }

    let isEditItems = checkIsEditItems(cart);
    if (
      isEditItems
      // isEditItems &&
      // searchQuery?.type != "cart booking" &&
      // searchQuery?.type != "booking"
    ) {
      Swal.fire({
        icon: "warning",
        title: "장바구니에 담을 수 없습니다.",
        // text: "You have Booking Edit Items, please check Shopping Cart first!",
        // text: "You have Booking Edit Items, please check Shopping Cart first!",
        text: "현재 진행 중인 내역이 있습니다. 장바구니를 확인해 주세요.",
      });
    } else {
      let cartId = String(Date.now());
      const searchQuery = extractParams(
        `http://localhost:${process.env.REACT_APP_PORT}/my-page${search}`
      );
      if (
        searchQuery?.edit &&
        (searchQuery?.type == "cart" || searchQuery?.type != "cart booking")
      ) {
        cartId = searchQuery?.cartId || String(Date.now());
      }
      const childInfo: CartItem[] = [];
      const adultInfo: CartItem[] = [];

      // save the original data in shopping cart to compare
      let flg = false;
      if (searchQuery?.edit && searchQuery?.type === "booking") {
        for (const el of selectedOriginTicketIds) {
          const ticketData = tickets?.find((item) => item.id === el);
          let addition = 0;

          if (ticketData?.additional_price_type === "Premium") {
            addition = Number(ticketData?.premiumPrice || 0);
          } else if (ticketData?.additional_price_type === "Premium S") {
            addition = Number(ticketData?.premiumSPrice || 0);
          } else if (ticketData?.additional_price_type === "Deluxe") {
            addition = Number(ticketData?.deluxPrice || 0);
          }

          let date = selectedTour.find((obj: any) => obj.hasOwnProperty(el));
          if (!!date) {
            date = date[parseInt(el)];
          }

          // const localitem = localStorage.getItem("Edit_Item");
          // const item = localitem ? JSON.parse(localitem) : null;

          if (selectedAdultChildType === "성인") {
            adultInfo.push({
              cartId: String(Number(cartId) - 1),
              cityId: ticketData?.cityId,
              tour_date: date,
              reservation_id: item.reservation_id,
              item_id: item.item_id,
              categoryId: String(categoryId),
              name: ticketData?.kr_name || "",
              price: Number(ticketData?.adultPrice) || 0,
              quantity: Number(item?.quantity),
              subtotal: -100,
              priceOptionTitle: selectedOriginPriceOption?.text,
              priceOptionId: String(selectedOriginPriceOption?.value),
              addition,
              additional_price_type: ticketData?.additional_price_type,
              additional_price_image: ticketData?.additional_price_image,
              subCategoryId: subCategoryId,
              subCategoryTitle: subCategoryTitle,
              subCategoryPrice:
                item?.price ||
                Number(selectedOriginPriceOption?.adult_price || 0),
              ticket_type: ticketData?.ticket_type,
              ticket_id: String(ticketData?.id),
              subPath,
              adult_child_type: item?.adult_child_type || "아동",
            });
          } else if (selectedAdultChildType === "아동") {
            childInfo.push({
              cartId: String(Number(cartId) - 1),
              cityId: ticketData?.cityId,
              tour_date: date,
              reservation_id: item.reservation_id,
              item_id: item.item_id,
              categoryId: String(categoryId),
              name: ticketData?.kr_name || "",
              price: Number(ticketData?.childPrice) || 0,
              quantity: Number(item?.quantity),
              subtotal: -100,
              priceOptionTitle: selectedOriginPriceOption?.text,
              priceOptionId: String(selectedOriginPriceOption?.value),
              addition,
              additional_price_type: ticketData?.additional_price_type,
              additional_price_image: ticketData?.additional_price_image,
              subCategoryId: subCategoryId,
              subCategoryTitle: subCategoryTitle,
              subCategoryPrice:
                item?.price ||
                Number(selectedOriginPriceOption?.child_price || 0),
              ticket_type: ticketData?.ticket_type,
              ticket_id: String(ticketData?.id),
              subPath,
              adult_child_type: item?.adult_child_type || "아동",
            });
          }
        }
      }
      let leftSubItems = item?.tickets.filter(
        (it: any) => !selectedTicketIds.includes(String(it.ticket_id))
      );

      for (const el of selectedTicketIds) {
        let subitem_id =
          selectedOriginTicketIds?.findIndex((it: any) => it == el) > -1
            ? item?.tickets[
                selectedOriginTicketIds.findIndex((it: any) => it == el)
              ].subitem_id
            : leftSubItems?.length > 0
            ? leftSubItems?.pop()?.subitem_id
            : null;

        // Convert date format so that cart view handle properly
        const ticketData = tickets?.find((item) => item.id === el);
        console.log("ticketData", ticketData);
        if (
          !selectedTour.some((obj: any) => obj.hasOwnProperty(el)) &&
          (ticketData?.ticket_type === "Guide Tour" ||
            ticketData?.ticket_type === "Shuttle bus")
        ) {
          flg = true;
          break;
        }
        let date = selectedTour.find((obj: any) => obj.hasOwnProperty(el));
        if (!!date) {
          date = date[parseInt(el)];
        }
        let addition = 0;
        if (ticketData?.additional_price_type === "Premium") {
          addition = Number(ticketData?.premiumPrice || 0);
        } else if (ticketData?.additional_price_type === "Premium S") {
          addition = Number(ticketData?.premiumSPrice || 0);
        } else if (ticketData?.additional_price_type === "Deluxe") {
          console.log(ticketData?.deluxPrice, 'DELUX 1270')
          addition = Number(ticketData?.deluxPrice || 0);
        }

        if (searchQuery?.edit && searchQuery?.type === "booking") {
          if (selectedAdultChildType === "성인") {
            adultInfo.push({
              cartId,
              tour_date: date,
              reservation_id: item.reservation_id,
              item_id: item.item_id,
              categoryId: String(categoryId),
              name: ticketData?.kr_name || "",
              price: Number(ticketData?.adultPrice) || 0,
              quantity: Number(filterCounter),
              subtotal: totalPrice,
              priceOptionTitle: selectedPriceOption?.text,
              priceOptionId: String(selectedPriceOption?.value),
              addition,
              additional_price_type: ticketData?.additional_price_type,
              additional_price_image: ticketData?.additional_price_image,
              subCategoryId: subCategoryId,
              subCategoryTitle: subCategoryTitle,
              subCategoryPrice: Number(selectedPriceOption?.adult_price || 0),
              ticket_type: ticketData?.ticket_type,
              ticket_id: String(el) + "+" + String(subitem_id),
              ticket_sent_status: selectedOriginTicketIds.includes(String(el))
                ? item.tickets[
                    item.tickets.findIndex(
                      (ticket: any) => String(ticket.ticket_id) === el
                    )
                  ]?.ticket_sent_status
                : null,
              refund_status: selectedOriginTicketIds.includes(String(el))
                ? item.tickets[
                    item.tickets.findIndex(
                      (ticket: any) => String(ticket.ticket_id) === el
                    )
                  ]?.refund_status
                : null,
              subPath,
              adult_child_type: "성인",
            });
          } else if (selectedAdultChildType === "아동") {
            childInfo.push({
              cartId,
              tour_date: date,
              reservation_id: item.reservation_id,
              item_id: item.item_id,
              categoryId: String(categoryId),
              name: ticketData?.kr_name || "",
              price: Number(ticketData?.childPrice) || 0,
              quantity: Number(filterCounter),
              subtotal: totalPrice,
              priceOptionTitle: selectedPriceOption?.text,
              priceOptionId: String(selectedPriceOption?.value),
              addition,
              additional_price_type: ticketData?.additional_price_type,
              additional_price_image: ticketData?.additional_price_image,
              subCategoryId: subCategoryId,
              subCategoryTitle: subCategoryTitle,
              subCategoryPrice: Number(selectedPriceOption?.child_price || 0),
              ticket_type: ticketData?.ticket_type,
              ticket_sent_status: selectedOriginTicketIds.includes(String(el))
                ? item.tickets[
                    item.tickets.findIndex(
                      (ticket: any) => String(ticket.ticket_id) === el
                    )
                  ]?.ticket_sent_status
                : null,
              refund_status: selectedOriginTicketIds.includes(String(el))
                ? item.tickets[
                    item.tickets.findIndex(
                      (ticket: any) => String(ticket.ticket_id) === el
                    )
                  ]?.refund_status
                : null,
              ticket_id: String(el) + "+" + String(subitem_id),
              subPath,
              adult_child_type: "아동",
            });
          }
        } else {
          if (selectedAdultChildType === "성인") {
            adultInfo.push({
              cartId,
              cityId: ticketData?.cityId || 0,
              tour_date: date,
              reservation_id:
                searchQuery?.type == "cart booking"
                  ? item.reservation_id
                  : null,
              item_id:
                searchQuery?.type == "cart booking" ? item.item_id : null,
              categoryId: String(categoryId),
              name: ticketData?.kr_name || "",
              price: ticketData?.adultPrice || 0,
              quantity: filterCounter,
              subtotal:
                searchQuery?.type == "cart booking"
                  ? totalPrice
                  : (ticketData?.adultPrice || 0) * filterCounter +
                    addition * filterCounter,
              priceOptionTitle: selectedPriceOption?.text,
              priceOptionId: String(selectedPriceOption?.value),
              addition,
              additional_price_type: ticketData?.additional_price_type,
              additional_price_image: ticketData?.additional_price_image,
              subCategoryId: String(subCategoryId),
              subCategoryTitle: subCategoryTitle,
              subCategoryPrice: Number(selectedPriceOption?.adult_price || 0),
              ticket_type: ticketData?.ticket_type,
              ticket_id:
                searchQuery?.type == "cart booking"
                  ? String(ticketData?.id) + "+" + String(subitem_id)
                  : String(ticketData?.id),
              subPath,
              adult_child_type: "성인",
            });
          } else if (selectedAdultChildType === "아동") {
            childInfo.push({
              cartId,
              tour_date: date,
              reservation_id:
                searchQuery?.type == "cart booking"
                  ? item.reservation_id
                  : null,
              item_id:
                searchQuery?.type == "cart booking" ? item.item_id : null,
              categoryId: String(categoryId),
              name: ticketData?.kr_name || "",
              price: ticketData?.childPrice || 0,
              quantity: filterCounter,
              subtotal:
                searchQuery?.type == "cart booking"
                  ? totalPrice
                  : (ticketData?.childPrice || 0) * filterCounter +
                    addition * filterCounter,
              priceOptionTitle: selectedPriceOption?.text,
              priceOptionId: String(selectedPriceOption?.value),
              addition,
              additional_price_type: ticketData?.additional_price_type,
              additional_price_image: ticketData?.additional_price_image,
              subCategoryId: String(subCategoryId),
              subCategoryTitle: subCategoryTitle,
              subCategoryPrice: Number(selectedPriceOption?.child_price || 0),
              ticket_type: ticketData?.ticket_type,
              ticket_id:
                searchQuery?.type == "cart booking"
                  ? String(ticketData?.id) + "+" + String(subitem_id)
                  : String(ticketData?.id),
              subPath,
              adult_child_type: "아동",
            });
          }
        }
      }

      if (
        menu[1].dropdownElements?.[1] &&
        subCategoryId === menu[1].dropdownElements?.[1].id
      ) {
        // City pass page
        if (selectedAdultChildType === "성인") {
          adultInfo.push({
            cartId,
            reservation_id: null,
            item_id: null,
            cityId: cityId,
            subCategoryName: "city-pass",
            name: singleTicket?.title_kr || "",
            price: packagePriceOptions?.[0]?.adult_price || 0,
            quantity: filterCounter,
            subtotal:
              (packagePriceOptions?.[0]?.adult_price || 0) * filterCounter,
            addition: 0,
            additional_price_type: singleTicket?.additional_price_type,
            additional_price_image: singleTicket?.additional_price_image,
            ticket_type: singleTicket?.ticket_type,
            ticket_id: String(singleTicket?.id),
            adult_child_type: "성인",
          });
        } else if (selectedAdultChildType === "아동") {
          childInfo.push({
            cartId,
            reservation_id: null,
            item_id: null,
            cityId: cityId,
            subCategoryName: "city-pass",
            name: singleTicket?.title_kr || "",
            price: packagePriceOptions?.[0]?.child_price || 0,
            quantity: filterCounter,
            subtotal:
              (packagePriceOptions?.[0]?.child_price || 0) * filterCounter,
            addition: 0,
            additional_price_type: singleTicket?.additional_price_type,
            additional_price_image: singleTicket?.additional_price_image,
            ticket_type: singleTicket?.ticket_type,
            ticket_id: String(singleTicket?.id),
            adult_child_type: "아동",
          });
        }
      } else if (
        menu[1].dropdownElements?.[2] &&
        subCategoryId === menu[1].dropdownElements?.[2].id
      ) {
        // Explore view page
        if (selectedAdultChildType === "성인") {
          adultInfo.push({
            cartId,
            reservation_id: null,
            item_id: null,
            cityId: cityId,
            subCategoryName: "explore-pass",
            name: selectedPriceOption?.text,
            price: (totalPrice / filterCounter) || 0,
            quantity: filterCounter,
            priceOptionTitle: selectedPriceOption?.text,
            priceOptionId: String(selectedPriceOption?.value),
            subtotal: totalPrice,
            addition: 0,
            additional_price_type: singleTicket?.additional_price_type,
            additional_price_image: singleTicket?.additional_price_image,
            ticket_type: singleTicket?.ticket_type,
            ticket_id: String(singleTicket?.id),
            adult_child_type: "성인",
          });
        } else if (selectedAdultChildType === "아동") {
          childInfo.push({
            cartId,
            reservation_id: null,
            item_id: null,
            cityId: cityId,
            subCategoryName: "explore-pass",
            name: selectedPriceOption?.text,
            price: (totalPrice / filterCounter) || 0,
            quantity: filterCounter,
            priceOptionTitle: selectedPriceOption?.text,
            priceOptionId: String(selectedPriceOption?.value),
            subtotal: totalPrice,
            addition: 0,
            additional_price_type: singleTicket?.additional_price_type,
            additional_price_image: singleTicket?.additional_price_image,
            ticket_type: singleTicket?.ticket_type,
            ticket_id: String(singleTicket?.id),
            adult_child_type: "아동",
          });
        }
      }

      if (flg) {
        Swal.fire({
          icon: "warning",
          title: "투어 스케쥴 선택",
          html: `상품명 왼쪽 달력아이콘을 클릭하여<br>원하시는 날짜/시간을 선택해 주세요`,
        });
      } else {
        handleUpdateCart(adultInfo, childInfo);
      }
    }

    // await delaySeconds(8000);
    // Set addingToCart to false once add it successfully
    setAddingToCart(false);
  };
  // Define Custom Functions End

  interface ConfirmBoxProps {
    onConfirm: () => void;
  }

  // Confirmbox component
  const ConfirmBox: React.FC<ConfirmBoxProps> = ({ onConfirm }) => {
    return (
      <div className="fixed top-0 left-0 z-[600] flex items-center justify-center w-full h-screen bg-black bg-opacity-50">
        <div className="flex flex-col justify-center bg-white gap-8 p-8 rounded-[10px] w-1/3 shadow-2xl w-[350px] z-50">
          <div className="flex flex-col items-center justify-center block w-full">
            <img src={staticFiles.images.logo} width="100" alt="Tamice logo" />
          </div>
          <div className="w-full text-[#5D5D5F] text-center text-lg">
            <h1>투어 정원 초과</h1>
          </div>
          <div className="w-full text-[#5D5D5F] text-start mb-4">
            <div
              dangerouslySetInnerHTML={{
                __html: convertLink(errorMessage || "<div></div>"),
              }}
            />
          </div>
          {/* <div className="w-full text-[#5D5D5F] text-center">Thank you!</div> */}
          <div className="flex justify-center">
            <button
              className="px-4 py-2 mr-2 text-white bg-gray-300 rounded bg-blue"
              onClick={onConfirm}
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    <Loading />;
  }
  // Html Rendering Part
  return !isError ? (
    <div className="flex flex-col items-center pb-8 bg-white max-h-fit">
      {availabilityError && (
        <ConfirmBox
          onConfirm={() => {
            setAvailabilityError(false);
          }}
        />
      )}
      <div className="flex flex-col items-center w-full bg-white">
        <span className="py-8 font-bold font-poppins text-[#5D5D5F]">
          {menu[1].dropdownElements?.[1] &&
          subCategoryId !== menu[1].dropdownElements?.[1]?.id &&
          menu[1].dropdownElements?.[2] &&
          subCategoryId !== menu[1].dropdownElements?.[2]?.id
            ? "빅애플패스 구매하기"
            : "패스 구매하기"}
        </span>
      </div>
      <div className="flex items-center justify-center w-full p-4 text-xl text-white bg-blue">
        <img
          alt=""
          width={18}
          className="mr-5"
          src={staticFiles.icons.tag_white}
        />
        <TotalPriceCom totalPrice={totalPrice.toFixed(2)} />
      </div>
      <div className="w-[100%] flex flex-col px-8 gap-4">
        {/* <div className="w-full text-base mt-4 text-[#5D5D5F]">
          패케지 상품 구매
        </div> */}
        <div className="w-full">
          {subCategoryId !== menu[1].dropdownElements?.[1]?.id &&
            subCategoryId !== menu[1].dropdownElements?.[2]?.id && (
              <span className="text-[12px] font-bold block font-poppins text-[#5D5D5F] text-start mt-4">
                개별 입장지 티켓은 '자세히 보기’ 를 클릭하여 구매하실 수
                있습니다.
              </span>
            )}
        </div>
        {subCategoryId !== menu[1].dropdownElements?.[1]?.id ? (
          <SelectInput
            id="packageTypeSelector"
            selected={selectedPriceOptionId}
            setSelected={(val) => {
              if (
                searchQuery?.edit &&
                (searchQuery?.type == "cart booking" ||
                  searchQuery?.type == "booking")
              ) {
                if (Number(val) < Number(item?.price_list_id)) {
                  Swal.fire({
                    icon: "error",
                    // title: "Oops...",
                    // text: "Downgrading is not allowed!",
                    title: "다운그레이드 요청",
                    html: `다운그레이드는 <a href="https://pf.kakao.com/_AAelu" style="color:#009eef; text-decoration: underline;" target="_blank">타미스 카카오톡 채널</a> 혹은 이메일 (<a href="mailto:service@tamice.com">service@tamice.com</a>) 로 문의해 주세요.`,
                  });

                  return;
                }
              }
              setSelectedPriceOptionId(val);
              setMaxLimit(
                packagePriceOptions?.find((item: any) => item.value === val)
                  ?.quantity || 0
              );
              setSelectedPriceOption(
                packagePriceOptions?.find((item: any) => item.value === val)
              );
            }}
            options={packagePriceOptions || []}
          />
        ) : (
          <>
            <div className="flex w-full gap-5">
              <div>
                <span className="font-semibold text-base text-[#5D5D5F]">
                  성인:&nbsp;
                </span>
                ${""}
                <span className=" text-[#5D5D5F]">
                  {" "}
                  {packagePriceOptions?.[0]?.adult_price}
                </span>
              </div>{" "}
              <div>
                {" "}
                <span className="font-semibold text-base text-[#5D5D5F]">
                  아동:&nbsp;
                </span>{" "}
                <span className="text-[#5D5D5F]">
                  ${packagePriceOptions?.[0]?.child_price}
                </span>
              </div>
            </div>{" "}
            {/* <SpaceY /> */}
            {/* <p className="w-full text-start text-[#5D5D5F] text-base">
              Please choose 5 tickets only
            </p> */}
            {/* <SpaceY /> */}
          </>
        )}

        {/* <hr className="w-full border rounded border-gray" /> */}
        {/* <SpaceY /> */}
        <div className="flex justify-between w-full">
          <SelectInput
            id="ticketTypeSelector"
            selected={selectedAdultChildType}
            setSelected={(val) =>
              setSelectedAdultChildType(val as "성인" | "아동")
            }
            containerClassName="w-1/2"
            options={[
              { value: "성인", text: "성인" },
              { value: "아동", text: "아동" },
            ]}
          />
          {
            !searchQuery.edit || searchQuery.cartId ? <div className="flex justify-center w-1/2">
            <div className="flex items-center justify-between w-full px-[15%]">
              <img
                alt=""
                className="cursor-pointer"
                width={20}
                src={staticFiles.icons.decrement}
                onClick={() => handleQuantityCounter(filterCounter, "DEC")}
              />
              <FilterCounterCom filterCounter={filterCounter} />
              <img
                alt=""
                className="cursor-pointer"
                width={20}
                src={staticFiles.icons.increment}
                onClick={() => handleQuantityCounter(filterCounter, "INC")}
              />
            </div>
          </div> : null
          }
        </div>
        {/* <SpaceY /> */}
        {tour === true ? (
          <span className="text-base text-[#5D5D5F]">
            빅애플패스 수량에 맞게 입장지를 선택해 주세요.
          </span>
        ) : (
          <></>
        )}
        {/* <SpaceY /> */}
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onRequestClose={handleCloseModal}
            className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 rounded-[20px] p-0 z-50 bg-white `}
            style={{
              content: {
                width: "auto",
                height: "auto",
              },
              overlay: {
                zIndex: 9999,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
            }}
          >
            <MultiTourCalendar
              order={order}
              filterCounter={filterCounter}
              selectedTour={selectedTour.find((obj: any) =>
                obj.hasOwnProperty(order)
              )}
              handleClick={(date: string, id: string) => {
                handleClick(date, id);
              }}
              handleClickDisable={(date: string, id: string) => {
                handleClickDisable(date, id);
              }}
              setIsOpen={(isOpen: boolean) => {
                setIsModalOpen(isOpen);
              }}
            />
          </Modal>
        )}

        {tickets?.map((i, index) => {
          let canEdit = true;

          if (
            searchQuery?.edit &&
            (searchQuery?.type == "cart booking" ||
              searchQuery?.type == "booking")
          ) {
            if (i?.ticket_type === "Bar/QR code") {
              canEdit = true;
              if (
                item?.tickets.findIndex(
                  (it: any) => String(it.ticket_id) == i.id
                ) > 0
              ) {
                if (
                  item?.tickets[
                    item?.tickets.findIndex(
                      (it: any) => String(it.ticket_id) == i.id
                    )
                  ]?.ticket_sent_status == "Sent"
                ) {
                  canEdit = false;
                }
              }
            } else if (i?.ticket_type === "Regular") {
              canEdit = true;
              if (
                item?.tickets.findIndex(
                  (it: any) => String(it.ticket_id) == i.id
                ) > 0
              ) {
                if (
                  item?.tickets[
                    item?.tickets.findIndex(
                      (it: any) => String(it.ticket_id) == i.id
                    )
                  ]?.ticket_sent_status == "Sent"
                ) {
                  canEdit = false;
                }
              }
              if (
                item?.tickets.findIndex(
                  (it: any) => String(it.ticket_id) == i.id
                ) > 0
              ) {
                if (
                  item?.tickets[
                    item?.tickets.findIndex(
                      (it: any) => String(it.ticket_id) == i.id
                    )
                  ]?.ticket_sent_status == "pending"
                ) {
                  canEdit = false;
                }
              }
            } else {
              //i.ticket_type === "Guide Tour", and other types..
              canEdit = true;

              if (searchQuery?.type == "cart booking") {
                if (!reservationsParsedData) {
                  localStorage.removeItem("authToken");
                  localStorage.removeItem("loginData");
                  localStorage.removeItem("order_number");
                  localStorage.removeItem("useremail");

                  navigate("/");
                }

                let reservations = reservationsParsedData.reservations;
                let currentReservation: any =
                  reservations[
                    reservations.findIndex(
                      (it: any) => it.reservation_id === item.reservation_id
                    )
                  ];
                let currentItemBeforeUpdate: any =
                  currentReservation?.items.filter(
                    (it: any) => it.item_id == item.item_id
                  );

                if (
                  currentItemBeforeUpdate &&
                  currentItemBeforeUpdate[0]?.tickets.findIndex(
                    (it: any) => it.ticket_id == i.id.toString()
                  ) > -1
                ) {
                  canEdit = false;
                }
              } else {
                canEdit = true;
                if (
                  item?.tickets.findIndex(
                    (it: any) => String(it.ticket_id) == i.id
                  ) > -1
                ) {
                  canEdit = false;
                }
              }
            }

            // Can edit if ticket_sent_status is Office PickUp
            if (
              item?.tickets[
                item?.tickets.findIndex(
                  (it: any) => String(it.ticket_id) == i.id
                )
              ]?.ticket_sent_status == "Office Pickup"
            ) {
              canEdit = true;
            }

            // Disalbe to deselect all 환불완료 tickets
            if (
              item?.tickets[
                item?.tickets.findIndex(
                  (it: any) => String(it.ticket_id) == i.id
                )
              ]?.ticket_sent_status == "환불완료"
            ) {
              canEdit = false;
            }
          }

          // Disable to deselect guide tour tickets
          if (
            item?.tickets.find(
              (ticket: any) => String(ticket.ticket_id) === i.id
            )?.ticket_type === "Guide Tour" ||
            item?.tickets.find(
              (ticket: any) => String(ticket.ticket_id) === i.id
            )?.ticket_type === "Shuttle bus"
          ) {
            canEdit = false;
          }

          //No better alternative at the moment... Bad code structure
          var cartStatus = localStorage.getItem("CART_DATA");
          if (cartStatus) {
            const parsedData = JSON.parse(cartStatus);
            if (
              [...parsedData.adultInfo, ...parsedData.childInfo].find(
                (cart) => cart.ticket_id.split("+")[0] == i.id
              )
            ) {
              var edit = [
                ...parsedData.adultInfo,
                ...parsedData.childInfo,
              ].find(
                (cart) =>
                  cart.ticket_id.split("+")[0] == i.id &&
                  cart.ticket_sent_status != "환불완료"
              );
              canEdit = edit ? true : false;
            } else {
              var sent = item?.tickets.find(
                (ticket: any) =>
                  String(ticket.ticket_id) == i.id &&
                  ticket.ticket_sent_status == "Sent"
              );
              if (sent) {
                canEdit = false;
              }
            }
          }

          return (
            <IncludesInfo
              onClick={() => {
                setSelectedTicketIds((prev) => {
                  const isIncluded = prev.includes(i.id);
                  const isNonEditable = noneditableTicketIds.includes(i.id);
                  const isGuideTourType = item?.tickets.some(
                    (ticket: any) =>
                      ticket.ticket_id === i.id &&
                      (ticket.ticket_type === "Guide Tour" ||
                        ticket.ticket_type === "Shuttle bus")
                  );

                  if (
                    isIncluded &&
                    !isNonEditable &&
                    (!isGuideTourType || canEdit)
                  ) {
                    return prev.filter((i2) => i2 !== i.id);
                  } else if (prev.length >= maxLimit) {
                    if (!isIncluded) {
                      toast.warning(
                        ` ${maxLimit}개의 입장지 선택만 가능합니다`
                      );
                    }
                    return prev;
                  } else {
                    if(!isIncluded){
                      return [...prev, i.id];
                    }else{
                      return prev
                    }
                  }
                });
              }}
              setIsOpenModal={setIsModalOpen}
              key={i.id}
              index={Number(i.id)}
              setOrder={setOrder}
              canEdit={canEdit}
              isIncluded={
                selectedTicketIds.findIndex(
                  (index) => index == i.id || String(index) == i.id
                ) > -1
                  ? true
                  : false
              }
              isSelected={selectedTour.some((obj: any) =>
                obj.hasOwnProperty(i.id)
              )}
              name={i.kr_name}
              hasDate={
                i.ticket_type === "Guide Tour" ||
                i.ticket_type === "Shuttle bus"
                  ? true
                  : false
              }
              hasGoldStar={i.isPremium}
              premiumType={i.additional_price_type || ""}
            />
          );
        })}

        {/* <SpaceY /> */}

        <div className="flex w-full gap-x-1">
          <MainButton
            onClick={() => handleAddToTheCart()}
            text="장바구니 담기"
            disabled={addingToCart}
          />
          {/* <SecondaryButton onClick={handleReset} text="Reset" /> */}
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center min-h-[200px] bg-white max-h-fit">
      <h1>Price Options are not defined yet!</h1>
    </div>
  );
};

// TicketSelector Component For Single Tickets
export const TicketSelector = ({ ticket }: { ticket: any }) => {
  // Global State Variables
  const [cart, setCart] = cartState.useState();

  // Get Search Params from url and defind navigate
  const { search } = useLocation(); // ?edit=true&cartId=1690069215841
  const navigate = useNavigate();
  // const location = useLocation();
  // const item = location.state;

  // Define interface TimePickerState
  interface TimePickerState {
    selectedTime: string;
  }

  // Define item value to use in edit cases
  let item: any;

  // Get SearchQuery from the current url
  const searchQuery = extractParams(
    `http://localhost:${process.env.REACT_APP_PORT}/my-page${search}`
  );

  if (search) {
    if (searchQuery?.edit) {
      // In the edit case, if there is Edit_Item in LocalStorage, assign that to item after parsing.
      const localitem = localStorage.getItem("Edit_Item");
      item = localitem ? JSON.parse(localitem) : null;
    }
  }

  // Component State Variables definition Start
  const [filterCounter, setFilterCounter] = useState(1); // user selected ticket quantity.
  const [selectedAdultChildType, setSelectedAdultChildType] = useState<
    "성인" | "아동"
  >("성인"); // adult or child
  const [ticketPrice, setTicketPrice] = useState(0);
  const [bookingDate, setBookingDate] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [selectedTour, setSelectedTour] = useState<string>();
  const [cartBookingCount, setCartBookingCount] = useState(0);
  const [stateTime, setTimeState] = useState<TimePickerState>({
    selectedTime: "",
  });
  const [addingToCart, setAddingToCart] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // Component State Variables definition End

  // Define reservationsData to use when the user is going to do Booking Edit.
  // const [reservationsData, setReservationsData] = reservationsState.useState();
  let reservationsData: any;
  const localReservationData = localStorage.getItem("reservationData");
  reservationsData = localReservationData
    ? JSON.parse(localReservationData)
    : null;

  // Navigate to landing page if there are no edit Items and this is edit case assuming that this user is not logged in yet.
  if (!item && searchQuery?.edit && searchQuery?.type !== "cart") {
    localStorage.removeItem("authToken");
    localStorage.removeItem("loginData");
    localStorage.removeItem("order_number");
    localStorage.removeItem("useremail");

    navigate("/");
  }

  // Define useEffect Hooks Start to edit cart item
  useEffect(() => {
    if (search) {
      const searchQuery = extractParams(
        `http://localhost:${process.env.REACT_APP_PORT}/my-page${search}`
      );
      if (
        (cart.adultInfo.length > 0 || cart.childInfo.length > 0) &&
        searchQuery?.edit &&
        searchQuery?.type === "cart"
      ) {
        let cartData = localStorage.getItem("CART_DATA")
          ? JSON.parse(localStorage.getItem("CART_DATA") || "")
          : { adultInfo: [], childInfo: [] };

        const { adultInfo, childInfo }: cartData = cart;
        const cartItemsToEdit = [...adultInfo, ...childInfo]?.filter(
          (obj) => obj?.cartId === searchQuery?.cartId
        );
        setFilterCounter(cartItemsToEdit[0].quantity);
        console.log("cartItemsToEdit", cartItemsToEdit);
        setSelectedTour(cartItemsToEdit[0].tour_date);
        setSelectedAdultChildType(
          cartItemsToEdit[0]?.adult_child_type || "성인"
        );
      }

      if (searchQuery?.edit && searchQuery?.type == "booking") {
        setFilterCounter(Number(item.quantity));
        setSelectedAdultChildType(item.adult_child_type);
      }

      if (
        (cart.adultInfo.length > 0 || cart.childInfo.length > 0) &&
        searchQuery?.edit &&
        searchQuery?.type == "cart booking"
      ) {
        setFilterCounter(Number(item?.quantity));
        setSelectedAdultChildType(item?.adult_child_type);
      }
    }
  }, [search]);

  // fetch ticket data
  useEffect(() => {
    let addition = 0;
    // if (ticket?.additional_price_type === "Premium") {
    //   addition = Number(ticket?.premium_amount);
    // } else if (ticket?.additional_price_type === "Premium S") {
    //   addition = Number(ticket?.premium_s_amount);
    // }

    let ticketBasePrice = 0;
    if (selectedAdultChildType === "성인") {
      ticketBasePrice = Number(
        ticket?.ticket_prices?.filter(
          (option: any) => option.type === "성인"
        )[0]?.sale_price
      );
    } else if (selectedAdultChildType === "아동") {
      ticketBasePrice = Number(
        ticket?.ticket_prices?.filter(
          (option: any) => option.type === "아동"
        )[0]?.sale_price
      );
    }

    if (ticket?.ticket_type === "SIM card") {
      ticketBasePrice = ticket?.ticket_prices[0]?.sale_price;
    }

    let ticketPrice = (addition + ticketBasePrice) * filterCounter;
    setTicketPrice(ticketPrice);
  }, [ticket, filterCounter, selectedAdultChildType]);

  useEffect(() => {
    return () => {
      setFilterCounter(1);
      setSelectedAdultChildType("성인");
      Swal.close();
    };
  }, []);
  // Define useEffect Hooks End

  // Define Custom Functions Start
  const handleQuantityCounter = (prev: number, action: "INC" | "DEC") => {
    if (action === "DEC" && prev === 1) {
      toast.warning("수량은 1 이상이어야 합니다.");
      return;
    }

    if (action === "DEC") return setFilterCounter(prev - 1);
    if (action === "INC") return setFilterCounter(prev + 1);
  };

  const handleReset = () => {
    setFilterCounter(1);
    setSelectedAdultChildType("성인");
  };

  const handleUpdateCart = (adultOrder: any, childOrder: any) => {
    let isEditItems = checkIsEditItems(cart);
    if (
      isEditItems
      // isEditItems &&
      // searchQuery?.type !== "cart booking" &&
      // searchQuery?.type !== "booking"
    ) {
      Swal.fire({
        icon: "warning",
        title: "장바구니에 담을 수 없습니다.",
        // text: "You have Booking Edit Items, please check Shopping Cart first!",
        text: "현재 진행 중인 내역이 있습니다. 장바구니를 확인해 주세요.",
      });
    } else {
      let isEdited = checkDoubleBookingEdit(cart, item?.reservation_id);

      if (searchQuery?.type === "cart booking" && cartBookingCount === 0) {
        isEdited = false;
        setCartBookingCount(1);
      }

      if (item && ticketPrice < item?.total && searchQuery?.type != "cart") {
        Swal.fire({
          icon: "error",
          // title: "Oops...",
          // text: "Downgrading is not allowed!",
          title: "다운그레이드 요청",
          html: `다운그레이드는 <a href="https://pf.kakao.com/_AAelu" style="color:#009eef; text-decoration: underline;" target="_blank">타미스 카카오톡 채널</a> 혹은 이메일 (<a href="mailto:service@tamice.com">service@tamice.com</a>) 로 문의해 주세요.`,
        });
      } else if (
        item &&
        ticketPrice == item?.total &&
        searchQuery?.type != "cart booking"
      ) {
        Swal.fire({
          // title: "Do you want to update?",
          // text: "You have no balance to pay and the change will be updated in My Page.",
          title: "상품을 변경하시겠습니까?",
          text: "'예' 를 클릭하시면 선택하신 상품으로 변경됩니다.",
          icon: "question",
          showCancelButton: true,
          // confirmButtonText: "OK",
          // cancelButtonText: "No",
          confirmButtonText: "예",
          cancelButtonText: "아니오",
        }).then(async (result) => {
          if (result.isConfirmed) {
            Swal.fire({
              icon: "info",
              // title: "Updating now...",
              // text: "Please Wait!",
              title: "변경 중입니다!",
              text: "잠시만 기다려 주세요!",
              showConfirmButton: false,
              confirmButtonText: "",
            });

            const token = localStorage.getItem("authToken");
            const orderLoginData = localStorage.getItem("orderLoginNumber");
            const orderLoginEmail = localStorage.getItem("orderLoginEmail");

            if (token || orderLoginData) {
              let items: any = [];

              if (!reservationsData) {
                localStorage.removeItem("authToken");
                localStorage.removeItem("loginData");
                localStorage.removeItem("order_number");
                localStorage.removeItem("useremail");

                navigate("/");
              }

              let reservations = reservationsData.reservations;

              let currentReservation: any =
                reservations[
                  reservations.findIndex(
                    (it: any) => it.id === item.reservation_id
                  )
                ];

              let currentItemBeforeUpdate: any =
                currentReservation?.reservation_items.filter(
                  (it: any) => it.id == item.item_id
                );

              let otherItems = currentReservation.reservation_items.filter(
                (it: any) => it.id != item.item_id
              );

              let otherItemsTosend = otherItems.map((data: any) => ({
                id: data.id,
                adult_child_type: data.adult_child_type,
                child_age: data.child_age,
                price: parseFloat(data.price) || 0,
                quantity: parseInt(data.quantity),
                ticket_sent_status: data.ticket_sent_status,
                ticket_sent_date: data.ticket_sent_date,
                refund_status: data.refund_status,
                refund_sent_date: data.refund_sent_date,
                reservation_id: data.reservation_id,
                category_id: data.category_id,
                subcategory_id: data.subcategory_id,
                price_list_id: data.price_list_id,
                sub_items:
                  data.reservation_sub_items?.map((subitem: any) => ({
                    id: subitem.id,
                    rq_schedule_datetime: subitem.rq_schedule_datetime,
                    ticket_id: subitem.ticket_id,
                    refund_status: subitem.refund_status,
                  })) || [],
              }));

              items.push(...otherItemsTosend);
              let currentItem: any = {
                id: item.item_id,
                adult_child_type: selectedAdultChildType,
                child_age: item.child_age,
                price: ticket?.ticket_prices[0].sale_price || 0,
                quantity: filterCounter,
                ticket_sent_status: null,
                ticket_sent_date: null,
                refund_status: null,
                refund_sent_date: null,
                reservation_id: item.reservation_id,
                category_id: currentItemBeforeUpdate[0].category_id,
                subcategory_id: item.subcategory_id,
                price_list_id: null,
                sub_items: [
                  {
                    id: item.tickets[0].subitem_id,
                    rq_schedule_datetime: null,
                    ticket_id: String(ticket?.id),
                    refund_status: item.tickets[0].refund_status,
                  },
                ],
              };

              items.push(currentItem);

              try {
                const result = await axios.put(
                  `${API}/reservations/user-create/${item.reservation_id}`,
                  {
                    items,
                    stripe_token: null,
                  }
                );
                if (result.status === 200) {
                  await Swal.fire({
                    icon: "success",
                    // title: "Success!",
                    // text: "My Page will have the update. Please check.",
                    title: "변경이 완료되었습니다.",
                    text: "마이페이지에서 변경된 상품을 확인해 주세요.",
                    showConfirmButton: true,
                    confirmButtonText: "마이페이지로 이동하기",
                  });

                  if (token) {
                    navigate("/my-page");
                  } else {
                    navigate(
                      `/my-page?email=${orderLoginEmail}&order_number=${orderLoginData}`
                    );
                  }
                } else {
                  Swal.fire({
                    icon: "warning",
                    // title: "Something wrong!",
                    // text: "Please try again!",
                    title: "예기치 못한 오류가 발생했습니다.",
                    html: `이 메세지가 반복해서 나타날 경우, <a href="https://pf.kakao.com/_AAelu" style="color:#009eef; text-decoration: underline;" target=”blank”> 타미스 카카오톡 채널 </a> 혹은 이메일 (service@tamice.com) 로 문의해 주세요.`,
                    confirmButtonText: "OK",
                  });
                }
              } catch (error) {
                Swal.fire({
                  icon: "warning",
                  // title: "Something wrong!",
                  // text: "Please try again!",
                  title: "예기치 못한 오류가 발생했습니다.",
                  html: `이 메세지가 반복해서 나타날 경우, <a href="https://pf.kakao.com/_AAelu" style="color:#009eef; text-decoration: underline;" target=”blank”> 타미스 카카오톡 채널 </a> 혹은 이메일 (service@tamice.com) 로 문의해 주세요.`,
                  confirmButtonText: "OK",
                });
              }
            }
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            return;
          }
        });
      } else if (isEdited) {
        Swal.fire({
          icon: "error",
          //title: "Oops...",
          title: "수정 완료",
          // text: "You already Edited, please check Shopping Cart!",
          text: "수정이 완료되었습니다. 장바구니를 확인해 주세요.",
        });
      } else {
        let rawData: any = localStorage.getItem("CART_DATA");
        if (!rawData) {
          rawData = JSON.stringify({
            adultInfo: [],
            childInfo: [],
          });
        }
        if (rawData) {
          const { adultInfo, childInfo, selectInfo }: cartData =
            JSON.parse(rawData);

          const searchQuery = extractParams(
            `http://localhost:${process.env.REACT_APP_PORT}/my-page${search}`
          );
          let adultInfoToConcat = adultInfo;
          let childInfoToConcat = childInfo;
          if (
            searchQuery?.edit &&
            (searchQuery?.type === "cart" ||
              searchQuery?.type === "cart booking")
          ) {
            adultInfoToConcat = adultInfoToConcat.filter(
              (ticket) => ticket.cartId !== searchQuery?.cartId
            );
            childInfoToConcat = childInfoToConcat.filter(
              (ticket) => ticket.cartId !== searchQuery?.cartId
            );
          }

          localStorage.setItem(
            "CART_DATA",
            JSON.stringify({
              adultInfo: adultInfoToConcat.concat(adultOrder),
              childInfo: childInfoToConcat.concat(childOrder),
              selectInfo,
            })
          );

          setCart({
            adultInfo: adultInfoToConcat.concat(adultOrder),
            childInfo: childInfoToConcat.concat(childOrder),
            selectInfo,
          });

          if (
            searchQuery?.edit &&
            (searchQuery?.type == "cart" || searchQuery?.type == "cart booking")
          ) {
            toast.info("상품을 성공적으로 업데이트하셨습니다!");
          } else {
            toast.success("장바구니에 담았습니다.");
          }
        }
      }
    }
  };

  const handleButtonClick = (event: any) => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);

    // handleCart({ bookingDate });
  };

  const handleCart = async ({ bookingDate }: any) => {
    const childInfo: CartItem[] = [...cart.childInfo];
    const adultInfo: CartItem[] = [...cart.adultInfo];
    const selectInfo: CartItem[] = cart?.selectInfo || [];

    if (selectedAdultChildType === "성인") {
      adultInfo.push({
        name: ticket?.title_kr || "",
        price: ticket?.ticket_prices[0].sale_price || 0,
        quantity: filterCounter,
        ...(bookingDate && {
          includes: [
            {
              medal: MedalEnum["GOLD"],
              name: ticket?.title_kr || "",
              scheduledDate: moment(bookingDate).format("LLL"),
            },
          ],
        }),
        subtotal: (ticket?.ticket_prices[0].sale_price || 0) * filterCounter,
        addition: 0,
      });
    } else if (selectedAdultChildType === "아동") {
      childInfo.push({
        name: ticket?.title_kr || "",
        price: ticket?.ticket_prices[1].sale_price || 0,
        quantity: filterCounter,
        subtotal: (ticket?.ticket_prices[1].sale_price || 0) * filterCounter,
        ...(bookingDate && {
          includes: [
            {
              medal: MedalEnum["SILVER"],
              name: ticket?.title_kr || "",
              scheduledDate: moment(bookingDate).format("LLL"),
            },
          ],
        }),

        addition: 0,
      });
    }
    setBookingDate(null);
    localStorage.setItem(
      "CART_DATA",
      JSON.stringify({
        adultInfo,
        childInfo,
        selectInfo,
      })
    );
    toast.success("장바구니에 담았습니다.");
    setCart({
      adultInfo,
      childInfo,
      selectInfo,
    });
  };

  const handleClick = (date: string) => {
    setSelectedTour(date);
  };

  const handleClickDisable = (date: string) => {
    setSelectedTour("");
  };

  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTimeState({ selectedTime: event.target.value });
  };
  // Define Custom Functions End

  interface ConfirmBoxProps {
    onConfirm: () => void;
  }

  // Confirmbox component
  const ConfirmBox: React.FC<ConfirmBoxProps> = ({ onConfirm }) => {
    return (
      <div className="fixed top-0 left-0 z-[600] flex items-center justify-center w-full h-screen bg-black bg-opacity-50">
        <div className="flex flex-col justify-center bg-white gap-8 p-8 rounded-[10px] w-1/3 shadow-2xl w-[350px] z-50">
          <div className="flex flex-col items-center justify-center block w-full">
            <img src={staticFiles.images.logo} width="100" alt="Tamice logo" />
          </div>
          <div className="w-full text-[#5D5D5F] text-center text-lg">
            <h1>투어 정원 초과</h1>
          </div>
          {/* <div className="w-full text-[#5D5D5F] text-start mb-4">{errorMessage}</div> */}
          <div className="w-full text-[#5D5D5F] text-start mb-4">
            <div
              dangerouslySetInnerHTML={{
                __html: convertLink(errorMessage || "<div></div>"),
              }}
            />
          </div>
          {/* <div className="w-full text-[#5D5D5F] text-center">Thank you!</div> */}
          <div className="flex justify-center">
            <button
              className="px-4 py-2 mr-2 text-white bg-gray-300 rounded bg-blue"
              onClick={onConfirm}
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Html Rendering Part
  return (
    <div className="flex flex-col items-center pb-4 bg-white max-h-fit">
      {isError && (
        <ConfirmBox
          onConfirm={() => {
            setIsError(false);
          }}
        />
      )}
      <div className="flex flex-col items-center w-full bg-white">
        <span className="py-5 font-bold font-poppins">티켓구입</span>
      </div>
      <div className="flex items-center justify-center w-full p-4 text-xl text-white bg-blue">
        <img width={18} className="mr-5" src={staticFiles.icons.tag_white} />
        <TotalPriceCom totalPrice={ticketPrice} />
      </div>
      <div className="w-[100%] flex flex-col px-8">
        {/* <hr className="w-full border rounded border-gray" /> */}
        {/* <SpaceY /> */}
        <div className="flex justify-start w-full my-4">
          {ticket?.ticket_type === "SIM card" ? (
            <p>수량 선택</p>
          ) : ticket?.ticket_prices[1]?.sale_price != 0 ? (
            <SelectInput
              selected={selectedAdultChildType}
              setSelected={(val) =>
                setSelectedAdultChildType(val as "성인" | "아동")
              }
              containerClassName="w-1/2"
              options={[
                { value: "성인", text: "성인" },
                { value: "아동", text: "아동" },
              ]}
            />
          ) : (
            <p>Adult</p>
          )}

            {!searchQuery.edit || searchQuery.type !== "booking" ? <div className="flex justify-center w-1/2">
            <div className="flex items-center justify-between w-full px-[15%]">
              <img
                alt=""
                className="cursor-pointer"
                width={20}
                src={staticFiles.icons.decrement}
                onClick={() => handleQuantityCounter(filterCounter, "DEC")}
              />
              <FilterCounterCom filterCounter={filterCounter} />
              <img
                alt=""
                className="cursor-pointer"
                width={20}
                src={staticFiles.icons.increment}
                onClick={() => handleQuantityCounter(filterCounter, "INC")}
              />
            </div>
          </div> : null}

          
        </div>
        {/* <SpaceY /> */}
        <div className="flex items-center justify-center w-full mb-4 gap-x-4">
          <span onClick={handleButtonClick}>
            {ticket?.ticket_type === "Guide Tour" ||
            ticket?.ticket_type === "Shuttle bus" ? (
              <img
                className="mr-1 "
                alt=""
                width={20}
                src={
                  !selectedTour
                    ? staticFiles.icons.calendar
                    : staticFiles.icons.greenCalendar
                }
              />
            ) : (
              <></>
            )}
          </span>
          <span>
            {ticket?.ticket_type === "Guide Tour" ||
            ticket?.ticket_type === "Shuttle bus" ? (
              <span className="w-full text-center ">
                날짜/시간을 선택해 주세요
              </span>
            ) : (
              <></>
            )}
          </span>
        </div>

        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onRequestClose={handleCloseModal}
            className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
          w-1/2 
           rounded-[20px] p-0 z-50 bg-white`}
            style={{
              content: {
                width: "auto",
                height: "auto",
              },
              overlay: {
                zIndex: 9999,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
            }}
          >
            <TourCalendar
              ticket={ticket}
              filterCounter={filterCounter}
              selectedTour={selectedTour}
              handleClick={(date: string) => {
                handleClick(date);
              }}
              handleClickDisable={(date: string) => {
                handleClickDisable(date);
              }}
              setIsOpen={(isOpen: boolean) => {
                setIsModalOpen(isOpen);
              }}
            />
          </Modal>
        )}
        {/* <SpaceY /> */}
        <div className="flex flex-col w-full gap-x-1 gap-y-4">
          <MainButton
            onClick={async () => {
              // Check if select a data for guide tour tickets
              if (
                !selectedTour &&
                (ticket.ticket_type === "Guide Tour" ||
                  ticket?.ticket_type === "Shuttle bus")
              ) {
                Swal.fire({
                  icon: "error",
                  title: "투어 스케쥴 선택",
                  html: `상품명 왼쪽 달력아이콘을 클릭하여<br>원하시는 날짜/시간을 선택해 주세요`,
                });
                return;
              }

              // Check availability for this date with selected amount in the case of guide tour ticket
              if (
                ticket?.ticket_type === "Guide Tour" ||
                ticket?.ticket_type === "Shuttle bus"
              ) {
                try {
                  // Format data into 2023-12-22 17:16:00
                  const [datePart, timePart, modifier] = (
                    selectedTour || "2024-01-28 10:00 AM"
                  )?.split(" ");
                  let temphours = parseInt(timePart.split(":")[0], 10);

                  // Adjust hours for 12-hour AM/PM format
                  if (modifier === "PM" && temphours < 12) {
                    temphours += 12;
                  } else if (modifier === "AM" && temphours === 12) {
                    temphours = 0;
                  }

                  // Zero-pad the hours if it becomes single digit after conversion
                  const formattedHours = String(temphours).padStart(2, "0");
                  const tempminutes = timePart?.split(":")[1];
                  const ISODateString = `${datePart}T${formattedHours}:${tempminutes}:00`;

                  const date = new Date(ISODateString);
                  const year = date.getFullYear();
                  const month = String(date.getMonth() + 1).padStart(2, "0");
                  const day = String(date.getDate()).padStart(2, "0");
                  const hours = String(date.getHours()).padStart(2, "0");
                  const minutes = String(date.getMinutes()).padStart(2, "0");
                  const formattedDatetimeString = `${year}-${month}-${day} ${hours}:${minutes}:00`;

                  await axios.get(
                    `${API}/tickets/${ticket.id}/guide-tour-pick?quantity=${filterCounter}&datetime=${formattedDatetimeString}`
                  );
                  // const isAvailable = await axios.get(
                  //   `${API}/tickets/105/guide-tour-pick?quantity=20&datetime=2023-09-04 20:48:00`
                  // );
                } catch (error: any) {
                  if (error?.response?.status === 500) {
                    setErrorMessage(
                      "<div>시스템 문제가 발생했습니다. 잠시 후 다시 시도해주세요!</div>"
                    );
                    setIsError(true);
                    return;
                  }

                  setErrorMessage(error?.response?.data);
                  setIsError(true);
                  return;
                }
              }

              // Set addingToCart to true
              setAddingToCart(true);

              if (Number.isNaN(ticketPrice)) {
                toast.warn(
                  "티켓 가격이 없습니다. service@tamice.com 에 연락바랍니다."
                );
                setAddingToCart(false);
                return;
              }

              const childInfo: CartItem[] = [];
              const adultInfo: CartItem[] = [];

              let cartId = String(Date.now());
              const searchQuery = extractParams(
                `http://localhost:${process.env.REACT_APP_PORT}/my-page${search}`
              );
              if (
                searchQuery?.edit &&
                (searchQuery?.type == "cart" ||
                  searchQuery?.type == "cart booking")
              ) {
                cartId = searchQuery?.cartId || String(Date.now());
              }
              let addition = 0;
              // if (ticket?.additional_price_type === "Premium") {
              //   addition = Number(ticket?.premium_amount || 0);
              // } else if (ticket?.additional_price_type === "Premium S") {
              //   addition = Number(ticket?.premium_s_amount || 0);
              // }

              if (searchQuery?.edit && searchQuery?.type === "booking") {
                if (!reservationsData) {
                  localStorage.removeItem("authToken");
                  localStorage.removeItem("loginData");
                  localStorage.removeItem("order_number");
                  localStorage.removeItem("useremail");

                  navigate("/");
                }

                let reservations = reservationsData.reservations;

                let currentReservation: any =
                  reservations[
                    reservations.findIndex(
                      (it: any) => it.id === item.reservation_id
                    )
                  ];

                let currentItemBeforeUpdate: any =
                  currentReservation?.reservation_items.filter(
                    (it: any) => it.id == item.item_id
                  );
                console.log(reservationsData, item, currentItemBeforeUpdate);

                if (selectedAdultChildType === "성인") {
                  adultInfo.push({
                    cartId: String(Number(cartId) - 1),
                    // cityId: "77",
                    tour_date: selectedTour,
                    reservation_id: item.reservation_id,
                    item_id: item.item_id,
                    name: ticket?.title_kr || "",
                    price:
                      Number(item?.price) ||
                      ticket?.ticket_prices[0].sale_price ||
                      0,
                    quantity: Number(item?.quantity),
                    subtotal: -100,
                    addition,
                    additional_price_type: ticket?.additional_price_type,
                    additional_price_image: ticket?.additional_price_image,
                    categoryId: currentItemBeforeUpdate[0].category_id,
                    subCategoryPrice: ticket?.ticket_prices[0].sale_price || 0,
                    subCategoryId: item.subcategory_id,
                    ticket_type: ticket?.ticket_type,
                    ticket_id: String(ticket?.id),
                    adult_child_type: item?.adult_child_type || "성인",
                  });

                  adultInfo.push({
                    cartId,
                    // cityId: "711",
                    tour_date: selectedTour,
                    reservation_id: item.reservation_id,
                    item_id: item.item_id,
                    name: ticket?.title_kr || "",
                    price: ticket?.ticket_prices[0].sale_price || 0,
                    quantity: filterCounter,
                    subtotal: ticketPrice,
                    addition,
                    additional_price_type: ticket?.additional_price_type,
                    additional_price_image: ticket?.additional_price_image,
                    categoryId: currentItemBeforeUpdate[0].category_id,
                    subCategoryId: item.subcategory_id,
                    subCategoryPrice: ticket?.ticket_prices[0].sale_price || 0,
                    ticket_type: ticket?.ticket_type,
                    ticket_id:
                      String(ticket?.id) +
                      "+" +
                      String(item.tickets[0].subitem_id),
                    adult_child_type: "성인",
                  });
                } else if (selectedAdultChildType === "아동") {
                  childInfo.push({
                    cartId: String(Number(cartId) - 1),
                    // cityId: "75",
                    tour_date: selectedTour,
                    reservation_id: item.reservation_id,
                    item_id: item.item_id,
                    name: ticket?.title_kr || "",
                    price:
                      item?.price || ticket?.ticket_prices[1].sale_price || 0,
                    quantity: Number(item?.quantity),
                    subtotal: -100,
                    addition,
                    additional_price_type: ticket?.additional_price_type,
                    additional_price_image: ticket?.additional_price_image,
                    categoryId: currentItemBeforeUpdate[0].category_id,
                    subCategoryId: item.subcategory_id,
                    ticket_type: ticket?.ticket_type,
                    ticket_id: String(ticket?.id),
                    adult_child_type: item?.adult_child_type || "아동",
                  });

                  childInfo.push({
                    cartId,
                    // cityId: ticketData?.cityId,
                    tour_date: selectedTour,
                    reservation_id: item.reservation_id,
                    item_id: item.item_id,
                    name: ticket?.title_kr || "",
                    price: ticket?.ticket_prices[1].sale_price || 0,
                    quantity: filterCounter,
                    subtotal: ticketPrice,
                    addition,
                    additional_price_type: ticket?.additional_price_type,
                    additional_price_image: ticket?.additional_price_image,
                    categoryId: currentItemBeforeUpdate[0].category_id,
                    subCategoryId: item.subcategory_id,
                    ticket_type: ticket?.ticket_type,
                    ticket_id:
                      String(ticket?.id) +
                      "+" +
                      String(item.tickets[0].subitem_id),
                    adult_child_type: "아동",
                  });
                }
              } else if (
                searchQuery?.edit &&
                searchQuery?.type === "cart booking"
              ) {
                if (!reservationsData) {
                  localStorage.removeItem("authToken");
                  localStorage.removeItem("loginData");
                  localStorage.removeItem("order_number");
                  localStorage.removeItem("useremail");

                  navigate("/");
                }

                let reservations = reservationsData.reservations;
                let currentReservation: any =
                  reservations[
                    reservations.findIndex(
                      (it: any) => it.id === item.reservation_id
                    )
                  ];
                let currentItemBeforeUpdate: any =
                  currentReservation?.reservation_items.filter(
                    (it: any) => it.id == item.item_id
                  );

                if (selectedAdultChildType === "성인") {
                  adultInfo.push({
                    cartId,
                    tour_date: selectedTour,
                    reservation_id: item.reservation_id,
                    item_id: item.item_id,
                    categoryId: currentItemBeforeUpdate[0].category_id,
                    name: ticket?.title_kr || "",
                    price:
                      Number(item?.price) ||
                      ticket?.ticket_prices[0].sale_price ||
                      0,
                    subCategoryPrice: ticket?.ticket_prices[0].sale_price || 0,
                    quantity: filterCounter,
                    subtotal:
                      (ticket?.ticket_prices[0].sale_price || 0) *
                        filterCounter +
                      addition * filterCounter,
                    addition,
                    additional_price_type: ticket?.additional_price_type,
                    additional_price_image: ticket?.additional_price_image,
                    ticket_type: ticket?.ticket_type,
                    ticket_id: String(ticket?.id),
                    adult_child_type: item?.adult_child_type || "성인",
                  });
                } else if (selectedAdultChildType === "아동") {
                  childInfo.push({
                    cartId,
                    tour_date: selectedTour,
                    reservation_id: item.reservation_id,
                    item_id: item.item_id,
                    categoryId: currentItemBeforeUpdate[0].category_id,
                    name: ticket?.title_kr || "",
                    price: ticket?.ticket_prices[1].sale_price || 0,
                    subCategoryPrice: ticket?.ticket_prices[1].sale_price || 0,
                    quantity: filterCounter,
                    subtotal:
                      (ticket?.ticket_prices[1].sale_price || 0) *
                        filterCounter +
                      addition * filterCounter,
                    addition,
                    additional_price_type: ticket?.additional_price_type,
                    additional_price_image: ticket?.additional_price_image,
                    ticket_type: ticket?.ticket_type,
                    ticket_id: String(ticket?.id),
                    adult_child_type: "아동",
                  });
                }
              } else {
                if (selectedAdultChildType === "성인") {
                  adultInfo.push({
                    cartId,
                    tour_date: selectedTour,
                    reservation_id: null,
                    item_id: null,
                    name: ticket?.title_kr || "",
                    price: ticket?.ticket_prices[0].sale_price || 0,
                    quantity: filterCounter,
                    subtotal:
                      (ticket?.ticket_prices[0].sale_price || 0) *
                        filterCounter +
                      addition * filterCounter,
                    addition,
                    additional_price_type: ticket?.additional_price_type,
                    additional_price_image: ticket?.additional_price_image,
                    ticket_type: ticket?.ticket_type,
                    ticket_id: String(ticket?.id),
                    adult_child_type: "성인",
                  });
                } else if (selectedAdultChildType === "아동") {
                  childInfo.push({
                    cartId,
                    tour_date: selectedTour,
                    reservation_id: null,
                    item_id: null,
                    name: ticket?.title_kr || "",
                    price: ticket?.ticket_prices[1].sale_price || 0,
                    quantity: filterCounter,
                    subtotal:
                      (ticket?.ticket_prices[1].sale_price || 0) *
                        filterCounter +
                      addition * filterCounter,
                    addition,
                    additional_price_type: ticket?.additional_price_type,
                    additional_price_image: ticket?.additional_price_image,
                    ticket_type: ticket?.ticket_type,
                    ticket_id: String(ticket?.id),
                    adult_child_type: "아동",
                  });
                }
              }

              handleUpdateCart(adultInfo, childInfo);

              // await delaySeconds(8000);
              // Set addingToCart to false once add it successfully
              setAddingToCart(false);
            }}
            text="장바구니 담기"
            disabled={addingToCart}
          />
        </div>
        {ticket.subcategories.find(
          (subItem: any) =>
            subItem.name == "뉴욕빅애플패스" ||
            subItem.name == "LV_bigapple" ||
            subItem.name == "샌프란 빅애플패스" ||
            subItem.name == "NF_bigapple" ||
            subItem.name == "Boston_bigapple" ||
            subItem.name == "HLS_bigapple"
        ) && (
          <MainButton
            text="빅애플패스로 구매 하기"
            onClick={() => {
              window.location.href = "/package-tour/ba-pass";
            }}
            containerClassName="my-4 border-[1px] border-blue bg-white text-blue  max-[5000px]:text-blue" // Using Tailwind's utility class for red background
          />
        )}
      </div>
    </div>
  );
};
//// End Define Exporting Components that can be used in other pages or components End////
