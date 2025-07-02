import { staticFiles } from "../../shared";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { SpaceY } from "../../shared/components/Utils";

export const LasVegasEventView = () => {
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
            <span className="flex justify-center block text-2xl font-bold grow font-volkhov text-dark max-[485px]:text-xl">
              라스베가스 / 캐년 매력에 빠져 볼까요?
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
                    src={staticFiles.images.lv_event_1}
                  />
                </a>
              </div>
              <div className="p-8 bg-white shadow-sm rounded-b-3xl w-full">
                <h1 className="mb-4 font-bold">
                  라스베가스 / 캐년 이번 달 이벤트, 축제, 날씨 정보
                </h1>
                <div>
                  <p>
                    타미스입니다💙봄 내음이 나는 4월이네요🌸
                    <br />
                    4월 라스베가스, 그랜드 캐년 날씨와 이벤트에 대해 안내드립니다
                    <br />
                    2024년 4월 라스베가스 / 캐년 날씨 : <br />
                    1.라스베가스 : 4월 라스베가스는 낮 최고 기온이 대부분 25도 안팎이네요
                    <br />
                    최저기온도 영하는 없지만 최저 10도를 웃도는 것으로 보입니다
                    <br />
                    라스베가스는 한국의 여름과 비슷하지만,한국의 겨울보다는 따뜻하답니다☺️
                    <br />
                    ​ 2.그랜드 캐년 : 4월 캐년은 낮 최고 기온이 대부분 10~15도입니다!
                    <br />
                    최저기온도 영하권이네요, ⚠️그랜드캐년은 미국 내 가장 깊고 광대한 협곡 중
                    하나랍니다,
                    <br />
                    고도는 위치에 따라 다를 수 있지만 고저 차이가 있으니 꼭 따뜻한 옷을 준비하시길
                    바라요
                    <br />
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-b-3xl md:flex-row w-full">
              <div className="flex justify-center bg-white shadow-sm rounded-b-3xl">
                <a
                  href="https://blog.naver.com/tamice/223403948659"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  <img
                    className="block max-h-[235px] min-w-[330px] md:min-h-[335px] max-w-[330px] md:min-w-[460px] h-auto p-6 cursor-pointer"
                    alt=""
                    src={staticFiles.images.lv_event_2}
                  />
                </a>
              </div>
              <div className="p-8 bg-white shadow-sm rounded-b-3xl w-full">
                <h1 className="mb-4 font-bold">라스베가스 / 캐년 맛집 추천</h1>
                <div>
                  <p>
                    라스베가스 + 캐년 맛집에 대해 알려드릴게요💙
                    <br />
                    Gordon Ramsay Burger : 3667 Las Vegas Blvd S, Las Vegas,NV 89109
                    <br />
                    이미 너무나 유명한 곳이죠! 고든렘지 버거🍔
                    <br />
                    한국에도 여러군데 입점해 있지만 현지에서 즐긴는 고든렘지 버거 어떠세요!
                    <br />
                    ​ Gordon Ramsay Steak : 3655 Las Vegas Blvd S, Las Vegas,NV 89109
                    <br />
                    햄버거에 이은 고든램지 스테이크입니다 🥩
                    <br />
                    꼭 맛보아야 하는 메뉴로 비프 웰링턴 추천드려요
                    <br />
                    Joel Robuchon : MGM Grand, 3799 S Las Vegas Blvd, as Vegas, NV 89109
                    <br />
                    세계적으로 유명한 셰프 조엘 로부숑의 레스토랑입니다🧑‍🍳
                    <br />
                    무려, 미슐랭 3스타라구요! 눈과 입이 너무나 즐거워지는 요리들이네요..💙
                    <br />
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-b-3xl md:flex-row w-full">
              <div className="flex justify-center bg-white shadow-sm rounded-b-3xl">
                <a
                  href="https://blog.naver.com/tamice/223403982850"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  <img
                    className="block max-h-[235px] min-w-[330px] md:min-h-[335px] max-w-[330px] md:min-w-[460px] h-auto p-6 cursor-pointer"
                    alt=""
                    src={staticFiles.images.lv_event_3}
                  />
                </a>
              </div>
              <div className="p-8 bg-white shadow-sm rounded-b-3xl w-full">
                <h1 className="mb-4 font-bold">라스베가스 / 캐년 가 볼 만한 곳</h1>
                <div>
                  <p>
                    세계적으로 유명한 호텔, 리조트, 쇼, 카지노 등 화려함을 자랑하는 라스베가스죠!{" "}
                    <br />
                    ​라스베가스 + 캐년 가 볼 만한 곳에 대해 알려드릴게요 ☺️ <br />
                    라스베가스 O 쇼 : 3600 S Las Vegas Blvd, Las Vegas,NV 89109 <br />
                    뉴욕이 브로드웨이 뮤지컬로 유명하다면, 라스베가스는 세계적으로 유명한 쇼와
                    공연으로 유명하답니다! <br />
                    세븐 매직 마운틴스 : S Las Vegas Blvd, Las Vegas, NV 89054 <br />
                    공공 미술 프로젝트의 하나로, 주위 사막, 자연과 어우러지는 곳으로 유명하답니다!{" "}
                    <br />
                    작가 우고 론디노네의 작품으로 최대 10.7m 높이로 선명히 칠해진 바위가 설치되어
                    있어요 <br />
                    라스베가스 sphere : S Las Vegas Blvd, Las Vegas, NV 89054 <br />
                    둥근 모양이 굉장히 인상적인 Sphere! 23년도 9월 23일에 개장한 라스베가스에서 가장
                    비싼!​ <br />
                    엔터테이먼트랍니다
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-b-3xl md:flex-row w-full">
              <div className="flex justify-center bg-white shadow-sm rounded-b-3xl">
                <a
                  href="https://blog.naver.com/tamice/223404004524"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  <img
                    className="block max-h-[235px] min-w-[330px] md:min-h-[335px] max-w-[330px] md:min-w-[460px] h-auto p-6 cursor-pointer"
                    alt=""
                    src={staticFiles.images.lv_event_4}
                  />
                </a>
              </div>
              <div className="p-8 bg-white shadow-sm rounded-b-3xl w-full">
                <h1 className="mb-4 font-bold">라스베가스 / 캐년 일정추천</h1>
                <div>
                  <p>
                    라스베가스와 캐년을 짧게 즐기시는 분들께 추천드립니다!
                    <br /> 라스베가스-캐년 1박2일 자유여행 일정 추천
                    <br /> - Day1 :<br /> 📍라스베가스 도착 - 스트립 탐방(호텔로비,쇼핑몰,분수쇼 등)
                    - 카지노 체험 - 저녁 미술관 - (선셋)뷰 보스턴 - 저녁
                    <br /> Day2 :<br /> 📍(새벽) 그랜드캐년 출발 - 홀스슈 벤드 - 앤텔롭캐년 -
                    사우스림 트레일 - 라스베가스 도착 크루즈
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
