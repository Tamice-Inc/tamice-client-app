import { staticFiles } from "../../shared";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const 여행정보View = () => {
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
              뉴욕에서 전하는 진.짜 뉴욕 정보
            </span>
          </div>
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col gap-4 rounded-b-3xl md:flex-row w-full">
              <div className="flex justify-center bg-white shadow-sm rounded-b-3xl ">
                <a
                  href="https://blog.naver.com/tamice/223395326537"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  <img
                    className="block max-h-[235px] min-w-[330px] md:min-h-[335px] max-w-[330px] md:min-w-[460px] h-auto p-6 cursor-pointer"
                    alt=""
                    src={staticFiles.images.여행정보_destination1}
                  />
                </a>
              </div>
              <div className="p-8 bg-white shadow-sm rounded-b-3xl w-full">
                <h1 className="mb-4 font-bold">뉴욕 이번 달 이벤트, 축제, 날씨 정보</h1>
                <div>
                  <p>
                    타미스입니다💙따스한 4월입니다🌸
                    <br />
                    4월 뉴욕 날씨와 이벤트에 대해 안내드립니다
                    <br />
                    2024년 4월​ 뉴욕 날씨 : 4월의 뉴욕 날씨예요!
                    <br />
                    낮 최고 기온이 대부분 15도~20도 안팎이네요
                    <br />
                    최저기온도 평균 10도네요☀️
                    <br />
                    꽃이 피는 4월인가 봅니다, 비 오는 날이 잦네요☔
                    <br />
                    ​기온별 옷차림을 보고 참고해 주세요
                    <br />
                    우산과 선글라스는 필수인 거 아시죠😎☔
                    <br />
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-b-3xl md:flex-row w-full">
              <div className="flex justify-center bg-white shadow-sm rounded-b-3xl">
                <a
                  href="https://blog.naver.com/tamice/223152524837"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  <img
                    className="block max-h-[235px] min-w-[330px] md:min-h-[335px] max-w-[330px] md:min-w-[460px] h-auto p-6 cursor-pointer"
                    alt=""
                    src={staticFiles.images.여행정보_destination2}
                  />
                </a>
              </div>
              <div className="p-8 bg-white shadow-sm rounded-b-3xl w-full">
                <h1 className="mb-4 font-bold">뉴욕 맛집 총정리, 여기에 모두 정리 끝!</h1>
                <div>
                  <p>
                    스테이크 햄버거 피자 베이글 재즈바 카페 디저트 아이스크림 한식당까지! <br />
                    ⭐ 뉴욕 맛집 완전 정복 ⭐<br />
                    최종_이게최종_찐최종_찐찐찐최종_찐마지막최종
                    <br />
                    (포스팅 좋아요 꾹 눌러주시고 아래에 댓글 남겨주시면 뉴욕 맛집 지도 링크
                    보내드릴게요 🗽)
                    <br />
                    ​뉴욕 스테이크 / 뉴욕 필수 맛집 / 뉴욕 재즈바 / 간단한 식사 / TV 속 맛집 /
                    카페+디저트 / 브루클린 맛집 / 한식당
                    <br />
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-b-3xl md:flex-row w-full">
              <div className="flex justify-center bg-white shadow-sm rounded-b-3xl">
                <a
                  href="https://blog.naver.com/tamice/223105140665"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  <img
                    className="block max-h-[235px] min-w-[330px] md:min-h-[335px] max-w-[330px] md:min-w-[460px] h-auto p-6 cursor-pointer"
                    alt=""
                    src={staticFiles.images.여행정보_destination3}
                  />
                </a>
              </div>
              <div className="p-8 bg-white shadow-sm rounded-b-3xl w-full">
                <h1 className="mb-4 font-bold">JFK 공항에서 맨하탄 가는 방법!</h1>
                <div>
                  <p>
                    뉴욕에는 총 3개의 공항이 있어요. ​JFK (John F.Kennedy International Airport),
                    LGA (LaGuardia Airport), EWR (Newark Liberty International Airport)
                    <br />
                    ​LGA(라과디아) 공항은 JFK 공항이 생기기 전 뉴욕을 대표하는 공항으로 현재는 주로
                    국내선 항공이 이용하고 있어요.
                    <br />
                    이름이 마치 뉴욕 공항처럼 헷갈리는 EWR(뉴왁) 공항은 뉴욕 바로 옆인 뉴저지에
                    위치한 공항으로, 새롭게 취항한 에어프레미아가 도착하는 공항이에요
                    <br />
                    마지막, 뉴욕에서 가장 큰 공항인 JFK(존 에프 케네디) 공항 가장 익숙하게
                    들어보셨죠?
                    <br />
                    대한항공, 아시아나 항공을 타고 뉴욕을 오시는 관광객분들은 JFK 공항을 통해
                    입국하게 돼요.
                    <br />
                    대부분의 한국인 여행객들은 JFK 공항으로 도착한다는 말씀! 🤓
                    <br />
                    JFK 공항에 도착했는데, 어떻게 맨하탄까지 가지? 고민이신 분들을 위해
                    <br />
                    ​오 늘 은! 공항 셔틀버스 + 에어트레인 + 지하철을 타고 JFK 공항에서 맨하탄까지
                    이동하는 방법을
                    <br />
                    알려드릴 거예요.
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
                    src={staticFiles.images.여행정보_destination4}
                  />
                </a>
              </div>
              <div className="p-8 bg-white shadow-sm rounded-b-3xl w-full">
                <h1 className="mb-4 font-bold">뉴욕 여행의 시작 타임스퀘어에 위치</h1>
                <div>
                  <p>
                    뉴욕 여행 계획하시는 분 들! 을 위한 꿀 팁 및 주의사항을 정리해 왔어요
                    <br />
                    ​뉴욕 여행하기 전 반드시 알아야 할 내용들이니 여행 전 꼭 읽어주세요❗
                    <br />
                    지금까지도 빈번하게 일어나는 택시 사기! 특히나 공항에서 꾸준히 발생한답니다!
                    <br />
                    장시간 비행으로 지친 여행객들을 대상으로 공항 직원인 척 택시로 인도, 환율 높여
                    가격 책정, 톨게이트 비 부과 등 다양한 방법으로 여행객들에게 돈을 요구한답니다💸
                    <br />
                    뉴욕 하면 떠오르는 노란 택시인 yellow taxi! 탑승을 원하신다면 공항에서 지정한
                    택시 승강장으로 가시면 됩니다🚕 (맨해튼의 어떤 지역이든 $52 고정요금 +톨게이트비
                    +15~20% 팁)
                    <br />
                    반드시 승차 전에 정확한 가격을 확인하고 출발하세요!
                    <br />
                    ​우버 또는 리프트를 탑승하는 방법도 있답니다!
                    <br />
                    앱 설치를 미리 한 뒤 공항 도착 직후 부르는 것이 가장 좋지만, 우버 리프트라고
                    항상 안전한 것은 아니랍니다!
                    <br />
                    ​자신이 예약한 택시가 맞는지 반드시 차량 번호를 확인하고 탑승하세요❗
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
