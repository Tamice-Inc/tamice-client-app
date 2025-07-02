import { staticFiles } from "../../shared";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const SFTripView = () => {
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
              샌프란시스코 매력에 빠져 볼까요?
            </span>
          </div>
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col gap-4 rounded-b-3xl md:flex-row w-full">
              <div className="flex justify-center bg-white shadow-sm rounded-b-3xl ">
                <a
                  href="https://blog.naver.com/tamice/223404017859"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  <img
                    className="block max-h-[235px] min-w-[330px] md:min-h-[335px] max-w-[330px] md:min-w-[460px] h-auto p-6 cursor-pointer"
                    alt=""
                    src={staticFiles.images.sf_event1}
                  />
                </a>
              </div>
              <div className="p-8 bg-white shadow-sm rounded-b-3xl w-full">
                <h1 className="mb-4 font-bold">샌프란 이번 달 이벤트, 축제, 날씨 정보</h1>
                <div>
                  <p>
                    타미스입니다💙봄바람 살랑이는 4월입니다🌸
                    <br />
                    4월 샌프란 날씨와 이벤트에 대해 안내드립니다
                    <br />
                    2024년 4월 샌프란 날씨 : <br />
                    4월 날씨는 온화하고 쾌적하답니다
                    <br />
                    ​평균 기온은 최고 19도,최저 10도입니다!
                    <br />
                    비는 거의 오지 않는 것 같지만,가벼운 아우터를 챙기시는 걸 추천드려요!
                    <br />
                    2024년 4월 샌프란 이벤트 :<br />
                    San Francisco International Film Festival / 샌프란시스코 국제 영화제
                    (Apr.5~17.2024)
                    <br />
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-b-3xl md:flex-row w-full">
              <div className="flex justify-center bg-white shadow-sm rounded-b-3xl">
                <a
                  href="https://blog.naver.com/tamice/221882312747"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  <img
                    className="block max-h-[235px] min-w-[330px] md:min-h-[335px] max-w-[330px] md:min-w-[460px] h-auto p-6 cursor-pointer"
                    alt=""
                    src={staticFiles.images.sf_event2}
                  />
                </a>
              </div>
              <div className="p-8 bg-white shadow-sm rounded-b-3xl w-full">
                <h1 className="mb-4 font-bold">
                  샌프란시스코 여행 선물, 기념품 고르기! 샌프란시스코 시내, 공항 면세점 등 쇼핑
                  리스트
                </h1>
                <div>
                  <p>
                    #샌프란시스코 에도 구입할만한 기념품들이 많은데요, <br />
                    인기 관광지라 여행지 어디든 기념품점이 있지만, 특별한 기념품 쇼핑을 하고 싶은
                    분들을 위해 샌프란시스코에서 구입하면 좋을 기념품들, 그리고 샌프란시스코 어디로
                    쇼핑을 가야 할지 모두 추천해드릴게요! <br />
                    세계 3대 #초콜릿 기라델리! 그리고 샌프란시스코 필수코스 #기라델리스퀘어 <br />
                    샌프란시스코 방문하는 분들에게 가장 인기가 많은 선물이라하면 단연
                    #기라델리초콜릿 이에요. 주는 사람도 좋고, 받는 사람도 좋아하는 최고의 선물!!{" "}
                    <br />
                    그리고 여행의 추억을 기억하며 하나씩 꺼내 먹기에도 좋은 달다구리 초콜렛!
                    #샌프란시스코기라델리초콜렛 이 인기가 많은 데는 이유가 있겠죠! <br />
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-b-3xl md:flex-row w-full">
              <div className="flex justify-center bg-white shadow-sm rounded-b-3xl">
                <a
                  href="https://blog.naver.com/tamice/221852575508"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  <img
                    className="block max-h-[235px] min-w-[330px] md:min-h-[335px] max-w-[330px] md:min-w-[460px] h-auto p-6 cursor-pointer"
                    alt=""
                    src={staticFiles.images.sf_event3}
                  />
                </a>
              </div>
              <div className="p-8 bg-white shadow-sm rounded-b-3xl w-full">
                <h1 className="mb-4 font-bold">
                  샌프란시스코 여행 필수, 샌프란시스코 야경 포인트 추천!
                </h1>
                <div>
                  <p>
                    바닷가와 도시 풍경이 적절하게 어우려져 다양한 모습을 보여주는 샌프란시스코!{" "}
                    <br />
                    다른 어떤 도시들과 비교불가한 샌프란시스코만의 독보적인 분위기는 여행이 끝난
                    후에도 진한 여운으로 남기에 충분한데요, <br />
                    ​낮에 보는 샌프란시스코도 예쁘지만 밤에 보면 더더욱 아름다운 샌프란시스코의
                    색다른 모습들, 샌프란시스코의 야경 포인트들을 소개해드릴게요! <br />
                    <span className="font-bold"> 트윈픽스 Twin Peaks</span> <br />
                    샌프란시스코에서 가장 멋진 야경을 바라볼 수 있는 곳이라 하면 대부분의 사람들은
                    단연 샌프란시스코 트윈픽스를 꼽을 텐데요. <br />
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-b-3xl md:flex-row w-full">
              <div className="flex justify-center bg-white shadow-sm rounded-b-3xl">
                <a
                  href="https://blog.naver.com/tamice/223217351783"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  <img
                    className="block max-h-[235px] min-w-[330px] md:min-h-[335px] max-w-[330px] md:min-w-[460px] h-auto p-6 cursor-pointer"
                    alt=""
                    src={staticFiles.images.sf_event4}
                  />
                </a>
              </div>
              <div className="p-8 bg-white shadow-sm rounded-b-3xl w-full">
                <h1 className="mb-4 font-bold">
                  세계 최대 규모 자연사 박물관, 샌프란시스코 캘리포니아 과학 아카데미 박물관
                </h1>
                <div>
                  <p>
                    샌프란시스코 골든 게이트 파크 내에 위치한 무려 세계 최대 규모의 자연사 박물관!{" "}
                    <br />
                    바로 캘리포니아 과학 아카데미 박물관인데요. 이곳은 미국 서부에 설립되었던 첫
                    과학기관이기도 해요. <br />
                    ​이 하나의 박물관 안에 자연사 박물관, 아쿠아리움, 플라네타리움(천체투영관),
                    아열대 온실, 연구소 이 모든 게 들어있는 데다 내용까지 알차기 때문에 가성비
                    최고의 박물관으로 많은 샌프란시스코 여행객들의 인기를 끌고 있답니다. <br />
                    샌프란시스코 골든 게이트 파크가 워낙 넓고 예쁘게 구성되있는데다 과학박물관
                    외에도 공원내에 드영 미술관도 있어 거의 반나절 일정으로 잡았구요. ​ <br />
                    시간 여유가 된다면 공원에서 자전거도 타고 피크닉도 하면서 하루 종일 놀아도
                    좋겠더라구요! <br />
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
