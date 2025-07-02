import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import moment from "moment";

import { PUBLIC_URL, staticFiles } from "../../shared";
import { SpaceY } from "../../shared/components/Utils";
import { Calendar } from "../../shared/components/Calendar";
import { useGetTicket } from "../../shared/hooks";
import { ShowBuyDetail } from "../musicals_and_shows/components/ShowBuyDetail";

export const ShowDetailView = () => {
  // Get id from the given url params
  let { id } = useParams();

  // Define Component State variables
  const [value, onChange] = useState(new Date());

  // Fake Product Data
  const productFakeData = {
    name: "The Lion King [라이온킹]",
    tourDetail:
      "엠파이어 스테이트 빌딩은 세계에서 가장 유명한 건물로 뉴욕에 있는 상징적인 건물 입니다. 전망대에 오르면 뉴욕의 전경을 한 눈에 담을 수 있고, 날씨가 좋은 날에는 미국 동부의 6개 주를 보실 수 있습니다. 전망대 뿐만 아니라 엠파이어 스테이트 빌딩이 구상된 당시부터 지금까지의 스토리를 담은 박물관도 경험하실 수 있습니다. 관광객의 안전과 편리함을 최우선으로 생각하고 있는 엠파이어 스테이트 빌딩은 한국어가 포함된 9개의 언어로 설명을 들을 수 있는 애플리케이션을 제공하고 있으며, 건물 전체에 무료 와이파이도 제공할 수 있습니다.매일매일 운영하고 있는 엠파이어 스테이트 빌딩 전망대는 뉴욕의 핵심 관광지인 타임스퀘어와 도보거리에 위치하고 있으며 빌딩 주변에는 메이시스 백화점, 메디슨 스퀘어 가든, 펜스테이션 등 쇼핑, 공연, 대중교통을 함께 이용할 수 있는 곳들이 있습니다.",
  };

  // Get ticket from useGetTicket with API call
  const { ticket } = useGetTicket();

  // Create a navigate instance from useNavigate
  const navigate = useNavigate();

  // Function to check auth Token expiration
  const checkTokenExpiration = () => {
    const token = localStorage.getItem("authToken");

    if (token) {
      const decodedToken: any = jwtDecode(token);

      const currentTime = Date.now() / 1000; // Convert current time to seconds

      if (decodedToken.exp < currentTime) {
        // Token has expired, force logout here
        // For example, clear the token from local storage and redirect the user to the login page
        localStorage.removeItem("authToken");
        localStorage.removeItem("loginData");
        localStorage.removeItem("order_number");
        localStorage.removeItem("useremail");

        navigate("/");
      }
    }
  };

  // Defein useEffect Hooks
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  useEffect(() => {
    const intervalId = setInterval(checkTokenExpiration, 1000); // Check token expiration every second
    return () => clearInterval(intervalId); // Clear the interval when the component unmounts
  }, []);

  return (
    ticket && (
      <div className="w-full pb-[10vw] flex">
        <div className="flex flex-col w-2/3">
          <SpaceY />
          <SpaceY />
          <div className="w-full text-xl font-bold font-volkhov">{ticket.title_kr}</div>
          <SpaceY />
          <SpaceY />
          <div className="flex w-full text-xl font-poppins" id="detail">
            <img width={25} src={staticFiles.icons.paper} className="mr-5" />
            Details
          </div>
          <SpaceY />
          <div className="w-full font-poppins">{productFakeData.tourDetail}</div>
          <SpaceY />
          <SpaceY />
          <hr className="w-full border rounded border-gray" />
          <SpaceY />
          <SpaceY />
          <div className="flex w-full text-xl font-poppins">
            <img width={25} src={staticFiles.icons.disposition} className="mr-5" />
            Calendar / Seating Location & Ticket Price
          </div>
          <SpaceY />
          <SpaceY />
          <Calendar
       
            dates={[
              moment().add(1, "day").toDate(),
              moment().add(1, "day").add(1, "hour").toDate(),
            ]}
          />

          <SpaceY />
          <SpaceY />
          <hr className="w-full border rounded border-gray" />
          <SpaceY />
          <SpaceY />
          <div className="flex w-full text-xl font-poppins">
            <img width={25} src={staticFiles.icons.disposition} className="mr-5" />
            Seating Chart
          </div>
          <SpaceY />
          <SpaceY />
          <div>
            <img src={`${PUBLIC_URL}/fake/fake_seat_disposition.png`} />
          </div>
          <SpaceY />
          <SpaceY />
          <hr className="w-full border rounded border-gray" />
          <SpaceY />
          <SpaceY />
          <div className="flex w-full text-xl font-poppins">
            <img width={25} src={staticFiles.icons.clock} className="mr-5" />
            Business Hour
          </div>
          <SpaceY />
          <div className="flex w-full">
            <div className="w-1/5" />
            <div className="flex flex-col w-4/5 text-sm font-poppins">
              <span className="">주소</span>
              <span className="">20 W 34th St, New York, NY 10001</span>
              <SpaceY />
              <span className="">운영시간 </span>
              <span className="">
                매일 오전 10:00 ~ 오후 10:00 (마지막 입장시간 오후 7:45) 선셋 시간
              </span>
              <span className="">1월 8일 ~ 1월 21일: 오후 3:15 ~ 오후 5:00</span>
              <span className="">1월 22일 ~ 2월 2일: 오후 3:30 ~ 오후 5:15</span>
              <span className="">2월 3일 ~ 2월 14일: 오후 3:45 ~ 오후 5:30</span>
              <span className="">2월 15일 ~ 2월 27일: 오후 4:00 ~ 오후 5:45</span>
              <span className="">2월 28일 ~ 3월 12일: 오후 4:15 ~ 오후 6:00</span>
              <span className="">3월 13일 ~ 3월 27일: 오후 5:30 ~ 오후 7:15</span>
              <SpaceY />
              <span className="">공식 홈페이지</span>
            </div>
          </div>
          <SpaceY />
          <SpaceY />
          <hr className="w-full border rounded border-gray" />
          <SpaceY />
          <SpaceY />
          <div className="flex w-full text-xl font-poppins">
            <img width={25} src={staticFiles.icons.info} className="mr-5" id="how-to" />
            이용방법 (How To)
          </div>
          <SpaceY />
          <div className="flex w-full">
            <div className="w-1/5" />
            <div className="flex flex-col w-4/5 text-sm font-poppins">
              <span className="">타미스 웹사이트에서 구매하기를 완료해 주세요.</span>
              <span className="">
                구매 시 기재하신 이메일로 발송되는 구매 완료 이메일을 확인해 주세요.
              </span>
              <span className="">
                방문 희망 날짜와 시간, 대표자 영문 성함을 타미스 카카오톡 채널 및 이메일로
                요청하시면 E-티켓을 발송해 드립니다.
              </span>
              <span className="">E-티켓에 있는 예약날짜와 시간에 맞춰 방문해 주세요.</span>
              <span className="">
                선셋타임 입장을 원하시는 경우에는 1인당 $10의 금액을 지불하시고 이용하실 수
                있습니다.
              </span>
            </div>
          </div>
          <SpaceY />
          <SpaceY />
          <hr className="w-full border rounded border-gray" />
          <SpaceY />
          <SpaceY />
          <div className="flex w-full text-xl font-poppins">
            <img width={25} src={staticFiles.icons.info} className="mr-5" />
            유의사항 (Notice)
          </div>
          <SpaceY />
          <div className="flex w-full">
            <div className="w-1/5" />
            <div className="flex flex-col w-4/5 text-sm font-poppins">
              <span className="">
                구매 시 기재하신 이메일로 E-티켓이 발송됩니다. 반드시 방문 전에 E-티켓을 확인하시고
                확인이 불가능할 경우 타미스 카카오톡 채널 또는 이메일 (service@tamice.com) 로 문의해
                주세요.
              </span>
              <span className="">
                운영시간은 시기나 특정 기념일에 따라 변경될 수 있으니 방문 전에 반드시 공식
                홈페이지에서 확인해 주세요.
              </span>
              <span className="">
                해당 E-티켓은 1회 입장만 가능하며, 재사용은 불가능 합니다. 입장 후 관람 시간의
                제한은 없습니다.
              </span>
              <span className="">
                선셋타임 입장을 원하시는 경우에는 현장에서 1인당 $10의 금액을 지불하시고 이용하실 수
                있습니다.
              </span>
              <span className="">86층 전망대까지 이용 가능한 티켓입니다. </span>
            </div>
          </div>
          <SpaceY />
          <SpaceY />
          <hr className="w-full border rounded border-gray" />
          <SpaceY />
          <SpaceY />
          <div className="flex w-full text-xl font-poppins" id="refund">
            <img width={25} src={staticFiles.icons.refund} className="mr-5" />
            취소 및 환불규정 (Refund Policy)
          </div>
          <SpaceY />
          <div className="flex w-full">
            <div className="w-1/5" />
            <div className="flex flex-col w-4/5 text-sm font-poppins">
              <span className="">
                날짜/시간 예약 요청이 완료된 티켓은 환불/변경이 불가능합니다.
              </span>
              <span className="">
                날짜/시간 예약 요청을 하지 않은 티켓에 한해서 환불/변경이 가능합니다.
              </span>
              <span className="">
                환불 문의 및 요청은 타미스 카카오톡 채널 또는 이메일(service@tamice.com)로 문의해
                주세요.
              </span>
              <span className="">환불 시 결제금액 혹은 차액의 6%의 취소수수료가 발생합니다.</span>
            </div>
          </div>
          <SpaceY />
          <SpaceY />
          <hr className="w-full border rounded border-gray" />
          <SpaceY />
          <SpaceY />
          <div className="flex w-full text-xl font-poppins" id="faq">
            <img width={25} src={staticFiles.icons.faq} className="mr-5" />
            FAQ
          </div>
          <SpaceY />
          <div className="flex w-full">
            <div className="w-1/5" />
            <div className="flex flex-col w-4/5 text-sm font-poppins">
              <span className="">
                구매 시 기재하신 이메일로 E-티켓이 발송됩니다. 반드시 방문 전에 E-티켓을 확인하시고
                확인이 불가능할 경우 타미스 카카오톡 채널 또는 이메일 (service@tamice.com) 로 문의해
                주세요.
              </span>
              <span className="">
                운영시간은 시기나 특정 기념일에 따라 변경될 수 있으니 방문 전에 반드시 공식
                홈페이지에서 확인해 주세요.
              </span>
              <span className="">
                해당 E-티켓은 1회 입장만 가능하며, 재사용은 불가능 합니다. 입장 후 관람 시간의
                제한은 없습니다.
              </span>
              <span className="">
                선셋타임 입장을 원하시는 경우에는 현장에서 1인당 $10의 금액을 지불하시고 이용하실 수
                있습니다.
              </span>
              <span className="">86층 전망대까지 이용 가능한 티켓입니다.</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-1/3">
          <div className="min-h-[500px]">
            <ShowBuyDetail />
          </div>
        </div>
      </div>
    )
  );
};
