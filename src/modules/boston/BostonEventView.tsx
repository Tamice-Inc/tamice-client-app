import { staticFiles } from "../../shared";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { SpaceY } from "../../shared/components/Utils";

export const BostonEventView = () => {
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
              보스턴 매력에 빠져 볼까요?
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
                    src={staticFiles.images.bos_event_1}
                  />
                </a>
              </div>
              <div className="p-8 bg-white shadow-sm rounded-b-3xl w-full">
                <h1 className="mb-4 font-bold">보스턴 이번 달 이벤트, 축제, 날씨 정보</h1>
                <div>
                  <p>
                    타미스입니다💙봄이 찾아온 4월입니다🌸 <br />
                    4월 보스턴 날씨와 이벤트에 대해 안내드립니다!
                    <br />
                    2024년 4월​ 보스턴 날씨 : 4월의 보스턴 날씨예요! <br />
                    낮 최고 기온이 대부분 10도~15도 안팎이네요. <br />
                    최저기온도 영하는 없지만 최저 10도 밑으로 보입니다☀️
                    <br />
                    꽃이 피는 4월인가 봅니다, 비 오는 날이 잦네요☔ <br />
                    뉴욕=서울의 날씨가 비슷하다 생각한다면 보스턴은 뉴욕에서 위로 3시간,
                    <br />
                    즉, 서울 날씨보다 3~5도 정도 낮다 생각하시면 돼요!
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-b-3xl md:flex-row w-full">
              <div className="flex justify-center bg-white shadow-sm rounded-b-3xl">
                <a
                  href="https://blog.naver.com/tamice/223403789715"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  <img
                    className="block max-h-[235px] min-w-[330px] md:min-h-[335px] max-w-[330px] md:min-w-[460px] h-auto p-6 cursor-pointer"
                    alt=""
                    src={staticFiles.images.bos_event_2}
                  />
                </a>
              </div>
              <div className="p-8 bg-white shadow-sm rounded-b-3xl w-full">
                <h1 className="mb-4 font-bold">보스턴 맛집 추천</h1>
                <div>
                  <p>
                    보스턴 맛집에 대해 알려드릴게요💙
                    <br /> ​보스턴하면 떠오르는 메뉴! 바로 오이스터죠🦪
                    <br />
                    오이스터부터 랍스터 롤, 해산물, 피자, 빵까지! 다양하게 알려드립니다💙
                    <br /> ​Neptune Oyster : 63 Salem St # 1, Boston, MA 02113
                    <br /> 질 좋기로 유명한 보스턴 굴! 정말 신선하답니다🦪🥹
                    <br /> Boston Sail Loft : 80 Atlantic Ave, Boston, MA 02110
                    <br /> 보스턴에서 Clam Chowders (클램차우더)로 유명한 Boston Sail Loft!
                    <br /> Picco : 513 Tremont St, Boston, MA 02116 <br />
                    인생 피자를 찾으신다면? 보스턴 Picco!
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-b-3xl md:flex-row w-full">
              <div className="flex justify-center bg-white shadow-sm rounded-b-3xl">
                <a
                  href="https://blog.naver.com/tamice/223403967883"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  <img
                    className="block max-h-[235px] min-w-[330px] md:min-h-[335px] max-w-[330px] md:min-w-[460px] h-auto p-6 cursor-pointer"
                    alt=""
                    src={staticFiles.images.bos_event_3}
                  />
                </a>
              </div>
              <div className="p-8 bg-white shadow-sm rounded-b-3xl w-full">
                <h1 className="mb-4 font-bold">보스턴 가 볼 만한 곳</h1>
                <div>
                  <p>
                    보스턴 가볼 만한 곳에 대해 소개해 드릴게요😉
                    <br />
                    보스턴은 미국의 역사와 문화의 중심지로 알려져 있답니다!
                    <br />
                    하버드 : Massachusetts Hall, Cambridge, MA 02138
                    <br />
                    세계적으로 유명한 대학, 하버드 대학교!
                    <br /> 하버드를 재학중인 재학생 캠퍼스 투어도 들을 수 있는데 따로 안내해
                    드릴게요
                    <br /> 보스턴 미술관 : 465 Huntington Ave, Boston, MA 02115
                    <br /> 미국 3대 미술관인 보스턴 미술관! 고대부터 중세, 현대의 문화까지
                    포괄적으로 다루고 있어 감상하기 좋았답니다
                    <br /> 퀸시 마켓 : 206 S Market St, Boston, MA 02109
                    <br /> 보스턴에 방문한다면 꼭 방문한다는 퀸시 마켓!
                    <br /> 무려, 1826년에 만들어진 마켓이랍니다
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-b-3xl md:flex-row w-full">
              <div className="flex justify-center bg-white shadow-sm rounded-b-3xl">
                <a
                  href="https://blog.naver.com/tamice/223403972714"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  <img
                    className="block max-h-[235px] min-w-[330px] md:min-h-[335px] max-w-[330px] md:min-w-[460px] h-auto p-6 cursor-pointer"
                    alt=""
                    src={staticFiles.images.bos_event_4}
                  />
                </a>
              </div>
              <div className="p-8 bg-white shadow-sm rounded-b-3xl w-full">
                <h1 className="mb-4 font-bold">보스턴 일정추천</h1>
                <div>
                  <p>
                    보스턴은 미국의 역사와 문화의 중심지로 알려져 있죠,
                    <br /> 타미스가 보스턴 1박2일 자유여행 일정 추천해 드립니다..💙
                    <br /> - Day1 :<br /> 📍보스턴 도착 - 브런치 - 퍼블릭 가든/공공 도서관/보스턴
                    미술관 - (선셋)뷰 보스턴 - 저녁
                    <br /> Day2 :<br /> 📍하버드 캠퍼스 투어 - 점심 - MIT 투어 - 퀸시 마켓 - 보스턴
                    크루즈
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
