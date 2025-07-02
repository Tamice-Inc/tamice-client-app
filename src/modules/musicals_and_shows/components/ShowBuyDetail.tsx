import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CartItem, cartState, musicState } from "../../../App";
import { API, staticFiles } from "../../../shared";
import { MainButton } from "../../../shared/components/Buttons";
import { MainInput } from "../../../shared/components/Inputs";

// Define fake filtered data
const filterFakeData = {
  value: "0.00",
  location: "Seating location",
  date: "2023-07-23",
  price: 50,
  totalPrice: 100,
};

// Component to display total price
const TotalPriceCom = ({ totalPrice }: any) => {
  return <div>${totalPrice ? totalPrice.toFixed(2) : totalPrice}</div>;
};

// Function to extract params from urls
const extractParams = (url: string) => {
  const urlParams = new URLSearchParams(new URL(url).search);
  const edit = urlParams.get("edit");
  const cartId = urlParams.get("cartId");
  const type = urlParams.get("type");
  const music_id = urlParams.get("music_id");
  const quantity = urlParams.get("quantity");

  return { edit, cartId, type, music_id, quantity };
};

// Function to get cart Data from LocalStorage
const getCartDataFromLocalStorage = () => {
  const cartData = localStorage.getItem("CART_DATA");
  return cartData ? JSON.parse(cartData) : null;
};

export const ShowBuyDetail = ({
  name,
  quantity,
  kr_name,
}: {
  quantity?: number;
  name?: string;
  kr_name?: string;
}) => {
  // Get startTimer from TimerContext to start timer

  // Define Global State variables
  const [cart, setCart] = cartState.useState();
  const [musicData, setMusicData] = musicState.useState();
  const [selectedMusic, setSelectedMusic] = musicState.useState();

  // Define Component State Variables
  const [filterCounter, setFilterCounter] = useState(quantity || 1);
  const [selectInputOne, setSelectInputOne] = useState("");
  const [data, setData] = useState<any>({});
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [cartSelectInfo, setCartSelectInfo] = useState(
    getCartDataFromLocalStorage()?.selectInfo
  );
  const [loading, setLoading] = useState<boolean>(false);

  // Get params from the url params
  let { date, time, id: ticketId } = useParams();

  // Get search param from the url
  const { search } = useLocation(); // ?edit=true&cartId=1690069215841

  // Extract params from the given url
  const searchQuery = extractParams(
    `http://localhost:${process.env.REACT_APP_PORT}/my-page${search}`
  );
  const navigate = useNavigate();
  // useEffect Hooks
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  // Define useEffect
  useEffect(() => {
    if (searchQuery?.edit) {
      let adultInfo: CartItem[] = [...cart.adultInfo];
      const cartItemsToEdit = adultInfo?.filter(
        (obj) => obj?.cartId === searchQuery?.cartId
      );
      setFilterCounter(Number(cartItemsToEdit[0]?.quantity));
    }
  }, []);

  useEffect(() => {
    const musicDataString = localStorage.getItem("musicData");
    let storageData;
    try {
      // Attempt to parse the data if it exists and is not empty or null
      storageData = musicDataString ? JSON.parse(musicDataString) : null;
    } catch (error) {
      // Handle parsing errors (e.g., invalid JSON)
      console.error("Error parsing data from localStorage:", error);
      // You can set a default value if needed
      // storageData = someDefaultValue;
    }

    let product_id = "";
    let show_code = "";
    let location = "";
    let dateTime = "";
    let regular_price = 0;
    let sell_price = 0;
    let total_price = 0;
    let price = 0;
    let price_total = 0;
    let title_kr = "";

    if (musicData.music_id !== "" && musicData.music_id) {
      product_id = storageData.product_id || "";
      show_code = storageData.product_code || "";
      location = storageData.description || "";
      dateTime = storageData.product_date_time || "";
      regular_price = storageData.regular_price || 0;
      sell_price = storageData.sell_price || 0;
      total_price = (storageData.regular_price + 10) * filterCounter || 0;
      price = storageData.price;
      price_total = (Number(storageData.price) + 10) * filterCounter || 0;
      title_kr = kr_name || "";
    }

    setData({
      product_id,
      show_code,
      location,
      dateTime,
      regular_price,
      sell_price,
      total_price,
      price,
      price_total,
      title_kr,
    });
    // setFilterCounter(1);
  }, [musicData, filterCounter]);

  // Function to convert date into a specific format
  const formatDateTimestamp = (inputDate: string) => {
    let date = new Date(inputDate);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    let hours = date.getHours().toString().padStart(2, "0");
    let minutes = date.getMinutes().toString().padStart(2, "0");
    let seconds = "00";
    let milliseconds = "0";
    let formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;

    return formattedDate;
  };

  // Function to handle addToCart action
  const handleAddToTheCart = async () => {
    let childInfo: CartItem[] = [...cart.childInfo];
    let adultInfo: CartItem[] = [...cart.adultInfo];

    if (searchQuery?.edit) {
      try {
        // Set loading to true
        setLoading(true);
        const response = await axios.post(`${API}/select-seat`, {
          sales_type: "F",
          product_id: cartSelectInfo.find(
            (item: any) => item.cartId === searchQuery?.cartId
          ).product_id,
          quantity: filterCounter,
          show_code: cartSelectInfo.find(
            (item: any) => item.cartId === searchQuery?.cartId
          ).show_code,
          event_date_time: cartSelectInfo.find(
            (item: any) => item.cartId === searchQuery?.cartId
          ).event_date_time,
        });

        if (response.data) {
          let selectData = response.data.data;

          let findIndex = cartSelectInfo.findIndex(
            (i: any) => i.cartId == searchQuery?.cartId
          );

          cartSelectInfo.splice(findIndex, 1, {
            cartId: searchQuery?.cartId || "",
            product_id: selectData.ProductId,
            show_code: selectData.Product,
            quantity: selectData.Quantity,
            price: selectData.Price,
            seating_info: selectData.Choices.Choice.Seats,
            session: selectData.Session,
            event_date_time: cartSelectInfo.find(
              (item: any) => item.cartId === searchQuery?.cartId
            ).event_date_time,
          });

          adultInfo = adultInfo?.filter(
            (obj) => obj?.cartId !== searchQuery?.cartId
          );
          adultInfo.push({
            name: name || "",
            kr_name: data.kr_name,
            price: Number(data.price) + 10 || 0,
            quantity: filterCounter,
            subtotal: (Number(data.price) + 10 || 0) * filterCounter,
            addition: 0,
            cartId: searchQuery?.cartId || "",
            reservation_id: null,
            item_id: null,
            adult_child_type: "성인",
            ticket_type: "Musicals & Shows",
            ticket_id: ticketId,
            location: data.location,
            tour_date: data.dateTime,
            music_id: selectedMusic.music_id,
            time: Date.now(),
          });

          localStorage.setItem(
            "CART_DATA",
            JSON.stringify({
              adultInfo,
              childInfo,
              selectInfo: cartSelectInfo,
            })
          );
          setCart({
            adultInfo,
            childInfo,
          });

          toast.info("상품을 성공적으로 업데이트하셨습니다!");

          // Start timer to measure 3 mins and 50 seconds
        } else {
          toast.error(
            `사이버 보안 문제로 인해 장바구니에 물품을 천천히 추가하셔야 합니다. 1분 후에 다시 시도하실 수 있습니다. 감사합니다`
          );
        }
      } catch (error: any) {
        toast.error(
          `사이버 보안 문제로 인해 장바구니에 물품을 천천히 추가하셔야 합니다. 1분 후에 다시 시도하실 수 있습니다. 감사합니다`
        );
      } finally {
        // await delaySeconds(8000);
        setLoading(false);
      }
    } else {
      try {
        // Set loading to true
        setLoading(true);

        const response = await axios.post(`${API}/select-seat`, {
          sales_type: "F",
          product_id: data.product_id,
          quantity: filterCounter,
          show_code: data.show_code,
          event_date_time: formatDateTimestamp(data.dateTime),
        });

        if (response.data) {
          let selectData = response.data.data;
          let cartId = String(Date.now());
          let cartSelectInfoData = cartSelectInfo ? cartSelectInfo : [];

          cartSelectInfoData.push({
            cartId: cartId,
            product_id: selectData.ProductId,
            show_code: selectData.Product,
            quantity: selectData.Quantity,
            price: selectData.Price,
            seating_info: selectData.Choices.Choice.Seats,
            session: selectData.Session,
            event_date_time: formatDateTimestamp(data.dateTime),
          });

          adultInfo.push({
            name: name || "",
            kr_name: data.title_kr,
            price: Number(data.price) + 10 || 0,
            quantity: filterCounter,
            subtotal: (Number(data.price) + 10 || 0) * filterCounter,
            addition: 0,
            cartId: cartId,
            reservation_id: null,
            item_id: null,
            adult_child_type: "성인",
            ticket_type: "Musicals & Shows",
            ticket_id: ticketId,
            location: data.location,
            tour_date: data.dateTime,
            music_id: selectedMusic.music_id,
            time: Date.now(),
          });

          localStorage.setItem(
            "CART_DATA",
            JSON.stringify({
              adultInfo,
              childInfo,
              selectInfo: cartSelectInfoData,
            })
          );
          setCart({
            adultInfo,
            childInfo,
          });

          toast.success("장바구니에 담았습니다.");
        } else {
          toast.error(
            `사이버 보안 문제로 인해 장바구니에 물품을 천천히 추가하셔야 합니다. 1분 후에 다시 시도하실 수 있습니다. 감사합니다`
          );
        }
      } catch (error: any) {
        console.log(error);
        toast.error(
          `사이버 보안 문제로 인해 장바구니에 물품을 천천히 추가하셔야 합니다. 1분 후에 다시 시도하실 수 있습니다. 감사합니다`
        );
      } finally {
        // await delaySeconds(8000);
        setLoading(false);
      }
    }
  };

  function handleQuantityChange(action: "INC" | "DEC") {
    if (action === "DEC" && filterCounter === 1)
      return toast.warning("수량은 1 이상이어야 합니다.");
    if (action === "INC") {
      setFilterCounter((prev) => prev + 1);
    } else {
      setFilterCounter((prev) => (prev > 1 ? prev - 1 : prev));
    }
  }

  return (
    <div className="flex flex-col items-center pb-8 bg-white max-h-fit">
      {loading && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-25 z-[600]">
          <div className="w-16 h-16 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
        </div>
      )}
      <div className="flex flex-row items-center justify-center w-full bg-white">
        <img width={23} className="mr-5" src={staticFiles.icons.shopping_bag} />
        <span className="py-8 font-bold font-poppins text-[#5D5D5F]">
          티켓구입 (Ticket)
        </span>
      </div>
      <div className="flex items-center justify-center w-full p-5 text-xl font-medium text-white bg-blue">
        <img width={30} className="mr-5" src={staticFiles.icons.tag_white} />
        {/* <span style={{ fontSize: "30px" }}>${}{filterCounter}</span> */}
        <TotalPriceCom totalPrice={data.price_total} />
      </div>
      <div className="w-[100%] flex flex-col px-8 gap-4 mt-4 justify-center">
        <div className="flex justify-center w-full">
          <MainInput
            value={data.location}
            error={""}
            placeholder="Location"
            onChange={(text) => {}}
          />
        </div>
        <div className="flex justify-center w-full">
          <MainInput
            value={data.dateTime}
            error={""}
            placeholder="Date and Time"
            onChange={(text) => {}}
          />
        </div>

        <div className="flex w-full">
          <span className="flex w-1/2 justify-center items-center h-[50px]">
            수량
          </span>
          <div className="flex items-center w-1/2">
            <div className="flex items-center justify-between w-full px-[15%]">
              <img
                className="cursor-pointer"
                width={20}
                src={staticFiles.icons.decrement}
                onClick={handleQuantityChange.bind(this, "DEC")}
              />
              <div>{filterCounter}</div>
              <img
                className="cursor-pointer"
                width={20}
                src={staticFiles.icons.increment}
                onClick={handleQuantityChange.bind(this, "INC")}
              />
            </div>
          </div>
        </div>

        <div className="flex w-full gap-x-1">
          <MainButton
            onClick={() => handleAddToTheCart()}
            disabled={loading}
            text={"장바구니 담기"}
          />
          {/* <SecondaryButton onClick={() => {}} text="Reset" /> */}
        </div>
      </div>
    </div>
  );
};
