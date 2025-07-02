import "./styles.css";
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Card } from "@square/web-sdk";
import { useMutation } from "@tanstack/react-query";
import { CartItem, cartState, orderLookupState } from "../../App";
import { API, poster } from "../../shared";
import { MainButton } from "../../shared/components/Buttons";
import { MainInput, PhoneInput } from "../../shared/components/Inputs";
import { SpaceY } from "../../shared/components/Utils";
import { getUserProfile } from "../../shared/hooks";
import { hasNullOrEmptyValue } from "../../shared/utils";
import { formatDateForTour } from "../../shared/utils/date-format";
import { LoadingContext } from "./components/checkout-context";

// Type for cartData
type cartData = {
  adultInfo: CartItem[];
  childInfo: CartItem[];
  selectInfo?: any[];
  simCardFormData: any;
  shuttleBusTicketsFormData: any;
};

// Function to get today's data with string format
const getTodayDate = () => {
  // Get today's date
  const today = new Date();

  // Extract year, month, and day from the date object
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed, so we add 1
  const day = String(today.getDate()).padStart(2, "0");

  // Combine the values to form the desired format
  return `${year}-${month}-${day}`;
};

// Get authToken and loginData from LocalStorage
const getAuthToken = () => localStorage.getItem("authToken");
const loginData = () => localStorage.getItem("loginData");

// Function to get cart Data from LocalStorage
const getCartDataFromLocalStorage = () => {
  const cartData = localStorage.getItem("CART_DATA");
  return cartData ? JSON.parse(cartData) : null;
};

// Function to get subTotal
const getSubTotal = (ticket: CartItem, map: Map<any, any>) => {
  let totalPrice = 0;
  let key = ticket?.cartId;
  let subCategoryId = ticket?.subCategoryId;
  if (key && subCategoryId) {
    let existingTickets = map.get(key) || [];
    if (existingTickets.length === 0) {
      totalPrice +=
        (Number(ticket?.subCategoryPrice) + Number(ticket?.addition)) * Number(ticket?.quantity);
    } else {
      totalPrice += Number(ticket?.addition) * Number(ticket?.quantity);
    }
    map.set(key, existingTickets.concat(ticket));
  } else {
    map.set(key, [ticket]);
    totalPrice += (Number(ticket?.price) + Number(ticket?.addition)) * Number(ticket?.quantity);
  }
  return totalPrice;
};

// Function to check if there are items from Booking to edit
const checkIfBookingEdit = ({
  childInfo,
  adultInfo,
}: {
  childInfo: CartItem[];
  adultInfo: CartItem[];
}) => {
  const combinedInfo = [...childInfo, ...adultInfo];
  let result = false;

  for (let item of combinedInfo) {
    if (item.reservation_id != null) result = true;
    break;
  }

  return result;
};

function parseForMusicalData(items: any) {
  const localCartData = localStorage.getItem("CART_DATA")
    ? JSON.parse(localStorage.getItem("CART_DATA") || "")
    : { adultInfo: [], childInfo: [] };

  let cartIndex = 0;
  return {
    items: items.map((one: any, i: number) => {
      return {
        id: one.id,
        adult_child_type: one.adult_child_type,
        price: one.price,
        quantity: one.quantity,
        price_list_id: one.price_list_id,
        sub_items: one.reservation_sub_items.map((sub_item: any) => {
          const musical_order = localCartData.adultInfo[cartIndex]?.musical_order || null;
          cartIndex++;
          return {
            id: sub_item.id,
            rq_schedule_datetime: sub_item.rq_schedule_datetime,
            refund_status: sub_item.refund_status,
            ticket_id: sub_item.ticket_id,
            musical_order: musical_order,
          };
        }),
      };
    }),
  };
}

// Function to parse cart Data
const parseCartData = (data: cartData) => {
  const combinedCartData = [...data.adultInfo, ...data.childInfo];
  const groupByCartId = new Map();
  let totalPrice = 0;

  combinedCartData?.forEach((ticket: CartItem) => {
    totalPrice += getSubTotal(ticket, groupByCartId);
  });

  const formatReservationInput: any[] = [];
  let shuttleBusIndex = -1;
  Array.from(groupByCartId.values()).forEach((cart) => {
    const item: any = {};
    if (cart[0].subCategoryId) {
      item.category_id = cart[0].categoryId;
      item.child_age = null;
      item.child_age = null;
      item.subcategory_id = Number(cart[0].subCategoryId);
      item.price_list_id = cart[0].priceOptionId;
      item.adult_child_type = cart[0].adult_child_type;
      item.quantity = cart[0].quantity;
      item.price = cart[0].subCategoryPrice;
      item.sub_items = cart.map((sub_item: any) => {
        sub_item?.ticket_type == "Shuttle bus" && shuttleBusIndex++;
        console.log("sub_item", sub_item);
        if (sub_item?.tour_date) {
          const formattedDatetimeString = formatDateForTour(sub_item?.tour_date);
          return {
            ticket_id: sub_item?.ticket_id,
            rq_schedule_datetime: formattedDatetimeString,
            sim_card_information:
              sub_item?.ticket_type == "SIM card"
                ? {
                    ...data.simCardFormData,
                  }
                : {},
            shuttle_bus_information:
              sub_item?.ticket_type == "Shuttle bus"
                ? { ...data.shuttleBusTicketsFormData[shuttleBusIndex] }
                : {},
          };
        } else {
          return {
            ticket_id: sub_item?.ticket_id,
            rq_schedule_datetime: sub_item?.ticket_type == "SIM card"? sub_item?.rq_schedule_datetime:null,
            sim_card_information:
              sub_item?.ticket_type == "SIM card"
                ? {
                    ...data.simCardFormData,
                  }
                : {},
            shuttle_bus_information:
              sub_item?.ticket_type == "Shuttle bus"
                ? { ...data.shuttleBusTicketsFormData[shuttleBusIndex] }
                : {},
          };
        }
      });
      let addition = 0;
      cart?.forEach((ticket: any) => {
        addition += Number(ticket?.addition) * Number(ticket?.quantity);
      });
      item.subTotal = cart[0].subCategoryPrice * cart[0].quantity + addition;
    } else {
      item.category_id = cart[0].categoryId || "1";
      item.child_age = null;
      item.subcategory_id = null;
      item.price_list_id = cart[0].priceOptionId || null;
      item.adult_child_type = cart[0].adult_child_type;
      item.quantity = cart[0].quantity;
      item.price = Number(cart[0].price);
      item.sub_items = cart.map((sub_item: any) => {
        sub_item?.ticket_type == "Shuttle bus" && shuttleBusIndex++;
        console.log("sub_item", sub_item);
        if (sub_item?.tour_date) {
          const formattedDatetimeString = formatDateForTour(sub_item?.tour_date);
          if (sub_item?.ticket_type == "Musicals & Shows") {
            const [datePart, timePart, modifier] = (
              sub_item?.tour_date || "2024-01-28 10:00 AM"
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
            // const date = new Date(ISODateString);

            const dateStr = sub_item?.tour_date;
            const date = new Date(dateStr);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            const hours = String(date.getHours()).padStart(2, "0");
            const minutes = String(date.getMinutes()).padStart(2, "0");
            const formattedDatetimeString = `${year}-${month}-${day} ${hours}:${minutes}`;

            return {
              ticket_id: sub_item?.ticket_id,
              rq_schedule_datetime: formattedDatetimeString,
              seating_info: sub_item?.location,
              musical_order: sub_item?.musical_order || null,
            };
          }
          return {
            ticket_id: sub_item?.ticket_id,
            rq_schedule_datetime: formattedDatetimeString,
            sim_card_information:
              sub_item?.ticket_type == "SIM card"
                ? {
                    ...data.simCardFormData,
                  }
                : {},
            shuttle_bus_information:
              sub_item?.ticket_type == "Shuttle bus"
                ? { ...data.shuttleBusTicketsFormData[shuttleBusIndex] }
                : {},
          };
        } else {
          return {
            ticket_id: sub_item?.ticket_id,
            rq_schedule_datetime: sub_item?.rq_schedule_datetime
              ? sub_item?.rq_schedule_datetime + " 00:00"
              : null,
            sim_card_information:
              sub_item?.ticket_type == "SIM card"
                ? {
                    ...data.simCardFormData,
                  }
                : {},
            shuttle_bus_information:
              sub_item?.ticket_type == "Shuttle bus"
                ? { ...data.shuttleBusTicketsFormData[shuttleBusIndex] }
                : {},
          };
        }
      });
      let addition = 0;
      cart?.forEach((ticket: any) => {
        addition += Number(ticket?.addition) * Number(ticket?.quantity);
      });
      item.subTotal = Number(cart[0].price) * cart[0].quantity + addition;
    }
    formatReservationInput.push(item);
  });

  return {
    data: formatReservationInput,
    totalPrice,
  };
};

// Function to extract params from the given url
const extractParams = (url: string) => {
  const urlParams = new URLSearchParams(new URL(url).search);
  const guestCheckout = urlParams.get("guestCheckout") === "true";
  return { guestCheckout };
};

// Checkout Component
const Checkout = ({ totalPrice, hasSimCard, simCardFormData, shuttleBusTicketsFormData }: any) => {
  // Create a navigate instance from useNavigate Hook
  const navigate = useNavigate();
  // Create a search from useLocation Hook to extract params from the search url
  const { search } = useLocation(); // ?email=jlfl94@gmail.com&order_number=4388608
  // Get guestCheckout from the given url with extractPrams function
  let { guestCheckout } = extractParams(
    `http://localhost:${process.env.REACT_APP_PORT}/my-page${search}`
  );

  // Define Global State Variables
  const [cart, setCart] = cartState.useState();
  const [orderLookup, setOrderLookup] = orderLookupState.useState();
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  // Define Component State Variables
  const [hasUserProfile, setHasUserProfile] = useState(false);
  const [discount, setDiscount] = useState("");
  const [credit, setCredit] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [paymentType, setPaymentType] = useState("credit_card");
  //square payment
  const [paymentStatus, setPaymentStatus] = useState("");
  const [card, setCard] = useState<any>(null);
  const [policyChecked, setPolicyChecked] = useState<boolean>(false);
  const [tryPurchaseWithoutCheckTerm, setTryPurchaseWithoutCheckTerm] = useState<boolean>(false);
  const [cartSelectInfo, setCartSelectInfo] = useState(getCartDataFromLocalStorage()?.selectInfo);
  const [hasUserPhoneNumber, setHasUserPhoneNumber] = useState(false);
  const [hasUserFirstName, setHasUserFirstName] = useState(false);
  const [hasUserLastName, setHasUserLastName] = useState(false);

  // Base url
  const baseUrl = window.location.port
    ? `${window.location.protocol}//${window.location.hostname}:${window.location.port}`
    : `${window.location.protocol}//${window.location.hostname}`;

  // const [reservationsData] = reservationsState.useState();
  // Get reservation data from LocalStorage
  let reservationsData: any;
  const localReservationData = localStorage.getItem("reservationData");
  reservationsData = localReservationData ? JSON.parse(localReservationData) : null;
  const editItem = JSON.parse(localStorage.getItem("Edit_Item") || "{}");
  // Get authToken from getAuthToken function
  const authToken = getAuthToken();
  const isLoggedIn = authToken && loginData() === "email";

  // this value is rq_schedule_datetime from the cart, will be used for simcard
  const rqValue = () => {
    let cartData = localStorage.getItem("CART_DATA")
      ? JSON.parse(localStorage.getItem("CART_DATA") || "")
      : { adultInfo: [], childInfo: [] };
    if (editItem) {
      return cartData.adultInfo.find((item: any) => item.ticket_type === "SIM card")
        ?.rq_schedule_datetime;
    }
    return cartData.adultInfo[0]?.rq_schedule_datetime;
  };

  const { mutateAsync: onUpdate } = useMutation(
    poster(`/profile-update`, authToken as string, "POST")
  );
  // Define user's info with useForm Hook
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset,
    getValues,
  } = useForm({
    defaultValues: {
      koreanFullName: "",
      lastName: "",
      firstName: "",
      email: "",
      confirmEmail: "",
      phone: "",
      departureDate: "",
    },
    // resolver: yupResolver(schema),
  });

  // Define useEffect Hooks here
  useEffect(() => {
    if (localStorage.getItem("orderLoginNumber")) {
      // if non-member orderLookup
      reset({
        ...getValues(),
        koreanFullName: localStorage.getItem("customer_name_kr") || "",
        lastName: localStorage.getItem("customer_name_en")
          ? (localStorage.getItem("customer_name_en") || "").split(" ")[1]
          : "",
        firstName: localStorage.getItem("customer_name_en")
          ? (localStorage.getItem("customer_name_en") || "").split(" ")[0]
          : "",
        email: localStorage.getItem("orderLoginEmail") || "",
        confirmEmail: localStorage.getItem("orderLoginEmail") || "",
        phone: localStorage.getItem("phone") || "",
        departureDate: "",
      });
      getValues()?.phone ? setHasUserPhoneNumber(true) : setHasUserPhoneNumber(false);
      setHasUserFirstName(getValues()?.firstName ? true : false)
      setHasUserLastName(getValues()?.lastName ? true : false)
      setHasUserProfile(true);
    } else {
      //if not non-member orderLookup
      if (!guestCheckout) {
        // logged users
        const getUserData = async () => {
          const data = await getUserProfile(guestCheckout);
          if (data) {
            const role = localStorage.getItem("role");
            if (role === "1" || role === "2") {
              reset({
                ...getValues(),
                koreanFullName: "",
                lastName: "",
                firstName: "",
                email: "",
                confirmEmail: "",
                phone: "",
              });
              setHasUserProfile(false);
              setHasUserPhoneNumber(false);
            } else {
              const values = getValues();
              
              reset({
                ...values,
                koreanFullName: data.user?.name,
                lastName: data.user?.lastname || '',
                firstName: data.user?.firstname || '',
                email: data.user?.email,
                confirmEmail: data.user?.email,
                phone: data.user?.phone,
              });
              setHasUserFirstName(getValues()?.firstName ? true : false)
              setHasUserLastName(getValues()?.lastName ? true : false)
              setHasUserPhoneNumber(getValues()?.phone ? true : false);
              setHasUserProfile(true);
            }
          }

          // // if the admin user is entered this page due to editing...
          // if (localStorage.getItem("customerInfo")) {
          //   const customerInfo = localStorage.getItem("customerInfo");
          //   if (customerInfo) {
          //     reset({
          //       ...getValues(),
          //       ...JSON.parse(customerInfo)
          //     });
          //     setHasUserProfile(true);
          //   }
          // }
        };
        getUserData();
      } else {
        // guest checkout
        reset({
          ...getValues(),
          koreanFullName: "",
          lastName: "",
          firstName: "",
          email: "",
          confirmEmail: "",
          phone: "",
          departureDate: "",
        });
      }
    }
  }, [guestCheckout, orderLookup, localStorage.getItem("orderLoginNumber")]);

  useEffect(() => {
    return () => {
      console.log("unmounting cart view");
      reset();
      Swal.close();
    };
  }, []);

  useEffect(() => {
    if (
      (paymentType === "credit_card" && authToken) ||
      guestCheckout ||
      localStorage.getItem("orderLoginNumber")
    ) {
      const applicationId = process.env.REACT_APP_APPLICATION_ID || "";
      const locationId = process.env.REACT_APP_LOCATION_ID;
      if (window.Square) {
        const payments = window.Square.payments(applicationId, locationId);
        payments.card().then((card: Card) => {
          setCard(card);
          document.querySelector<HTMLDivElement>("#card-container")!.innerHTML = "";
          card.attach("#card-container");
        });
      }
    }
  }, [paymentType]);

  // Function to handle cardNumber change
  const handleCardNumberChange = (value: any, onChange: any) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    onChange(numericValue);
  };

  // Function to handle pay amount change
  const handleChange = (value: string) => {
    const num = value.includes("$") ? value.substring(1) : value;
    const max = parseFloat(totalPrice) - parseDiscount(credit);
    setDiscount(isDiscountBelowZero(num) ? num : max.toString());
  };

  // Function to parse discount
  const parseDiscount = (value: string) => {
    if (value === "") return 0;
    else return parseFloat(value);
  };

  // Function to handle payment change
  const handlePaymentChange = (value: string) => {
    setPaymentType(value);
  };

  // Function to handle credit change
  const handleCreditChange = (value: string) => {
    const num = value.includes("$") ? value.substring(1) : value;
    const max = parseFloat(totalPrice) - parseDiscount(discount);
    setCredit(isCreditBelowZero(num) ? num : max.toString());
  };

  // Function to check if credit is below zero
  const isCreditBelowZero = (num: string) => {
    return parseFloat(totalPrice) - parseDiscount(discount) - parseDiscount(num) >= 0;
  };

  // Function to check if discount is below zero
  const isDiscountBelowZero = (num: string) => {
    return parseFloat(totalPrice) - parseDiscount(credit) - parseDiscount(num) >= 0;
  };

  /**
   * handleBuyOnInbound
   *
   * this function should be called once payment has been processed
   * it is meant to process info that was on the cart
   */
  const handleBuyOnInbound = async (firstName: string, lastName: string, email: string) => {
    try {
      // Get combinedCartData
      const combinedCartData = [...cart.adultInfo, ...cart.childInfo];
      // console.log("combinedCartData", combinedCartData);
      // Get only cartIds from combinedCartData
      const cartIds = combinedCartData.map((item: any) => item.cartId);
      // console.log("cartIds", cartIds);
      // Get selectInfo array for musical inbound
      const selectInfoArray = cartSelectInfo.filter((selectInfo: any) =>
        cartIds.includes(selectInfo.cartId)
      );
      // console.log("selectInfoArray", selectInfoArray);
      // Make api requests from the selectInfoArray
      const apiRequests = selectInfoArray.map((selectInfo: any) => {
        return axios.post(`${API}/buy-seat`, {
          product_id: selectInfo.product_id,
          show_code: selectInfo.show_code,
          quantity: selectInfo.quantity,
          event_date_time: selectInfo.event_date_time,
          price: selectInfo.price,
          booking_last_name: lastName,
          booking_first_name: firstName,
          booking_email_address: email,
          area: selectInfo.seating_info.Seat.Area,
          low_seat_num: selectInfo.seating_info.Seat.LowSeatNumber,
          high_seat_num: selectInfo.seating_info.Seat.HighSeatNumber,
          row: selectInfo.seating_info.Seat.Row,
          section: selectInfo.seating_info.Seat.Section,
          session_id: selectInfo.session,
        });
      });
      // create a fake api request for testing
      // const apiRequests = selectInfoArray.map((selectInfo: any) => {
      //   return new Promise((resolve, reject) => {
      //     setTimeout(() => {
      //       resolve({ data: { OrderID: "123456" } });
      //     }, 1000);
      //   });
      // });

      // Wait until all api requests are called
      const result = await Promise.all(apiRequests);
      // Get Cart Data from localStorage
      let cartData = localStorage.getItem("CART_DATA")
        ? JSON.parse(localStorage.getItem("CART_DATA") || "")
        : { adultInfo: [], childInfo: [] };

      localStorage.setItem(
        "CART_DATA",
        JSON.stringify({
          adultInfo: cart.adultInfo.map((adultItem: any) => {
            // Get the index of selectInfoArray which has same cardId as this adultItem cartId
            let index = selectInfoArray.findIndex(
              (selectInfo: any) => selectInfo.cartId === adultItem.cartId
            );
            if (index > -1) {
              return {
                ...adultItem,
                musical_order: result[index]?.data?.OrderID,
              };
            } else {
              return adultItem;
            }
          }),
          childInfo: cart.childInfo,
          selectInfo: cartData?.selectInfo,
        })
      );

      // Set musical_order for musical orderId based on the above response
      setCart({
        adultInfo: cart.adultInfo.map((adultItem: any) => {
          // Get the index of selectInfoArray which has same cardId as this adultItem cartId
          let index = selectInfoArray.findIndex(
            (selectInfo: any) => selectInfo.cartId === adultItem.cartId
          );
          if (index > -1) {
            return {
              ...adultItem,
              musical_order: result[index]?.data?.OrderID,
            };
          } else {
            return adultItem;
          }
        }),
        childInfo: cart.childInfo,
      });

      // Return true once all the apis are successful
      return true;
    } catch (error) {
      console.log("Error buying ticket", error);

      // Return false if there are some issues
      return false;
    }
  };

  // Function to check if there are tickets except for musicals
  const checkOtherTickets = () => {
    let isOtherTicket = false;

    // Get combinedCartData
    const combinedCartData = [...cart.adultInfo, ...cart.childInfo];

    // Get only cartIds from combinedCartData
    const cartIds = combinedCartData.map((item: any) => item.cartId);

    // Check if there are other tickets except for musicals
    cartIds.forEach((id: any) => {
      if (!cartSelectInfo.map((item: any) => item.cartId).includes(id)) {
        isOtherTicket = true;
        return;
      }
    });

    return isOtherTicket;
  };

  // Function to check if firstname contains numbers
  const checkFirstNameContainNumbers = (text: string) => {
    let num = (text.match(/[0-9]/g) || []).length;

    if (num > 0) {
      return setError("firstName", {
        message: "First Name should not contain digits!",
      });
    } else {
      return clearErrors("firstName");
    }
  };

  // Function to check if lastname contains numbers
  const checkLastNameContainNumbers = (text: string) => {
    let num = (text.match(/[0-9]/g) || []).length;
    //Or can use this: /\d/.test(text)

    if (num > 0) {
      return setError("lastName", {
        message: "Last Name should not contain digits!",
      });
    } else {
      return clearErrors("lastName");
    }
  };

  // Function to check if koreanFullName contains numbers
  const checkFullNameContainNumbers = (text: string) => {
    let num = (text.match(/[0-9]/g) || []).length;

    if (num > 0) {
      return setError("koreanFullName", {
        message: "Korean FullName should not contain digits!",
      });
    } else {
      return clearErrors("koreanFullName");
    }
  };

  // Function to set email confirmation error
  const setEmailConfirmError = (text: string) => {
    if (email === text || confirmEmail === text) {
      return clearErrors("confirmEmail");
    } else {
      return setError("confirmEmail", {
        message: "이메일이 일치하지 않습니다!",
      });
    }
  };

  // Function to set email error
  const setEmailError = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email)) {
      return clearErrors("email");
    } else {
      return setError("email", {
        message: "유효하지 않은 이메일 주소 입니다.",
      });
    }
  };

  async function confirmSubmit(formData: any) {
    const result = { status: "OK" };
    if (result.status === "OK")
      return Swal.fire({
        title: `<span class="info-block_title">결제를 진행하시겠습니까?</span>`,
        html: `
        <div class="info-block">
         <p>구매 후 결제 완료까지 사용자 환경에 따라 시간이 소요될 수<span class="break-before">있습니다.</span></p>
          <br/>
          <p>결제가 완료될 때까지 브라우저를 닫거나 새로고침 하지 마십시오.</p>
        </div>
        `,
        showCancelButton: true,
        confirmButtonText: "예",
        cancelButtonText: "아니요",
        allowOutsideClick: false,
        width: "600px",
        customClass: {
          popup: "h-80",
        },
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          return onSubmit(formData);
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });

    return toast.error("크레딧카드 정보를 입력해 주세요.");
  }
  console.log({ simCardFormData, shuttleBusTicketsFormData });
  // Function to submit after clicking pay
  const onSubmit = async (formData: any) => {
    const rq_schedule_datetime = rqValue();

    // Check if the simcard form was filled out
    if (
      (hasSimCard && !rq_schedule_datetime) ||
      shuttleBusTicketsFormData.find((formItem: any) => hasNullOrEmptyValue(formItem))
    ) {
      await Swal.fire({
        icon: "warning",
        title: "필수 항목을 확인하고 작성해 주세요!",
      });
      return;
    }

    // Return if !policyChecked and show warning text with red color
    if (!policyChecked) {
      setTryPurchaseWithoutCheckTerm(true);
      return;
    }
    setIsLoading(true);
    await onUpdate({ phone: getValues().phone, firstname: getValues().firstName, lastname: getValues().lastName })
      .then(() => {
        // toast.success("데이터가 성공적으로 업데이트되었습니다.");
        // toast.success("Data updated successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.error);
        setIsLoading(false);
        return;
      })
      .finally(() => {
        // alert("finally")
      });
    let cartData = localStorage.getItem("CART_DATA")
      ? JSON.parse(localStorage.getItem("CART_DATA") || "")
      : { adultInfo: [], childInfo: [], selectInfo: [] };

    const ticketToRemove = cartData.adultInfo.filter((item: any) => {
      return (
        item?.ticket_type === "Musicals & Shows" && Date.now() - item.time > 230 * 1000 // 230 seconds
      );
    });

    if (ticketToRemove.length > 0) {
      const listHtml = ticketToRemove
        .map((item: any) => `<li style="margin-left: 30px;">${item.name}</li>`)
        .join("");
      const expiredTimerIds = ticketToRemove.map((item: any) => item.cartId);
      await Swal.fire({
        icon: "warning",
        // title: "Oops...",
        html: `
          <div style="text-align: left;">
          티켓 구매 중에 아래 티켓에서 시스템 오류가 발생하였습니다.
          처음부터 다시 진행하시거나 service@tamice.com으로
          문의해 주시면 감사하겠습니다.<br><br>
            <ul style="list-style-type:disc">${listHtml}</ul>
            </div>`,
      });

      cartData.adultInfo = cartData.adultInfo.filter(
        (item: any) => !expiredTimerIds.includes(item.cartId)
      );
      // console.log(cart);
      cartData["selectInfo"] = cartData?.selectInfo?.filter(
        (item: any) => !expiredTimerIds.includes(item.cartId)
      );
      localStorage.setItem("CART_DATA", JSON.stringify(cartData));
      setCart(cartData);
      setIsLoading(false);
      // Navigate to musical main page
      navigate("/musicals_view");
      return;
    }

    let hasEmptyValue = Object.keys(getValues()).some(
      (key) => key !== "departureDate" && (formData[key] === "" || formData[key] === undefined)
    );

    if (hasEmptyValue) {
      // One or more form values are empty
      Swal.fire({
        icon: "warning",
        title: "고객 정보가 필요 합니다.",
        text: "고객 정보 란을 모두 입력해 주세요.",
        confirmButtonText: "확인",
      });
      setIsLoading(false);
      return;
    }
    // All form values are non-empty
    if (formData.email !== formData.confirmEmail) {
      setIsLoading(false);
      return setError("confirmEmail", {
        message: "Email does not match",
      });
    }
    // Define stripeToken to store stripe token
    let stripeToken;

    // return;
    if (paymentType === "credit_card") {
      try {
        const result = await card.tokenize();
        stripeToken = result?.token;
        if (result?.status === "OK") {
          // card.destroy();  //To Hide the Credit-card details card
          await card.clear(); // To clear the card details
          let isEdit = checkIfBookingEdit(cart);

          if (isEdit) {
            // Edit case
            // Logic to check musical tickets to send buyinbound call
            if (cartSelectInfo && cartSelectInfo?.length) {
              const buyInboundResult = await handleBuyOnInbound(
                formData.firstName,
                formData.lastName,
                localStorage.getItem("orderLoginNumber")
                  ? localStorage.getItem("orderLoginEmail")
                  : formData.email
              );

              if (!buyInboundResult) {
                if (checkOtherTickets()) {
                  // If there are other type tickets, show msg to process without just musical tickets
                  await Swal.fire({
                    icon: "error",
                    // title: "Musical BuyInbound Error",
                    text: "뮤지컬 구매 처리 중 서버 오류가 발생했습니다! service@tamice.com으로 문의해 주시고 뮤지컬 티켓을 제거한 후 다른 티켓을 구매해보세요.",
                  });
                } else {
                  // If there are only musical tickets, just show error message
                  await Swal.fire({
                    icon: "error",
                    // title: "Musical BuyInbound Error",
                    text: "현재 뮤지컬 티켓 구매가 불가능합니다. service@tamice.com으로 문의해 주시기 바랍니다.",
                  });
                }

                // Stop the creating reservation api which is payment process
                return;
              }
            }

            // Parse the cart data
            let localCartData = localStorage.getItem("CART_DATA")
              ? JSON.parse(localStorage.getItem("CART_DATA") || "")
              : { adultInfo: [], childInfo: [] };

            let apiUrls: any = [];
            const combinedCartData = [...localCartData.adultInfo, ...localCartData.childInfo];
            // Get distinct reservation Ids
            const reservationIds = combinedCartData.map((obj: any) => obj.reservation_id);
            let distinctReservationIds: any = [];

            for (let i = 0; i < reservationIds.length; i++) {
              if (distinctReservationIds.indexOf(reservationIds[i]) === -1) {
                distinctReservationIds.push(reservationIds[i]);
              }
            }

            for (let reservationId of distinctReservationIds) {
              let items: any = [];
              let subItems = combinedCartData.filter(
                (it: any) => it.reservation_id === reservationId && it.subtotal !== -100
              );
              let reservations = reservationsData.reservations;
              let currentReservation: any =
                reservations[reservations.findIndex((it: any) => it.id === reservationId)];

              let currentItemBeforeUpdate: any = currentReservation.reservation_items.filter(
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
                  data.reservation_sub_items?.map((subitem: any) => ({
                    id: subitem.id,
                    rq_schedule_datetime: subitem.rq_schedule_datetime,
                    ticket_id: subitem.ticket_id,
                    refund_status: subitem.refund_status,
                    ticket_sent_status: subitem?.ticket_sent_status,
                  })) || [],
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

                category_id: subItems[0].categoryId ? parseFloat(subItems[0].categoryId) : null,
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
                        hours === "12" ? "00" : Number(hours) + (ampm === "PM" ? 12 : 0);

                      // Combine the date and time components in the desired format
                      const convertedDateTimeString = `${date} ${convertedHours}:${minutes}`;

                      // // Extracting components from the datetime string
                      // const year = datetimeString.substring(0, 4);
                      // const month = datetimeString.substring(5, 7) - 1; // Subtract 1 because months start from 0 (January is 0)
                      // const day = datetimeString.substring(8, 10);
                      // let hours = parseInt(datetimeString.substring(11, 13));
                      // const minutes = parseInt(datetimeString.substring(14, 16));
                      // const ampm = datetimeString.substring(16);

                      // // Adjusting hours for AM/PM format
                      // if (ampm === "PM" && hours !== 12) {
                      //   hours += 12;
                      // } else if (ampm === "AM" && hours === 12) {
                      //   hours = 0;
                      // }

                      // // Creating the new Date object
                      // let newDate = new Date(year, month, day, hours, minutes);
                      return {
                        id:
                          it.ticket_id.split("+")[1] == "null"
                            ? null
                            : Number(it.ticket_id.split("+")[1]),
                        rq_schedule_datetime: convertedDateTimeString,
                        ticket_id: Number(it.ticket_id.split("+")[0]),
                        refund_status: it?.refund_status || null,
                        ticket_sent_status: it?.ticket_sent_status,
                        ...(shuttleBusTicketsFormData.find((x: any)=> x.ticket_id === it.ticket_id || x.ticket_id.split("+")?.[0] === it.ticket_id) && {shuttle_bus_information: shuttleBusTicketsFormData.find((x: any)=> x.ticket_id === it.ticket_id || x.ticket_id.split("+")?.[0] === it.ticket_id)}),
                        ...((it.ticket_type == "SIM card" && !it.ticket_sent_status) && {sim_card_information: simCardFormData})
                      };
                    } else {
                      return {
                        id:
                          it.ticket_id.split("+")[1] == "null"
                            ? null
                            : Number(it.ticket_id.split("+")[1]),
                        rq_schedule_datetime: it?.ticket_type == "SIM card"? it?.rq_schedule_datetime:null,
                        ticket_id: Number(it.ticket_id.split("+")[0]),
                        refund_status: it?.refund_status || null,
                        ticket_sent_status: it?.ticket_sent_status,
                        ...(shuttleBusTicketsFormData.find((x: any)=> x.ticket_id === it.ticket_id || x.ticket_id.split("+")?.[0] === it.ticket_id) && {shuttle_bus_information: shuttleBusTicketsFormData.find((x: any)=> x.ticket_id === it.ticket_id || x.ticket_id.split("+")?.[0] === it.ticket_id)}),
                        ...((it.ticket_type == "SIM card" && !it.ticket_sent_status) && {sim_card_information: simCardFormData})
                      };
                    }
                  }),
                ]?.sort((a:any, b:any)=> a.id - b.id),
                subTotal: subItems[0].subtotal,
              };

              items.push(currentItem);

              apiUrls.push({
                url: `${API}/reservations/user-create/${subItems[0].reservation_id}`,
                items,
                stripe_token: stripeToken,
              });
            }

            const apiRequests = apiUrls.map((urlItem: any) =>
              axios.put(urlItem.url, {
                items: urlItem.items,
                stripe_token: urlItem.stripe_token,
              })
            );
            const result = await Promise.all(apiRequests);

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
                  localStorage.getItem("role") === "1" || localStorage.getItem("role") === "2"
                    ? "OK"
                    : "마이페이지로 이동하기",
              });

              // Only for users, navigating to My booking is allowed
              if (!(localStorage.getItem("role") === "1" || localStorage.getItem("role") === "2")) {
                if (guestCheckout || localStorage.getItem("orderLoginNumber")) {
                  // Update state variable with the response
                  setOrderLookup({
                    orderLoginNumber: result[0].data.order_number,
                    orderLoginEmail: result[0].data.email,
                    phone: result[0].data.phone,
                    customer_name_kr: result[0].data.customer_name_kr,
                    customer_name_en: result[0].data.customer_name_en,
                  });

                  localStorage.setItem("orderLoginNumber", result[0].data.order_number);
                  localStorage.setItem("orderLoginEmail", result[0].data.email);
                  localStorage.setItem("phone", result[0].data.phone);
                  localStorage.setItem("customer_name_en", result[0].data.customer_name_en);
                  localStorage.setItem("customer_name_kr", result[0].data.customer_name_kr);

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
              // console.log("Error: " + result?.status);
              Swal.fire({
                icon: "warning",
                // title: "Something wrong!",
                // text: "Please try again!",
                title: "예기치 못한 오류가 발생했습니다.",
                html: `이 메세지가 반복해서 나타날 경우, <a href="https://pf.kakao.com/_AAelu" style="color:#009eef; text-decoration: underline;" target=”blank”> 타미스 카카오톡 채널 </a> 혹은 이메일 (service@tamice.com) 로 문의해 주세요.`,
                confirmButtonText: "확인",
              });
            }
          } else {
            // Parse the cart data
            let localCartData = localStorage.getItem("CART_DATA")
              ? JSON.parse(localStorage.getItem("CART_DATA") || "")
              : { adultInfo: [], childInfo: [] };

            const { data: cartData } = parseCartData({
              adultInfo: localCartData?.adultInfo,
              childInfo: localCartData?.childInfo,
              simCardFormData,
              shuttleBusTicketsFormData,
            });
            console.log("cartData", cartData);
            // Make the post request if new
            // Create the payload for the post request
            const payload = {
              payment_type: "Credit Card",
              fullname: formData.koreanFullName,
              first_name: formData.firstName,
              last_name: formData.lastName,
              email_confirmation: localStorage.getItem("orderLoginNumber")
                ? localStorage.getItem("orderLoginEmail")
                : formData.confirmEmail,
              departure_date: formData.departureDate || null,
              order_date: getTodayDate(),
              customer_name_kr: formData.koreanFullName || "Placeholder Korean Name",
              customer_name_en: `${formData.firstName} ${formData.lastName}`,
              email: localStorage.getItem("orderLoginNumber")
                ? localStorage.getItem("orderLoginEmail")
                : formData.email,
              phone: formData.phone,
              discount_amount: parseDiscount(discount),
              stripe_token: stripeToken,
              items: cartData || [],
              vendor_comissions: [],
            };

            const token = localStorage.getItem("authToken");
            const headers = {
              Authorization: `Bearer ${token}`,
            };

            const { data: reservations, status } = await axios.post(
              `${API}/reservations/user-create`,
              payload,
              { headers }
            );

            if (status === 201) {
              if (cartSelectInfo && cartSelectInfo?.length) {
                const buyInboundResult = await handleBuyOnInbound(
                  formData.firstName,
                  formData.lastName,
                  localStorage.getItem("orderLoginNumber")
                    ? localStorage.getItem("orderLoginEmail")
                    : formData.email
                );
                if (!buyInboundResult) {
                  if (checkOtherTickets()) {
                    // If there are other type tickets, show msg to process without just musical tickets
                    await Swal.fire({
                      icon: "error",
                      // title: "Musical BuyInbound Error",
                      text: "뮤지컬 구매 처리 중 서버 오류가 발생했습니다! service@tamice.com으로 문의해 주시고 뮤지컬 티켓을 제거한 후 다른 티켓을 구매해보세요.",
                    });
                  } else {
                    // If there are only musical tickets, just show error message
                    await Swal.fire({
                      icon: "error",
                      // title: "Musical BuyInbound Error",
                      text: "현재 뮤지컬 티켓 구매가 불가능합니다. service@tamice.com으로 문의해 주시기 바랍니다.",
                    });
                  }

                  // Stop the creating reservation api which is payment process
                  return;
                }
              }
              if (cart.adultInfo.some((one) => one.ticket_type === "Musicals & Shows")) {
                const newPayload = parseForMusicalData(reservations.reservation_items);
                await axios.put(`${API}/reservations/user-create/${reservations.id}`, newPayload, {
                  headers,
                });
              }

              // Handle the response (assuming it's successful)
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
                  localStorage.getItem("role") === "1" || localStorage.getItem("role") === "2"
                    ? "OK"
                    : "마이페이지로 이동하기",
              });
              // Only for users, navigating to My booking is allowed
              if (!(localStorage.getItem("role") === "1" || localStorage.getItem("role") === "2")) {
                if (guestCheckout || localStorage.getItem("orderLoginNumber")) {
                  // Update state variable with the response
                  setOrderLookup({
                    orderLoginNumber: reservations.order_number,
                    orderLoginEmail: reservations.email,
                    phone: reservations.phone,
                    customer_name_kr: reservations.customer_name_kr,
                    customer_name_en: reservations.customer_name_en,
                  });

                  localStorage.setItem("orderLoginNumber", reservations.order_number);
                  localStorage.setItem("orderLoginEmail", reservations.email);
                  localStorage.setItem("phone", reservations.phone);
                  localStorage.setItem("customer_name_en", reservations.customer_name_en);
                  localStorage.setItem("customer_name_kr", reservations.customer_name_kr);

                  // navigate to my boooking page directly
                  navigate(
                    `/my-page?email=${reservations.email}&order_number=${reservations.order_number}`
                  );

                  // Add user count to current ticket
                } else {
                  navigate("/my-page");
                }
              } else {
                window.location.reload();
              }
            } else {
              throw new Error("Opps, Something wrong");
            }
          }
        } else {
          // Something wrong with card token
          Swal.fire({
            icon: "error",
            title: "잘못된 결제 정보",
            //text: "Please input all billing information correctly!",
            text: "정확한 결제 정보를 입력해 주세요!",
          }).then(() => {
            setIsLoading(false);
          });
        }
      } catch (error: any) {
        // Handle the error
        console.log("error while processing payment:", error);

        if (error?.response?.status === 422) {
          if (Array.isArray(error.response?.data) && error.response?.data?.length > 0) {
            error.response?.data.map((item: any) => {
              toast.error(item);
            });
          } else {
            toast.error(error.response?.data || "카드 정보를 확인하신 후 다시 시도해 주세요.");
          }
        } else {
          const errorMessage =
            error?.response?.data?.message ||
            //"An unexpected error occurred. Please try again later.";
            "시스템 문제가 발생했습니다. 잠시 후 다시 시도해주세요";

          Swal.fire({
            icon: "error",
            //title: "Oops...",
            title: "시스템 문제",
            text: errorMessage,
          });
        }
      } finally {
        setIsLoading(false);
      }
    } else if (paymentType === "cash") {
      localStorage.setItem("customerInfo", JSON.stringify(getValues()));
      const token = localStorage.getItem("authToken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      try {
        // Logic to check musical tickets to send buyinbound call
        if (cartSelectInfo && cartSelectInfo?.length) {
          const buyInboundResult = await handleBuyOnInbound(
            formData.firstName,
            formData.lastName,
            formData.email
          );

          if (!buyInboundResult) {
            if (checkOtherTickets()) {
              // If there are other type tickets, show msg to process without just musical tickets
              await Swal.fire({
                icon: "error",
                // title: "Musical BuyInbound Error",
                text: "뮤지컬 구매 처리 중 서버 오류가 발생했습니다! service@tamice.com으로 문의해 주시고 뮤지컬 티켓을 제거한 후 다른 티켓을 구매해보세요.",
              });
            } else {
              // If there are only musical tickets, just show error message
              await Swal.fire({
                icon: "error",
                // title: "Musical BuyInbound Error",
                text: "현재 뮤지컬 티켓 구매가 불가능합니다. service@tamice.com으로 문의해 주시기 바랍니다.",
              });
            }

            // Stop the creating reservation api which is payment process
            return;
          }
        }

        // Parse the cart data
        // const { data: cartData } = parseCartData(cart);
        // Parse the cart data
        let localCartData = localStorage.getItem("CART_DATA")
          ? JSON.parse(localStorage.getItem("CART_DATA") || "")
          : { adultInfo: [], childInfo: [] };

        const { data: cartData } = parseCartData({
          adultInfo: localCartData?.adultInfo,
          childInfo: localCartData?.childInfo,
          simCardFormData,
          shuttleBusTicketsFormData,
        });
        // Make the post request if new
        // Create the payload for the post request
        const payload = {
          fullname: formData.koreanFullName,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email_confirmation: formData.confirmEmail,
          departure_date: formData.departureDate || null,
          order_date: getTodayDate(),
          customer_name_kr: formData.koreanFullName || "Placeholder Korean Name",
          customer_name_en: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          discount_amount: parseDiscount(discount),
          payment_type: "Cash",
          credit: parseDiscount(credit),
          stripe_token: null,
          items: cartData || [],
          vendor_comissions: [],
        };

        const { data: reservations, status } = await axios.post(
          `${API}/reservations/user-create`,
          payload,
          { headers }
        );

        if (status === 201) {
          // Handle the response (assuming it's successful)
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
              localStorage.getItem("role") === "1" || localStorage.getItem("role") === "2"
                ? "OK"
                : "마이페이지로 이동하기",
          });

          // if (guestCheckout || localStorage.getItem("orderLoginNumber")) {
          //   // Update state variable with the response
          //   setOrderLookup({
          //     orderLoginNumber: reservations.order_number,
          //     orderLoginEmail: reservations.email,
          //     phone: reservations.phone,
          //     customer_name_kr: reservations.customer_name_kr,
          //     customer_name_en: reservations.customer_name_en,
          //   });

          //   localStorage.setItem("orderLoginNumber", reservations.order_number);
          //   localStorage.setItem("orderLoginEmail", reservations.email);
          //   localStorage.setItem("phone", reservations.phone);
          //   localStorage.setItem("customer_name_en", reservations.customer_name_en);
          //   localStorage.setItem("customer_name_kr", reservations.customer_name_kr);

          //   // navigate to my boooking page directly
          //   navigate(
          //     `/my-page?email=${reservations.email}&order_number=${reservations.order_number}`
          //   );

          //   // Add user count to current ticket

          // } else {

          // }
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

          // Only for users, navigating to My booking is allowed
          if (!(localStorage.getItem("role") === "1" || localStorage.getItem("role") === "2")) {
            navigate("/my-page");
          } else {
            window.location.reload();
          }
        } else {
          throw new Error("시스템 문제가 발생했습니다. 잠시 후 다시 시도해주세요");
        }
      } catch (error: any) {
        // Handle the error

        if (error?.response?.status === 422) {
          toast.error(error?.response?.data);
        } else {
          const errorMessage =
            error?.response?.data?.message ||
            //"An unexpected error occurred. Please try again later.";
            "시스템 문제가 발생했습니다. 잠시 후 다시 시도해주세요";
          Swal.fire({
            icon: "error",
            //title: "Oops...",
            title: "시스템 문제",
            text: errorMessage,
          });
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isLoggedIn || guestCheckout || localStorage.getItem("orderLoginNumber")) {
    return (
      <section className="w-full mt-4 xl:mt-0">
        {isLoading && (
          <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-25 z-[600]">
            <div className="w-16 h-16 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
          </div>
        )}
        <div className="p-4 mb-5 bg-white rounded-xl">
          {/* <SpaceY />
          <SpaceY /> */}
          <div className="mb-4">
            <span className="font-normal font-poppins text-darkGray">고객 정보</span>
          </div>
          {/* <SpaceY /> */}
          {/* <SpaceY /> */}
          <Controller
            name="koreanFullName"
            rules={{
              required: {
                message: "이름을 기입해 주세요",
                value: true,
              },
            }}
            control={control}
            render={({ field }) => (
              <MainInput
                disabled={hasUserProfile}
                error={errors.koreanFullName?.message}
                containerClassName="w-full"
                placeholder="한글 성함 *"
                value={field.value}
                onChange={(value) => {
                  checkFullNameContainNumbers(value);
                  field.onChange(value);
                }}
              />
            )}
          />
          <SpaceY />
          <Controller
            name="lastName"
            rules={{
              required: {
                message: "이름을 기입해 주세요",
                value: true,
              },
            }}
            control={control}
            render={({ field }) => (
              <MainInput
                error={errors.lastName?.message}
                disabled={hasUserLastName}
                containerClassName="w-full"
                value={field.value}
                placeholder="영문 성 *"
                onChange={(value) => {
                  checkLastNameContainNumbers(value);
                  field.onChange(value);
                }}
              />
            )}
          />{" "}
          <SpaceY />
          <Controller
            name="firstName"
            rules={{
              required: {
                message: "이름을 기입해 주세요",
                value: true,
              },
            }}
            control={control}
            render={({ field }) => (
              <MainInput
                disabled={hasUserFirstName}
                error={errors.firstName?.message}
                containerClassName="w-full"
                value={field.value}
                placeholder="영문 이름 *"
                onChange={(value) => {
                  checkFirstNameContainNumbers(value);
                  field.onChange(value);
                }}
              />
            )}
          />
          <SpaceY />
          <Controller
            name="email"
            rules={{
              required: {
                message: "이메일을 기입해 주세요",
                value: true,
              },
            }}
            control={control}
            render={({ field }) => (
              <MainInput
                containerClassName="w-full"
                error={errors.email?.message}
                disabled={hasUserProfile}
                value={field.value}
                placeholder="이메일 *"
                onChange={(value) => {
                  field.onChange(value);
                  setEmailError(value);
                  setEmailConfirmError(value);
                  setEmail(value);
                }}
              />
            )}
          />
          {/* {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>} */}
          <SpaceY />
          <Controller
            name="confirmEmail"
            rules={{
              required: {
                message: "이메일을 기입해 주세요",
                value: true,
              },
            }}
            control={control}
            render={({ field }) => (
              <MainInput
                containerClassName="w-full"
                error={errors.confirmEmail?.message}
                disabled={hasUserProfile}
                value={field.value}
                placeholder="이메일 재입력 *"
                onChange={(value) => {
                  field.onChange(value);
                  setEmailConfirmError(value);
                  setConfirmEmail(value);
                }}
              />
            )}
          />{" "}
          {/* {errors.confirmEmail && <p style={{ color: "red" }}>{errors.confirmEmail.message}</p>} */}
          <SpaceY />
          <Controller
            name="phone"
            rules={{
              required: { message: "전화번호를 기입해 주세요", value: true },
            }}
            control={control}
            render={({ field }) => (
              <PhoneInput
                containerClassName="w-full bg-white"
                error={errors.phone?.message}
                disabled={hasUserPhoneNumber}
                number={field.value}
                //clearError={clearErrors} /*amy */
                onChange={(value) => field.onChange(value)}
              />
            )}
          />
          <SpaceY />
          <div className="p-1 text-sm text-darkGray font-poppins">
            한국번호는 10 1234 5678 형식으로 기입해 주세요.
          </div>
          <br />
          <div className="p-1 text-sm text-darkGray font-poppins">여행 예정일 (선택 사항)</div>
          <SpaceY />
          <Controller
            name="departureDate"
            rules={{ required: false }}
            control={control}
            render={({ field }) => (
              <input
                className="w-full px-4 py-2 border border-gray text-darkGray font-poppins"
                value={field.value}
                type="date"
                onChange={(value) => field.onChange(value)}
              />
            )}
          />{" "}
        </div>{" "}
        <SpaceY /> <SpaceY />
        <div className="p-4 bg-white text-darkGray font-poppins rounded-xl">
          {/* <SpaceY /> */}
          <div className="mb-4">
            {localStorage.getItem("role") === "1" || localStorage.getItem("role") === "2" ? (
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={paymentType}
                  onChange={(e) => handlePaymentChange(e.target.value)}
                >
                  <FormControlLabel
                    value="credit_card"
                    control={<Radio />}
                    label="Credit Card Payment"
                  />
                  <FormControlLabel value="cash" control={<Radio />} label="Cash Payment" />
                </RadioGroup>
              </FormControl>
            ) : (
              <span className="font-normal">신용카드 정보</span>
            )}
          </div>
          {/* <SpaceY /> <SpaceY /> */}
          {/* <hr className="hidden w-full border rounded md:block border-gray" /> */}
          {/* <SpaceY /> */}
          <div
            className="mb-4 font-medium font-poppins text-darkGray"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <span className="font-normal font-poppins text-darkGray">총 결제 금액:</span>

            <span className="font-normal font-poppins text-darkGray">{`$${(
              parseFloat(totalPrice) -
              parseDiscount(discount) -
              parseDiscount(credit)
            ).toFixed(2)}`}</span>
          </div>
          {/* <SpaceY /> */}
          {/* <hr className="hidden w-full mb-5 border rounded md:block border-gray" /> */}
          {/* <SpaceY /> */}
          {paymentType === "cash" ? (
            <div>
              <MainInput
                placeholder="Credit"
                value={credit === "" ? "" : `$${credit}`}
                onChange={(val) => handleCreditChange(val)}
              />
              <SpaceY />
              <MainInput
                placeholder="Debit"
                disabled
                value={
                  "$" +
                  (
                    parseFloat(totalPrice) -
                    parseDiscount(discount) -
                    parseDiscount(credit)
                  ).toFixed(2)
                }
                onChange={(val) => {}}
              />
              <SpaceY />
            </div>
          ) : (
            <div>
              {/* <div className="w-full px-4 py-3 border border-gray">
                <CardElement className="text-darkGray font-poppins" options={{ hidePostalCode: true }} />
              </div> */}
              <div id="payment-form">
                <div id="card-container"></div>
              </div>
              {/* <SpaceY /> */}
            </div>
          )}
          {(localStorage.getItem("role") === "1" || localStorage.getItem("role") === "2") && (
            <div className="mb-4">
              <MainInput
                placeholder="Discount"
                value={discount === "" ? "" : `$${discount}`}
                onChange={(val) => handleChange(val)}
              />
            </div>
          )}
          <div className="my-[20px]">
            {/* <div className="mb-[5px]"><p className={tryPurchaseWithoutCheckTerm ? "font-poppins text-sm text-red" : "font-poppins text-sm"}>이용약관을 모두 확인하신 뒤 동의해 주세요.</p></div> */}
            <div className="flex gap-3">
              <div className="flex items-center justify-center">
                <input
                  type="checkbox"
                  className="w-[14px] h-[14px]"
                  checked={policyChecked}
                  onChange={(e: any) => setPolicyChecked(e.target.checked)}
                />
              </div>
              <p className="text-[12px]">
                <span
                  className="text-blue-500 underline cursor-pointer "
                  onClick={() => window.open(`${baseUrl}/webpage/54`, "_blank")}
                >
                  이용약관
                </span>
                과{" "}
                <span
                  className="text-blue-500 underline cursor-pointer "
                  onClick={() => window.open(`${baseUrl}/webpage/55`, "_blank")}
                >
                  개인정보처리방침
                </span>
                에 동의합니다.
              </p>
            </div>
          </div>
          {/* <SpaceY /> <SpaceY />
          <SpaceY /> <SpaceY /> */}
          <div className="flex justify-center gap-4">
            <MainButton
              containerClassName="font-normal font-poppins text-darkGray px-8 w-full"
              disabled={
                // Boolean(Object.entries(errors).length) ||
                totalPrice === 0 || isLoading || Object.keys(errors).length > 0
              }
              text={isLoading ? "Processing..." : "결제하기"}
              onClick={handleSubmit(confirmSubmit)}
            />
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <section className="xl:w-[350px] mt-5 xl:mt-0">
        <div className="p-4 bg-white text-darkGray font-poppins rounded-xl">
          <div className="flex justify-center font-medium font-poppins text-darkGray ">
            <div className="flex justify-between w-[13.1rem] py-[2rem] w-[250px]">
              <span className="font-normal font-poppins text-darkGray">총 결제 금액:</span>
              <div className="font-medium">
                <span className="mr-2">금액:</span>
                <span className=" font-poppins text-darkGray">{`$${parseFloat(totalPrice).toFixed(
                  2
                )}`}</span>
              </div>
            </div>
          </div>
          {/* <SpaceY />
          <hr className="hidden w-full border rounded md:block border-gray mb-9" /> */}
          <div className="flex justify-center gap-4 font-normal font-poppins text-darkGray ">
            <MainButton
              containerClassName="font-normal font-poppins text-darkGray px-4 w-full "
              disabled={totalPrice === 0}
              text="결제하기"
              onClick={() => {
                console.log("SIM CARD FORM DATA HERE", simCardFormData);

                localStorage.setItem("SIM_CARD_FORM_DATA", JSON.stringify(simCardFormData));
                navigate("/no-auth-checkout");
              }}
            />
          </div>
        </div>
      </section>
    );
  }
};

export default Checkout;
