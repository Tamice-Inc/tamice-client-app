import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MutableRefObject, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { API, fetcher, newFetcher } from ".";
import {
  authState,
  cartState,
  cityState,
  menuState,
  musicState,
  orderLookupState,
} from "../App";
import { ShowCardProps } from "../modules/musicals_and_shows/components/ShowCard";
import { NavBarElement } from "./components/NavBar";
import { ProductCardProps } from "./components/ProductCard";

export type CompanyType = {
  id: number;
  name: string;
  status: Boolean | string;
};

export const useAuth = () => {
  const [authToken, setToken] = authState.useState();

  const refreshToken = (token: string) => {
    fetch(`${API}/refresh-token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access_token) return setAuthToken(data.access_token);
      });
  };

  const setAuthToken = (newToken: string | null) => {
    setToken(newToken);
    if (!newToken) return localStorage.removeItem("authToken");
    localStorage.setItem("authToken", newToken);
  };

  return {
    authToken,
    setAuthToken,
    refreshToken,
  };
};

export const useGetTickets = ({
  category,
  subCategoryId,
  guideFilter = false,
  menu,
  menuLoading,
}: {
  category: number;
  subCategoryId?: number | string;
  guideFilter?: boolean;
  menu: NavBarElement[];
  menuLoading: boolean;
}): { tickets: ProductCardProps[] | undefined } => {
  const [cachedData, setCachedData] = useState<{
    [key: string]: ProductCardProps[];
  }>({});

  useEffect(() => {
    if (menuLoading) {
      const cacheKey = `${category}_${subCategoryId}`;
      if (cachedData[cacheKey]) {
        return;
      }

      fetch(
        `${API}/tickets?category=${category}${
          subCategoryId &&
          !(
            subCategoryId == "233" ||
            subCategoryId == "235" ||
            subCategoryId == "236"
          )
            ? `&sub_category=${subCategoryId}`
            : ""
        }`
      )
        .then((res) => res.json())
        .then((data) => {
          const filteredData = data
            ?.filter((item: any) => item.status != "Out Of Stock")
            .map((item: any) => ({
              id: item.id.toString(),
              name: item.title_en,
              kr_name: item.title_kr,
              availability: item.announcement,
              adultPrice: item.ticket_prices[0].sale_price,
              adultSitePrice: item.ticket_prices[0].window_price,
              childPrice: item.ticket_prices[1].sale_price,
              childSitePrice: item.ticket_prices[1].window_price,
              childNote: "",
              image: item?.card_image?.url,
              card_image: item?.icon_image?.url,
              isPremium: false,
              additional_price_type: item?.additional_price_type,
              additional_price_amount: item?.additional_price_amount,
              additional_price_image: item?.additional_price_image,
              ticket_type: item?.ticket_type,
              announcement: item?.announcement,
              ticket_sent_status: item?.ticket_sent_status,
              premiumPrice: item.premium_amount,
              premiumSPrice: item.premium_s_amount,
              deluxPrice: item.deluxe_amount,
              ageLimit: item.ticket_prices[1].age_limit,
              cityId: item.city_id,
            }));

          setCachedData((prevCachedData) => ({
            ...prevCachedData,
            [cacheKey]: filteredData,
          }));
        })
        .catch((error) => console.log(error));
    }
  }, [category, subCategoryId, menuLoading, cachedData]);

  const tickets = useMemo(() => {
    const cacheKey = `${category}_${subCategoryId}`;
    return cachedData[cacheKey] || [];
  }, [category, subCategoryId, cachedData]);
console.log(tickets, 'TICKETS')
  return { tickets };
};

export const useGetSimTickets = ({
  cityId,
}: {
  cityId: number;
}): { tickets: ProductCardProps[] | undefined } => {
  const [tickets, setTickets] = useState<ProductCardProps[] | undefined>([]);
  useEffect(() => {
    fetch(`${API}/tickets?ticket_type=SIM Card`)
      .then((res) => res.json())
      .then((res) => {
        let data = res
          .filter((item: any) => item.status != "Out Of Stock")
          .map((item: any) => ({
            id: item.id.toString(),
            name: item.title_en,
            kr_name: item.title_kr,
            availability: item.announcement,
            adultPrice: item.ticket_prices[0].sale_price,
            adultSitePrice: item.ticket_prices[0].window_price,
            childPrice: item.ticket_prices[1].sale_price,
            childSitePrice: item.ticket_prices[1].window_price,
            childNote: "",
            image: item?.card_image?.url,
            isPremium: false,
            additional_price_type: item?.additional_price_type,
            additional_price_amount: item?.additional_price_amount,
            additional_price_image: item?.additional_price_image,
            ticket_type: item?.ticket_type,
            ticket_sent_status: item?.ticket_sent_status,
            premiumPrice: item.premium_amount,
            premiumSPrice: item.premium_s_amount,
            deluxPrice: item.deluxe_amount,
            ageLimit: item.ticket_prices[1].age_limit,
            city_id: item.city_id,
          }));

        if (cityId) {
          data = data.filter((item: any) => +item.city_id === +cityId);
        }

        setTickets(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return { tickets };
};

export const useGetContents = ({
  content_id,
  menu,
}: {
  content_id: number;
  menu: NavBarElement[];
}): { contents: any; errors?: any } => {
  const [contents, setContents] = useState<string | undefined>();
  const [errors, setErrors] = useState<string | undefined>();

  useEffect(() => {
    fetch(`${API}/tickets/${content_id}`)
      .then((res) => res.json())
      .then((data) => setContents(data))
      .catch((err) => {
        setErrors(err.message);
        console.log(err);
      });
  }, [menu]);

  return { contents, errors };
};

export const useGetShowTickets = ({
  category,
  subCategoryId,
}: {
  category: number;
  subCategoryId?: number;
}): { tickets: ShowCardProps[] | undefined } => {
  const { data: tickets } = useQuery<ShowCardProps[]>({
    queryKey: [
      `tickets?category=${category}${
        subCategoryId ? `&sub_category=${subCategoryId}` : ""
      }`,
    ],
    queryFn: fetcher(
      `/tickets?category=${category}${
        subCategoryId ? `&sub_category=${subCategoryId}` : ""
      }`,
      (res: any[]) => {
        // console.log(res);
        return res?.map((item) => ({
          id: item.id.toString(),
          title: item.title_en,
          subTitle: item.title_kr,
          availability: "Sale through Aug 13",

          description:
            "뉴욕의 명소 브로드웨이. - 연일 매진행렬을 이어오는 가장 인기 있는 뮤지컬",

          image: item?.card_image?.url,
          priceStart: item?.ticket_prices[0].sale_price,
        }));
      }
    ),
  });

  return { tickets };
};

export const useGetTicket = () => {
  const { id: ticketId } = useParams();
  const { data: ticket } = useQuery({
    queryKey: [`tickets/${ticketId}`],
    queryFn: fetcher(`/tickets/${ticketId}`, (res: any[]) => {
      return res;
    }),
  });

  return { ticket };
};

let firstRenderDone = false;
export const useCacheCart = () => {
  const [cart, setCart] = cartState.useState();

  useEffect(() => {
    const stringData = localStorage.getItem("CART_DATA");
    if (!stringData) return;
    const cachedCart = JSON.parse(stringData);
    setCart(cachedCart);
    firstRenderDone = true;
  }, []);
};

export const useCityState = () => {
  const [city, setCity] = cityState.useState();

  useEffect(() => {
    const stringData = localStorage.getItem("city");
    if (!stringData) return;
    const cityState = JSON.parse(stringData);
    setCity(cityState);
    firstRenderDone = true;
  }, []);
};

export const useMusicState = () => {
  const [music, setMusic] = musicState.useState();

  useEffect(() => {
    const stringData = localStorage.getItem("music");
    if (!stringData) return;
    const musicState = JSON.parse(stringData);
    setMusic(musicState);
    firstRenderDone = true;
  }, []);
};

export function useClickOutside(
  ref: MutableRefObject<HTMLElement | null>,
  action: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref?.current && !ref?.current.contains(event.target)) {
        action();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export const useGetReservations = (
  searchQuery: any,
  state: any,
  firstFetch: boolean,
  isDownLoadTicket: any
) => {
  const [orderLookup, setOrderLookup] = orderLookupState.useState();
  // Get user email and token from local storage
  const useremail = localStorage.getItem("useremail");
  const orderLoginData = localStorage.getItem("orderLoginNumber");
  const orderLoginEmail = localStorage.getItem("orderLoginEmail");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<any>();
  const [data, setData] = useState<any>();

  let searchQueryData: any = {};

  if (orderLoginData) {
    searchQueryData = { email: orderLoginEmail, order_number: orderLoginData };
  }

  let url: string;

  if (searchQuery || orderLoginData) {
    url = `${API}/order-lookup?email=${searchQueryData?.email}&order_number=${searchQueryData?.order_number}`;
  } else {
    url = `${API}/reservations?email=${useremail}`;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const { data } = await axios.get(url);

        if (orderLoginData) {
          // in the case of order Login
          // Set orderLookUp member data in localStorage
          localStorage.setItem("orderLoginNumber", data.order_number);
          localStorage.setItem("orderLoginEmail", data.email);
          localStorage.setItem("phone", data.phone);
          localStorage.setItem("customer_name_en", data.customer_name_en);
          localStorage.setItem("customer_name_kr", data.customer_name_kr);

          // Set orderLookUp member data in State
          setOrderLookup({
            phone: data.phone,
            customer_name_kr: data.customer_name_kr,
            customer_name_en: data.customer_name_en,
            orderLoginNumber: data.order_number,
            orderLoginEmail: data.email,
          });
        }

        let reservations_data = data;
        if (searchQuery || orderLoginData) {
          reservations_data = [data];
        }
        const combinedResponse: {
          reservations?: unknown[];
          categories?: unknown[];
          tickets?: unknown[];
          scheduleOptions?: unknown[];
          priceOptions?: unknown[];
        } = {};

        // Get reservations
        let reservations_url = `${API}/reservations-multiple`;

        if (reservations_data.length !== 0) {
          let reservationItems: any[] = [];
          reservations_data?.forEach((reservation: any, index: number) => {
            reservationItems.push(reservation?.id);
          });

          let reservations = await axios.post(reservations_url, {
            ids_filter: reservationItems,
          });

          combinedResponse.reservations = reservations.data;

          // Get categories
          let categoriesEndpoints_url = `${API}/categories/subcategories-multiple`;
          let categoriesEndpoints: any = [];
          reservations.data?.forEach((reservation: any) => {
            reservation?.reservation_items?.forEach(
              (item: any, index: number) => {
                if (item.category_id) {
                  categoriesEndpoints.push(item.category_id);
                }
              }
            );
          });

          try {
            const categories = await axios.post(categoriesEndpoints_url, {
              ids_filter: categoriesEndpoints,
            });
            combinedResponse.categories = categories.data;
          } catch (err) {
            if (err) console.log(err);
          }

          // Get tickets
          let ticketsEndpoints_url = `${API}/tickets-multiple`;
          let ticketsEndpoints: any[] = [];
          reservations.data?.forEach((reservation: any) => {
            reservation?.reservation_items?.forEach((item: any) => {
              item?.reservation_sub_items?.forEach(
                (subItem: any, index: number) => {
                  if (subItem.ticket_id) {
                    ticketsEndpoints.push(subItem.ticket_id);
                  }
                }
              );
            });
          });

          try {
            const tickets = await axios.post(ticketsEndpoints_url, {
              ids_filter: ticketsEndpoints,
            });
            combinedResponse.tickets = tickets.data;
          } catch (err) {
            console.log(err);
          }

          let scheduleOptionsEndpoints_url = `${API}/reservation-sub-item/options-schedules`;
          let reservation_sub_item_id: any[] = [];

          reservations.data?.forEach((reservation: any) => {
            reservation?.reservation_items?.forEach((item: any) => {
              item?.reservation_sub_items?.forEach(
                (subItem: any, index: number) => {
                  if (subItem.id) {
                    reservation_sub_item_id.push(subItem.id);
                  }
                }
              );
            });
          });

          try {
            const scheduleOptions = await axios.post(
              scheduleOptionsEndpoints_url,
              {
                reservation_sub_item_id,
              }
            );
            combinedResponse.scheduleOptions = scheduleOptions.data;
          } catch (err) {
            if (err) console.log(err);
          }

          let priceOptionsEndpoints_url = `${API}/price-lists-selected-multiple`;
          let priceOptionsEndpoints: any[] = [];
          reservations.data?.forEach((reservation: any) => {
            reservation?.reservation_items?.forEach(
              (item: any, index: number) => {
                if (item.price_list_id) {
                  priceOptionsEndpoints.push(item.price_list_id);
                }
              }
            );
          });

          try {
            const priceOptions = await axios.post(priceOptionsEndpoints_url, {
              ids_filter: priceOptionsEndpoints,
            });
            combinedResponse.priceOptions = priceOptions.data;
          } catch (err) {
            if (err) console.log(err);
          }
        }

        setData(combinedResponse);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    if ((!isDownLoadTicket && firstFetch) || (!isDownLoadTicket && state)) {
      fetchData();
    }
  }, [state, firstFetch, isDownLoadTicket]);
  return { isLoading, isError, data };
};

export const updateScheduleOptions = async (
  sub_item_id: number,
  options: string[]
) => {
  const token = localStorage.getItem("authToken");
  const url = `${API}/reservation-sub-item/${sub_item_id}/options-schedules`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const { data } = await axios.post(
    url,
    {
      schedules: [
        {
          datetime: options[0],
          order: 1,
        },
        {
          datetime: options[1],
          order: 2,
        },
        {
          datetime: options[2],
          order: 3,
        },
      ],
    },
    { headers }
  );
  return data;
};
// export const GetUserData = () => {
//   const { userEmail: email } = useParams();
//   const {
//     data: UserData,
//   } = useQuery({
//     queryKey: [`/users/${email}`],
//     queryFn: fetcher(`/users/${email}`, (res: any[]) => {return res;}),
//   });

//   return {
//     UserData,
//   };
// };

export const GetUserData = (userEmail?: string) => {
  const { data: userData } = useQuery<any>({
    queryKey: [`/users?email=${userEmail}`],
    queryFn: fetcher(`/users?email=${userEmail}`, (res: any) => res),
    enabled: Boolean(true),
  });

  return {
    userData,
  };
};

export const useGetCategories = (city: string) => {
  const { authToken } = useAuth();
  const { data: categoriesOptions } = useQuery({
    queryKey: [`/categories?city_id=${city}`],
    queryFn: newFetcher(
      `/categories?city_id=${city}`,
      authToken as string,
      (res: { value: string; text: string }[]) =>
        res.map((item: any) => ({
          value: item.id.toString(),
          text: item.name,
        }))
    ),
    enabled: Boolean(city) && Boolean(authToken),
  });

  return {
    categoriesOptions,
  };
};

export const useGetAllCities = () => {
  // const authToken  = "Bearer";
  const { data: CitiesData, isLoading: loadingCitiesData } = useQuery<
    CompanyType[]
  >({
    queryKey: [`/cities`],
    queryFn: fetcher(
      `/cities`,
      // authToken as string,
      (res: CompanyType[]) => res
    ),
    enabled: Boolean(true),
  });

  return {
    CitiesData,
    loadingCitiesData,
  };
};

export const useGetPackagePriceOptions = (
  subCategoryId: string,
  categoryId: string
) => {
  const [data, setData] = useState<any>();
  const [isError, setIsError] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [menu] = menuState.useState();
  let url = `${API}/price-lists?category_id=${categoryId}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(url);
        console.log("API Response:", data);

        // Check if the API response structure is as expected
        if (!data?.subcategories) {
          throw new Error("Invalid API response structure");
        }

        const subcategory = data.subcategories.find(
          (item: any) =>
            item.subcategory_id === subCategoryId.toString() ||
            item.subcategory_id === subCategoryId
        );
        if (!subcategory) {
          throw new Error(`Subcategory with ID ${subCategoryId} not found`);
        }

        setData(
          subcategory.prices.map((item: any) => ({
            text: item.product_type,
            value: String(item.id),
            quantity: Number(item.quantity),
            child_price: Number(item.child_price),
            adult_price: Number(item.adult_price),
          }))
        );
      } catch (error) {
        console.error("Error fetching package price options:", error);
        setIsError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [categoryId, subCategoryId, url]);

  // const { isLoading, isError, data, error } = useQuery({
  //   enabled: !!subCategoryId,
  //   // staleTime: 1000 * 60 * 2, // 2 minutes
  //   queryKey: [url],
  //   queryFn: async () => {
  //     // const { data } = await axios.get(url);
  //     // return data.subcategories
  //     //   .find((item: any) => item.subcategory_id == subCategoryId)
  //     //   ?.prices // .flat()
  //     //   .map((item: any) => ({
  //     //     text: item.product_type,
  //     //     value: String(item.id),
  //     //     quantity: Number(item.quantity),
  //     //     child_price: Number(item.child_price),
  //     //     adult_price: Number(item.adult_price),
  //     //   }));

  //   },
  // });

  return { isLoading, isError, data };
};

export const getUserProfile = async (
  guestCheckout: boolean | null | undefined
) => {
  const token = localStorage.getItem("authToken");
  const url: string = `${API}/profile`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  if (guestCheckout || !token) {
    return undefined;
  }

  try {
    const response = await axios.get(url, { headers });

    return response?.data;
  } catch (error) {
    return null;
  }
};

export const GetMusicalData = (productCode: string) => {
  const { data: musicalData, isLoading } = useQuery<any>({
    queryKey: [`/product-seats?product_code=${productCode}`],
    queryFn: fetcher(
      `/product-seats?product_code=${productCode}`,
      (res: any) => res
    ),
    enabled: Boolean(true),
  });

  return {
    musicalData,
    isLoading,
  };
};

export const useGetMusicals = ({
  category,
  subCategoryId,
  musicalId,
  guideFilter = false,
}: {
  category: number;
  subCategoryId?: number;
  musicalId?: number;
  guideFilter?: boolean;
}): { tickets: ProductCardProps[] | undefined } => {
  const { data: tickets } = useQuery<ProductCardProps[]>({
    queryKey: [
      `tickets?category=${category}${
        subCategoryId ? `&sub_category=${subCategoryId}` : ""
      }${musicalId ? `&id = ${musicalId}` : ""}`,
    ],
    queryFn: fetcher(
      `/tickets?category=${category}${
        subCategoryId ? `&sub_category=${subCategoryId}` : ""
      }${musicalId ? `&id = ${musicalId}` : ""}`,
      (res: any[]) => {
        // console.log(res);
        if (guideFilter)
          return res
            ?.filter((item) => item.ticket_type === "Musicals & Shows")
            ?.map((item) => ({
              id: item.id.toString(),
              name: item.title_en,
              availability: item.announcement,
              adultPrice: item.ticket_prices[0].sale_price,
              adultSitePrice: item.ticket_prices[0].window_price,
              childPrice: item.ticket_prices[1].sale_price,
              childSitePrice: item.ticket_prices[1].window_price,
              image: item?.card_image?.url,
              isPremium: false,
              additional_price_type: item.additional_price_type,
              premiumPrice: item.premium_amount,
              premiumSPrice: item.premium_s_amount,
              deluxPrice: item.deluxe_amount,
              city_id: item.city_id,
              kr_name: item.title_kr,
              description: item.announcement,
            }));
        return res?.map((item) => ({
          id: item.id.toString(),
          name: item.title_en,
          availability: item.announcement,
          adultPrice: item.ticket_prices[0].sale_price,
          adultSitePrice: item.ticket_prices[0].sale_price,
          childPrice: item.ticket_prices[1].sale_price,
          childSitePrice: item.ticket_prices[1].sale_price,
          image: item?.card_image?.url,
          isPremium: false,
          additional_price_type: item.additional_price_type,
          premiumPrice: item.premium_amount,
          premiumSPrice: item.premium_s_amount,
          deluxPrice: item.deluxe_amount,
          city_id: item.city_id,
          kr_name: item.title_kr,
          description: item.announcement,
        }));
      }
    ),
  });

  return { tickets };
};
