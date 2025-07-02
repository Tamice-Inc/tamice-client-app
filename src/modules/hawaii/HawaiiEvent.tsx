import { staticFiles } from "../../shared";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { SpaceY } from "../../shared/components/Utils";

export const HawaiiEventView = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);
  return (
    <div className="min-h-[600px] flex flex-col items-center pt-[5vh] pb-[20vh] w-full">
      <div className="max-w-[1300px] w-full">
        <div className="py-[5vh] gap-x-5 md:block md:flex w-full justify-center pt-[5vh]">
          <a
            href="https://blog.naver.com/tamice/223312958594"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="w-full h-[180px]" alt="" src={staticFiles.images.여행정보_image1} />
            {/* <img className="w-full " alt="" src={staticFiles.images.여행정보_image2} /> */}
          </a>
        </div>
        <div className="py-[5vh] gap-x-5 w-full pt-[5vh] flex flex-col gap-8">
          <div className="flex flex-col justify-center w-full gap-2">
            <span className="flex justify-center block text-2xl font-bold grow font-volkhov text-dark max-[485px]:text-xl max-[485px]:text-xl">
              하와이 매력에 빠져 볼까요?
            </span>
          </div>
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col gap-4 rounded-b-3xl md:flex-row w-full">
              <div className="flex justify-center bg-white shadow-sm rounded-b-3xl ">
                <a
                  href="https://blog.naver.com/tamice/223595461091"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
               <img
                    className="block max-h-[235px] min-w-[330px] md:min-h-[335px] max-w-[330px] md:min-w-[460px] h-auto p-6 cursor-pointer"
                    alt=""
                    src={staticFiles.images.hawaii_event1}
                  />
                </a>
              </div>
              <div className="p-8 bg-white shadow-sm rounded-b-3xl w-full">
                <h1 className="mb-4 font-bold">하와이 가 볼 만한 곳</h1>
                <div>
                  <p>
                    하와이 가볼 만한 곳을 소개해 드릴게요🤍 <br />
                    하와이는 천혜의 자연경관과 다채로운 문화로 유명하답니다!
                    <br />
                    와이키키 해변 : Kalakaua Ave, Honolulu, HI 96815
                    <br />
                    하와이 하면 가장 먼저 떠오르는 곳! 와이키키 해변은 하와이의 대표적인 관광
                    명소예요. 맑고 푸른 바다에서 서핑을 즐기거나 일몰을 감상할 수 있어요.
                    <br />
                    다이아몬드 헤드 : Honolulu, HI 96815
                    <br />
                    호놀룰루 시내가 한눈에 보이는 다이아몬드 헤드는 하와이에서 가장 인기 있는 하이킹
                    코스 중 하나예요. 정상에서 보는 절경은 그야말로 환상적이랍니다.
                    <br />
                    하나우마 베이 : 7455 Kalanianaole Hwy, Honolulu, HI 96825
                    <br />
                    스노클링을 즐기고 싶다면 하나우마 베이가 제격이에요! 다양한 해양 생물과 아름다운
                    산호초를 볼 수 있는 이곳은 자연 보호 구역으로 지정되어 있어서 더욱 특별하답니다.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-b-3xl md:flex-row w-full">
              <div className="flex justify-center bg-white shadow-sm rounded-b-3xl">
                <a
                  href="https://blog.naver.com/tamice/223596564555"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  <img
                    className="block max-h-[235px] min-w-[330px] md:min-h-[335px] max-w-[330px] md:min-w-[460px] h-auto p-6 cursor-pointer"
                    alt=""
                    src={staticFiles.images.hawaii_event2}
                  />
                </a>
              </div>
              <div className="p-8 bg-white shadow-sm rounded-b-3xl w-full">
                <h1 className="mb-4 font-bold">하와이 일정추천</h1>
                <div>
                  <p>
                    하와이는 그 자체로 천국 같은 곳이죠!🌴✨
                    <br /> Day 1: 📍호놀룰루 도착 - 와이키키 해변에서 여유로운 첫날 - 다이아몬드
                    헤드 일몰 감상 - 와이키키에서 저녁
                    <br /> Day 2: 📍하나우마 베이 스노클링 - 카일루아 비치에서 여유로운 오후 -
                    라니카이 비치 카약 투어 - 로컬 레스토랑에서 저녁
                    <br /> Day 3: 📍카우아이 섬 투어 - 나팔리 코스트 헬리콥터 투어 - 와이메아 캐니언
                    하이킹 - 현지 맛집에서 저녁
                    <br /> Day 4: 📍마우이 섬으로 이동 - 하날레이 해변에서 휴식 - 할레아칼라
                    국립공원 일출 투어 - 마우이 해변에서 저녁
                    <br /> Day 5: 📍빅 아일랜드 화산 투어 - 킬라우에아 화산 탐방 - 하와이 화산
                    국립공원 하이킹 - 현지 음식을 즐기며 여유로운 저녁
                    <br /> Day 6: 📍폴리네시안 문화센터 방문 - 하와이 전통 공연 & 문화 체험 - 알로하
                    타워 전망대에서 마지막 하와이 풍경 감상 - 공항으로 이동
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-b-3xl md:flex-row w-full">
              <div className="flex justify-center bg-white shadow-sm rounded-b-3xl">
                <a
                  href="https://blog.naver.com/tamice/223596579008"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  <img
                    className="block max-h-[235px] min-w-[330px] md:min-h-[335px] max-w-[330px] md:min-w-[460px] h-auto p-6 cursor-pointer"
                    alt=""
                    src={staticFiles.images.hawaii_event3}
                  />
                </a>
              </div>
              <div className="p-8 bg-white shadow-sm rounded-b-3xl w-full">
                <h1 className="mb-4 font-bold">LA 가 볼 만한 곳</h1>
                <div>
                  <p>
                    엔터테인먼트의 중심이자 다양한 문화가 어우러진 도시, LA!
                    <br />
                    타미스가 LA에서 가볼 만한 곳들을 소개해 드릴게요🥰
                    <br />
                    할리우드 사인 : Los Angeles, CA
                    <br />
                    산타 모니카 비치 : 200 Santa Monica Pier, Santa Monica, CA 90401
                    <br /> 태평양을 바라보며 산책하거나 놀이공원에서 즐길 수 있는 산타 모니카 비치는
                    LA 여행에서 놓칠 수 없는 스팟이에요.
                    <br /> 로데오 드라이브 : Rodeo Dr, Beverly Hills, CA 90210
                    <br /> 럭셔리한 쇼핑을 즐기고 싶다면 로데오 드라이브가 제격! 영화 속 장면 같은
                    거리를 거닐며 눈이 즐거운 시간을 보낼 수 있어요.
                    <br /> 게티 센터 : 1200 Getty Center Dr, Los Angeles, CA 90049
                    <br /> 아름다운 예술 작품과 정원이 어우러진 게티 센터는 무료로 입장할 수 있어서
                    더욱 매력적이에요. 사진 찍기에도 정말 좋은 장소랍니다.
                    <br /> 그리피스 천문대 : 2800 E Observatory Rd, Los Angeles, CA 90027
                    <br />
                    그리피스 천문대에서는 LA 전경과 밤하늘을 한눈에 볼 수 있어요. 영화 '라라랜드'의
                    명장면이 떠오르는 곳이기도 하죠.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-b-3xl md:flex-row w-full">
              <div className="flex justify-center bg-white shadow-sm rounded-b-3xl">
                <a
                  href="https://blog.naver.com/tamice/223596579008"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  <img
                    className="block max-h-[235px] min-w-[330px] md:min-h-[335px] max-w-[330px] md:min-w-[460px] h-auto p-6 cursor-pointer"
                    alt=""
                    src={staticFiles.images.hawaii_event4}
                  />
                </a>
              </div>
              <div className="p-8 bg-white shadow-sm rounded-b-3xl w-full">
                <h1 className="mb-4 font-bold">샌디에고 가 볼 만한 곳</h1>
                <div>
                  <p>
                    아름다운 해변과 다양한 명소로 유명한 도시 샌디에고!
                    <br />
                    타미스가 샌디에고에서 가볼 만한 곳 추천드립니다🐬
                    <br />
                    발보아 파크 : 1549 El Prado, San Diego, CA 92101
                    <br />
                    샌디에고의 대표 명소인 발보아 파크는 거대한 공원으로, 여러 박물관과 정원이 있어
                    하루 종일 구경하기 딱 좋아요.
                    <br /> 샌디에고 동물원 : 2920 Zoo Dr, San Diego, CA 92101
                    <br /> 세계적으로 유명한 샌디에고 동물원! 다양한 동물들과 함께하는 즐거운 시간을
                    보낼 수 있어요. 아이들과 함께하는 가족여행에 특히 추천드려요.
                    <br /> 라호야 해변 : La Jolla Cove, San Diego, CA 92037
                    <br /> 샌디에고에서 가장 아름다운 해변 중 하나인 라호야 해변은 맑고 푸른 바다와
                    독특한 바위 지형이 인상적이에요. 바다사자를 가까이에서 볼 수 있는 곳이기도
                    하답니다.
                    <br /> 코로나도 섬 : Coronado Island, San Diego, CA
                    <br /> 코로나도 섬은 아름다운 해변과 고풍스러운 호텔 델 코로나도가 있는 매력적인
                    휴양지예요. 바닷가를 따라 자전거를 타며 여유로운 시간을 보내기에도 완벽하죠.
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
