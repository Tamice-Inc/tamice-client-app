import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CartItem, cartState, orderLookupState } from "../../App";
import { API, staticFiles } from "../../shared";
import { SpaceY } from "../../shared/components/Utils";
import Checkout from "./Checkout";
import { ShuttleBusForm } from "./components/ShuttleBusForm";
import { SimCardForm } from "./components/SimCardForm";
import { SubCategoryCartView } from "./components/SubCategoryCartView";
import { TicketCartView } from "./components/TicketCartView";
import { parseCartData } from "./utils";
import Swal from "sweetalert2";

type cartData = {
  adultInfo: CartItem[];
  childInfo: CartItem[];
};

const stripeTestPromise = loadStripe(
  `pk_test_51NXXnoFiJUoJo4YUdGLKaPwGOD0GU5bvut6NJPONPhcVMaieF2q1LvRM6JmvbGwuUJunuNUmTjgG1cdUrwb2DOOR00lOkeErhO`
);

const authToken = localStorage.getItem("authToken");
const isMemberLoggedIn = localStorage.getItem("loginData") === "email";

export const CartView = () => {
  // Component State Variable
  const [cartRawData, setCartRawData] = useState(null as cartData | null);
  const [cartRefinedData, setCartRefinedData] = useState(null as any);
  const [cart, setCart] = cartState.useState();
  const [shouldBlock, setShouldBlock] = useState(false);
  const [autoLogout, setAutoLogout] = useState(false);
  const [edit, setEdit] = useState(false);
  const [simCardFormContent, setSimCardFormContent] = useState<any>("");
  const [shuttleFormContent, setShuttleFormContent] = useState<any>("");
  const [hasSimCard, setHasSimCard] = useState(false);
  const [shuttleBusTickets, setShuttleBusTickets] = useState<any[]>([]);
  const [simCardFormData, setSimCardFormData] = useState<{} | null>(null);
  const [shuttleBusTicketsFormData, setShuttleBusTicketsFormData] = useState<
    any[]
  >([]);
  const simCardCache = localStorage.getItem("SIM_CARD_FORM_DATA");
  const shuttleBusCache = localStorage.getItem("SHUTTLE_BUS_FORM_DATA");
  // const editItem = localStorage.getItem("Edit_Item");
  const [orderLookup, setOrderLookup] = orderLookupState.useState();

  // Create a navigate instance from useNavigate Hook
  const navigate = useNavigate();

  const handleBeforeUnload = (event: any) => {
    event.preventDefault();
    event.returnValue = ""; // Legacy method for some browsers
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Function to check auth token expiration
  const checkTokenExpiration = () => {
    const token = localStorage.getItem("authToken");

    if (token) {
      const decodedToken: any = jwtDecode(token);

      const currentTime = Date.now() / 1000; // Convert current time to seconds

      if (decodedToken.exp < currentTime) {
        // Token has expired, force logout here
        // For example, clear the token from local storage and redirect the user to the login page
        localStorage.removeItem("authToken");
        localStorage.removeItem("loginData");
        localStorage.removeItem("order_number");
        localStorage.removeItem("useremail");

        setAutoLogout(true);

        navigate("/");
      }
    }
  };

  function handleSimCardFormSubmit(data: any) {
    const newFormData = {
      ...simCardFormData,
      ...data,
    };
    localStorage.setItem("SIM_CARD_FORM_DATA", JSON.stringify(newFormData));
    setSimCardFormData(newFormData);
  }

  function handleShuttleBusFormSubmit(
    name: string,
    value: string,
    index: number
  ) {
    const newFormData = [...shuttleBusTicketsFormData];
    newFormData[index] = {
      ...newFormData[index],
      [name]: value,
    };

    localStorage.setItem("SHUTTLE_BUS_FORM_DATA", JSON.stringify(newFormData));
    setShuttleBusTicketsFormData(newFormData);

    console.log("ssss--", newFormData);
  }

  useEffect(() => {
    if (hasSimCard) {
      (async () => {
        try {
          const apiResponse = await axios.get(`${API}/templates/109/webpage`);

          setSimCardFormContent(apiResponse.data.content_page);
        } catch (error) {
          console.log("error:", error);
        }
      })();
    }

    if (shuttleBusTickets.length > 0) {
      (async () => {
        try {
          const apiResponse = await axios.get(`${API}/templates/110/webpage`);

          setShuttleFormContent(apiResponse.data.content_page);
        } catch (error) {
          console.log("error:", error);
        }
      })();
    }
  }, [hasSimCard, shuttleBusTickets]);

  // useEffect Hooks
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  useEffect(() => {
    const intervalId = setInterval(checkTokenExpiration, 1000); // Check token expiration every second
    return () => clearInterval(intervalId); // Clear the interval when the component unmounts
  }, []);

  useEffect(() => {
    const rawData = localStorage.getItem("CART_DATA");
    if (rawData) {
      const parsedData = JSON.parse(rawData);
      setCartRawData(parsedData);
      var sortedCart = parseCartData(parsedData);
      setCartRefinedData(sortedCart);

      return;

      // Check if there are sim card tickets and shuttle bus ones
      // var simCard = [...parsedData.adultInfo, ...parsedData.childInfo].find(
      //   (item) => item.ticket_type == "SIM card" && !item.ticket_sent_status
      // );
      var simCard = [...parsedData.adultInfo, ...parsedData.childInfo].find(
        (item) => item.ticket_type == "SIM card" && !item.ticket_sent_status
      );

      //For Sim card
      var siim = [...parsedData.adultInfo, ...parsedData.childInfo]
        .filter((item) => item.ticket_type == "SIM card")
        .map((item) => item.cartId)
        .filter((item, i, ar) => {
          return ar.indexOf(item) === i;
        });

      if (siim.length == 2) {
        var k = [...parsedData.adultInfo, ...parsedData.childInfo].find(
          (item) =>
            siim[1] == item.cartId &&
            item.ticket_type == "SIM card" &&
            ![...parsedData.adultInfo, ...parsedData.childInfo].find(
              (first) => siim[0] == first.cartId && first.name == item.name
            )
        );
        setHasSimCard(k ? true : false);
      } else {
        setHasSimCard(simCard ? true : false);
      }

      // var simCard =
      //   [...parsedData.adultInfo, ...parsedData.childInfo]
      //     .filter((item) => item.ticket_type == "SIM card")
      //     .map((item) => item.cartId)
      //     .filter((item, i, ar) => {
      //       return ar.indexOf(item) === i;
      //     }).length < 2;

      if (
        [...parsedData.adultInfo, ...parsedData.childInfo].find(
          (item) => item.ticket_type == "SIM card"
        )
      ) {
        setSimCardFormData({
          delivery_option: "",
          zip_code: null,
          address: null,
          street: null,
          ein: null,
          imei: null,
          notes: null,
        });
      }

      var shuttle = [...parsedData.adultInfo, ...parsedData.childInfo].filter(
        (item) => item.ticket_type == "Shuttle bus" && !item.ticket_sent_status
      );

      //For Ticket card
      var tick = [...parsedData.adultInfo, ...parsedData.childInfo]
        .filter(
          (item) =>
            item.ticket_type == "Shuttle bus" && !item.ticket_sent_status
        )
        .map((item) => item.cartId)
        .filter((item, i, ar) => {
          return ar.indexOf(item) === i;
        });

      if (tick.length == 2) {
        var tickets = [...parsedData.adultInfo, ...parsedData.childInfo].filter(
          (item) =>
            tick[1] == item.cartId &&
            item.ticket_type == "Shuttle bus" &&
            !item.ticket_sent_status &&
            ![...parsedData.adultInfo, ...parsedData.childInfo].find(
              (first) => tick[0] == first.cartId && first.name == item.name
            )
        );

        var indiTickets = [
          ...parsedData.adultInfo,
          ...parsedData.childInfo,
        ].filter(
          (item) =>
            item.ticket_type == "Shuttle bus" &&
            !item.ticket_sent_status &&
            !item.subCategoryId
        );
        console.log("pppp-", indiTickets.length);
        if (indiTickets.length > 0) {
          console.log("pppp-");
          setShuttleBusTickets((prev) => prev.concat(indiTickets));
          setShuttleBusTicketsFormData((prev) =>
            prev.concat(
              indiTickets.map((item) => {
                return {
                  name: item.name,
                  ticket_id: item.ticket_id,
                  ticket_type: item.ticket_type,
                  tour_date: item.tour_date,
                  flight_number: "",
                  pick_up_location: "",
                  of_luggage: "",
                };
              })
            )
          );
        }
        if ((indiTickets.length = 1)) {
          var shuttle = [
            ...parsedData.adultInfo,
            ...parsedData.childInfo,
          ].filter(
            (item) =>
              item.ticket_type == "Shuttle bus" &&
              !item.ticket_sent_status &&
              item.hasOwnProperty("ticket_sent_status")
          );
          setShuttleBusTickets(shuttle);
          setShuttleBusTicketsFormData(
            shuttle.map((item) => {
              return {
                name: item.name,
                ticket_id: item.ticket_id,
                ticket_type: item.ticket_type,
                tour_date: item.tour_date,
                flight_number: "",
                pick_up_location: "",
                of_luggage: "",
              };
            })
          );
        }
      } else {
        console.log("----+", [
          ...parsedData.adultInfo,
          ...parsedData.childInfo,
        ]);
        setShuttleBusTickets(shuttle);
        setShuttleBusTicketsFormData(
          shuttle.map((item) => {
            return {
              name: item.name,
              ticket_id: item.ticket_id,
              ticket_type: item.ticket_type,
              tour_date: item.tour_date,
              flight_number: "",
              pick_up_location: "",
              of_luggage: "",
            };
          })
        );
      }
      // setShuttleBusTickets(
      //   [...parsedData.adultInfo, ...parsedData.childInfo]
      //     .filter((item) => item.ticket_type == "Shuttle bus") // Should be Shuttle bus later
      //     .filter(
      //       (value, index, self) =>
      //         index ===
      //         self.findIndex(
      //           (t) =>
      //             t.name === value.name && t?.tour_date === value?.tour_date
      //         )
      //     )
      // );

      // setShuttleBusTicketsFormData(
      //   [...parsedData.adultInfo, ...parsedData.childInfo]
      //     .filter((item) => item.ticket_type == "Shuttle bus") // Should be Shuttle bus later
      //     .filter(
      //       (value, index, self) =>
      //         index ===
      //         self.findIndex(
      //           (t) =>
      //             t.name === value.name && t?.tour_date === value?.tour_date
      //         )
      //     )
      //     .map((item) => {
      //       return {
      //         name: item.name,
      //         ticket_id: item.ticket_id,
      //         ticket_type: item.ticket_type,
      //         tour_date: item.tour_date,
      //         flight_number: "",
      //         pick_up_location: "",
      //         of_luggage: "",
      //       };
      //     })
      // );
    }
  }, []);

  useEffect(() => {
    const isUpgraded = cartRefinedData?.adultSubCategoriesMap?.some(
      (item: any) => item[1].some((subItems: any) => subItems.subtotal < 0)
    );
    console.log("i guess", cartRefinedData);
    if (cartRefinedData) {
      if (isUpgraded) {
        var newly_added_tickets =
          cartRefinedData?.adultSubCategoriesMap?.[1][1]?.filter(
            (val: any) =>
              !cartRefinedData?.adultSubCategoriesMap?.[0][1]
                .map((x: any) => {
                  console.log(x.ticket_id.split("+")[0]);
                  return x.ticket_id;
                })
                .includes(val.ticket_id.split("+")[0])
          );
        console.log("i guess", newly_added_tickets);

        //For Sim card
        var simCard = newly_added_tickets.find(
          (item: any) =>
            item.ticket_type == "SIM card" && !item.ticket_sent_status
        );

        console.log("sim", simCard);

        if (simCard) {
          setHasSimCard(true);
          setSimCardFormData({
            delivery_option: "",
            zip_code: null,
            address: null,
            street: null,
            ein: null,
            imei: null,
            notes: null,
          });
        }

        //For tickets card
        var shuttle: any[] = newly_added_tickets.filter(
          (item: any) => item.ticket_type == "Shuttle bus"
        );
        if (shuttle.length > 0) {
          setShuttleBusTickets(shuttle);
          setShuttleBusTicketsFormData(
            shuttle.map((item: any) => {
              return {
                name: item.name,
                ticket_id: item.ticket_id,
                ticket_type: item.ticket_type,
                tour_date: item.tour_date,
                flight_number: "",
                pick_up_location: "",
                of_luggage: "",
              };
            })
          );
        }
      } else {
        const rawData = localStorage.getItem("CART_DATA");
        if (rawData) {
          const parsedData = JSON.parse(rawData);
          var newly_added_tickets: any = [
            ...parsedData.adultInfo,
            ...parsedData.childInfo,
          ];
          console.log("i guess", newly_added_tickets);

          //For Sim card
          var simCard = newly_added_tickets?.find(
            (item: any) => item.ticket_type == "SIM card"
          );

          if (simCard) {
            setHasSimCard(true);
            setSimCardFormData({
              delivery_option: "",
              zip_code: null,
              address: null,
              street: null,
              ein: null,
              imei: null,
              notes: null,
            });
          }

          //For tickets card
          var shuttle: any[] = newly_added_tickets?.filter(
            (item: any) => item.ticket_type == "Shuttle bus"
          );
          if (shuttle?.length > 0) {
            setShuttleBusTickets(shuttle);
            setShuttleBusTicketsFormData(
              shuttle.map((item: any) => {
                return {
                  name: item.name,
                  ticket_id: item.ticket_id,
                  ticket_type: item.ticket_type,
                  tour_date: item.tour_date,
                  flight_number: "",
                  pick_up_location: "",
                  of_luggage: "",
                };
              })
            );
          }
        }
      }
    }
    console.log("isUpgraded", isUpgraded);
  }, [cartRefinedData]);

  useEffect(() => {
    if (simCardCache) {
      setSimCardFormData(JSON.parse(simCardCache));
    }
  }, [simCardCache]);

  useEffect(() => {
    if (shuttleBusCache) {
      setShuttleBusTicketsFormData(JSON.parse(shuttleBusCache));
    }
  }, []);

  useEffect(() => {
    setShouldBlock(checkPendingBookingEditInShoppingCart(cart));
  }, [cart]);

  useEffect(() => {
    return () => {
      // Remove Booking Edit items in Cart
      if (shouldBlock && !autoLogout && !edit) {
        // alert(edit)
        // alert("Delete localstorage");
        // let cartData = localStorage.getItem("CART_DATA")
        //   ? JSON.parse(localStorage.getItem("CART_DATA") || "")
        //   : { adultInfo: [], childInfo: [] };
        // cartData.adultInfo = cartData.adultInfo.filter(
        //   (item: any) => item.reservation_id == null
        // );
        // cartData.childInfo = cartData.childInfo.filter(
        //   (item: any) => item.reservation_id == null
        // );
        // localStorage.setItem("CART_DATA", JSON.stringify(cartData));
        // setCart(cartData);
      }
    };
  }, [shouldBlock]);

  // Function to set Edit state
  const handleSetEdit = () => {
    setEdit(true);
  };

  // Function to handle deleting item
  const handleDeleteItem = (
    cartId: string,
    adult_child_type: "성인" | "아동"
  ) => {
    let cartData = localStorage.getItem("CART_DATA")
      ? JSON.parse(localStorage.getItem("CART_DATA") || "")
      : { adultInfo: [], childInfo: [] };
    let cartItem = [...cartData.adultInfo, ...cartData.childInfo].filter(
      (item: any) => item.cartId == cartId
    );

    if (
      [...cartData.adultInfo, ...cartData.childInfo].find(
        (item) => +item.cartId === +cartId && item.ticket_type == "Shuttle bus"
      )
    ) {
      //The Shuttle bus ticket state did not reset an empty array = setShuttleBusTickets([])
      // TODO: figure out why the previous engineer is using all this lines of code
      // setShuttleBusTickets(
      //   shuttleBusTickets.filter((item) => item.cartId !== cartId)
      // );
      setShuttleBusTickets([]);
      const index = shuttleBusTickets.findIndex(
        (item) => item.cartId === cartId
      );
      setShuttleBusTicketsFormData(
        shuttleBusTicketsFormData.filter((_, i) => i !== index)
      );
      localStorage.setItem(
        "SHUTTLE_BUS_FORM_DATA",
        JSON.stringify(shuttleBusTicketsFormData.filter((_, i) => i !== index))
      );
    }

    if (adult_child_type === "성인") {
      cartData.adultInfo = cartData.adultInfo.filter(
        (item: any) => item.cartId !== cartId
      );
    } else if (adult_child_type === "아동") {
      cartData.childInfo = cartData.childInfo.filter(
        (item: any) => item.cartId !== cartId
      );
    }

    // remove related ones when deleting booking Edit items
    let reservation_id =
      cartItem.length > 0 ? cartItem[0]?.reservation_id : null;

    if (reservation_id) {
      cartData.adultInfo = cartData.adultInfo.filter(
        (item: any) => item.reservation_id !== reservation_id
      );
      cartData.childInfo = cartData.childInfo.filter(
        (item: any) => item.reservation_id !== reservation_id
      );
    }

    if (cartData?.selectInfo) {
      cartData.selectInfo = cartData.selectInfo.filter(
        (item: any) => item.cartId !== cartId
      );
    }
    //  check if there is in cart any sim card, if not setHasSimCard to false
    if (
      ![...cartData.adultInfo, ...cartData.childInfo].find(
        (item) => item.ticket_type == "SIM card"
      )
    ) {
      localStorage.removeItem("SIM_CARD_FORM_DATA");
      setHasSimCard(false);
    }

    localStorage.setItem("CART_DATA", JSON.stringify(cartData));
    setCartRawData(cartData);
    setCartRefinedData(parseCartData(cartData));
    setCart(cartData);
    toast("삭제 하였습니다!");
  };

  // Function to check pending booking edit item
  const checkPendingBookingEditInShoppingCart = ({
    childInfo,
    adultInfo,
  }: {
    childInfo: CartItem[];
    adultInfo: CartItem[];
  }) => {
    let result = false;
    const combinedInfo = [...childInfo, ...adultInfo];

    for (let info of combinedInfo) {
      if (info.reservation_id) {
        result = true;
        break;
      }
    }

    return result;
  };

  function updateRqScheduleDateTimeInItem(data: any) {
    let cartData = localStorage.getItem("CART_DATA")
      ? JSON.parse(localStorage.getItem("CART_DATA") || "")
      : { adultInfo: [], childInfo: [] };

    cartData.adultInfo = cartData.adultInfo.map((item: any) => {
      if (item.ticket_type === "SIM card") {
        return {
          ...item,
          rq_schedule_datetime: data,
        };
      } else {
        return item;
      }
    });

    localStorage.setItem("CART_DATA", JSON.stringify(cartData));
    setCartRawData(cartData);
    setCartRefinedData(parseCartData(cartData));
    setCart(cartData);
  }
  const editItem = JSON.parse(localStorage.getItem("Edit_Item") || "{}");
  const rqValue = () => {
    let cartData = localStorage.getItem("CART_DATA")
      ? JSON.parse(localStorage.getItem("CART_DATA") || "")
      : { adultInfo: [], childInfo: [] };
    if (editItem) {
      return cartData.adultInfo.find(
        (item: any) => item.ticket_type === "SIM card"
      )?.rq_schedule_datetime;
    }
    return cartData.adultInfo[0]?.rq_schedule_datetime;
  };

  const updateCartWithNoUpgrade = async () => {
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
          title: "변경 중입니다!",
          text: "잠시만 기다려 주세요!",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
          allowOutsideClick: false,
        });
        let reservationsData: any;
        const localReservationData = localStorage.getItem("reservationData");
        reservationsData = localReservationData
          ? JSON.parse(localReservationData)
          : null;
        if (authToken && isMemberLoggedIn) {
          // Edit case
          // Logic to check musical tickets to send buyinbound call
          const cartData = localStorage.getItem("CART_DATA");
          var cartSelectInfo = cartData ? JSON.parse(cartData) : null;

          // Parse the cart data
          let localCartData = localStorage.getItem("CART_DATA")
            ? JSON.parse(localStorage.getItem("CART_DATA") || "")
            : { adultInfo: [], childInfo: [] };

          let apiUrls: any = [];
          const combinedCartData = [
            ...localCartData.adultInfo,
            ...localCartData.childInfo,
          ];
          // Get distinct reservation Ids
          const reservationIds = combinedCartData.map(
            (obj: any) => obj.reservation_id
          );
          let distinctReservationIds: any = [];

          for (let i = 0; i < reservationIds.length; i++) {
            if (distinctReservationIds.indexOf(reservationIds[i]) === -1) {
              distinctReservationIds.push(reservationIds[i]);
            }
          }

          for (let reservationId of distinctReservationIds) {
            let items: any = [];
            let subItems = combinedCartData.filter(
              (it: any) =>
                it.reservation_id === reservationId && it.subtotal !== -100
            );
            let reservations = reservationsData.reservations;
            let currentReservation: any =
              reservations[
                reservations.findIndex((it: any) => it.id === reservationId)
              ];

            let currentItemBeforeUpdate: any =
              currentReservation.reservation_items.filter(
                (it: any) => it.id === subItems[0].item_id
              );
            let otherItems = currentReservation.reservation_items.filter(
              (it: any) => it.id !== subItems[0].item_id
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
                data.reservation_sub_items
                  ?.map((subitem: any) => ({
                    id: subitem.id,
                    rq_schedule_datetime: subitem.rq_schedule_datetime,
                    ticket_id: subitem.ticket_id,
                    refund_status: subitem.refund_status,
                    ticket_sent_status: subitem?.ticket_sent_status,
                  }))
                  ?.sort((a: any, b: any) => a.id - b.id) || [],
            }));

            items.push(...otherItemsTosend);
            let currentItem: any = {
              id: subItems[0].item_id,
              adult_child_type: subItems[0].adult_child_type,
              child_age: null,

              price: subItems[0].subCategoryPrice || subItems[0].price,
              quantity: subItems[0].quantity,

              ticket_sent_status: null,
              ticket_sent_date: null,
              refund_status: null,
              refund_sent_date: null,

              reservation_id: subItems[0].reservation_id,

              category_id: subItems[0].categoryId
                ? parseFloat(subItems[0].categoryId)
                : null,
              subcategory_id: subItems[0].subCategoryId,
              price_list_id: subItems[0].priceOptionId
                ? parseFloat(subItems[0].priceOptionId)
                : null,

              sub_items: [
                ...subItems.map((it: any, index: number) => {
                  if (it.tour_date) {
                    const datetimeString = it.tour_date;

                    // const dateTimeString = '2023-08-30 07:39 PM';

                    // Split the date and time components
                    const [date, time, ampm] = datetimeString.split(" ");

                    // Split the time into hours, minutes, and seconds
                    const [hours, minutes] = time.split(":");

                    // Convert the hours to 24-hour format
                    const convertedHours =
                      hours === "12"
                        ? "00"
                        : Number(hours) + (ampm === "PM" ? 12 : 0);

                    // Combine the date and time components in the desired format
                    const convertedDateTimeString = `${date} ${convertedHours}:${minutes}`;

                    return {
                      id:
                        it.ticket_id.split("+")[1] == "null"
                          ? null
                          : Number(it.ticket_id.split("+")[1]),
                      rq_schedule_datetime: convertedDateTimeString,
                      ticket_id: Number(it.ticket_id.split("+")[0]),
                      refund_status: it?.refund_status || null,
                      ticket_sent_status: it?.ticket_sent_status,
                      ...(shuttleBusTicketsFormData.find(
                        (x: any) =>
                          x.ticket_id === it.ticket_id ||
                          x.ticket_id.split("+")?.[0] === it.ticket_id
                      ) && {
                        shuttle_bus_information: shuttleBusTicketsFormData.find(
                          (x: any) =>
                            x.ticket_id === it.ticket_id ||
                            x.ticket_id.split("+")?.[0] === it.ticket_id
                        ),
                      }),
                      ...(it.ticket_type == "SIM card" &&
                        !it.ticket_sent_status && {
                          sim_card_information: simCardFormData,
                        }),
                    };
                  } else {
                    return {
                      id:
                        it.ticket_id.split("+")[1] == "null"
                          ? null
                          : Number(it.ticket_id.split("+")[1]),
                      rq_schedule_datetime:
                        it?.ticket_type == "SIM card"
                          ? it?.rq_schedule_datetime
                          : null,
                      ticket_id: Number(it.ticket_id.split("+")[0]),
                      refund_status: it?.refund_status || null,
                      ticket_sent_status: it?.ticket_sent_status,
                      ...(shuttleBusTicketsFormData.find(
                        (x: any) =>
                          x.ticket_id === it.ticket_id ||
                          x.ticket_id.split("+")?.[0] === it.ticket_id
                      ) && {
                        shuttle_bus_information: shuttleBusTicketsFormData.find(
                          (x: any) =>
                            x.ticket_id === it.ticket_id ||
                            x.ticket_id.split("+")?.[0] === it.ticket_id
                        ),
                      }),
                      ...(it.ticket_type == "SIM card" &&
                        !it.ticket_sent_status && {
                          sim_card_information: simCardFormData,
                        }),
                    };
                  }
                }),
              ]?.sort((a: any, b: any) => a.id - b.id),
              subTotal: subItems[0].subtotal,
            };

            items.push(currentItem);

            apiUrls.push({
              url: `${API}/reservations/user-create/${subItems[0].reservation_id}`,
              items,
              stripe_token: null,
            });
          }

          const apiRequests = apiUrls.map((urlItem: any) =>
            axios.put(urlItem.url, {
              items: urlItem.items,
              stripe_token: urlItem.stripe_token,
            })
          );
          const result = await Promise.all(apiRequests);

          Swal.close();

          if (result[0].status === 200) {
            // Remove all items after payment
            setCart({
              adultInfo: [],
              childInfo: [],
            });
            localStorage.removeItem("CART_DATA");
            localStorage.removeItem("Edit_Item");
            localStorage.removeItem("SIM_CARD_FORM_DATA");
            localStorage.removeItem("SHUTTLE_BUS_FORM_DATA");
            localStorage.removeItem("reservationParsedData");

            await Swal.fire({
              icon: "success",
              title: "결제 완료",
              text: "결제가 완료되었습니다. 구매해 주셔서 감사합니다.",
              confirmButtonText:
                localStorage.getItem("role") === "1" ||
                localStorage.getItem("role") === "2"
                  ? "OK"
                  : "마이페이지로 이동하기",
            });

            // Only for users, navigating to My booking is allowed
            if (
              !(
                localStorage.getItem("role") === "1" ||
                localStorage.getItem("role") === "2"
              )
            ) {
              if (localStorage.getItem("orderLoginNumber")) {
                // Update state variable with the response
                setOrderLookup({
                  orderLoginNumber: result[0].data.order_number,
                  orderLoginEmail: result[0].data.email,
                  phone: result[0].data.phone,
                  customer_name_kr: result[0].data.customer_name_kr,
                  customer_name_en: result[0].data.customer_name_en,
                });

                localStorage.setItem(
                  "orderLoginNumber",
                  result[0].data.order_number
                );
                localStorage.setItem("orderLoginEmail", result[0].data.email);
                localStorage.setItem("phone", result[0].data.phone);
                localStorage.setItem(
                  "customer_name_en",
                  result[0].data.customer_name_en
                );
                localStorage.setItem(
                  "customer_name_kr",
                  result[0].data.customer_name_kr
                );

                // navigate to my boooking page directly
                navigate(
                  `/my-page?email=${result[0].data.email}&order_number=${result[0].data.order_number}`
                );
              } else {
                navigate("/my-page");
              }
            } else {
              window.location.reload();
            }
          } else {
            Swal.fire({
              icon: "warning",
              title: "예기치 못한 오류가 발생했습니다.",
              html: `이 메세지가 반복해서 나타날 경우, <a href="https://pf.kakao.com/_AAelu" style="color:#009eef; text-decoration: underline;" target=”blank”> 타미스 카카오톡 채널 </a> 혹은 이메일 (service@tamice.com) 로 문의해 주세요.`,
              confirmButtonText: "확인",
            });
          }
        } else {
          navigate("/no-auth-checkout");
        }
      }
    });
  };

  return (
    <Elements stripe={stripeTestPromise}>
      <main className="flex flex-col items-center w-full">
        <div className=" w-full md:max-w-[1600px] min-h-[600px] pb-[10vh] pt-[10vh] flex justify-center px-4">
          <div className="flex flex-col w-full gap-x-4 lg:flex-row">
            <div className="flex flex-col w-full">
              <div className="w-full p-4 bg-white md:justify-between rounded-xl">
                <span className="font-bold font-poppins text-black">
                  장바구니
                </span>
              </div>
              <SpaceY />

              {cartRefinedData &&
              (cartRefinedData.adultSubCategoriesMap.length > 0 ||
                cartRefinedData.childSubCategoriesMap.length > 0 ||
                cartRefinedData.adultIndividualTicketsMap.length > 0 ||
                cartRefinedData.childIndividualTicketsMap.length > 0) ? (
                <>{/* {Render the empty cart is not empty } */}</>
              ) : (
                // Render the empty cart message
                <div className="w-full h-[400px] flex justify-center items-center">
                  <div className="flex flex-col justify-center items-center w-[800px]">
                    <img
                      className="w-full"
                      src={staticFiles.images.empty_chart_image}
                      alt="cart icon"
                    />
                    {/* <hr className="w-full border 2px border-blue mb-4 mt-2"></hr> */}
                    {/* <img
                      className="w-full"
                      src={staticFiles.images.empty_chart_text}
                      alt="cart text"
                    /> */}
                  </div>
                </div>
              )}

              <div>
                <SpaceY />
                <SubCategoryCartView
                  subCategories={cartRefinedData?.adultSubCategoriesMap || []}
                  adult_child_type={"성인"}
                  handleDeleteItem={handleDeleteItem}
                  navigate={navigate}
                  handleEdit={handleSetEdit}
                  isBookingEdit={shouldBlock}
                  setCartRefinedData={setCartRefinedData}
                  setCartRawData={setCartRawData}
                />
                <SubCategoryCartView
                  subCategories={cartRefinedData?.childSubCategoriesMap || []}
                  adult_child_type={"아동"}
                  handleDeleteItem={handleDeleteItem}
                  navigate={navigate}
                  handleEdit={handleSetEdit}
                  isBookingEdit={shouldBlock}
                  setCartRefinedData={setCartRefinedData}
                  setCartRawData={setCartRawData}
                />
                {/* <SpaceY />
                <SpaceY /> */}
                <TicketCartView
                  tickets={cartRefinedData?.adultIndividualTicketsMap || []}
                  adult_child_type={"성인"}
                  handleDeleteItem={handleDeleteItem}
                  navigate={navigate}
                  handleEdit={handleSetEdit}
                  isBookingEdit={shouldBlock}
                  setCartRefinedData={setCartRefinedData}
                  setCartRawData={setCartRawData}
                />
                <TicketCartView
                  tickets={cartRefinedData?.childIndividualTicketsMap || []}
                  adult_child_type={"아동"}
                  handleDeleteItem={handleDeleteItem}
                  navigate={navigate}
                  handleEdit={handleSetEdit}
                  isBookingEdit={shouldBlock}
                  setCartRefinedData={setCartRefinedData}
                  setCartRawData={setCartRawData}
                />
                <SpaceY />
                {!editItem && (hasSimCard || shuttleBusTickets.length > 0) && (
                  <div className="p-4 bg-white rounded-xl text-xs lg:text-sm text-black lg:text-sm font-bold">
                    꼭! 작성해 주세요.
                  </div>
                )}
                <SpaceY />
                {hasSimCard && (
                  <SimCardForm
                    title="유심 정보"
                    content={simCardFormContent}
                    formData={simCardFormData}
                    handleOnChange={handleSimCardFormSubmit}
                    setRq={updateRqScheduleDateTimeInItem}
                    rq={rqValue()}
                  />
                )}
                {shuttleBusTickets.map((formItem, index) => {
                  return (
                    <>
                      <SpaceY />
                      <ShuttleBusForm
                        title={`${formItem.name} - ${formItem.tour_date}`}
                        content={shuttleFormContent}
                        formData={shuttleBusTicketsFormData[index]}
                        index={index}
                        handleOnChange={handleShuttleBusFormSubmit}
                      />
                    </>
                  );
                })}
              </div>
              {((cartRawData?.adultInfo && cartRawData.adultInfo.length > 0) ||
                (cartRawData?.childInfo &&
                  cartRawData?.childInfo?.length > 0)) &&
                cartRefinedData?.totalPrice == 0 && (
                  <div>
                    <div className="flex flex-col items-center w-full mt-10 md:flex">
                      {/*<p className="text-blue"> - tamice doesn't want this comment. remove it for now
                        You have no balance to pay and the change will be updated in My Page.
                      </p>*/}
                    </div>
                    <div className="flex flex-col items-center w-full mt-10 md:flex">
                      <button
                        className="w-1/4 px-4 py-2  text-white bg-blue"
                        onClick={() => updateCartWithNoUpgrade()}
                      >
                        업데이트 하기
                      </button>
                    </div>
                  </div>
                )}
            </div>
            {cartRefinedData?.totalPrice !== 0 &&
              cartRefinedData?.totalPrice && (
                <div>
                  <Checkout
                    totalPrice={cartRefinedData?.totalPrice || 0}
                    hasSimCard={hasSimCard}
                    simCardFormData={simCardFormData}
                    shuttleBusTicketsFormData={shuttleBusTicketsFormData}
                  />
                </div>
              )}
          </div>
        </div>
      </main>
    </Elements>
  );
};
