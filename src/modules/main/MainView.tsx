import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BookBanner } from "./components/BookBanner";
import { cityIdState, cityDataState } from "../../App";
import { PUBLIC_URL, API } from "../../shared";
import { CardTypes, LocationCard, LocationCardProps } from "../../shared/components/LocationCard";
import { SpaceY } from "../../shared/components/Utils";

const newYorkLocations: LocationCardProps[] = [
  {
    image: `${PUBLIC_URL}/images/Must See in NY_Bigapplepass.svg`,
    location: "빅애플패스",
    large: true,
    type: CardTypes.ONLY_LOCATION,
    url: "/ny/package-tour/ba-pass",
  },
  {
    image: `${PUBLIC_URL}/images/Must See in NY_Observatory.svg`,
    location: "전망대",
    type: CardTypes.ONLY_LOCATION,
    url: "/ny/city-attractions/observations",
  },
  {
    image: `${PUBLIC_URL}/images/Must See in NY_Musical.svg`,
    location: "브로드웨이 뮤지컬",
    type: CardTypes.ONLY_LOCATION,
    url: "/ny/musicals_view",
  },
  {
    image: `${PUBLIC_URL}/images/Must See in NY_Museum.svg`,
    location: "미술관/박물관",
    type: CardTypes.ONLY_LOCATION,
    url: "/ny/city-attractions/museum-gallery",
  },
  {
    image: `${PUBLIC_URL}/images/Must See in NY_Cruises.svg`,
    location: "크루즈",
    type: CardTypes.ONLY_LOCATION,
    url: "/ny/city-attractions/rides-cruises",
  },
  {
    image: `${PUBLIC_URL}/fake/가이드투어.svg`,
    location: "가이드 투어",
    type: CardTypes.ONLY_LOCATION,
    url: "/ny/guide-tour/manhattan-day",
  },
];

const bostonLocations: LocationCardProps[] = [
  {
    image: `${PUBLIC_URL}/images/Must See in Boston_Bigapplepass.svg`,
    location: "빅애플패스",
    large: true,
    type: CardTypes.ONLY_LOCATION,
    url: "/boston/package-tour/ba-pass",
  },
  {
    image: `${PUBLIC_URL}/images/Must See in Boston_IVY tour.svg`,
    location: "아이비리그",
    type: CardTypes.ONLY_LOCATION,
    url: "/boston/ivy-league",
  },
  {
    image: `${PUBLIC_URL}/images/Must See in Boston_Observatory.svg`,
    location: "전망대",
    type: CardTypes.ONLY_LOCATION,
    url: "/boston/observation-cruise",
  },
  {
    image: `${PUBLIC_URL}/images/Must See in Boston_Cruise.svg`,
    location: "크루즈",
    type: CardTypes.ONLY_LOCATION,
    url: "/boston/observation-cruise",
  },
  {
    image: `${PUBLIC_URL}/images/Must See in Boston_Bustour.svg`,
    location: "버스투어",
    type: CardTypes.ONLY_LOCATION,
    url: "/boston/bus",
  },

  {
    image: `${PUBLIC_URL}/images/Must See in Boston_Aquarium.svg`,
    location: "미술관/박물관",
    type: CardTypes.ONLY_LOCATION,
    url: "/boston/gallery-museum",
  },
];

const hawaiiLocations: LocationCardProps[] = [
  {
    image: `${PUBLIC_URL}/images/Must See in your Life_빅패스.svg`,
    location: "빅애플패스",
    large: true,
    type: CardTypes.ONLY_LOCATION,
    url: "/hls/package-tour/ba-pass",
  },
  {
    image: `${PUBLIC_URL}/images/Must See in your Life_하와이.svg`,
    location: "하와이",
    type: CardTypes.ONLY_LOCATION,
    url: "/hls/city/hawaii",
  },
  {
    image: `${PUBLIC_URL}/images/Must See in your Life_LA.svg`,
    location: "로스앤젤레스",
    type: CardTypes.ONLY_LOCATION,
    url: "/hls/city/losangeles",
  },
  {
    image: `${PUBLIC_URL}/images/Must See in your Life_산타카탈리나.svg`,
    location: "산타 카탈리나",
    type: CardTypes.ONLY_LOCATION,
    url: "/hls/city/santacatalina",
  },
  {
    image: `${PUBLIC_URL}/images/Must See in your Life_팜스프링.svg`,
    location: "팜스프링",
    type: CardTypes.ONLY_LOCATION,
    url: "/hls/city/losangeles",
  },
  {
    image: `${PUBLIC_URL}/images/Must See in your Life_샌디에고.svg`,
    location: "샌디에고",
    type: CardTypes.ONLY_LOCATION,
    url: "/hls/city/sandiego",
  },
];

const bostonTour: LocationCardProps[] = [
  {
    image: `${PUBLIC_URL}/images/Harvard Tour.svg`,
    location: "하버드 재학생 투어",
    type: CardTypes.SHOW_WITH_PRICE,
    url: "/product-detail/566",
    miniTitle: "아이비리그 투어",
  },
  {
    image: `${PUBLIC_URL}/images/MIT Tour.svg`,
    location: "MIT 재학생 투어",
    type: CardTypes.SHOW_WITH_PRICE,
    url: "/product-detail/568",
    miniTitle: "아이비리그 투어",
  },
  {
    image: `${PUBLIC_URL}/images/Museum of Sience.svg`,
    location: "보스턴 과학 박물관",
    type: CardTypes.SHOW_WITH_PRICE,
    url: "/product-detail/569",
    miniTitle: "미술관/박물관",
  },
  {
    image: `${PUBLIC_URL}/images/The View.svg`,
    location: "더 뷰",
    type: CardTypes.SHOW_WITH_PRICE,
    url: "/product-detail/570",
    miniTitle: "전망대/크루즈",
  },
];

const lasvegasLocations: LocationCardProps[] = [
  {
    image: `${PUBLIC_URL}/images/Must See in C_Camping Tour.svg`,
    location: "캠핑카 투어",
    large: true,
    type: CardTypes.ONLY_LOCATION,
    url: "/cy/camping-car",
  },
  {
    image: `${PUBLIC_URL}/images/Must See in LV_Bigapplepas.svg`,
    location: "빅애플패스",
    type: CardTypes.ONLY_LOCATION,
    url: "/ls/package-tour/ba-pass",
  },
  {
    image: `${PUBLIC_URL}/images/Must See in LV-C_Show.svg`,
    location: "라스베가스 쇼",
    type: CardTypes.ONLY_LOCATION,
    url: "/cy/show",
  },
  {
    image: `${PUBLIC_URL}/images/Must See in LV-C_Tour.svg`,
    location: "패키지 투어",
    type: CardTypes.ONLY_LOCATION,
    url: "/cy/canyon-tour",
  },
  {
    image: `${PUBLIC_URL}/images/Must See in LV_Tour Attractions.svg`,
    location: "베가스 입장지",
    type: CardTypes.ONLY_LOCATION,
    url: "/ls/ls-entry",
  },

  {
    image: `${PUBLIC_URL}/images/Must See in Canyon_Tour Attractions.svg`,
    location: "캐년 입장지",
    type: CardTypes.ONLY_LOCATION,
    url: "/ls/canyon-entry",
  },
];

const lasvegasTour: LocationCardProps[] = [
  {
    image: `${PUBLIC_URL}/images/Canyon 7days Camping Tour.svg`,
    location: "빅애플캐년 6박7일",
    type: CardTypes.SHOW_WITH_PRICE,
    url: "/product-detail/577",
    miniTitle: "캠핑카 투어",
  },
  {
    image: `${PUBLIC_URL}/images/Grand Canyon Helicopter.svg`,
    location: "베가스 출발 그랜드캐년 헬리콥터 투어",
    type: CardTypes.SHOW_WITH_PRICE,
    url: "/product-detail/594",
    miniTitle: "라스베가스 입장지",
  },
  {
    image: `${PUBLIC_URL}/images/Vegas Big Bus.svg`,
    location: "빅버스 24시간",
    type: CardTypes.SHOW_WITH_PRICE,
    url: "/product-detail/574",
    miniTitle: "라스베가스 입장지",
  },
  {
    image: `${PUBLIC_URL}/images/Antelope Canyon.svg`,
    location: "엔탈롭 캐년 투어",
    type: CardTypes.SHOW_WITH_PRICE,
    url: "/product-detail/589",
    miniTitle: "캐년 입장지",
  },
];

const niagarafallsLocations: LocationCardProps[] = [
  {
    image: `${PUBLIC_URL}/images/Must See in Niagara Falls_BIGAPPLEPASS.svg`,
    location: "빅애플패스",
    large: true,
    type: CardTypes.ONLY_LOCATION,
    url: "/nf/package-tour/ba-pass",
  },
  {
    image: `${PUBLIC_URL}/images/Must See in Niagara Falls_Cruises.svg`,
    location: "크루즈",
    type: CardTypes.ONLY_LOCATION,
    url: "/nf/cruise",
  },
  {
    image: `${PUBLIC_URL}/images/Must See in Niagara Falls_Tot Attraction.svg`,
    location: "입장지",
    type: CardTypes.ONLY_LOCATION,
    url: "/nf/entry",
  },
  {
    image: `${PUBLIC_URL}/images/Must See in Niagara Falls_Activity.svg`,
    location: "액티비티",
    type: CardTypes.ONLY_LOCATION,
    url: "/nf/activity",
  },
  {
    image: `${PUBLIC_URL}/images/Must See in Niagara Falls_Tour.svg`,
    location: "가이드 투어",
    type: CardTypes.ONLY_LOCATION,
    url: "/nf/tour",
  },

  {
    image: `${PUBLIC_URL}/images/Must See in Niagara Falls_eSIM.svg`,
    location: "캐나다유심",
    type: CardTypes.ONLY_LOCATION,
    url: "/nf/sim",
  },
];

const niagarafallsTour: LocationCardProps[] = [
  {
    image: `${PUBLIC_URL}/images/나이아가라 1박2일 자유여행.svg`,
    location: "나이아가라 1박2일 자유여행",
    type: CardTypes.SHOW_WITH_PRICE,
    url: "/product-detail/595",
    miniTitle: "투어",
  },
  {
    image: `${PUBLIC_URL}/images/나이아가라 시티 크루즈.svg`,
    location: "나이아가라 시티 크루즈",
    type: CardTypes.SHOW_WITH_PRICE,
    url: "/product-detail/539",
    miniTitle: "크루즈",
  },
  {
    image: `${PUBLIC_URL}/images/나이아가라 스카이론 타워.svg`,
    location: "스카이론 타워 전망대",
    type: CardTypes.SHOW_WITH_PRICE,
    url: "/product-detail/551",
    miniTitle: "입장지",
  },
  {
    image: `${PUBLIC_URL}/images/나이아가라 헬리콥터.svg`,
    location: "나이아가라 헬리콥터 투어",
    type: CardTypes.SHOW_WITH_PRICE,
    url: "/product-detail/534",
    miniTitle: "액티비티",
  },
];

const sanFranciscoLocations: LocationCardProps[] = [
  {
    image: `${PUBLIC_URL}/images/Must See in_SF_Bigapplepass.svg`,
    location: "빅애플패스",
    large: true,
    type: CardTypes.ONLY_LOCATION,
    url: "/sf/package-tour/ba-pass",
  },
  {
    image: `${PUBLIC_URL}/images/Must See in_SF_BusTour.svg`,
    location: "버스투어",
    type: CardTypes.ONLY_LOCATION,
    // url: "/sf/city-attractions/observations",
    url: "/sf/city-attractions/cruise-bustour",
  },
  {
    image: `${PUBLIC_URL}/images/Must See in_SF_Cruises.svg`,
    location: "크루즈",
    type: CardTypes.ONLY_LOCATION,
    // url: "/sf/city-attractions/observations",
    url: "/sf/city-attractions/cruise-bustour",
  },
  {
    image: `${PUBLIC_URL}/images/Must See in_SF_Museum.svg`,
    location: "박물관",
    type: CardTypes.ONLY_LOCATION,
    url: "/sf/guide-tour/sf-museum",
  },
  {
    image: `${PUBLIC_URL}/images/Must See in_SF_Activity.svg`,
    location: "액티비티",
    type: CardTypes.ONLY_LOCATION,
    url: "/sf/city-attractions/activities",
  },
  {
    image: `${PUBLIC_URL}/images/Must See in_SF_eSIM.svg`,
    location: "미국유심",
    type: CardTypes.ONLY_LOCATION,
    url: "/sf/sim-card",
  },
];

const newYorkAttractions: LocationCardProps[] = [
  {
    image: `${PUBLIC_URL}/fake/topoftherock.svg`,
    location: "탑 오브 더 락",
    // type: CardTypes.PLACE_PRICE,
    type: CardTypes.SHOW_WITH_PRICE,
    // oldPrice: 45,
    // newPrice: 30,
    url: "/product-detail/368",
    miniTitle: "전망대",
  },
  {
    image: `${PUBLIC_URL}/fake/landmark.svg`,
    location: "자유의 여신상 랜드마크 크루즈",
    // type: CardTypes.PLACE_PRICE,
    type: CardTypes.SHOW_WITH_PRICE,
    // oldPrice: 45,
    // newPrice: 30,
    url: "/product-detail/453",
    miniTitle: "크루즈",
  },
  {
    image: `${PUBLIC_URL}/fake/모마.png`,
    location: "모마 현대 미술관",
    // type: CardTypes.PLACE_PRICE,
    type: CardTypes.SHOW_WITH_PRICE,
    // oldPrice: 45,
    // newPrice: 30,
    url: "/product-detail/384",
    miniTitle: "미술관/박물관",
  },
  {
    image: `${PUBLIC_URL}/fake/미술관-박물관.svg`,
    location: "메트로폴리탄 미술관 도슨트 투어",
    // type: CardTypes.PLACE_PRICE,
    type: CardTypes.SHOW_WITH_PRICE,
    // oldPrice: 45,
    // newPrice: 30,
    url: "/product-detail/414",
    miniTitle: "도슨트 투어",
  },
];

const hawaiiAttractions: LocationCardProps[] = [
  {
    image: `${PUBLIC_URL}/images/하와이,LA ,샌디에고 인기 입장지_하와이.svg`,
    location: "하와이 레인보우 헬리콥터 60분",
    // type: CardTypes.PLACE_PRICE,
    type: CardTypes.SHOW_WITH_PRICE,
    // oldPrice: 45,
    // newPrice: 30,
    //url: "/product-detail/657", Tamice QA server ticket ID
    url: "/product-detail/650",
    miniTitle: "하와이",
  },
  {
    image: `${PUBLIC_URL}/images/하와이,LA ,샌디에고 인기 입장지_LA.svg`,
    location: "LA 빅버스 1 Day 디스커버 2층버스",
    // type: CardTypes.PLACE_PRICE,
    type: CardTypes.SHOW_WITH_PRICE,
    // oldPrice: 45,
    // newPrice: 30,
    //url: "/product-detail/639", Tamice QA server ticket ID
    url: "/product-detail/658", 
    miniTitle: "로스앤젤레스",
  },
  {
    image: `${PUBLIC_URL}/images/하와이,LA ,샌디에고 인기_카탈리나.svg`,
    location: "산타 카탈리나 익스프레스 - 왕복페리",
    // type: CardTypes.PLACE_PRICE,
    type: CardTypes.SHOW_WITH_PRICE,
    // oldPrice: 45,
    // newPrice: 30,
    //url: "/product-detail/642", Tamice QA server ticket ID
    url: "/product-detail/655",
    miniTitle: "산타 카탈리나",
  },
  {
    image: `${PUBLIC_URL}/images/하와이,LA ,샌디에고 인기 입장지_샌디에고.svg`,
    location: "올데이 자전거",
    // type: CardTypes.PLACE_PRICE,
    type: CardTypes.SHOW_WITH_PRICE,
    // oldPrice: 45,
    // newPrice: 30,
    //url: "/product-detail/641", Tamice QA server ticket ID
    url: "/product-detail/656",
    miniTitle: "샌디에고",
  },
];

const sanFranciscoAttractions: LocationCardProps[] = [
  {
    image: `${PUBLIC_URL}/images/SFCruise.svg`,
    location: "골든 게이트 베이 크루즈",
    // type: CardTypes.PLACE_PRICE,
    type: CardTypes.SHOW_WITH_PRICE,
    // oldPrice: 45,
    // newPrice: 30,
    url: "/product-detail/487",
    miniTitle: "크루즈/버스투어",
  },
  {
    image: `${PUBLIC_URL}/images/SFBigBus.svg`,
    location: "빅버스 1 Day 디스커버 2층버스",
    // type: CardTypes.PLACE_PRICE,
    type: CardTypes.SHOW_WITH_PRICE,
    // oldPrice: 45,
    // newPrice: 30,
    url: "/product-detail/493",
    miniTitle: "크루즈/버스투어",
  },
  {
    image: `${PUBLIC_URL}/images/SFBike.svg`,
    location: "샌프란 올데이 자전거 대여",
    // type: CardTypes.PLACE_PRICE,
    type: CardTypes.SHOW_WITH_PRICE,
    // oldPrice: 45,
    // newPrice: 30,
    url: "/product-detail/494",
    miniTitle: "액티비티",
  },
  {
    image: `${PUBLIC_URL}/images/SFCALSci.svg`,
    location: "캘리포니아 과학 아카데미",
    // type: CardTypes.PLACE_PRICE,
    type: CardTypes.SHOW_WITH_PRICE,
    // oldPrice: 45,
    // newPrice: 30,
    url: "/product-detail/490",
    miniTitle: "미술관/박물관",
  },
];

const newYorkShows: LocationCardProps[] = [
  {
    image: `${PUBLIC_URL}/fake/Musicals - lion king.svg`,
    location: "라이언킹",
    // type: CardTypes.PLACE_PRICE,
    type: CardTypes.SHOW_WITH_PRICE,
    // oldPrice: 45,
    // newPrice: 30,
    url: "/musicals_view/393",
    miniTitle: "The Lion King",
  },
  {
    image: `${PUBLIC_URL}/fake/Musicals - Aladdin.svg`,
    location: "알라딘",
    // type: CardTypes.PLACE_PRICE,
    type: CardTypes.SHOW_WITH_PRICE,
    // oldPrice: 45,
    // newPrice: 30,
    url: "/musicals_view/382",
    miniTitle: "Aladdin",
  },

  {
    image: `${PUBLIC_URL}/fake/Musicals - Moulin Rouge.svg`,
    location: "물랑루즈",
    // type: CardTypes.PLACE_PRICE,
    type: CardTypes.SHOW_WITH_PRICE,
    // oldPrice: 45,
    // newPrice: 30,
    url: "/musicals_view/386",
    miniTitle: "Moulin Rogue!",
  },
  {
    image: `${PUBLIC_URL}/fake/Musicals - Wicked.svg`,
    location: "위키드",
    // type: CardTypes.PLACE_PRICE,
    type: CardTypes.SHOW_WITH_PRICE,
    // oldPrice: 45,
    // newPrice: 30,
    url: "/musicals_view/383",
    miniTitle: "Wicked",
  },
];

const newYorkTours: LocationCardProps[] = [
  {
    image: `${PUBLIC_URL}/fake/tour - MOMA.svg`,
    location: "모마 도슨트 투어",
    type: CardTypes.SHOW_WITH_PRICE,
    url: "/product-detail/456",
    miniTitle: "도슨트 투어",
  },
  {
    image: `${PUBLIC_URL}/fake/tour -Brooklyn.svg`,
    location: "브루클린 덤보 야경 워킹 투어",
    type: CardTypes.SHOW_WITH_PRICE,
    url: "/product-detail/484",
    miniTitle: "뉴욕 야경 투어",
  },
  {
    image: `${PUBLIC_URL}/fake/tour - Niagara.svg`,
    location: "나이아가라 1박2일 자유여행",
    type: CardTypes.SHOW_WITH_PRICE,
    url: "/product-detail/486",
    miniTitle: "근교 투어",
  },
  {
    image: `${PUBLIC_URL}/fake/tour -UN.svg`,
    location: "UN 한국어 투어",
    type: CardTypes.SHOW_WITH_PRICE,
    url: "/product-detail/485",
    miniTitle: "UN 투어",
  },
];

const newYorkcommunities: LocationCardProps[] = [
  {
    image: `${PUBLIC_URL}/fake/kakaotalk.svg`,
    location: "카카오톡 채널",
    type: CardTypes.COMMUNITY,
    url: "https://pf.kakao.com/_AAelu",
    // communityText: "Lorem ipsum, or lipsum as it is sometimes",
  },
  {
    image: `${PUBLIC_URL}/fake/blog.svg`,
    location: "네이버 블로그",
    type: CardTypes.COMMUNITY,
    url: "https://blog.naver.com/tamice",
    // communityText: "Lorem ipsum, or lipsum as it is sometimes",
  },
  {
    image: `${PUBLIC_URL}/fake/instagram.svg`,
    location: "인스타그램",
    type: CardTypes.COMMUNITY,
    url: "https://www.instagram.com/with.tamice/",
    // communityText: "Lorem ipsum, or lipsum as it is sometimes",
  },
];

export const MainView = () => {
  // Define Global State Variables
  const [cityId, setCityId] = cityIdState.useState();
  // const [cityData, setCityData] = cityDataState.useState();

  const [loading, setLoading] = useState(false);
  const [displayTickets, setDisplayTickets] = useState<any[]>([]);
  const [displayMusicalTickets, setDisplayMusicalTickets] = useState<any[]>(newYorkShows);
  const [displayBestTickets, setDisplayBestTickets] = useState<any[]>(newYorkAttractions);
  const [displayBostonPopularTickets, setDisplayBostonPopularTickets] = useState<any[]>(bostonTour);
  const [displayFallPopularTickets, setDisplayFallPopularTickets] =
    useState<any[]>(niagarafallsTour);
  const [displayVegasPopularTickets, setDisplayVegasPopularTickets] = useState<any[]>(lasvegasTour);
  const [displayHawaiiPopularTickets, setDisplayHawaiiPopularTickets] =
    useState<any[]>(hawaiiAttractions);
  // Create a navigate instance from useNavigate Hook
  const navigate = useNavigate();

  // Define useEffect Hook
  useEffect(() => {
    (async () => {
      function getCityAttractions(cityId: number) {
        switch (cityId) {
          case 36:
            return sanFranciscoAttractions;
          case 56:
            return bostonTour;
          case 57:
            return niagarafallsTour;
          case 58:
            return lasvegasTour;
          case 59:
            return hawaiiAttractions;
          default:
            return newYorkTours; // Default case
        }
      }

      const tempData = getCityAttractions(cityId);
      try {
        setLoading(true);
        const ids_filter = tempData.map((item: any) => item.url.split("/")[2]);
        if (cityId === 36) {
          const allTicketsData = await generateCardsInfo(ids_filter, sanFranciscoAttractions);
          const orderedTickets = [
            allTicketsData[0],
            allTicketsData[2],
            allTicketsData[3],
            allTicketsData[1],
          ];
          setDisplayTickets(orderedTickets);
        }

        if (cityId == 1) {
          const allTicketsData = await generateCardsInfo(ids_filter.reverse(), newYorkTours);
          const nyattractionIds = newYorkAttractions.map((item: any) => item.url.split("/")[2]);
          const allBestTicketData = await generateCardsInfo(
            nyattractionIds.reverse(),
            newYorkAttractions
          );
          const musicalIds = newYorkShows.map((item: any) => item.url.split("/")[2]);
          const musicalData = await generateCardsInfo(musicalIds, newYorkShows);
          const musicalDataOrdered = [
            musicalData[3],
            musicalData[0],
            musicalData[2],
            musicalData[1],
          ];
          const displayTicketsOrder = [
            allTicketsData[0],
            allTicketsData[1],
            allTicketsData[3],
            allTicketsData[2],
          ];
          setDisplayMusicalTickets(musicalDataOrdered);
          setDisplayBestTickets(allBestTicketData);
          setDisplayTickets(displayTicketsOrder);
        }
        if (cityId == 56) {
          const bostonTickets = await generateCardsInfo(ids_filter, bostonTour);

          setDisplayBostonPopularTickets(bostonTickets);
        }

        if (cityId == 57) {
          const fallTickets = await generateCardsInfo(ids_filter, niagarafallsTour);
          const fallTicketsOrdered = [
            fallTickets[1],
            fallTickets[2],
            fallTickets[3],
            fallTickets[0],
          ];
          setDisplayFallPopularTickets(fallTicketsOrdered);
        }

        if (cityId == 58) {
          const vegasTickets = await generateCardsInfo(ids_filter, lasvegasTour);
          const vegasTicketsOrdered = [
            vegasTickets[1],
            vegasTickets[3],
            vegasTickets[0],
            vegasTickets[2],
          ];
          setDisplayVegasPopularTickets(vegasTicketsOrdered);
        }

        if (cityId == 59) {
          const hawaiiTickets = await generateCardsInfo(ids_filter, hawaiiAttractions); //
          const hawaiiTicketsOrdered = [
            hawaiiTickets[0], // for Tamice QA, 3,0,2,1
            hawaiiTickets[3],
            hawaiiTickets[1],
            hawaiiTickets[2],
          ];
          setDisplayHawaiiPopularTickets(hawaiiTicketsOrdered);
        }
      } catch (error) {
        console.error(error);
        setDisplayTickets(tempData);
      } finally {
        setLoading(false);
      }
    })();
  }, [cityId]);

  async function generateCardsInfo(ids: any, locations: any) {
    const fallTickets = await axios
      .post(`${API}/tickets-multiple-main`, {
        ids_filter: ids,
      })
      .then((res) =>
        (res.data as any).map((item: any) => {
          const location = locations.find((i: any) => +i.url.split("/")[2] === +item.id);
          return {
            miniTitle: location?.miniTitle,
            id: item.id,
            location: item.title_kr,
            windowPrice: item.ticket_prices[0].window_price,
            salePrice: item.ticket_prices[0].sale_price,
            type: location?.type,
            image: location?.image,
            url: location?.url,
          };
        })
      );
    return fallTickets;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  // Show loading spinner while fetching data from the server
  if (loading) {
    return (
      <div className="flex flex-col max-w-[1300px] w-full mb-16 px-4">
        <div className="flex items-center justify-center h-screen">
          <div className="w-16 h-16 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (cityId === 36) {
    // San Francisco
    return (
      <div className="min-h-[600px] grid place-items-center pb-[20vh] w-full grid-cols-1 ">
        <SpaceY />
        <SpaceY />
        <SpaceY />
        <span className="ffont-medium font-poppins text-dark px-0 min-[430px]:p-0 text-sm max-[450px]:w-[335px]">
          San Francisco
        </span>
        <span className="font-bold font-volkhov text-dark px-0 min-[430px]:p-0 min-[450px]:text-2xl text-xl max-[450px]:w-[335px]">
          Must See in San Francisco
        </span>

        <SpaceY />
        <div className="flex flex-wrap w-auto justify-center gap-[10px] sm:gap-[22px]">
          {sanFranciscoLocations.map((item) =>
            item.url ? (
              <Link key={item.url} to={item.url}>
                <LocationCard {...item} />
              </Link>
            ) : (
              <LocationCard {...item} />
            )
          )}
        </div>

        <BookBanner />

        <div>
          <div className="flex flex-col justify-center items-center">
            <span className="font-medium font-poppins text-dark px-0 min-[430px]:p-0 text-sm max-[450px]:w-[345px]">
              Popular Attractions
            </span>
            <span className="font-bold font-volkhov text-dark px-0 min-[430px]:p-0 min-[450px]:text-2xl text-xl max-[450px]:w-[345px]">
              샌프란 인기 입장지
            </span>
          </div>
          <SpaceY />
          <div className="grid justify-center w-auto gap-[10px] sm:gap-[22px] grid-cols-2 md:grid-cols-2 lg:grid-cols-3 custom_mobile:grid-cols-4 place-items-center">
            {displayTickets.map((item) =>
              item.url ? (
                <Link key={item.url} to={item.url}>
                  <LocationCard {...item} />
                </Link>
              ) : (
                <LocationCard {...item} />
              )
            )}
          </div>
        </div>
        <SpaceY />
        <SpaceY />
        <SpaceY />
        <div>
          <div className="flex flex-col justify-center items-center">
            <span className="font-medium font-poppins text-dark px-0 min-[430px]:p-0 text-sm max-[450px]:w-[345px]">
              Let’s Connect
            </span>
            <span className="font-bold font-volkhov text-dark px-0 min-[430px]:p-0 min-[450px]:text-2xl text-xl max-[450px]:w-[345px]">
              타미스 커뮤니티
            </span>
          </div>
          <SpaceY />
          <div className="grid justify-center w-auto gap-[10px] sm:gap-[22px] grid-cols-2 md:grid-cols-2 lg:grid-cols-3 place-items-center ">
            {newYorkcommunities.map((item) =>
              item.url ? (
                <Link key={item.url} to={item.url} target="_blank">
                  <LocationCard {...item} />
                </Link>
              ) : (
                <LocationCard {...item} />
              )
            )}
          </div>
        </div>
      </div>
    );
  } else if (cityId === 56) {
    // Boston
    return (
      <div className="min-h-[600px] grid place-items-center pb-[20vh] w-full grid-cols-1 ">
        <SpaceY />
        <SpaceY />
        <SpaceY />
        <span className="ffont-medium font-poppins text-dark px-0 min-[430px]:p-0 text-sm max-[450px]:w-[335px]">
          Boston
        </span>
        <span className="font-bold font-volkhov text-dark px-0 min-[430px]:p-0 min-[450px]:text-2xl text-xl max-[450px]:w-[335px]">
          Must See in Boston
        </span>

        <SpaceY />
        <div className="flex flex-wrap w-auto justify-center gap-[10px] sm:gap-[22px]">
          {bostonLocations.map((item) =>
            item.url ? (
              <Link key={item.url} to={item.url}>
                <LocationCard {...item} />
              </Link>
            ) : (
              <LocationCard {...item} />
            )
          )}
        </div>

        <BookBanner />

        <div>
          <div className="flex flex-col justify-center items-center">
            <span className="font-medium font-poppins text-dark px-0 min-[430px]:p-0 text-sm max-[450px]:w-[345px]">
              Popular Attractions
            </span>
            <span className="font-bold font-volkhov text-dark px-0 min-[430px]:p-0 min-[450px]:text-2xl text-xl max-[450px]:w-[345px]">
              보스턴 인기 입장지
            </span>
          </div>
          <SpaceY />
          <div className="grid justify-center w-auto gap-[10px] sm:gap-[22px] grid-cols-2 md:grid-cols-2 lg:grid-cols-3 custom_mobile:grid-cols-4 place-items-center">
            {displayBostonPopularTickets.map((item) =>
              item.url ? (
                <Link key={item.url} to={item.url}>
                  <LocationCard {...item} />
                </Link>
              ) : (
                <LocationCard {...item} />
              )
            )}
          </div>
        </div>

        <SpaceY />
        <SpaceY />
        <SpaceY />
        <div>
          <div className="flex flex-col justify-center items-center">
            <span className="font-medium font-poppins text-dark px-0 min-[430px]:p-0 text-sm max-[450px]:w-[345px]">
              Let’s Connect
            </span>
            <span className="font-bold font-volkhov text-dark px-0 min-[430px]:p-0 min-[450px]:text-2xl text-xl max-[450px]:w-[345px]">
              타미스 커뮤니티
            </span>
          </div>
          <SpaceY />
          <div className="grid justify-center w-auto gap-[10px] sm:gap-[22px] grid-cols-2 md:grid-cols-2 lg:grid-cols-3 place-items-center ">
            {newYorkcommunities.map((item) =>
              item.url ? (
                <Link key={item.url} to={item.url} target="_blank">
                  <LocationCard {...item} />
                </Link>
              ) : (
                <LocationCard {...item} />
              )
            )}
          </div>
        </div>
      </div>
    );
  } else if (cityId === 57) {
    // Falls
    return (
      <div className="min-h-[600px] grid place-items-center pb-[20vh] w-full grid-cols-1 ">
        <SpaceY />
        <SpaceY />
        <SpaceY />
        <span className="ffont-medium font-poppins text-dark px-0 min-[430px]:p-0 text-sm max-[450px]:w-[335px]">
          Niagara Falls
        </span>
        <span className="font-bold font-volkhov text-dark px-0 min-[430px]:p-0 min-[450px]:text-2xl text-xl max-[450px]:w-[335px]">
          Must See in Niagara Falls
        </span>

        <SpaceY />
        <div className="flex flex-wrap w-auto justify-center gap-[10px] sm:gap-[22px]">
          {niagarafallsLocations.map((item) =>
            item.url ? (
              <Link key={item.url} to={item.url}>
                <LocationCard {...item} />
              </Link>
            ) : (
              <LocationCard {...item} />
            )
          )}
        </div>

        <BookBanner />

        <div>
          <div className="flex flex-col justify-center items-center">
            <span className="font-medium font-poppins text-dark px-0 min-[430px]:p-0 text-sm max-[450px]:w-[345px]">
              Popular Attractions
            </span>
            <span className="font-bold font-volkhov text-dark px-0 min-[430px]:p-0 min-[450px]:text-2xl text-xl max-[450px]:w-[345px]">
              나이아가라 인기 입장지
            </span>
          </div>
          <SpaceY />
          <div className="grid justify-center w-auto gap-[10px] sm:gap-[22px] grid-cols-2 md:grid-cols-2 lg:grid-cols-3 custom_mobile:grid-cols-4 place-items-center">
            {displayFallPopularTickets.map((item) =>
              item.url ? (
                <Link key={item.url} to={item.url}>
                  <LocationCard {...item} />
                </Link>
              ) : (
                <LocationCard {...item} />
              )
            )}
          </div>
        </div>

        <SpaceY />
        <SpaceY />
        <SpaceY />
        <div>
          <div className="flex flex-col justify-center items-center">
            <span className="font-medium font-poppins text-dark px-0 min-[430px]:p-0 text-sm max-[450px]:w-[345px]">
              Let’s Connect
            </span>
            <span className="font-bold font-volkhov text-dark px-0 min-[430px]:p-0 min-[450px]:text-2xl text-xl max-[450px]:w-[345px]">
              타미스 커뮤니티
            </span>
          </div>
          <SpaceY />
          <div className="grid justify-center w-auto gap-[10px] sm:gap-[22px] grid-cols-2 md:grid-cols-2 lg:grid-cols-3 place-items-center ">
            {newYorkcommunities.map((item) =>
              item.url ? (
                <Link key={item.url} to={item.url} target="_blank">
                  <LocationCard {...item} />
                </Link>
              ) : (
                <LocationCard {...item} />
              )
            )}
          </div>
        </div>
      </div>
    );
  } else if (cityId === 58) {
    // Vegas
    return (
      <div className="min-h-[600px] grid place-items-center pb-[20vh] w-full grid-cols-1 ">
        <SpaceY />
        <SpaceY />
        <SpaceY />
        <span className="ffont-medium font-poppins text-dark px-0 min-[430px]:p-0 text-sm max-[450px]:w-[335px]">
          Vegas / Canyon
        </span>
        <span className="font-bold font-volkhov text-dark px-0 min-[430px]:p-0 min-[450px]:text-2xl text-xl max-[450px]:w-[335px]">
          Must See in Las Vegas / Canyon
        </span>

        <SpaceY />
        <div className="flex flex-wrap w-auto justify-center gap-[10px] sm:gap-[22px]">
          {lasvegasLocations.map((item) =>
            item.url ? (
              <Link key={item.url} to={item.url}>
                <LocationCard {...item} />
              </Link>
            ) : (
              <LocationCard {...item} />
            )
          )}
        </div>

        <BookBanner />

        <div>
          <div className="flex flex-col justify-center items-center">
            <span className="font-medium font-poppins text-dark px-0 min-[430px]:p-0 text-sm max-[450px]:w-[345px]">
              Popular Attractions
            </span>
            <span className="font-bold font-volkhov text-dark px-0 min-[430px]:p-0 min-[450px]:text-2xl text-xl max-[450px]:w-[345px]">
              Vegas / Canyon Top Attractions
            </span>
          </div>
          <SpaceY />
          <div className="grid justify-center w-auto gap-[10px] sm:gap-[22px] grid-cols-2 md:grid-cols-2 lg:grid-cols-3 custom_mobile:grid-cols-4 place-items-center">
            {displayVegasPopularTickets.map((item) =>
              item.url ? (
                <Link key={item.url} to={item.url}>
                  <LocationCard {...item} />
                </Link>
              ) : (
                <LocationCard {...item} />
              )
            )}
          </div>
        </div>

        <SpaceY />
        <SpaceY />
        <SpaceY />
        <div>
          <div className="flex flex-col justify-center items-center">
            <span className="font-medium font-poppins text-dark px-0 min-[430px]:p-0 text-sm max-[450px]:w-[345px]">
              Let’s Connect
            </span>
            <span className="font-bold font-volkhov text-dark px-0 min-[430px]:p-0 min-[450px]:text-2xl text-xl max-[450px]:w-[345px]">
              타미스 커뮤니티
            </span>
          </div>
          <SpaceY />
          <div className="grid justify-center w-auto gap-[10px] sm:gap-[22px] grid-cols-2 md:grid-cols-2 lg:grid-cols-3 place-items-center ">
            {newYorkcommunities.map((item) =>
              item.url ? (
                <Link key={item.url} to={item.url} target="_blank">
                  <LocationCard {...item} />
                </Link>
              ) : (
                <LocationCard {...item} />
              )
            )}
          </div>
        </div>
      </div>
    );
  } else if (cityId === 59) {
    // Vegas
    return (
      <div className="min-h-[600px] grid place-items-center pb-[20vh] w-full grid-cols-1 ">
        <SpaceY />
        <SpaceY />
        <SpaceY />
        <span className="ffont-medium font-poppins text-dark px-0 min-[430px]:p-0 text-sm max-[450px]:w-[335px]">
          Hawaii / LA / San Diego
        </span>
        <span className="font-bold font-volkhov text-dark px-0 min-[430px]:p-0 min-[450px]:text-2xl text-xl max-[450px]:w-[335px]">
          Must See in your Life!
        </span>

        <SpaceY />
        <div className="flex flex-wrap w-auto justify-center gap-[10px] sm:gap-[22px]">
          {hawaiiLocations.map((item) =>
            item.url ? (
              <Link key={item.url} to={item.url}>
                <LocationCard {...item} />
              </Link>
            ) : (
              <LocationCard {...item} />
            )
          )}
        </div>
        <BookBanner />

        <div>
          <div className="flex flex-col justify-center items-center">
            <span className="font-medium font-poppins text-dark px-0 min-[430px]:p-0 text-sm max-[450px]:w-[345px]">
              Popular Attractions
            </span>
            <span className="font-bold font-volkhov text-dark px-0 min-[430px]:p-0 min-[450px]:text-2xl text-xl max-[450px]:w-[345px]">
              하와이 / LA / 샌디에고 인기 입장지
            </span>
          </div>
          <SpaceY />
          <div className="grid justify-center w-auto gap-[10px] sm:gap-[22px] grid-cols-2 md:grid-cols-2 lg:grid-cols-3 custom_mobile:grid-cols-4 place-items-center">
            {displayHawaiiPopularTickets.map((item) =>
              item.url ? (
                <Link key={item.url} to={item.url}>
                  <LocationCard {...item} />
                </Link>
              ) : (
                <LocationCard {...item} />
              )
            )}
          </div>
        </div>

        <SpaceY />
        <SpaceY />
        <SpaceY />
        <div>
          <div className="flex flex-col justify-center items-center">
            <span className="font-medium font-poppins text-dark px-0 min-[430px]:p-0 text-sm max-[450px]:w-[345px]">
              Let’s Connect
            </span>
            <span className="font-bold font-volkhov text-dark px-0 min-[430px]:p-0 min-[450px]:text-2xl text-xl max-[450px]:w-[345px]">
              타미스 커뮤니티
            </span>
          </div>
          <SpaceY />
          <div className="grid justify-center w-auto gap-[10px] sm:gap-[22px] grid-cols-2 md:grid-cols-2 lg:grid-cols-3 place-items-center ">
            {newYorkcommunities.map((item) =>
              item.url ? (
                <Link key={item.url} to={item.url} target="_blank">
                  <LocationCard {...item} />
                </Link>
              ) : (
                <LocationCard {...item} />
              )
            )}
          </div>
        </div>
      </div>
    );
  }

  // New York
  return (
    <div className="min-h-[600px] grid place-items-start place-items-center pb-[20vh] w-full grid-cols-1">
      <SpaceY />
      <SpaceY />
      <SpaceY />
      <span className="ffont-medium font-poppins text-dark px-0 min-[430px]:p-0 text-sm max-[450px]:w-[335px]">
        New York
      </span>
      <span className="font-bold font-volkhov text-dark px-0 min-[430px]:p-0 min-[450px]:text-2xl text-xl max-[450px]:w-[335px]">
        Must See in New York
      </span>

      <SpaceY />
      <div className="flex flex-wrap w-auto justify-center gap-[10px] sm:gap-[22px]">
        {newYorkLocations.map((item) =>
          item.url ? (
            <Link key={item.url} to={item.url}>
              <LocationCard {...item} />
            </Link>
          ) : (
            <LocationCard {...item} />
          )
        )}
      </div>

      <BookBanner />

      {/* Best SECTION */}

      <div>
        <div className="flex flex-col justify-center items-center">
          <span className="font-medium font-poppins text-dark px-0 min-[430px]:p-0 text-sm max-[450px]:w-[345px]">
            Popular Attractions
          </span>
          <span className="font-bold font-volkhov text-dark px-0 min-[430px]:p-0 min-[450px]:text-2xl text-xl max-[450px]:w-[345px]">
            뉴욕 인기 입장지
          </span>
        </div>

        <SpaceY />
        <div className="grid justify-center w-auto gap-[10px] sm:gap-[22px] grid-cols-2 md:grid-cols-2 lg:grid-cols-3 custom_mobile:grid-cols-4 place-items-center">
          {displayBestTickets.map((item) =>
            item.url ? (
              <Link key={item.url} to={item.url}>
                <LocationCard {...item} />
              </Link>
            ) : (
              <LocationCard {...item} />
            )
          )}
        </div>
      </div>

      {/* MUSICAL SECTION */}
      <SpaceY />
      <SpaceY />
      <SpaceY />

      <div>
        <div className="flex flex-col justify-center items-center">
          <span className="font-medium font-poppins text-dark px-0 min-[430px]:p-0 text-sm max-[450px]:w-[345px]">
            Broadway Musical
          </span>
          <span className="font-bold font-volkhov text-dark px-0 min-[430px]:p-0 min-[450px]:text-2xl text-xl max-[450px]:w-[345px]">
            브로드웨이 뮤지컬
          </span>
        </div>

        <SpaceY />
        <div className="grid justify-center w-auto gap-[10px] sm:gap-[22px] grid-cols-2 md:grid-cols-2 lg:grid-cols-3 custom_mobile:grid-cols-4 place-items-center">
          {displayMusicalTickets.map((item) =>
            item.url ? (
              <Link key={item.url} to={item.url}>
                <LocationCard {...item} />
              </Link>
            ) : (
              <LocationCard {...item} />
            )
          )}
        </div>
      </div>

      {/* TOUR SECTION */}
      <SpaceY />
      <SpaceY />
      <SpaceY />

      <div>
        <div className="flex flex-col justify-center items-center">
          <span className="font-medium font-poppins text-dark px-0 min-[430px]:p-0 text-sm max-[450px]:w-[345px]">
            가이드 투어
          </span>
          <span className="font-bold font-volkhov text-dark px-0 min-[430px]:p-0 min-[450px]:text-2xl text-xl max-[450px]:w-[345px]">
            타미스와 함께하는 여행
          </span>
        </div>
        <SpaceY />
        <div className="grid justify-center w-auto gap-[10px] sm:gap-[22px] grid-cols-2 md:grid-cols-2 lg:grid-cols-3 custom_mobile:grid-cols-4 place-items-center">
          {displayTickets.map((item) =>
            item.url ? (
              <Link key={item.url} to={item.url}>
                <LocationCard {...item} />
              </Link>
            ) : (
              <LocationCard {...item} />
            )
          )}
        </div>
      </div>
      {/* TAMICE COMMUNITY SECTION */}
      <SpaceY />
      <SpaceY />
      <SpaceY />
      <div>
        <div className="flex flex-col justify-center items-center">
          <span className="font-medium font-poppins text-dark px-0 min-[430px]:p-0 text-sm max-[450px]:w-[345px]">
            Let’s Connect
          </span>
          <span className="font-bold font-volkhov text-dark px-0 min-[430px]:p-0 min-[450px]:text-2xl text-xl max-[450px]:w-[345px]">
            타미스 커뮤니티
          </span>
        </div>
        <SpaceY />
        <div className="grid justify-center w-auto gap-[10px] sm:gap-[22px] grid-cols-2 md:grid-cols-2 lg:grid-cols-3 place-items-center ">
          {newYorkcommunities.map((item) =>
            item.url ? (
              <Link key={item.url} to={item.url} target="_blank">
                <LocationCard {...item} />
              </Link>
            ) : (
              <LocationCard {...item} />
            )
          )}
        </div>
      </div>
    </div>
  );
};
