import { staticFiles } from "../../shared";
import { SpaceY } from "../../shared/components/Utils";
import { ServiceCard, ServiceCardProps } from "./components/ServiceCard";
import { CartView } from "../cart/CartView";

const firstRowServices: ServiceCardProps[] = [
  {
    title: "무료 짐 보관 서비스",
    description:
      "빅애플패스 1매당 2개까지 맡기신 날과 다음 날까지 영업시간 내에 무료로 보관해 드립니다. 무거운 짐은 타미스에 맡기고 가벼운 여행을 즐기세요!",
    icon: staticFiles.images.about_free,
  },
  {
    title: "타미스 라운지 제공",
    description:
      "세계의 중심 타임스퀘어 위치한 타미스 타임스퀘어 라운지! 생수, 커피, 티, 와이파이, 핸드폰 충전, 문서 출력, 전화, 인터넷 등 모두 무료로 사용할 수 있을 뿐 아니라 여행에 꼭 필요한 정보들까지!  라운지에서 편하게 즐겨보세요!",
    icon: staticFiles.images.about_tamice,
  },
  {
    title: "ONE-STOP 서비스",
    description:
      "뉴욕 여행에 관한 모든 건 타미스에서 한 번에 완료! 교통카드, 유심, 뮤지컬 예약, 각종 투어 예약까지 발품 팔지 말고 타미스에서 한 번에 해결하세요.",
    icon: staticFiles.images.about_service,
  },
  {
    title: "안심 직거래",
    description:
      "브로커를 통해서 입장권을 구매하는 것이 아닌, 관광지 업체들과의 직접적인 계약을 체결한 타미스의 상품들은 믿고 사용하실 수 있습니다. 문제가 발생하더라도 빠른 처리로 고객님의 편안한 여행을 도와드릴 수 있습니다. ",
    icon: staticFiles.images.about_safe,
  },
];

// const secondRowServices: ServiceCardProps[] = [
//   {
//     title: "무료 짐 보관 서비스",
//     description:
//       "정신없는 뉴욕 거리, 무거운 짐 없이 홀가분하게 여행하세요! MTA 교통카드를 제외한 타미스 이용 고객은 영업시간에 한하여 무료 짐 보관이 가능합니다. (1인 1회, 최대 2개, 2일: 짐 맡긴 다음날 영업시간 전까지, 일행 및 타인에게 양도 불가)",
//     icon: staticFiles.icons.shopping_bag,
//   },
//   {
//     title: "타미스 라운지 제공",
//     description:
//       "타미스 고객이 더욱 특별한 이유 바로 타미스 라운지! 생수, 커피, 티, 와이파이, 프린트, 전화 등을 모두 무료 사용할 수 있을 뿐 아니라 맛집, 쇼핑 정보, 쏠쏠한 할인 쿠폰들까지! 타미스를 통해 VIP 여행하세요.",
//     icon: staticFiles.icons.coffee,
//   },
//   {
//     title: "완벽한 자유여행을 위한 ONE-STOP 서비스",
//     description:
//       "뉴욕 여행에 관한 모든 건 타미스에서 한 번에 완료! 교통카드, 유심칩, 뮤지컬 예약, 각종 투어 예약까지 발품 팔지 말고 타미스에서 한 번에 해결하세요.",
//     icon: staticFiles.icons.call,
//   },
//   {
//     title: "통역 서비스",
//     description:
//       "여행 중 발생할 수 있는 크고 작은 각종 사고, 민원 등을 가족과 같은 마음으로 최대한 도와드립니다.",
//     icon: staticFiles.icons.translation,
//   },
// ];
const rowSectionClass2 = "flex w-full flex-col md:flex-row items-center md:items-start";
const infoContainerClass = "font-poppins text-darkGray flex flex-col mb-5 h-1/2";

export const AboutView = () => {
  const rowSectionClass = "flex w-full justify-center flex-col md:flex-row gap-2";
  return (
    <div className="min-h-[600px] flex flex-col items-center pt-[5vh] pb-[20vh] w-full">
      <SpaceY />
      <div className={rowSectionClass}>
        <span className="flex justify-center text-2xl font-bold grow font-volkhov text-dark">
          Why Tamice?!
        </span>
      </div>
      {/* <SpaceY /> <SpaceY /> */}
      {/* <div className={rowSectionClass}>
        <span className="font-poppins text-darkGray">
          Choose from our comprehensive list of guided, sightseeing, and family New York tours. We
          also offer group and corporate rates!
        </span>
      </div> */}
      <SpaceY />
      <SpaceY />
      <div className={`${rowSectionClass}`}>
        {firstRowServices.map((s) => (
          <ServiceCard {...s} />
        ))}
      </div>
      {/* <SpaceY />
      <SpaceY />
      <SpaceY /> */}
      {/* <div className={rowSectionClass}>
        <span className="flex justify-center text-2xl font-bold grow font-volkhov text-dark">
          Customer Service
        </span>
      </div> */}
      {/* <SpaceY />
      <SpaceY />
      <SpaceY /> */}
      {/* <div className={`${rowSectionClass}`}>
        {secondRowServices.map((s) => (
          <ServiceCard {...s} />
        ))}
      </div> */}
      <div className="min-h-[600px] flex flex-col items-center pt-[5vh]">
        <SpaceY />
        <div className={rowSectionClass2}>
          <div className="hidden md:flex md:w-1/3" />
          <span className="flex justify-center w-full text-2xl font-bold font-volkhov text-dark">
            Contact Us
          </span>
          <div className="flex flex-col items-end w-1/2 md:w-1/3">
            <a href="https://pf.kakao.com/_AAelu" target="_blank" rel="noopener noreferrer">
              <img
                width="40"
                src={staticFiles.icons.messages_bubble}
                alt="message"
                className="text-red-500"
              />
            </a>
            <span className="mt-2 text-xs font-poppins text-darkGray">
              <a
                href="https://pf.kakao.com/_AAelu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ffcd00] text-sm"
              >
                카톡 상담원 채팅
              </a>
            </span>
            <span className="mt-1 text-xs font-poppins text-darkGray">
              (매일 9:00 AM ~ 6:00 PM, 7:00 PM ~ 5:00 AM)
            </span>
            <span className="mt-1 text-xs font-poppins text-darkGray">(미동부시간 기준)</span>
          </div>
        </div>
        <SpaceY /> <SpaceY />
        <div className={rowSectionClass2}>
          <div className="flex flex-col w-full grow sm:w-2/3">
            <div className={infoContainerClass}>
              <span className="font-medium"> 이메일:</span>
              <span>service@tamice.com</span>
            </div>
            <div className={infoContainerClass}>
              <span className="font-medium">Tamice Address: </span>
              <span>151 West 46th Street, Suite 1002, New York, NY 10036</span>
            </div>
          </div>
          <div className="flex flex-col w-full grow sm:w-2/3">
            <div className={infoContainerClass}>
              <span className="font-medium">뉴욕 타임스퀘어 라운지:</span>
              <span>전화번호: 646-684-4848</span>
              <span>
                운영시간 (미동부시간 기준) 월 ~ 금요일: 9:00 AM ~ 6:00 PM, 토 ~ 일요일: 10:00 AM ~
                6:00 PM
              </span>
            </div>
            <div className={infoContainerClass}>
              <span className="font-medium">한국 지사: </span>
              <span>전화번호: 02-336-4480 </span>
              <span>
                운영시간 (한국시간 기준) 월 ~ 금요일: 9:00 AM ~ 6:00 PM, 토 ~ 일요일: 10:00 AM ~
                5:00 PM <br />
                법정공휴일 휴무
              </span>
            </div>
          </div>
        </div>
        <SpaceY />
        <SpaceY />
        <div className={rowSectionClass2}>
          <hr className="w-full my-3 border rounded border-gray" />
        </div>
        <SpaceY />
        <SpaceY />
        <div className={rowSectionClass2}>
          <span className="block text-xl font-bold font-volkhov text-dark md:hidden">
            타미스 오피스 찾아 오시는 길
          </span>
          <div className="flex flex-col w-full grow sm:w-2/3 md:pr-10">
            <img src={staticFiles.images.contact_location} />
          </div>
          <div className="flex flex-col w-full grow sm:w-2/3">
            <span className="hidden text-xl font-bold font-volkhov text-dark md:block text-[20px]">
              타미스 오피스 찾아 오시는 길
            </span>
            <SpaceY />
            <SpaceY />
            <span className="font-poppins">
              타미스 오피스는 맨하튼의 중심 타임스퀘어에 위치해 있습니다.
            </span>{" "}
            <SpaceY />
            <span className="font-poppins">
              46th Street 선상 6th와 7th Avenue사이에 있으며 7th Avenue와 더 가깝습니다
            </span>{" "}
            <SpaceY />
            <span className="font-poppins">
              지하철Times SQ 42 Street역 (1, 2, 3, 7, N, Q, R, W, S 라인), 47-50 Street Rockefeller
              Center 역(B, D, F, M라인) 에서 근접하며, 타임스퀘어 중심인 빨간계단 부근 “Havana
              Central” 레스토랑 바로 옆 151 W 라고 쓰여진 입구로 들어와 10층으로 올라오시면 됩니다.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
