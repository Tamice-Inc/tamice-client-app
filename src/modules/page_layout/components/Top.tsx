import { ReactNode, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CartItem,
  cartState,
  cityDataState,
  cityIdState,
  menuLoadingState,
  menuState,
  orderLookupState,
  pageNumState,
} from "../../../App";
import { staticFiles } from "../../../shared";
import { Logo } from "../../../shared/components/Logo";
import { NavBar, NavBarElement } from "../../../shared/components/NavBar";
import { SpaceY } from "../../../shared/components/Utils";
import { useGetAllCities } from "../../../shared/hooks";

// const pageNavBar: NavBarElement[] = [
//   {
//     name: "뉴욕 홈",
//     path: "/main",
//   },
//   {
//     name: "NY Package Tour",
//     path: "/package-tour",
//     dropdownElements: [
//       { name: "NY Big Apple Pass", subPath: "ba-pass", id: 97 },
//       { name: "NY City Pass", subPath: "city-pass", id: 98 },
//       { name: "NY City Explore Pass", subPath: "explore-pass", id: 99 },
//       { name: "NY Big Apple Pass", subPath: "ba-pass", id: 97 },
//       { name: "NY City Pass", subPath: "city-pass", id: 98 },
//       { name: "NY City Explore Pass", subPath: "explore-pass", id: 99 },
//     ],
//   },
//   {
//     name: "NY City Attractions",
//     path: "/city-attractions",
//     dropdownElements: [
//       { name: "NY Observation(Scenics)", subPath: "observations", id: 2 },
//       { name: "NY Museum/Gallery", subPath: "museum-gallery", id: 104 },
//       { name: "NY Rides/Cruises", subPath: "rides-cruises", id: 105 },
//       { name: "NY Activities", subPath: "activities", id: 106 },
//     ],
//   },
//   {
//     name: "NY Guide Tour",
//     path: "/guide-tour",
//     dropdownElements: [
//       { name: "NY Manhattan Day Tour", subPath: "manhattan-day", id: 4 },
//       { name: "NY Manhattan Night Tour", subPath: "manhattan-night", id: 101 },
//       { name: "NY Doson Tour", subPath: "doson-tour", id: 102 },
//       { name: "NY UN Tour", subPath: "un-tour", id: 103 },
//     ],
//   },
//   {
//     name: "브로드웨이 뮤지컬",
//     path: "/musicals_view",
//   },
//   {
//     name: "이벤트/정보",
//     path: "/trip-info",
//   },
//   {
//     name: "타미스?!",
//     path: "/about",
//   },
//   // {
//   //   name: "Contact Us",
//   //   path: "/contact",
//   // },
//   {
//     name: "",
//     path: "",
//     dropdownElements: [
//       { name: "내 정보", subPath: "my-page" },
//       { name: "Account", subPath: "user/my-account" },
//     ],
//   },
//   {
//     name: "Sign out",
//     path: "/",
//   },
// ];

const pageNavBarNonMember: NavBarElement[] = [
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
    path: "/city-attractions",
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
  //   name: "Contact Us",
  //   path: "/contact",
  // },
  {
    name: "내 정보",
    path: "",
    dropdownElements: [{ name: "마이페이지", subPath: "my-page" }],
  },
  {
    name: "로그아웃",
    path: "/",
  },
];

// const pageNavBarNotSigned: NavBarElement[] = [
//   {
//     name: "뉴욕 홈",
//     path: "/main",
//   },
//   {
//     name: "Package Tour",
//     path: "/package-tour",
//     dropdownElements: [
//       { name: "NY Big Apple Pass", subPath: "ba-pass" },
//       { name: "NY City Pass", subPath: "city-pass" },
//       { name: "NY City Explore Pass", subPath: "explore-pass" },
//     ],
//   },
//   {
//     name: "City Attractions",
//     path: "/city-attractions",
//     dropdownElements: [
//       { name: "Observation(Scenics)", subPath: "observations" },
//       { name: "Museum/Gallery", subPath: "museum-gallery" },
//       { name: "Rides/Cruises", subPath: "rides-cruises" },
//       { name: "Activities", subPath: "activities" },
//     ],
//   },
//   {
//     name: "Guide Tour",
//     path: "/guide-tour",
//     dropdownElements: [
//       { name: "Manhattan Day Tour", subPath: "manhattan-day" },
//       { name: "Manhattan Night Tour", subPath: "manhattan-night" },
//       { name: "Doson Tour", subPath: "doson-tour" },
//       { name: "UN Tour", subPath: "un-tour" },
//     ],
//   },
//   {
//     name: "브로드웨이 뮤지컬",
//     path: "/musicals_view",
//   },
//   {
//     name: "이벤트/정보",
//     path: "/trip-info",
//   },
//   {
//     name: "타미스?!",
//     path: "/about",
//   },
//   // {
//   //   name: "Contact Us",
//   //   path: "/contact",
//   // },
//   {
//     name: "Login",
//     path: "/user/log-in",
//   },
//   {
//     name: "Register",
//     path: "/user/sign-up",
//   },
//   {
//     name: "Sign out",
//     path: "/",
//   },
// ];

// const pageLayoutNavBar: NavBarElement[] = [
//   {
//     name: "Home",
//     path: "/main",
//   },
//   {
//     name: "Package Tour",
//     path: "/package-tour",
//     dropdownElements: [
//       { name: "NY Big Apple Pass", subPath: "ba-pass", id: 97 },
//       { name: "NY City Pass", subPath: "city-pass", id: 98 },
//       { name: "NY City Explore Pass", subPath: "explore-pass", id: 99 },
//     ],
//   },
//   {
//     name: "City Attractions",
//     path: "/city-attractions",
//     dropdownElements: [
//       { name: "Observation(Scenics)", subPath: "observations", id: 2 },
//       { name: "Museum/Gallery", subPath: "museum-gallery", id: 104 },
//       { name: "Rides/Cruises", subPath: "rides-cruises", id: 105 },
//       { name: "Activities", subPath: "activities", id: 106 },
//     ],
//   },
//   {
//     name: "Guide Tour",
//     path: "/guide-tour",
//     dropdownElements: [
//       { name: "Manhattan Day Tour", subPath: "manhattan-day", id: 4 },
//       { name: "Manhattan Night Tour", subPath: "manhattan-night", id: 101 },
//       { name: "Doson Tour", subPath: "doson-tour", id: 102 },
//       { name: "UN Tour", subPath: "un-tour", id: 103 },
//     ],
//   },
//   {
//     name: "브로드웨이 뮤지컬",
//     path: "/musicals-and-shows",
//   },
//   {
//     name: "여행정보",
//     path: "/main",
//   },
//   {
//     name: "About Us",
//     path: "/about",
//   },
//   {
//     name: "Contact Us",
//     path: "/contact",
//   },
// ];

const IconButton: React.FC<{
  icon: string;
  route?: string;
  name?: string;
  isOpen?: any;
  orderLoginData?: boolean;
  children?: ReactNode;
  badge?: number;
  handleClick?: any;
  order?: string;
  mobile?: boolean;
  isDropdownOpen?: boolean;
  setDropdownOpen?: any;
}> = ({
  icon,
  name,
  route,
  isOpen,
  orderLoginData,
  children,
  badge,
  handleClick,
  order,
  mobile,
  isDropdownOpen,
  setDropdownOpen,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  const classConst = orderLoginData
    ? `absolute flex flex-col  bg-white  text-black z-[100] shadow-2xl ${
        mobile ? "right-0" : "xl:left-[79%] left-0"
      }  font-poppins  top-[3.1rem]  xl:top-[3.5rem] py-5 w-[200px] rounded-b opacity-[95%]`
    : `absolute flex flex-col  bg-white  text-black z-[100] shadow-2xl ${
        mobile ? "right-0" : "xl:left-[79%] left-0"
      }  font-poppins  top-[3.1rem]  xl:top-[3.5rem] py-5 w-[200px] rounded-b opacity-[95%]`;

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    // Check if the related target (the new focused element) is outside of the dropdown
    if (dropdownRef.current && !dropdownRef.current.contains(event.relatedTarget as Node)) {
      setDropdownOpen(false);
    }
  };
  if (!!order) {
    if (children)
      return (
        <div
          onBlur={handleBlur}
          tabIndex={0} // Make this div focusable
          className={`flex items-center justify-center text-sm rounded-sm ml-0 mr-0 xl:px-8 font-poppins text-dark whitespace-nowrap ${
            mobile ? "relative" : ""
          }`}
        >
          <img
            className="cursor-pointer"
            src={icon}
            width="17"
            alt={icon}
            onClick={() => {
              handleClick(order);
              setDropdownOpen(!isDropdownOpen); // Toggle dropdown on click
            }}
          />
          {name && <span className="ml-1 cursor-pointer">{name}</span>}
          {isDropdownOpen && (
            <div ref={dropdownRef} className={classConst}>
              {children}
            </div>
          )}
        </div>
      );
  }

  return (
    <button
      onClick={() => route && navigate(route)}
      className="flex items-center justify-center ml-0 mr-0 text-sm rounded-sm xl:px-8 font-poppins text-dark whitespace-nowrap"
    >
      <img src={icon} width="17" alt={icon} />
      {name && <span className="ml-1">{name}</span>}

      {Boolean(badge) && (
        <div className="static inline-flex items-center justify-center w-5 h-5 -mt-4 text-xs font-bold text-white rounded-full xl:w-6 xl:h-6 bg-red top-2rem dark:border-gray-900">
          {badge}
        </div>
      )}
    </button>
  );
};

const IndependentIconButton: React.FC<{
  icon: string;
  route?: string;
  name?: string;
  isOpen?: any;
  orderLoginData?: boolean;
  children?: ReactNode;
  badge?: number;
  handleClick?: any;
  order?: string;
  mobile?: boolean;
}> = ({
  icon,
  name,
  route,
  isOpen,
  orderLoginData,
  children,
  badge,
  handleClick,
  order,
  mobile,
}) => {
  const navigate = useNavigate();
  const classConst = orderLoginData
    ? `absolute flex flex-col  bg-white text-black z-[100] shadow-2xl ${
        mobile ? "right-0" : "xl:left-[79%] left-0"
      }  font-poppins  top-[2.6rem]  xl:top-[3.5rem] py-5 w-[200px] rounded-b opacity-[95%]`
    : `absolute flex flex-col  bg-white  text-black z-[100] shadow-2xl ${
        mobile ? "right-0" : "xl:left-[79%] left-0"
      }  font-poppins  top-[2.6rem]  xl:top-[3.5rem] py-5 w-[200px] rounded-b opacity-[95%]`;

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    // Check if the related target (the new focused element) is outside of the dropdown
    if (dropdownRef.current && !dropdownRef.current.contains(event.relatedTarget as Node)) {
      setDropdownOpen(false);
    }
  };
  if (!!order) {
    if (children)
      return (
        <div
          onClick={() => {
            handleClick(order);
            setDropdownOpen(!isDropdownOpen); // Toggle dropdown on click
          }}
          onBlur={handleBlur}
          tabIndex={0} // Make this div focusable
          className={`flex items-center justify-center text-sm rounded-sm ml-4 mr-0 xl:px-8 font-poppins text-dark whitespace-nowrap ${
            mobile ? "relative" : ""
          }`}
        >
          <img className="cursor-pointer" src={icon} width="17" alt={icon} />
          {name && <span className="ml-1 cursor-pointer">{name}</span>}
          {isDropdownOpen && (
            <div ref={dropdownRef} className={classConst}>
              {children}
            </div>
          )}
        </div>
      );
  }

  return (
    <button
      onClick={() => route && navigate(route)}
      className="flex items-center justify-center ml-0 mr-0 text-sm rounded-sm xl:px-8 font-poppins text-dark whitespace-nowrap"
    >
      <img src={icon} width="17" alt={icon} />
      {name && <span className="ml-1">{name}</span>}

      {Boolean(badge) && (
        <div className="static inline-flex items-center justify-center w-5 h-5 -mt-4 text-xs font-bold text-white rounded-full xl:w-6 xl:h-6 bg-red top-2rem dark:border-gray-900">
          {badge}
        </div>
      )}
    </button>
  );
};

const getTotalShoppingCartCount = ({
  childInfo,
  adultInfo,
}: {
  childInfo: CartItem[];
  adultInfo: CartItem[];
}) => {
  let quantityByCartId = new Map();
  const combinedInfo = [...childInfo, ...adultInfo];

  combinedInfo.forEach((info) => {
    if (info.subtotal != -100) {
      if (!quantityByCartId.has(info.cartId)) {
        quantityByCartId.set(info.cartId, info.quantity);
      }
    }
  });

  return Array.from(quantityByCartId.values())?.reduce(
    (acc: number, curr: number) => acc + curr,
    0
  );
};

export const Top = () => {
  // Create a navigate object from useNavigate Hook
  const navigate = useNavigate();

  // Define Global state variables and its handler functions
  const [cart, setCart] = cartState.useState();
  const [orderLookup, setOrderLookup] = orderLookupState.useState();
  const [cityId, setCityId] = cityIdState.useState();
  const [cityData, setCityData] = cityDataState.useState();
  const [menu, setMenu] = menuState.useState();
  const [totalNum, setTotalNum] = pageNumState.useState();
  const [menuLoading, setMenuLoading] = menuLoadingState.useState();

  // Define component state variables with useState Hook
  const [cartCount, setCartCount] = useState(getTotalShoppingCartCount(cart));
  const [isOpen, setIsOpen] = useState({ first: false, second: false });
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Get auth token and login data from localStorage
  const authToken = localStorage.getItem("authToken");
  const loginData = localStorage.getItem("loginData");
  const orderLoginData = localStorage.getItem("orderLoginNumber") ? true : false;

  // Set loginState based on the authToken obtained from localStorage
  const loginState = (authToken && loginData) || orderLoginData;

  // NavBar list for logged in users
  let pageNavBar = [
    ...menu,
    {
      name: "내 정보",
      path: "",
      dropdownElements: [
        { name: "마이페이지", subPath: "my-page" },
        { name: "내 계정", subPath: "user/my-account" },
      ],
    },
    {
      name: "로그아웃",
      path: "/",
    },
  ];

  // NavBar list for users that are not logged in yet
  let pageNavBarNoLogIn = [
    ...menu,
    {
      name: "로그인",
      path: "/user/log-in",
    },
    {
      name: "회원가입",
      path: "/user/sign-up",
    },

    {
      name: "마이페이지",
      path: "/user/non-member-order-lookup",
    },
  ];

  // Get all cities data from useGetAllCities custom hook with api call
  const { CitiesData } = useGetAllCities();

  // Define useEffect Hooks to trigger serveral actions and state changes
  useEffect(() => {
    // This effect will be triggered whenever the `cart` state changes
    setCartCount(getTotalShoppingCartCount(cart));
  }, [cart]);

  useEffect(() => {
    if (CitiesData) {
      setCityData({ cityData: CitiesData });
    }
  }, [CitiesData]);

  useEffect(() => {
    setIsLoading(true);
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
          path: "/ls/ls-trip-info",
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
              name: "나이아가라",
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
              name: "나이아가라",
              subPath: "cruise",
              id: "235",
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
              name: "나이아가라",
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
          path: "/nf/nf-trip-info",
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
          path: "/boston/boston-trip-info",
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
    } else {
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
          path: "/ny/about",
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
    setTotalNum(5);
    setIsLoading(false);
    setMenuLoading(true);
  }, [cityId]);

  useEffect(() => {
    // change city name based on cityId
    const cityName = CitiesData?.find((city) => city.id === cityId)?.name;
    localStorage.setItem("cityName", cityName || "");
  }, [CitiesData, cityId]);

  useEffect(() => {
    // Move scroll to the topmost when users navigate here
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to handle menu click action
  const handleClick = (order: string) => {
    if (order === "first") {
      setIsOpen({
        ...isOpen,
        first: !isOpen.first,
        second: false,
      });
    } else {
      setIsOpen({
        ...isOpen,
        second: !isOpen.second,
        first: false,
      });
    }
  };

  // Function to handle log out action
  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("loginData");
    localStorage.removeItem("order_number");
    localStorage.removeItem("useremail");
    localStorage.removeItem("role");
    // Remove non Member loginData
    localStorage.removeItem("orderLoginNumber");
    localStorage.removeItem("orderLoginEmail");
    localStorage.removeItem("phone");
    localStorage.removeItem("customer_name_en");
    localStorage.removeItem("customer_name_kr");

    setOrderLookup({
      orderLoginNumber: "",
      orderLoginEmail: "",
      phone: "",
      customer_name_kr: "",
      customer_name_en: "",
    });

    // Remove Booking Edit items in Cart
    let cartData = localStorage.getItem("CART_DATA")
      ? JSON.parse(localStorage.getItem("CART_DATA") || "")
      : { adultInfo: [], childInfo: [] };

    cartData.adultInfo = cartData.adultInfo.filter((item: any) => item.reservation_id == null);

    cartData.childInfo = cartData.childInfo.filter((item: any) => item.reservation_id == null);

    localStorage.setItem("CART_DATA", JSON.stringify(cartData));
    cartData = JSON.parse(localStorage.getItem("CART_DATA") || "");

    setCart({
      adultInfo: cartData.adultInfo,
      childInfo: cartData.childInfo,
    });

    setCartCount(
      getTotalShoppingCartCount({
        adultInfo: cartData.adultInfo,
        childInfo: cartData.childInfo,
      })
    );

    console.log("cache file--------");
    if ("caches" in window) {
      caches.keys().then((names) => {
        // Delete all the cache files
        names.forEach((name) => {
          caches.delete(name);
        });
      });
    }
    navigate("/");
  };

  // Function to handle scroller action
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 0) {
      setHasScrolled(true);
    } else {
      setHasScrolled(false);
    }
  };

  // Show Loading spinner while loading
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {/* Mobile */}
      <div
        className={`bg-[#F7F8FA] transition-shadow sticky top-0 z-[500] z-[110] flex xl:hidden  justify-between md:justify-between items-center ${
          hasScrolled ? "shadow-md" : "shadow-none"
        } px-[5vw] max-w-[1300px] w-full `}
      >
        <div className="flex items-center justify-center">
          <div className="pr-4">
            <IconButton
              isOpen={isOpen}
              order={"first"}
              handleClick={handleClick}
              icon={staticFiles.icons.menu}
              orderLoginData={orderLoginData}
              setDropdownOpen={setDropdownOpen}
              isDropdownOpen={isDropdownOpen}
            >
              {loginState ? (
                <NavBar
                  elements={orderLoginData ? pageNavBarNonMember : pageNavBar}
                  isMobile
                  handleSignOut={handleSignOut}
                  setDropdownOpen={setDropdownOpen}
                />
              ) : (
                <NavBar
                  elements={orderLoginData ? pageNavBarNonMember : pageNavBarNoLogIn}
                  isMobile
                  handleSignOut={handleSignOut}
                  setDropdownOpen={setDropdownOpen}
                />
              )}
            </IconButton>
          </div>
          <a  className="" target="__blanck" href="https://pf.kakao.com/_AAelu/chat" >
            <img src={staticFiles.icons.kakao} width="17" alt={staticFiles.icons.kakao} />
          </a>
        </div>
        <div className="flex items-center justify-center">
          <Logo />
        </div>
        <div className="flex items-center justify-center">
          <IndependentIconButton badge={cartCount} route="/cart" icon={staticFiles.icons.cart} />
          <IndependentIconButton
            isOpen={isOpen}
            order={"second"}
            handleClick={handleClick}
            icon={staticFiles.icons.world}
            mobile={true}
          >
            <>
              {CitiesData?.map((value, index) => {
                return (
                  <>
                    {value.status === "Publish" && (
                      <button
                        key={index}
                        className="flex justify-center px-2 py-4 font-sm hover:bg-lightBlue/[.1] cursor-pointer"
                        onClick={() => {
                          setCityId(value.id);
                          localStorage.setItem("cityId", String(value.id));
                          localStorage.setItem("cityName", value.name);
                          // Navigate to Home Page
                          if (value.id === 1) {
                            navigate("/ny/main");
                          } else if (value.id === 56) {
                            navigate("/boston/main");
                          } else if (value.id === 36) {
                            navigate("/sf/main");
                          } else if (value.id === 57) {
                            navigate("/nf/main");
                          } else if (value.id === 58) {
                            navigate("/ls/main");
                          } else if (value.id === 59) {
                            navigate("/hls/main");
                          } else {
                            navigate("/ny/main");
                          }
                        }}
                      >
                        <span>{value.name}</span>
                      </button>
                    )}
                  </>
                );
              })}
            </>
          </IndependentIconButton>
        </div>
      </div>
      {/* End of Mobile */}

      {/* Desktop */}
      <div
        className={`sticky top-0 z-[500] bg-[#F7F8FA] transition-shadow duration-300 w-full flex justify-center ${
          hasScrolled ? "shadow-md" : "shadow-none"
        }`}
      >
        <div className="hidden xl:flex justify-center items-center px-[5vw] max-w-[1300px] mb-4">
          <div className="pt-8">
            <div className="relative flex justify-end mb-4 text-sm font-poppins">
              <div className="flex items-center justify-center absolute left-0 top-[-17px]">
                <Logo />
              </div>

              <a  className="flex items-center justify-center text-sm rounded-sm ml-4 mr-0 xl:px-8 font-poppins text-dark whitespace-nowrap" target="__blanck" href="https://pf.kakao.com/_AAelu/chat" >
                <img src={staticFiles.icons.kakao} width="25" alt={staticFiles.icons.kakao} />
                <span className="ml-1 cursor-pointer">카톡문의</span>
              </a>

              <IndependentIconButton
                badge={cartCount}
                route="/cart"
                icon={staticFiles.icons.cart}
                name="장바구니"
              />

              {loginState ? (
                <>
                  <IndependentIconButton
                    isOpen={isOpen}
                    order={"first"}
                    handleClick={handleClick}
                    icon={staticFiles.icons.sign_up}
                    orderLoginData={orderLoginData}
                    name={"내 정보"}
                  >
                    <>
                      {/* <div className="flex justify-center p-4 font-medium text-white text-start">
                        MY ACCOUNT
                      </div> */}

                      <button
                        className="flex  py-4 gap-x-3 text-black font-sm  hover:bg-lightBlue/[.1] cursor-pointer px-8 "
                        onClick={() => navigate("/my-page")}
                      >
                        <img className="text-black" alt="" src={staticFiles.icons.disposition} />
                        <span>마이페이지</span>
                      </button>
                      {!orderLoginData && (
                        <button
                          className="flex py-4 gap-x-3 text-black font-sm  hover:bg-lightBlue/[.1] cursor-pointer px-8"
                          onClick={() => navigate("/user/my-account")}
                        >
                          <img alt="" src={staticFiles.icons.edit} />
                          <span>내 계정</span>
                        </button>
                      )}
                      <button
                        className="flex py-4 gap-x-3 text-black font-sm  hover:bg-lightBlue/[.1] cursor-pointer px-8"
                        onClick={handleSignOut}
                      >
                        <img alt="" src={staticFiles.icons.sign_out} />
                        <span>로그아웃</span>
                      </button>
                    </>
                  </IndependentIconButton>

                  <IndependentIconButton
                    isOpen={isOpen}
                    order={"second"}
                    handleClick={handleClick}
                    icon={staticFiles.icons.world}
                    name={localStorage.getItem("cityName") || '뉴욕'}
                  >
                    {CitiesData?.map((value, index) => {
                      return (
                        <>
                          {value.status === "Publish" && (
                            <button
                              key={index}
                              className="flex justify-center px-2 py-4 font-sm hover:bg-lightBlue/[.1] cursor-pointer"
                              onClick={() => {
                                setCityId(value.id);
                                localStorage.setItem(
                                  "cityId",
                                  String(value.id)
                                );
                                localStorage.setItem("cityName", value.name);
                                // Navigate to Home Page
                                if (value.id === 1) {
                                  navigate("/ny/main");
                                } else if (value.id === 56) {
                                  navigate("/boston/main");
                                } else if (value.id === 36) {
                                  navigate("/sf/main");
                                } else if (value.id === 57) {
                                  navigate("/nf/main");
                                } else if (value.id === 58) {
                                  navigate("/ls/main");
                                } else if (value.id === 59) {
                                  navigate("/hls/main");
                                } else {
                                  navigate("/ny/main");
                                }
                              }}
                            >
                              <span>{value.name}</span>
                            </button>
                          )}
                        </>
                      );
                    })}
                  </IndependentIconButton>
                </>
              ) : (
                <>
                  <IndependentIconButton
                    route="/user/log-in"
                    icon={staticFiles.icons.lock}
                    name="로그인"
                  />
                  <IndependentIconButton
                    route="/user/sign-up"
                    icon={staticFiles.icons.sign_up}
                    name="회원가입"
                  />

                  <IndependentIconButton
                    route="/user/non-member-order-lookup"
                    icon={staticFiles.icons.sign_up}
                    name="마이페이지"
                  />
                  <IndependentIconButton
                    isOpen={isOpen}
                    order={"second"}
                    handleClick={handleClick}
                    icon={staticFiles.icons.world}
                    name={localStorage.getItem("cityName") || "뉴욕"}
                  >
                    <>
                      {CitiesData?.map((value, index) => {
                        return (
                          <>
                            {value.status === "Publish" && (
                            <button
                              key={index}
                              className="flex justify-center px-2 py-4 font-sm hover:bg-lightBlue/[.1] cursor-pointer"
                              onClick={() => {
                                setCityId(value.id);
                                localStorage.setItem("cityId", String(value.id));
                                localStorage.setItem("cityName", value.name);
                                // Navigate to Home Page
                                if (value.id === 1) {
                                  navigate("/ny/main");
                                } else if (value.id === 56) {
                                  navigate("/boston/main");
                                } else if (value.id === 36) {
                                  navigate("/sf/main");
                                } else if (value.id === 57) {
                                  navigate("/nf/main");
                                } else if (value.id === 58) {
                                  navigate("/ls/main");
                                } else if (value.id === 59) {
                                  navigate("/hls/main");
                                } else {
                                  navigate("/ny/main");
                                }
                              }}
                            >
                              <span>{value.name}</span>
                            </button>
                          )}
                          </>
                        );
                      })}
                    </>
                  </IndependentIconButton>
                </>
              )}
            </div>
            {/* <NavBar elements={category} /> */}
            <NavBar elements={menu} />
          </div>
        </div>
      </div>
      {/* End to Desktop */}
    </>
  );
};

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-16 h-16 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
    </div>
  );
};
