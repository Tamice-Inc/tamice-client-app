import { staticFiles } from "../../../shared";
import { SpaceY } from "../../../shared/components/Utils";

export const BookBanner = () => {
  return (
    <div className="sm:w-[524px] flex flex-col my-20 min-w-[250px] items-center">
      <div className="flex flex-col gap-8 w-[350px] sm:w-[524px] md:w-[524px] lg:w-[795px] custom_mobile:w-[1060px] lg:flex-row">
        <div className="flex flex-col w-full xl:w-1/2">
          <span className="font-medium font-poppins text-dark px-2 min-[430px]:p-0 text-sm ">
            쉽고 빠르게 입장지를 예약하세요!
          </span>
          <span className="font-bold font-volkhov text-dark px-2 min-[430px]:p-0 min-[450px]:text-2xl text-xl ">
            빅애플패스 구매 / 이용 방법
          </span>
          <SpaceY />

          {activities.map((item,i) => (
            <Activity key={i} {...item} />
          ))}
        </div>
        <div className="flex items-center justify-end w-full display xl:w-1/2">
          <div
            className="bg-white min-[430px]:rounded-xl flex 
           w-full h-[300px] min-[430px]:h-[400px] drop-shadow-xl overflow-hidden justify-center items-center"
          >
            {" "}
            <a href="https://blog.naver.com/tamice/223410003110" target="_blank">
              <img src={staticFiles.images.main_page_slide} className="object-center" />
              <span className=" font-poppins text-darkGray rounded-2xl sm:display px-2 border-white border-[1px] absolute bottom-4 right-4 sm:bottom-6 sm:right-6 text-white text-[12px] sm:text-[14px]">
                보러가기
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const activities: ActivityProps[] = [
  {
    title: "원하시는 입장지를 패스로 묶어서 저렴하게!",
    text: "많이 담을수록 저렴해지는 빅애플패스로 알찬 미국여행을 계획해 보세요",
    icon: staticFiles.icons.activity_1,
  },
  {
    title: "티켓 수령은 마이페이지에서 편리하게!",
    text: "구매하신 입장지 티켓은 마이페이지에서 원하실 때 다운로드 받으실 수 있습니다.",
    icon: staticFiles.icons.activity_2,
  },
  {
    title: "고객의 마음에 쏙 드는 환불과 입장지 변경!",
    text: "예약 전, 다운로드 전에는 원하시는 대로 입장지 추가, 환불, 변경이 가능합니다.",
    icon: staticFiles.icons.activity_3,
  },
];

type ActivityProps = { title: string; text: string; icon: string };

const Activity: React.FC<ActivityProps> = ({ icon, text, title }) => (
  <div className="flex mt-8">
    <img src={icon} />
    <div className="flex flex-col ml-4 gap-y-1">
      <span className="text-sm font-medium font-poppins">{title}</span>
      <span className="text-sm font-poppins">{text}</span>
    </div>
  </div>
);
