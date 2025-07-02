import { cartState, cityDataState, cityIdState } from "../../../App";
import { staticFiles } from "../../../shared";
import { parseCartData } from "../utils";

export const SubCategoryCartView = ({
  subCategories,
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
    const updateQuantity = (items: any[], increment: number) => {
      return items.map((item: any) => {
        if (item.cartId == cartId) {
          if (actionType == "DEC" && item.quantity == 1) return item;
          return {
            ...item,
            quantity: Number(quantity) + increment,
          };
        } else {
          return item;
        }
      });
    };

    const rawData = localStorage.getItem("CART_DATA");
    const editItem = localStorage.getItem("Edit_Item") || "{}";
    if (!rawData) return;

    let parsedData = JSON.parse(rawData);
    let editItemData = JSON.parse(editItem);

    if (actionType == "DEC" && editItemData?.quantity > quantity - 1) {
      return;
    }

    const increment = actionType == "DEC" ? -1 : 1;

    if (adult_child_type == "성인") {
      parsedData.adultInfo = updateQuantity(parsedData.adultInfo, increment);
    } else {
      parsedData.childInfo = updateQuantity(parsedData.childInfo, increment);
    }

    localStorage.setItem("CART_DATA", JSON.stringify(parsedData));
    setCartRawData(parsedData);
    setCartRefinedData(parseCartData(parsedData));
    setCart({
      adultInfo: parsedData.adultInfo,
      childInfo: parsedData.childInfo,
    });
  };

  const subCategoryList = subCategories?.map((subCategory: any) => {
    const subCategorySummary = {
      title: subCategory[1][0]?.priceOptionTitle || subCategory[1][0]?.subCategoryTitle,
      price: Number(subCategory[1][0]?.subCategoryPrice),
      quantity: Number(subCategory[1][0]?.quantity),
      addition: 0,
      subTotal: 0,
      subPath: "",
      cartId: "",
      type: "",
      cityId: subCategory[1][0]?.cityId,
    };
    subCategory[1]?.forEach((ticket: any) => {
      subCategorySummary.addition += Number(ticket?.addition) * Number(ticket?.quantity);
    });
    subCategorySummary.subTotal =
      subCategorySummary.price * subCategorySummary.quantity + subCategorySummary.addition;

    subCategorySummary.subPath = subCategory[1][0].subPath;

    let item = {
      reservation_id: subCategory[1][0].reservation_id,
      item_id: subCategory[1][0].item_id,
      subcategory_id: subCategory[1][0].subCategoryId,
      tickets: subCategory[1].map((it: any) => {
        return {
          ticket_id: it.ticket_id.split("+")[0],
          subitem_id: it.ticket_id.split("+")[1],
          ticket_type: it.ticket_type,
          ticket_sent_status: it.ticket_sent_status,
        };
      }),
      quantity: subCategory[1][0].quantity,
      price: subCategory[1][0].price,
      adult_child_type: subCategory[1][0].adult_child_type,
      subtotal: subCategory[1][0].subtotal,
      isBlocked: subCategory[1][0].subtotal < 0,
    };

    return { item, subCategorySummary, subCategory };
  });

  const isUpgraded = subCategories.some((item: any) =>
    item[1].some((subItems: any) => subItems.subtotal < 0)
  );

  return subCategories?.map((subCategory: any, i: number) => {
    const subCategorySummary = {
      title: subCategory[1][0]?.priceOptionTitle || subCategory[1][0]?.subCategoryTitle,
      price: Number(subCategory[1][0]?.subCategoryPrice),
      quantity: Number(subCategory[1][0]?.quantity),
      addition: 0,
      subTotal: 0,
      subPath: "",
      cartId: "",
      type: "",
      cityId: subCategory[1][0]?.cityId,
    };
    subCategory[1]?.forEach((ticket: any) => {
      subCategorySummary.addition += Number(ticket?.addition) * Number(ticket?.quantity);
    });
    subCategorySummary.subTotal =
      subCategorySummary.price * subCategorySummary.quantity + subCategorySummary.addition;

    subCategorySummary.subPath = subCategory[1][0].subPath;
    subCategorySummary.cartId = subCategory[1][0].cartId;
    subCategorySummary.type =
      subCategory[1][0].reservation_id != null && Number(subCategory[1][0].subtotal) != -100
        ? "변경"
        : "";

    let item = {
      reservation_id: subCategory[1][0].reservation_id,
      item_id: subCategory[1][0].item_id,
      subcategory_id: subCategory[1][0].subCategoryId,
      tickets: subCategory[1].map((it: any) => {
        return {
          ticket_id: it.ticket_id.split("+")[0],
          subitem_id: it.ticket_id.split("+")[1],
          ticket_type: it.ticket_type,
          ticket_sent_status: it.ticket_sent_status,
        };
      }),
      quantity: subCategory[1][0].quantity,
      price: subCategory[1][0].price,
      adult_child_type: subCategory[1][0].adult_child_type,
      subtotal: subCategory[1][0].subtotal,
    };
    const isBlocked = item.subtotal < 0;

    console.log(subCategories, 'SUB 157')
    return (
      <div
        className="p-4 mb-4 bg-white rounded-xl"
        style={{
          backgroundColor: isBlocked ? "#d0d0d0" : "white",
        }}
        key={i}
      >
        <div className="text-xs text-center lg:text-sm font-poppins text-black my-4">
          <div className="flex items-center justify-between">
            {/* <div className="grid grid-cols-6 md:grid-cols-12"> */}
            <div className="col-span-1 text-left md:col-span-2 font-bold">
              {/* <div className="col-span-1 text-left md:col-span-2 text-blue"> */}
              {subCategorySummary?.title}
            </div>
            {/* <div>{adult_child_type}</div>
            <div className="hidden col-span-3 md:col-span-2 md:block"></div>
            <div className="hidden md:block">${subCategorySummary?.price}</div>
            <div>{subCategorySummary?.quantity}</div>
            <div className="hidden md:block">${subCategorySummary?.addition.toFixed(2)}</div> */}
            {/* <div>${subCategorySummary?.subTotal.toFixed(2)}</div> */}
            {/* <div className="items-center justify-center hidden md:flex">{subCategorySummary?.type}</div>
            <div className="w-[16px] block md:hidden flex items-center justify-center hidden">
              {" "}
              {subCategory[1][0].reservation_id !== null &&
                Number(subCategory[1][0].subtotal) !== -100 ? (
                <img
                  alt=""
                  width={500}
                  src={staticFiles.images.restart_icon}
                  className="relative object-contain ml-5"
                />
              ) : (
                ""
              )}
            </div> */}
            <div className="flex items-center justify-between gap-5">
              <div>{adult_child_type}</div>
              <div>
                <div className="flex items-center justify-between w-full gap-4 text-xs sm:text-sm">
                  {!isUpgraded ? (
                    <button
                      disabled={isBlocked}
                      onClick={() =>
                        handleQuantityUpdate(
                          subCategory[0],
                          subCategory[1][0].adult_child_type,
                          subCategory[1][0].quantity,
                          "DEC"
                        )
                      }
                    >
                      <img
                        alt=""
                        className="cursor-pointer sm:w-full"
                        width={20}
                        src={staticFiles.icons.decrement}
                      />
                    </button>
                  ) : null}
                  <div>{subCategorySummary?.quantity}</div>
                  {!isUpgraded ? (
                    <button
                      disabled={isBlocked}
                      onClick={() =>
                        handleQuantityUpdate(
                          subCategory[0],
                          subCategory[1][0].adult_child_type,
                          subCategory[1][0].quantity,
                          "INC"
                        )
                      }
                    >
                      <img
                        alt=""
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
        </div>
        {/* <SpaceY /> */}
        {subCategory[1]?.map((ticket: any, ti: number) => {
          return (
            <div className="font-poppins text-black " key={ti}>
              <div
                // className={`flex items-center grid-cols-3 sm:grid-cols-3 p-1 text-xs lg:text-sm text-center relative`}
                className="grid grid-cols-2 lg:grid-cols-3"
              >
                <div className="flex items-center">
                {ticket.additional_price_type === "Premium" ? (
                  <img
                    alt=""
                    className="mr-1 w-[10px] lg:w-[16px] h-[10px] lg:h-[16px]"
                    src={staticFiles.icons.black_medal}
                  />
                ) : ticket.additional_price_type === "Premium S" ? (
                  <img
                    alt=""
                    className="mr-1 w-[10px] lg:w-[16px] h-[10px] lg:h-[16px]"
                    src={staticFiles.icons.gold_medal}
                  />
                ) : ticket.additional_price_type === "Deluxe" ? (
                  <img
                    alt=""
                    className="mr-1 w-[10px] lg:w-[16px] h-[10px] lg:h-[16px]"
                    src={staticFiles.icons.blue_medal}
                  />
                ) : (
                  <div className="mr-1 ml-[10px] sm:ml-[10px] lg:ml-4"></div>
                )}
                <div
                  className="flex col-span-2 md:col-span-1 text-xs text-left  lg:text-sm cursor-pointer items-center"
                  onClick={() => navigate(`/product-detail/${ticket?.ticket_id}`)}
                >
                  <div>{ticket?.name || "Ticket Name Not Defined"}</div>
                  {/* <div className="col-span-3 md:col-span-2 block md:hidden text-[#747474]">
                    <div className="flex flex-wrap">
                    <span className="mr-2  md:hidden">Scheduled Date</span>{" "}
                      {ticket?.tour_date
                        ? ticket?.tour_date
                        : ticket?.ticket_type === "Hard copy" ||
                          ticket?.ticket_type === "SIM card"
                        ? ""
                        : "대기 중"}
                    </div>
                  </div> */}
                </div>
                </div>
                {/* <div className="hidden md:block"></div> */}
                <div className="flex col-span-1 justify-end lg:justify-center">
                  <div className="col-span-3 md:col-span-2 block text-black">
                    <div className="flex text-xs lg:text-[14px] lg:pl-14">
                      {/* <span className="mr-2  md:hidden">Scheduled Date</span>{" "} */}
                      {ticket?.tour_date
                        ? ticket?.tour_date
                        : ticket?.ticket_type === "Hard copy" || ticket?.ticket_type === "SIM card"
                        ? ""
                        : ""}
                    </div>
                  </div>
                </div>
                <div className="hidden"></div>
                {/* <div className="hidden col-span-2 md:block">
                  if the card type is simcard or hardcopy
                  {ticket?.tour_date
                    ? ticket?.tour_date
                    : ticket?.ticket_type === "Hard copy" ||
                      ticket?.ticket_type === "SIM card"
                    ? ""
                    : "대기 중"}
                </div> */}
                {/* <div className="hidden md:block"></div>
                <div className="hidden md:block"></div> */}
                {/* <div className="self-start text-xs lg:text-sm md:self-auto hidden sm:block">
                  ${Number(ticket?.addition)}
                </div> */}
                {/* <div></div>
                <div></div> */}
              </div>
            </div>
          );
        })}
        <hr className="w-full border-1 border-gray mt-4" />
        <div className="flex items-center justify-between w-[100%] mx-auto pt-4">
          <div className="flex items-center justify-center gap-10 text-xs lg:text-sm">
            {/* {subCategory[1][0].reservation_id !== null &&
              Number(subCategory[1][0].subtotal) !== -100 && (
                <button
                  onClick={() => {
                    handleEdit();

                    // let cityName = subPathWithAbbreviation.find(
                    //   (it: any) =>
                    //     it.abb == subCategorySummary?.title.split(" ")[0] ||
                    //     it.abb == subCategorySummary?.title?.substring(0, 2)
                    // )?.name;

                    // let cityId = cityData.cityData.find((it: any) => it.name == cityName)?.id;
                    // setCityId(cityId);
                    // localStorage.setItem("cityId", String(cityId));
                    // localStorage.setItem("cityName", String(cityName));

                    if (isBookingEdit) {
                      localStorage.setItem("Edit_Item", JSON.stringify(item));
                      navigate(
                        `/package-tour/${
                          subCategorySummary.subPath
                        }?edit=${true}&cartId=${
                          subCategorySummary.cartId
                        }&type=cart+booking`,
                        { state: item }
                      );
                    } else {
                      navigate(
                        `/package-tour/${
                          subCategorySummary.subPath
                        }?edit=${true}&cartId=${
                          subCategorySummary.cartId
                        }&type=cart`
                      );
                    }
                  }}
                  className="flex justify-end md:justify-center md:flex-none cursor-pointer text-blue"
                >
                  수정하기
                </button>
              )} */}
            {/* {subCategory[1][0].reservation_id == null && (
              <button
                onClick={() => {
                  handleEdit();
                  setCityId(subCategorySummary.cityId);
                  if (isBookingEdit) {
                    localStorage.setItem("Edit_Item", JSON.stringify(item));
                    navigate(
                      `/package-tour/${
                        subCategorySummary.subPath
                      }?edit=${true}&cartId=${
                        subCategorySummary.cartId
                      }&type=cart+booking`,
                      { state: item }
                    );
                  } else {
                    navigate(
                      `/package-tour/${
                        subCategorySummary.subPath
                      }?edit=${true}&cartId=${
                        subCategorySummary.cartId
                      }&type=cart`
                    );
                  }
                }}
                className="flex justify-end md:justify-center md:flex-none cursor-pointer text-blue"
              >
                수정하기
              </button>
            )} */}
            {subCategory[1][0].reservation_id != null &&
              Number(subCategory[1][0].subtotal) != -100 && (
                <button className="flex items-center justify-end md:justify-center md:flex-none">
                  <div
                    className="flex justify-end md:justify-center md:flex-none cursor-pointer text-blue"
                    onClick={() => handleDeleteItem(subCategory[0], adult_child_type)}
                  >
                    {/* <img
                      width={700}
                      src={staticFiles.images.delete_icon}
                      className="relative object-contain"
                    /> */}
                    삭제하기
                  </div>
                </button>
              )}
            {subCategory[1][0].reservation_id == null && (
              <button className="flex items-center justify-end md:justify-center md:flex-none">
                <div
                  className="flex justify-end md:justify-center md:flex-none cursor-pointer text-blue"
                  onClick={() => handleDeleteItem(subCategory[0], adult_child_type)}
                >
                  삭제하기
                </div>
              </button>
            )}
          </div>

          <div className="flex text-xs lg:text-sm  text-black flex-col">
            <div className="flex flex-row justify-end">
              <div className="text-black">프리미엄 추가:</div>
              <div className="text-black">${subCategorySummary?.addition.toFixed(2)}</div>
            </div>
            <div className="flex flex-row justify-end">
              <div className="text-black">금액:</div>
              <div className="text-black">${subCategorySummary?.subTotal.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
    );
  });
};
