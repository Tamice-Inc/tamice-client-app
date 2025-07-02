import { staticFiles } from "../../shared";
import { SpaceY } from "../../shared/components/Utils";

export const ContactView = () => {
  const rowSectionClass =
    "flex w-full flex-col md:flex-row items-center md:items-start";
  const infoContainerClass =
    "font-poppins text-darkGray flex flex-col mb-5 h-1/2";
  return (
    <div className="min-h-[600px] flex flex-col items-center pt-[5vh] pb-[20vh] w-full">
      <SpaceY />
      <div className={rowSectionClass}>
        <div className="hidden md:flex md:w-1/3" />
        <span className="flex justify-center w-1/2 text-2xl font-bold md:w-1/3 font-volkhov text-dark">
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
            <a href="https://pf.kakao.com/_AAelu" target="_blank" rel="noopener noreferrer" className="text-[#ffcd00] text-sm">카톡 상담원 채팅</a>

          </span>
          <span className="mt-1 text-xs font-poppins text-darkGray">
            (월-일요일 오전 9:00 ~ 오후 6:00)
          </span>
        </div>
      </div>
      <SpaceY /> <SpaceY />
      <div className={rowSectionClass}>
        <div className="flex flex-col w-1/2 grow">
          <div className={infoContainerClass}>
            <span className="font-medium">Contact:</span>
            <span>service@tamice.com</span>
          </div>
          <div className={infoContainerClass}>
            <span className="font-medium">tamice Address: </span>
            <span>151 West 46th Street, Suite 1002, New York, NY 10036</span>
          </div>
        </div>
        <div className="flex flex-col w-1/2 grow">
          <div className={infoContainerClass}>
            <span className="font-medium">NY Office:</span>
            <span>뉴욕 본사: 646-684-4848</span>
            <span>
              월-토요일 오전 9:00 - 오후 6:00일요일 오전 11:00 - 오후 6:00(미
              동부 시간 기준)
            </span>
          </div>
          <div className={infoContainerClass}>
            <span className="font-medium">Korea Office: </span>
            <span>한국 지사: 1800-6991 </span>
            <span>
              월-금요일 오전 9:00 ~ 오후 6:00(한국 시간 기준, 토, 일요일 및
              공휴일 휴무)
            </span>
          </div>
        </div>
      </div>
      <SpaceY />
      <SpaceY />
      <div className={rowSectionClass}>
        <hr className="w-full my-3 border rounded border-gray" />
      </div>
      <SpaceY />
      <SpaceY />
      <div className={rowSectionClass}>
        <span className="block mb-8 text-xl font-bold font-volkhov text-dark md:hidden md:mb-0">
          타미스 오피스 찾아 오시는 길
        </span>
        <div className="flex flex-col grow w-1/2 md:pr-10 min-w-[350px]">
          <img src={staticFiles.images.contact_location} />
        </div>
        <div className="flex flex-col w-1/2 grow">
          <span className="hidden text-xl font-bold font-volkhov text-dark md:block">
            타미스 오피스 찾아 오시는 길
          </span>
          <SpaceY />
          <SpaceY />
          <span className="font-poppins">
            • 타미스 오피스는 맨하튼의 중심 타임스퀘어에 위치해 있습니다.
          </span>{" "}
          <SpaceY />
          <span className="font-poppins">
            • 46th Street 선상 6th와 7th Avenue사이에 있으며 7th Avenue와 더
            가깝습니다
          </span>{" "}
          <SpaceY />
          <span className="font-poppins">
            • 지하철Times SQ 42 Street역 (1, 2, 3, 7, N, Q, R, W, S 라인), 47-50
            Street Rockefeller Center 역(B, D, F, M라인) 에서 근접하며,
            타임스퀘어 중심인 빨간계단 부근 “Havana Central” 레스토랑 바로 옆
            151 W 라고 쓰여진 입구로 들어와 10층으로 올라오시면 됩니다.
          </span>
        </div>
      </div>
    </div>
  );
};
