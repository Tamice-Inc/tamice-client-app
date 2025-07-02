import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { createState } from "state-pool";

import { MedalEnum } from "./modules/cart/components/CardInfo";
import { NavBarElement } from "./shared/components/NavBar";
import { useCacheCart, useCityState, useMusicState } from "./shared/hooks";
import { router } from "./shared/routes";

// Import css files
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";
import "react-phone-number-input/style.css";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";
import { LoadingProvider } from "./modules/cart/components/checkout-context";

const queryClient = new QueryClient();

export const authState = createState(localStorage.getItem("AUTH_TOKEN"));
export const musicState = createState<{
  music_id: string;
}>({
  music_id: "",
});

export type CartItem = {
  cartId: string;
  tour_date?: string;
  reservation_id: number | null;
  item_id: number | null;
  adult_child_type: "성인" | "아동";
  name: string;
  kr_name?: string;
  price: number;
  priceOptionTitle?: string;
  priceOptionId?: string;
  quantity: number;
  addition: number;
  subtotal: number;
  additional_price_type?: string;
  additional_price_image?: string;
  subCategoryName?: string;
  cityId?: number;
  categoryId?: string;
  subCategoryId?: string;
  subCategoryTitle?: string;
  subCategoryPrice?: number;
  subPath?: string;
  ticket_type?: string;
  ticket_sent_status?: string | null;
  refund_status?: string | null;
  ticket_id?: string;
  location?: string;
  musical_order?: string;
  music_id?: string;
  time?: number;
  includes?: {
    medal: MedalEnum;
    name: string;
    addition?: number;
    scheduledDate?: string;
  }[];
};

export const cityState = createState<{
  city_id: string;
  cityName: string;
}>({
  city_id: "1",
  cityName: "뉴욕",
});
const pageNavBar: NavBarElement[] = [
  {
    name: "뉴욕 홈",
    path: "/main",
  },
  {
    name: "뉴욕패스",
    path: "/package-tour",
    dropdownElements: [
      { name: "뉴욕빅애플패스", subPath: "ba-pass", id: 97, category_id: 1 },
      { name: "뉴욕시티패스", subPath: "city-pass", id: 98, category_id: 1 },
      {
        name: "뉴욕익스플로러패스",
        subPath: "explore-pass",
        id: 99,
        category_id: 1,
      },
    ],
  },
  {
    name: "뉴욕입장권",
    path: "/city-attractions/observations",
    dropdownElements: [
      { name: "전망대", subPath: "observations", id: 4, category_id: 2 },
      {
        name: "미술관/박물관",
        subPath: "museum-gallery",
        id: 101,
        category_id: 2,
      },
      { name: "크루즈", subPath: "rides-cruises", id: 102, category_id: 2 },
      { name: "액티비티", subPath: "activities", id: 103, category_id: 2 },
      { name: "버스투어", subPath: "bus", id: 227, category_id: 2 },
      { name: "공항셔틀", subPath: "airport", id: 228, category_id: 2 },
    ],
  },
  {
    name: "가이드투어",
    path: "/guide-tour",
    dropdownElements: [
      {
        name: "뉴욕 데이투어",
        subPath: "manhattan-day",
        id: 2,
        category_id: 4,
      },
      {
        name: "뉴욕 야경투어",
        subPath: "manhattan-night",
        id: 104,
        category_id: 4,
      },
      { name: "도슨트 투어", subPath: "doson-tour", id: 105, category_id: 4 },
      { name: "UN 투어", subPath: "un-tour", id: 106, category_id: 4 },
      { name: "근교 투어", subPath: "neighbour-tour", id: 229, category_id: 4 },
    ],
  },
  {
    name: "브로드웨이 뮤지컬",
    path: "/musicals_view",
    // dropdownElements: [{ name: "Musicals & Shows", subPath: "", id: 189, category_id: 57 }],
  },
  {
    name: "미국유심",
    path: "/sim-card",
  },
  {
    name: "이벤트/정보",
    path: "/trip-info",
  },
  {
    name: "타미스?!",
    path: "/about",
  },

  // {
  //   name: "나의 예약상품 조회",
  //   path: "/user/non-member-order-lookup",
  // },
  // {
  //   name: "나의 예약상품 조회",
  //   path: "/user/non-member-order-lookup",
  // },
  // {
  //   name: "Contact Us",
  //   path: "/contact",
  // },
];

export const menuState = createState<
  {
    path: string;
    name: string;
    dropdownElements?: {
      name: string;
      subPath: string;
      id?: number;
      category_id?: number;
    }[];
  }[]
>(pageNavBar);

export const cartState = createState<{
  childInfo: CartItem[];
  adultInfo: CartItem[];
  selectInfo?: any[];
}>({
  childInfo: [
    // {
    //   name: "Big Apple 2",
    //   price: 100,
    //   quantity: 1,
    //   addition: 27,
    //   subtotal: 137,
    //   includes: [
    //     {
    //       medal: MedalEnum.GOLD,
    //       name: "Summit Observation Deck",
    //       addition: 18,
    //     },
    //     {
    //       medal: MedalEnum.SILVER,
    //       name: "Moma Museum Doson Tour",
    //       scheduledDate: "01/25/2023 (10:30 AM)",
    //       addition: 9,
    //     },
    //   ],
    // },
  ],
  adultInfo: [],
  selectInfo: [],
});

export const reservationsState = createState<{
  reservations: unknown[];
}>({
  reservations: [],
});

export const menuLoadingState = createState<boolean>(false);

export const reservationsParsedState = createState<{
  reservations: unknown[];
}>({
  reservations: [],
});

export const cityDataState = createState<{
  cityData: any[];
}>({
  cityData: [],
});

export const orderLookupState = createState<{
  orderLoginNumber: string;
  orderLoginEmail: string;
  phone: string;
  customer_name_kr: string;
  customer_name_en: string;
}>({
  orderLoginNumber: "",
  orderLoginEmail: "",
  phone: "",
  customer_name_kr: "",
  customer_name_en: "",
});

export const pageNumState = createState<number>(5);

export const cityIdState = createState<number>(Number(localStorage.getItem("cityId")) || 1);

function App() {
  // Define Global State variables
  const [cityId] = cityIdState.useState();
  const [menu, setMenu] = menuState.useState();
  // const [menuLoading, setMenuLoading] = menuLoadingState.useState();
  const [errors, setErrors] = useState("");

  // Set the default city data
  // localStorage.setItem("cityId", "1");
  // localStorage.setItem("cityName", "New York");

  // Define useEffect Hook
  useEffect(() => {
    let menuData = JSON.parse(JSON.stringify(menu));

    if (cityId == 36) {
      // San Francisco
      menuData.splice(0, 1, {
        name: "샌프란 홈",
        path: "/sf/main",
      });
      menuData.splice(1, 1, {
        name: "샌프란 패스",
        path: "/sf/package-tour",
        dropdownElements: [
          {
            name: "샌프란 빅애플패스",
            subPath: "ba-pass",
            id: 201,
            category_id: 62,
          },
          {
            name: "샌프란 시티패스",
            subPath: "city-pass",
            id: 202,
            category_id: 62,
          },
          {
            name: "샌프란 익스플로러패스",
            subPath: "explore-pass",
            id: 213,
            category_id: 62,
          },
        ],
      });
      menuData.splice(
        2,
        2,
        {
          name: "샌프란 크루즈/버스투어",
          // path: "/sf/city-attractions/observations",
          path: "/sf/city-attractions/cruise-bustour",
        },
        {
          name: "샌프란 미술관/박물관",
          path: "/sf/guide-tour/manhattan-day",
        }
      );
      menuData.splice(3, 1, {
        name: "샌프란 미술관/박물관",
        path: "/sf/guide-tour/sf-museum",
      });

      if (menuData[4].name === "브로드웨이 뮤지컬") {
        menuData.splice(4, 1);
      }

      menuData.splice(
        4,
        3,
        {
          name: "샌프란 액티비티",
          path: "/sf/city-attractions/activities",
        },
        // {
        //   name: "미국유심",
        //   path: "/sim-card",
        // },
        {
          name: "이벤트/정보",
          path: "/sf-trip-info",
        },
        {
          name: "타미스?!",
          path: "/about",
        }
      );
    } else if (cityId == 58) {
      // Boston
      menuData.splice(0, 1, {
        name: "라스베가스/캐년 홈",
        path: "/ls/main",
      });

      menuData.splice(
        1,
        5,
        {
          name: "라스베가스 빅애플패스",
          path: "/ls/package-tour/ba-pass",
          dropdownElements: [
            {
              name: "라스베가스",
              subPath: "ba-pass",
              id: 233,
              category_id: 84,
            },
          ],
          hideDropdownOnMobile: true,
        },
        {
          name: "라스베가스/캐년 입장지",
          path: "/ls",
          dropdownElements: [
            {
              name: "라스베가스 입장지",
              subPath: "ls-entry",
              id: 230,
              category_id: 85,
            },

            {
              name: "캐년 입장지",
              subPath: "canyon-entry",
              id: 231,
              category_id: 85,
            },
          ],
        },

        {
          name: "라스베가스 쇼",
          path: "/cy/show",
          dropdownElements: [
            {
              name: "라스베가스 쇼",
              subPath: "show",
              id: "",
              category_id: 86,
            },
          ],
          hideDropdownOnMobile: true,
        },
        {
          name: "빅애플캐년 캠핑카 투어",
          path: "/cy/camping-car",
          dropdownElements: [
            {
              name: "빅애플캐년 캠핑카 투어",
              subPath: "camping-car",
              id: "",
              category_id: 87,
            },
          ],
          hideDropdownOnMobile: true,
        },
        {
          name: "캐년 패키지 투어",
          path: "/cy/canyon-tour",
          dropdownElements: [
            {
              name: "캐년 패키지 투어",
              subPath: "canyon-tour",
              id: "",
              category_id: 88,
            },
          ],
          hideDropdownOnMobile: true,
        }
      );

      if (menuData[4].name === "브로드웨이 뮤지컬") {
        menuData.splice(4, 1);
      }

      menuData.splice(
        6,
        1,
        // {
        //   name: "미국유심",
        //   path: "/sim-card",
        // },
        {
          name: "이벤트/정보",
          path: "/lv-trip-info",
        }
      );
    } else if (cityId == 57) {
      // Niagara
      menuData.splice(0, 1, {
        name: "나이아가라 홈",
        path: "/nf/main",
      });
      menuData.splice(
        1,
        6,
        {
          name: "나이아가라 빅애플패스",
          path: "/nf/package-tour/ba-pass",
          dropdownElements: [
            {
              name: "나이아가라 빅애플패스",
              subPath: "ba-pass",
              id: "235",
              category_id: 80,
            },
          ],
          hideDropdownOnMobile: true,
        },
        {
          name: "나이아가라 크루즈",
          path: "/nf/cruise",
          dropdownElements: [
            {
              name: "나이아가라 크루즈",
              subPath: "cruise",
              id: "",
              category_id: 81,
            },
          ],
          hideDropdownOnMobile: true,
        },
        {
          name: "나이아가라 입장지",
          path: "/nf/entry",
          dropdownElements: [
            {
              name: "나이아가라 입장지",
              subPath: "entry",
              id: "",
              category_id: 82,
            },
          ],
          hideDropdownOnMobile: true,
        },
        {
          name: "나이아가라 액티비티",
          path: "/nf/activity",
          dropdownElements: [
            {
              name: "나이아가라 액티비티",
              subPath: "activity",
              id: "",
              category_id: 83,
            },
          ],
          hideDropdownOnMobile: true,
        },
        {
          name: "나이아가라 투어",
          path: "/nf/tour",
          dropdownElements: [
            {
              name: "나이아가라 투어",
              subPath: "tour",
              id: "",
              category_id: 90,
            },
          ],
          hideDropdownOnMobile: true,
        },

        {
          name: "캐나다 유심",
          path: "/nf/sim",
          dropdownElements: [
            {
              name: "나이아가라 투어",
              subPath: "tour",
              id: "",
              category_id: 91,
            },
          ],
          hideDropdownOnMobile: true,
        }
        // {
        //   name: "나이아가라 유심",
        //   path: "/nf/sim-card",
        //   dropdownElements: [
        //     {
        //       name: "나이아가라 액티비티",
        //       subPath: "sim-card",
        //       id: "",
        //       category_id: 84,
        //     },
        //   ],
        // }
      );

      if (menuData[4].name === "브로드웨이 뮤지컬") {
        menuData.splice(4, 1);
      }

      menuData.splice(
        7,
        1,
        // {
        //   name: "미국유심",
        //   path: "/sim-card",
        // },
        {
          name: "이벤트/정보",
          path: "/nf-trip-info",
        }
      );
    } else if (cityId == 56) {
      // Boston
      menuData.splice(0, 1, {
        name: "보스턴 홈",
        path: "/boston/main",
      });
      menuData.splice(
        1,
        5,
        {
          name: "보스턴 빅애플패스",
          path: "/boston/package-tour/ba-pass",
          dropdownElements: [
            {
              name: "보스턴",
              subPath: "ba-pass",
              id: "236",
              category_id: 75,
            },
          ],
          hideDropdownOnMobile: true,
        },
        {
          name: "보스턴 아이비리그투어",
          path: "/boston/ivy-league",
          dropdownElements: [
            {
              name: "보스턴",
              subPath: "ivy-league",
              id: "",
              category_id: 76,
            },
          ],
          hideDropdownOnMobile: true,
        },
        {
          name: "보스턴 전망대/크루즈",
          path: "/boston/observation-cruise",
          dropdownElements: [
            {
              name: "보스턴 전망대/크루즈",
              subPath: "observation-cruise",
              id: "",
              category_id: 77,
            },
          ],
          hideDropdownOnMobile: true,
        },
        {
          name: "보스턴 버스투어",
          path: "/boston/bus",
          dropdownElements: [
            {
              name: "보스턴 버스투어",
              subPath: "bus",
              id: "",
              category_id: 78,
            },
          ],
          hideDropdownOnMobile: true,
        },
        {
          name: "보스턴 미술관/박물관",
          path: "/boston/gallery-museum",
          dropdownElements: [
            {
              name: "보스턴 미술관/박물관",
              subPath: "ba-pass",
              id: "",
              category_id: 79,
            },
          ],
          hideDropdownOnMobile: true,
        }
      );

      if (menuData[4].name === "브로드웨이 뮤지컬") {
        menuData.splice(4, 1);
      }

      menuData.splice(
        6,
        1,
        // {
        //   name: "미국유심",
        //   path: "/sim-card",
        // },
        {
          name: "이벤트/정보",
          path: "/boston-trip-info",
        }
        // {
        //   name: "타미스?!",
        //   path: "/about",
        // }
      );
    } else if (cityId == 59) {
      // Boston
      menuData.splice(0, 1, {
        name: "하와이/LA/샌디에고 홈",
        path: "/hls/main",
      });
      menuData.splice(
        1,
        5,
        {
          name: "빅애플패스",
          path: "/hls/package-tour/ba-pass",
          dropdownElements: [
            {
              name: "빅애플패스",
              subPath: "ba-pass",
              id: "241",
              category_id: 92,
            },
          ],
          hideDropdownOnMobile: true,
        },
        {
          name: "하와이",
          path: "/hls/city/hawaii",
          dropdownElements: [
            {
              name: "hawaii",
              subPath: "/city/hawaii",
              id: "",
              category_id: 94,
            },
          ],
          hideDropdownOnMobile: true,
        },
        {
          name: "로스앤젤레스",
          path: "/hls/city/losangeles",
          dropdownElements: [
            {
              name: "로스앤젤레스",
              subPath: "/city/losangeles",
              id: "",
              category_id: 95,
            },
          ],
          hideDropdownOnMobile: true,
        },
        {
          name: "산타 카탈리나",
          path: "/hls/city/santacatalina",
          dropdownElements: [
            {
              name: "산타 카탈리나",
              subPath: "/city/santacatalina",
              id: "",
              category_id: 96,
            },
          ],
          hideDropdownOnMobile: true,
        },
        {
          name: "샌디에고",
          path: "/hls/city/sandiego",
          dropdownElements: [
            {
              name: "샌디에고",
              subPath: "/city/sandiego",
              id: "",
              category_id: 97,
            },
          ],
          hideDropdownOnMobile: true,
        }
      );


      menuData.splice(
        6,
        2,
        // {
        //   name: "미국유심",
        //   path: "/sim-card",
        // },
        {
          name: "이벤트/정보",
          path: "/hls/city/event",
        },
        {
          name: "타미스?!",
          path: "/about",
        }
      );
    }  else {
      // New York
      menuData.splice(0, 1, {
        name: "뉴욕 홈",
        path: "/ny/main",
      });
      menuData.splice(1, 1, {
        name: "뉴욕패스",
        path: "/ny/package-tour",
        dropdownElements: [
          {
            name: "뉴욕빅애플패스",
            subPath: "ba-pass",
            id: 97,
            category_id: 1,
          },
          {
            name: "뉴욕시티패스",
            subPath: "city-pass",
            id: 98,
            category_id: 1,
          },
          {
            name: "뉴욕익스플로러패스",
            subPath: "explore-pass",
            id: 99,
            category_id: 1,
          },
        ],
      });

      menuData.splice(
        2,
        2,
        {
          name: "뉴욕입장권",
          path: "/ny/city-attractions",
          dropdownElements: [
            {
              name: "전망대",
              subPath: "observations",
              id: 4,
              category_id: 2,
            },
            {
              name: "미술관/박물관",
              subPath: "museum-gallery",
              id: 101,
              category_id: 2,
            },
            {
              name: "크루즈",
              subPath: "rides-cruises",
              id: 102,
              category_id: 2,
            },
            {
              name: "액티비티",
              subPath: "activities",
              id: 103,
              category_id: 2,
            },
            { name: "버스투어", subPath: "bus", id: 227, category_id: 2 },
            {
              name: "공항셔틀",
              subPath: "airport",
              id: 228,
              category_id: 2,
            },
          ],
        },
        {
          name: "가이드투어",
          path: "/ny/guide-tour",
          dropdownElements: [
            {
              name: "뉴욕 데이투어",
              subPath: "manhattan-day",
              id: 2,
              category_id: 4,
            },
            {
              name: "뉴욕 야경투어",
              subPath: "manhattan-night",
              id: 104,
              category_id: 4,
            },
            {
              name: "도슨트 투어",
              subPath: "doson-tour",
              id: 105,
              category_id: 4,
            },
            {
              name: "UN 투어",
              subPath: "un-tour",
              id: 106,
              category_id: 4,
            },
            {
              name: "근교 투어",
              subPath: "neighbour-tour",
              id: 229,
              category_id: 4,
            },
          ],
        }
      );

      if (menuData[4].name !== "브로드웨이 뮤지컬") {
        menuData.splice(4, 0, {
          name: "브로드웨이 뮤지컬",
          path: "/ny/musicals_view",
        });
      }
      menuData.splice(
        5,
        3,
        {
          name: "미국유심",
          path: "/ny/sim-card",
        },
        {
          name: "이벤트/정보",
          path: "/ny/trip-info",
        },
        {
          name: "타미스?!",
          path: "/about",
        }
      );

      menuData.splice(4, 1, {
        name: "브로드웨이 뮤지컬",
        path: "/ny/musicals_view",
      });
    }

    const uniqueMenuData = Array.from(new Set(menuData.map((item: any) => item.name))).map(
      (name) => {
        return menuData.find((item: any) => item.name === name);
      }
    );

    setMenu(uniqueMenuData);
    localStorage.setItem("cityId", String(cityId));

    // setMenuLoading(true);
  }, [cityId]);

  useCacheCart();
  useCityState();
  useMusicState();

  if (errors) {
    // Base url
    const baseUrl = window.location.port
      ? `${window.location.protocol}//${window.location.hostname}:${window.location.port}`
      : `${window.location.protocol}//${window.location.hostname}`;

    return (
      <div className="flex flex-col items-center justify-center h-screen gap-5">
        <h1 className="text-xl">시스템 에러 - 1분 뒤에 닫기를 눌러주시고 다시 시도해주세요!</h1>
        <button
          className="w-[100px]  text-base font-poppins text-white bg-blue py-2 h-12 rounded text-base"
          onClick={() => (window.location.href = baseUrl)}
        >
          닫기
        </button>
      </div>
    );
  }

  return (
    <LoadingProvider>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </LoadingProvider>
  );
}

export default App;



