import { cartState, cityDataState, cityIdState } from "../../../App";
import { staticFiles } from "../../../shared";
import { parseCartData } from "../utils";

export const TicketCartView = ({
  tickets,
  adult_child_type,
  handleDeleteItem,
  navigate,
  handleEdit,
  isBookingEdit,
  setCartRawData,
  setCartRefinedData,
}: any) => {
  const [cityId, setCityId] = cityIdState.useState();
  const [cityData, setCityData] = cityDataState.useState();
  const [cart, setCart] = cartState.useState();
  const handleQuantityUpdate = (
    cartId: any,
    adult_child_type: string,
    quantity: any,
    actionType: string
  ) => {
    if (actionType == "DEC") {
      if (quantity == 1) {
        return;
      } else {
        const rawData = localStorage.getItem("CART_DATA");

        if (rawData) {
          let parsedData = JSON.parse(rawData);

          if (adult_child_type == "성인") {
            parsedData.adultInfo = parsedData.adultInfo.map((item: any) => {
              if (item.cartId == cartId) {
                return {
                  ...item,
                  quantity: Number(quantity) - 1,
                };
              } else {
                return item;
              }
            });
          } else {
            parsedData.childInfo = parsedData.childInfo.map((item: any) => {
              if (item.cartId == cartId) {
                return {
                  ...item,
                  quantity: Number(quantity) - 1,
                };
              } else {
                return item;
              }
            });
          }
          localStorage.setItem("CART_DATA", JSON.stringify(parsedData));

          setCartRawData(parsedData);
          setCartRefinedData(parseCartData(parsedData));

          setCart({
            adultInfo: parsedData.adultInfo,
            childInfo: parsedData.childInfo,
          });
        }
      }
    } else {
      // INC
      const rawData = localStorage.getItem("CART_DATA");

      if (rawData) {
        let parsedData = JSON.parse(rawData);

        if (adult_child_type == "성인") {
          parsedData.adultInfo = parsedData.adultInfo.map((item: any) => {
            if (item.cartId == cartId) {
              return {
                ...item,
                quantity: Number(quantity) + 1,
              };
            } else {
              return item;
            }
          });
        } else {
          parsedData.childInfo = parsedData.childInfo.map((item: any) => {
            if (item.cartId == cartId) {
              return {
                ...item,
                quantity: Number(quantity) + 1,
              };
            } else {
              return item;
            }
          });
        }
        localStorage.setItem("CART_DATA", JSON.stringify(parsedData));

        setCartRawData(parsedData);
        setCartRefinedData(parseCartData(parsedData));

        setCart({
          adultInfo: parsedData.adultInfo,
          childInfo: parsedData.childInfo,
        });
      }
    }
  };



  let isUpgraded = tickets.some((ticket:any) => ticket.subtotal < 1)

  return tickets?.map((ticket: any, i: number) => {
    let item = {
      reservation_id: ticket.reservation_id,
      item_id: ticket.item_id,
      subcategory_id: ticket.subCategoryId,
      ticket_id: ticket.ticket_id,
      quantity: ticket.quantity,
      price: ticket.price,
      adult_child_type: ticket.adult_child_type,
      subtotal: ticket.subtotal,
    };

    let formattedDatetimeString = "";

    if (ticket?.ticket_type == "Musicals & Shows") {
      const datetimeString = ticket?.tour_date;
      const date = new Date(datetimeString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      let hours = String(date.getHours() % 12 || 12).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const meridiem = date.getHours() >= 12 ? "PM" : "AM";
      formattedDatetimeString = `${year}-${month}-${day} ${hours}:${minutes} ${meridiem}`;
    }
    const isBlocked = ticket.subtotal < 0;
    return (
      <div key={i}>
        <div
          className="p-4 bg-white font-poppins text-black rounded-xl mb-4"
          style={{
            backgroundColor: isBlocked ? "#d0d0d0" : "white",
          }}
        >
          <div className="flex lg:hidden items-center justify-end gap-2 text-xs mb-4">
            <div>
              {ticket?.ticket_type === "SIM card" ||
              ticket?.ticket_type == "Musicals & Shows"
                ? ""
                : adult_child_type}
            </div>
            <div>
              <div className="flex items-center justify-between w-full gap-4">
                {!isUpgraded ? (
                  <button
                    disabled={isBlocked}
                    onClick={() =>
                      handleQuantityUpdate(
                        ticket.cartId,
                        ticket.adult_child_type,
                        ticket.quantity,
                        "DEC"
                      )
                    }
                  >
                    <img
                      alt="minus"
                      className="cursor-pointer sm:w-full"
                      width={20}
                      src={staticFiles.icons.decrement}
                    />
                  </button>
                ) : null}
                <div>{Number(ticket?.quantity)}</div>
                {!isUpgraded ? (
                  <button
                    disabled={isBlocked}
                    onClick={() =>
                      handleQuantityUpdate(
                        ticket.cartId,
                        ticket.adult_child_type,
                        ticket.quantity,
                        "INC"
                      )
                    }
                  >
                    <img
                      alt="plus"
                      className="cursor-pointer sm:w-full"
                      width={20}
                      src={staticFiles.icons.increment}
                    />
                  </button>
                ) : null}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mb-8 text-center text-xs lg:text-sm ">
            <div className="col-span-1 text-left md:col-span-2">
              <button
                className=" text-left cursor-pointer text-xs lg:text-sm flex items-center"
                onClick={() => {
                  let cityName = cityData.cityData.find(
                    (it: any) => it.id == Number(ticket?.cityId)
                  )?.name;
                  localStorage.setItem("cityId", String(cityId));
                  localStorage.setItem("cityName", String(cityName));
                  setCityId(Number(ticket?.cityId));

                  if (
                    ticket?.subCategoryName === "explore-pass" ||
                    ticket?.subCategoryName === "city-pass"
                  ) {
                    if(cityId === 1){
                      navigate(`/ny/package-tour/${ticket?.subCategoryName}`);
                    }
                    else if(cityId===36) {
                      navigate(`/sf/package-tour/${ticket?.subCategoryName}`);
                    }
                    else if(cityId===58) {
                      navigate(`/ls/package-tour/${ticket?.subCategoryName}`);
                    }
                    else if(cityId===59) {
                      navigate(`/hls/package-tour/${ticket?.subCategoryName}`);
                    }
                    else if(cityId===57) {
                      navigate(`/nf/package-tour/${ticket?.subCategoryName}`);
                    }
                    else if(cityId===56) {
                      navigate(`/boston/package-tour/${ticket?.subCategoryName}`);
                    }
                    else {
                      navigate(`{}/package-tour/${ticket?.subCategoryName}`);
                    }
                  } else {
                    navigate(`/product-detail/${ticket?.ticket_id}`);
                  }
                }}
              >
                {ticket.additional_price_type === "Premium" ? (
                  <img
                    alt=""
                    className="mr-1 w-[10px] lg:w-[16px]"
                    src={staticFiles.icons.black_medal}
                  />
                ) : ticket.additional_price_type === "Premium S" ? (
                  <img
                    alt=""
                    className="mr-1 w-[10px] lg:w-[16px]"
                    src={staticFiles.icons.gold_medal}
                  />
                ) : ticket.additional_price_type === "Deluxe" ? (
                  <img
                    alt=""
                    className="mr-1 w-[10px] lg:w-[16px]"
                    src={staticFiles.icons.blue_medal}
                  />
                ) : (
                  <div className="mr-1 absolute"></div>
                )}
                {ticket?.name || "Ticket Name Not Defined"}
              </button>

              {ticket?.ticket_type == "Musicals & Shows" && (
                <div className="text-xs text-black">{ticket?.location}</div>
              )}
            </div>
            {/* if the card type is simcard or hardcopy */}
            <div className="ml-[0px] sm:ml-[60px] lg:ml-[33px]">
              {ticket?.tour_date
                ? ticket?.ticket_type == "Musicals & Shows"
                  ? formattedDatetimeString
                  : ticket?.tour_date
                : ticket?.ticket_type === "Hard copy" ||
                  ticket?.ticket_type === "SIM card"
                ? ""
                : ""}
            </div>
            {/* <div className="hidden md:block">${Number(ticket?.price).toFixed(2)}</div>
            <div className="hidden md:block">${Number(ticket?.addition)}</div>
            <div>
              ${((Number(ticket?.price) + Number(ticket?.addition)) * Number(ticket?.quantity)).toFixed(2)} ==============
            </div>
            <div className="items-center justify-center hidden md:flex">
              {ticket.reservation_id != null && Number(ticket.subtotal) != -100
                ? "변경"
                : ""}
            </div>
            <div className="w-[16px] lg:w-[30%] xl:w-[20%] hidden">
              {" "}
              {ticket.reservation_id != null &&
              Number(ticket.subtotal) != -100 ? (
                <img
                  width={500}
                  src={staticFiles.images.restart_icon}
                  className="relative object-contain ml-5"
                />
              ) : (
                ""
              )}
            </div> */}
            <div className="hidden sm:flex items-center justify-between gap-5">
              <div>
                {ticket?.ticket_type === "SIM card" ||
                ticket?.ticket_type == "Musicals & Shows"
                  ? ""
                  : adult_child_type}
              </div>
              <div>
                <div className="flex items-center justify-between w-full gap-4">
                  {!isUpgraded ? (
                    <button
                      disabled={isBlocked}
                      onClick={() =>
                        handleQuantityUpdate(
                          ticket.cartId,
                          ticket.adult_child_type,
                          ticket.quantity,
                          "DEC"
                        )
                      }
                    >
                      <img
                        alt="minus"
                        className="cursor-pointer sm:w-full"
                        width={20}
                        src={staticFiles.icons.decrement}
                      />
                    </button>
                  ) : null}
                  <div>{Number(ticket?.quantity)}</div>
                  {!isUpgraded ? (
                    <button
                      disabled={isBlocked}
                      onClick={() =>
                        handleQuantityUpdate(
                          ticket.cartId,
                          ticket.adult_child_type,
                          ticket.quantity,
                          "INC"
                        )
                      }
                    >
                      <img
                        alt="plus"
                        className="cursor-pointer sm:w-full"
                        width={20}
                        src={staticFiles.icons.increment}
                      />
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <hr className="w-full border-1 border-gray" />
          <div className="flex items-center justify-between w-[100%] mx-auto pt-4">
            <div className="flex items-center justify-center gap-10 text-xs lg:text-sm">
              {/* {ticket.reservation_id != null &&
                Number(ticket.subtotal) != -100 && (
                  <button
                    className=" cursor-pointer text-blue"
                    onClick={() => {
                      handleEdit();

                      let cityName = cityData.cityData.find(
                        (it: any) => it.id == Number(ticket?.cityId)
                      )?.name;
                      localStorage.setItem("cityId", String(cityId));
                      localStorage.setItem("cityName", String(cityName));
                      setCityId(Number(ticket?.cityId));

                      if (isBookingEdit) {
                        localStorage.setItem("Edit_Item", JSON.stringify(item));
                        navigate(
                          `/product-detail/${
                            ticket?.ticket_id
                          }?edit=${true}&cartId=${
                            ticket.cartId
                          }&type=cart+booking`,
                          { state: item }
                        );
                      } else {
                        navigate(
                          `/product-detail/${
                            ticket?.ticket_id
                          }?edit=${true}&cartId=${ticket.cartId}&type=cart`
                        );
                      }
                    }}
                  >
                    수정하기
                  </button>
                )} */}
              {/* {ticket.reservation_id == null && (
                <button
                  className="flex justify-end cursor-pointer  md:justify-center md:flex-none text-blue"
                  onClick={() => {
                    handleEdit();

                    let cityName = cityData.cityData.find(
                      (it: any) => it.id == Number(ticket?.cityId)
                    )?.name;
                    localStorage.setItem("cityId", String(cityId));
                    localStorage.setItem("cityName", String(cityName));
                    setCityId(Number(ticket?.cityId));

                    if (isBookingEdit) {
                      localStorage.setItem("Edit_Item", JSON.stringify(item));
                      navigate(
                        `/product-detail/${
                          ticket?.ticket_id
                        }?edit=${true}&cartId=${
                          ticket.cartId
                        }&type=cart+booking`,
                        { state: item }
                      );
                    } else {
                      if (
                        ticket?.subCategoryName === "explore-pass" ||
                        ticket?.subCategoryName === "city-pass"
                      ) {
                        navigate(
                          `/package-tour/${
                            ticket?.subCategoryName
                          }?edit=${true}&cartId=${ticket.cartId}&type=cart`
                        );
                      } else if (ticket?.ticket_type == "Musicals & Shows") {
                        navigate(
                          `/musicals-and-shows/${
                            ticket?.tour_date.split(",")[0]
                          }, ${
                            ticket?.tour_date.split(",")[1]
                          }/${ticket?.tour_date.split(",")[2].trim()}/${
                            ticket?.ticket_id
                          }/${ticket?.name}?edit=${true}&cartId=${
                            ticket.cartId
                          }&type=cart&music_id=${ticket?.music_id}&quantity=${
                            ticket?.quantity
                          }`
                        );
                      } else {
                        navigate(
                          `/product-detail/${
                            ticket?.ticket_id
                          }?edit=${true}&cartId=${ticket.cartId}&type=cart`
                        );
                      }
                    }
                  }}
                >
                  수정하기
                </button>
              )} */}
              {ticket.reservation_id != null &&
                Number(ticket.subtotal) != -100 && (
                  <button className="flex items-center justify-center justify-end md:justify-center md:flex-none ">
                    <div
                      className="flex justify-end md:justify-center md:flex-none cursor-pointer text-blue"
                      onClick={() =>
                        handleDeleteItem(ticket?.cartId, adult_child_type)
                      }
                    >
                      삭제하기
                      {/* <img
                        width={500}
                        src={staticFiles.images.delete_icon}
                        className="relative object-contain"
                      /> */}
                    </div>
                  </button>
                )}
              {ticket.reservation_id == null && (
                <button className="flex items-center justify-end md:justify-center md:flex-none">
                  <div
                    className="flex justify-end md:justify-center md:flex-none cursor-pointer text-blue"
                    onClick={() =>
                      handleDeleteItem(ticket?.cartId, adult_child_type)
                    }
                  >
                    {/* <img
                      width={500}
                      src={staticFiles.images.delete_icon}
                      className="relative object-contain"
                    /> */}
                    삭제하기
                  </div>
                </button>
              )}
            </div>
            <div className="flex gap-2 text-xs sm:text-sm">
              <div className="">금액:</div>
              <div className="">
                ${((Number(ticket?.price) + Number(ticket?.addition))*Number(ticket?.quantity)).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
};
