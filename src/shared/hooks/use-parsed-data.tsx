// useParsedData.js
import { useMemo } from "react";
import { convertToISO8601 } from "../utils/date-format";

const useParsedData = (data: any, isLoading: boolean, isError: boolean) => {
  const parsedPriceOptions = useMemo(() => {
    const priceOptionsMap = new Map();
    if (!isLoading && !isError && data) {
      data?.priceOptions?.forEach((option: any) => {
        priceOptionsMap.set(String(option.id), option.product_type);
      });
    }
    return priceOptionsMap;
  }, [data, isLoading, isError]);

  const parsedScheduleOptions = useMemo(() => {
    const options = {} as any;
    if (!isLoading && !isError && data) {
      data?.scheduleOptions?.forEach((option: any) => {
        const optionsData = option;
        if (optionsData && optionsData.length > 0) {
          const optionsInOrder = optionsData
            .sort(
              (a: { order: number }, b: { order: number }) =>
                a?.order - b?.order
            )
            .map((option: { datetime: string }) =>
              convertToISO8601(option.datetime)
            );
          options[String(optionsData[0]?.reservation_sub_item_id)] =
            optionsInOrder;
        }
      });
    }
    return options;
  }, [data, isLoading, isError]);

  const parsedTickets = useMemo(() => {
    const tickets = new Map();
    if (!isLoading && !isError && data) {
      data?.tickets?.forEach((ticket: { id: any }) => {
        const ticket_id = ticket?.id;
        if (ticket_id) {
          tickets.set(String(ticket_id), ticket);
        }
      });
    }
    return tickets;
  }, [data, isLoading, isError]);

  const parsedSubcategories = useMemo(() => {
    const subcategories = new Map();
    if (!isLoading && !isError && data) {
      data?.categories?.forEach((category: { id: any }) => {
        const id = category?.id;
        if (id && !subcategories.has(id)) {
          subcategories.set(String(id), category);
        }
      });
    }
    return subcategories;
  }, [data, isLoading, isError]);

  const parsedData = useMemo(() => {
    return data?.reservations
      ?.slice()
      .sort(
        (
          a: {
            order_date: string | number | Date;
            reservation_items: { id: number }[];
          },
          b: {
            order_date: string | number | Date;
            reservation_items: { id: number }[];
          }
        ) => {
          const dateComparison =
            new Date(b?.order_date).getTime() -
            new Date(a?.order_date).getTime();
          if (dateComparison !== 0) {
            return dateComparison;
          }
          return b?.reservation_items[0].id - a?.reservation_items[0].id;
        }
      )
      ?.map(
        (reservation: {
          order_number: any;
          order_date: any;
          reservation_items: any[];
          id: any;
        }) => {
          return {
            order_number: reservation?.order_number,
            order_date: reservation?.order_date,
            items: reservation?.reservation_items
              ?.slice()
              .sort((a: { id: number }, b: { id: number }) => b?.id - a?.id)
              ?.map(
                (item: {
                  price_list_id: any;
                  subcategory_id: any;
                  id: any;
                  adult_child_type: any;
                  child_age: any;
                  quantity: any;
                  price: any;
                  addition: any;
                  total: any;
                  refund_status: any;
                  reservation_sub_items: any[];
                }) => {
                  return {
                    reservation_id: reservation?.id,
                    price_list_id: item?.price_list_id,
                    hasSubcategory: !!item?.subcategory_id,
                    product_name: parsedPriceOptions?.get(
                      String(item?.price_list_id)
                    ),
                    subcategory_name: parsedSubcategories?.get(
                      String(item?.subcategory_id)
                    )?.name,
                    subcategory_id: item?.subcategory_id,
                    item_id: item?.id,
                    adult_child_type: item?.adult_child_type,
                    child_age: item?.child_age,
                    quantity: item?.quantity,
                    price: item?.price,
                    addition: item?.addition,
                    total: item?.total,
                    refund_status: item?.refund_status,
                    tickets: item?.reservation_sub_items
                      ?.slice()
                      .sort(
                        (a: { id: number }, b: { id: number }) => b?.id - a?.id
                      )
                      ?.map(
                        (subitem: {
                          id: any;
                          pdf_path: any;
                          rq_schedule_datetime: any;
                          ticket_sent_status: any;
                          options_schedules: any;
                          refund_status: any;
                          ticket_id: any;
                          seating_info: any;
                          price: any;
                          addition: any;
                          quantity: any;
                          total: any;
                          shuttle_bus_information: any;
                          sim_card_information: any;
                        }) => {
                          return {
                            subitem_id: subitem?.id,
                            pdf_path: subitem?.pdf_path,
                            rq_schedule_datetime: subitem?.rq_schedule_datetime,
                            ticket_sent_status: subitem?.ticket_sent_status,
                            options_schedules: subitem?.options_schedules,
                            refund_status: subitem?.refund_status,
                            ticket_id: subitem?.ticket_id,
                            seating_info: subitem?.seating_info,
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
                            ticket_city_id: parsedTickets?.get(
                              String(subitem?.ticket_id)
                            )?.city_id,
                            additional_price_type: parsedTickets?.get(
                              String(subitem?.ticket_id)
                            )?.additional_price_type,
                            additional_price_image: parsedTickets?.get(
                              String(subitem?.ticket_id)
                            )?.additional_price_image,
                            additional_price_amount: parsedTickets?.get(
                              String(subitem?.ticket_id)
                            )?.additional_price_amount,
                            shuttle_bus_information:
                              subitem.shuttle_bus_information,
                            sim_card_information: subitem.sim_card_information,
                          };
                        }
                      ),
                  };
                }
              ),
          };
        }
      );
  }, [data, parsedSubcategories, parsedTickets, parsedPriceOptions]);

  return {
    parsedPriceOptions,
    parsedScheduleOptions,
    parsedTickets,
    parsedSubcategories,
    parsedData,
  };
};

export default useParsedData;
