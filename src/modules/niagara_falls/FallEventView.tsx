import { staticFiles } from "../../shared";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { SpaceY } from "../../shared/components/Utils";

export const FallEventView = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);
  return (
    <div className="min-h-[600px] flex flex-col items-center pt-[5vh] pb-[20vh] w-full">
      <div className="max-w-[1300px] w-full">
        <div className="py-[5vh] gap-x-5 md:block md:flex w-full justify-center pt-[5vh]">
          <a
            href="https://blog.naver.com/tamice/223402838204"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="w-full h-[180px]" alt="" src={staticFiles.images.여행정보_image1} />
            {/* <img className="w-full " alt="" src={staticFiles.images.여행정보_image2} /> */}
          </a>
        </div>
        <div className="py-[5vh] gap-x-5 w-full pt-[5vh] flex flex-col gap-8">
          <div className="flex flex-col justify-center w-full gap-2">
            <span className="flex justify-center block text-2xl font-bold grow font-volkhov text-dark max-[485px]:text-xl">
              나이아가라 매력에 빠져 볼까요?
            </span>
          </div>
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col gap-4 rounded-b-3xl md:flex-row w-full">
              <div className="flex justify-center bg-white shadow-sm rounded-b-3xl ">
                <a
                  href="https://blog.naver.com/tamice/223396572768"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  <img
                    className="block max-h-[235px] min-w-[330px] md:min-h-[335px] max-w-[330px] md:min-w-[460px] h-auto p-6 cursor-pointer"
                    alt=""
                    src={staticFiles.images.nf_event_1}
                  />
                </a>
              </div>
              <div className="p-8 bg-white shadow-sm rounded-b-3xl w-full">
                <h1 className="mb-4 font-bold">나이아가라 이번 달 이벤트, 축제, 날씨 정보</h1>
                <div>
                  <p>
                    타미스입니다💙한 층 따스해진 4월입니다🌸
                    <br />
                    4월 나이아가라 날씨와 이벤트에 대해 안내드립니다
                    <br />
                    2024년 4월 나이아가라 날씨 : 4월 나이아가라의 날씨예요!
                    <br />
                    낮 최고 기온이 대부분 10도 안팎이네요
                    <br />
                    5월에 다가갈 수록 조금씩 따뜻해지는 듯 합니다
                    <br />
                    최저기온도 영하는 없지만 평균 1~5도 정도로 보입니다
                    <br />
                    봄이 찾아오는 4월인가 봅니다! 비 오는 날이 잦네요☔
                    <br />
                    ​ 뉴욕=서울의 날씨가 비슷하다 생각한다면 나이아가라는 뉴욕에서 위로 약 7시간,
                    <br />
                    즉, 서울 날씨보다 약 10도 정도 낮다 생각하시면 돼요!
                    <br />
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-b-3xl md:flex-row w-full">
              <div className="flex justify-center bg-white shadow-sm rounded-b-3xl">
                <a
                  href="https://blog.naver.com/tamice/223403893968"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  <img
                    className="block max-h-[235px] min-w-[330px] md:min-h-[335px] max-w-[330px] md:min-w-[460px] h-auto p-6 cursor-pointer"
                    alt=""
                    src={staticFiles.images.nf_event_2}
                  />
                </a>
              </div>
              <div className="p-8 bg-white shadow-sm rounded-b-3xl w-full">
                <h1 className="mb-4 font-bold">나이아가라 맛집 추천</h1>
                <div>
                  <p>
                    나이아가라 맛집에 대해 알려드릴게요💙
                    <br />
                    모두, 캐나다령에 있어요!
                    <br />
                    Tide and Vine Oyster House : 3491 Portage Rd, Niagara Falls, ON L2J 2K5
                    <br />
                    해산물을 좋아하는 분들께 딱인 곳이죠💙
                    <br />
                    oyster(굴)와 해산물 플래터 / 리조 / 스튜가 인기 메뉴랍니다!​
                    <br />
                    ​ The Keg Steakhouse + Bar : Embassy Suites Hotel, 6700 Fallsview Blvd, Niagara
                    Falls, ON L2G 3W6
                    <br />
                    나이아가라를 즐기며 식사라니 낭만있는 이 곳, 정말 뷰가 다 한 곳이에요
                    <br />
                    The Fry (Korean Fried Chicken) : 6530 Lundy's Ln, Niagara Falls, ON L2G 1T6
                    <br />
                    한식이 그리우시다구요? 나이아가라에서 유명한 '한국' 치킨 매장 소개해 드려요!
                    <br />
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-b-3xl md:flex-row w-full">
              <div className="flex justify-center bg-white shadow-sm rounded-b-3xl">
                <a
                  href="https://blog.naver.com/tamice/223403998550"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  <img
                    className="block max-h-[235px] min-w-[330px] md:min-h-[335px] max-w-[330px] md:min-w-[460px] h-auto p-6 cursor-pointer"
                    alt=""
                    src={staticFiles.images.nf_event_3}
                  />
                </a>
              </div>
              <div className="p-8 bg-white shadow-sm rounded-b-3xl w-full">
                <h1 className="mb-4 font-bold">나이아가라 가 볼 만한 곳</h1>
                <div>
                  <p>
                    타미스와 함께라면 쉽고 편한 여행 가능!
                    <br />
                    나이아가라 가 볼 만한 곳에 대해 알려드릴게요 ☺️
                    <br />
                    스카이론 타워 전망대 : 5200 Robinson St, Niagara Falls, ON L2G 2A2 CANADA
                    <br />
                    나이아가라 폭포를 약 236m 높이에서 바라볼 수 있는 필수 방문 전망대 "스카이론
                    타워"
                    <br />
                    360도 파노라마 형태의 전망대로 나이아가라 풍경을 구석구석 즐길 수 있답니다!
                    <br />
                    월풀 제트보트 : 55 River Frontage Road, Queenston, ON L0S 1L0, Canada
                    <br />
                    나이아가라 폭포의 소용돌이를 가로지르는 스릴 넘치는 액티비티!🌈
                    <br />
                    한 여름 나이아가라 방문시 너무 시원하게 즐길 수 있을 것 같네요​
                    <br />
                    나이아가라 시티 크루즈 : 5920 Niagara River Pkwy, Niagara Falls, ON L2E 6X8
                    CANADA <br />
                    나이아가라 시티 크루즈는 폭포를 둘러싼 강을 따라 운행하는 크루즈랍니다!
                    <br />
                    타미스와 함께 눈 앞에서 즐기는 나이아가라,어떠세요💙
                    <br />
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-b-3xl md:flex-row w-full">
              <div className="flex justify-center bg-white shadow-sm rounded-b-3xl">
                <a
                  href="https://blog.naver.com/tamice/223123062988"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  <img
                    className="block max-h-[235px] min-w-[330px] md:min-h-[335px] max-w-[330px] md:min-w-[460px] h-auto p-6 cursor-pointer"
                    alt=""
                    src={staticFiles.images.nf_event_4}
                  />
                </a>
              </div>
              <div className="p-8 bg-white shadow-sm rounded-b-3xl w-full">
                <h1 className="mb-4 font-bold">나이아가라 일정추천</h1>
                <div>
                  <p>
                    타미스가 추천하는 나이아가라 1박2일 일정! <br />
                    미국? 캐나다? 어디에서 봐야 할지 고민하지 마세요!
                    <br />
                    타미스 투어와 함께라면 두 곳 모두 방문할 수 있어요 🙆
                    <br />
                    다른 패키지 투어와 달리 자유롭게 원하는 관광지를 마음껏 둘러볼 수도 있다구요! 😉
                    <br />
                    ​나이아가라 주립 공원 (미국령) : Niagara Falls State Park <br />
                    바람의 동굴 : Cave of the Winds *선택 사항
                    <br />
                    나이아가라 폭포 (캐나다령) : Niagara Falls *포함 사항
                    <br />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
