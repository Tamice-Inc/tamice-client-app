import { useNavigate } from "react-router-dom";
import { staticFiles } from "..";
import { MainButton } from "./Buttons";
import { SpaceY } from "./Utils";

export type ProductCardProps = {
  deluxPrice: number;
  id: string;
  name: string;
  kr_name: string;
  image: string;
  card_image?: string;
  isPremium: boolean;
  availability: string;
  adultPrice: number;
  adultSitePrice: number;
  childPrice: number;
  childSitePrice: number;
  childNote: string;
  additional_price_amount?: string;
  additional_price_image?: any;
  additional_price_type?: string;
  ticket_type?: string;
  announcement?: string;
  ticket_sent_status?: string;
  premiumPrice: number;
  premiumSPrice: number;
  description: string;
  ageLimit?: any;
  cityId: number;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  adultPrice,
  adultSitePrice,
  availability,
  childNote,
  childPrice,
  childSitePrice,
  name,
  kr_name,
  image,
  card_image,
  isPremium,
  id,
  additional_price_type,
  ticket_type,
  premiumPrice,
  premiumSPrice,
  ageLimit,
}) => {
  const navigate = useNavigate();
  let premiumStyle = "bg-orange-400";
  let title = "";
  let opacity = 0.9;
  if (additional_price_type === "None") {
    opacity = 0;
  } else if (additional_price_type === "Premium") {
    premiumStyle = "bg-orange-400";
    adultPrice = Number(adultPrice);
    // adultPrice = Number(adultPrice) + Number(premiumPrice);
    childPrice = Number(childPrice);
    // childPrice = Number(childPrice) + Number(premiumPrice);
    title = "Premium";
  } else if (additional_price_type === "Premium S") {
    premiumStyle = "bg-purple-400";
    adultPrice = Number(adultPrice);
    // adultPrice = Number(adultPrice) + Number(premiumSPrice);
    childPrice = Number(childPrice);
    // childPrice = Number(childPrice) + Number(premiumSPrice);
    title = "Premium S";
  }  else if (additional_price_type === "Deluxe") {
    premiumStyle = "bg-deluxBLue";
    adultPrice = Number(adultPrice);
    // adultPrice = Number(adultPrice) + Number(premiumSPrice);
    childPrice = Number(childPrice);
    // childPrice = Number(childPrice) + Number(premiumSPrice);
    title = "Deluxe";
  }

  return (
    
    <>
    
      {/* mobile version  */}
      <div className="flex flex-col w-full px-4 py-4 bg-white sm:hidden gap-x-8">
        <div className="flex items-center h-[300px]  relative">
          {/* <img className="object-cover h-full" src={image} /> */}
          <img alt="" className="sm:h-[667px] sm:w-[660px] h-[100%] w-[100%]" src={image} />
          {card_image && <img alt="" className="absolute top-0 right-0 h-[45px] w-[65px]" src={card_image} />}
          <div
            className={`absolute p-3 text-sm text-white top-[0px] ${premiumStyle}`}
            style={{ opacity }}
          >
            {title}
          </div>
        </div>
        <SpaceY />
        <span className="text-dark">{kr_name}</span>
        <SpaceY />
        <div className="flex flex-col w-full font-poppins gap-y-4">
          {ticket_type === "SIM card" && (
            <div>
              <span className="mr-2 text-sm font-poppins text-gray">Sim 가격</span>
              <span className="text-xl font-poppins text-[#5D5D5F]">${adultPrice}</span>
            </div>
          )}
          {ticket_type !== "SIM card" && Number(adultPrice) !== 0 ? (
            <div>
              <span className="mr-2 text-sm font-poppins text-gray">성인 가격</span>
              <span className="text-xl font-poppins text-[#5D5D5F]">${adultPrice}</span>
            </div>
          ) : (
            <></>
          )}
          {ticket_type !== "SIM card" && Number(childPrice) !== 0 ? (
            <div>
              <span className="mr-2 text-sm font-poppins text-gray">아동 가격</span>
              <span className="text-xl font-poppins text-[#5D5D5F]">${childPrice}</span>
            </div>
          ) : (
            <></>
          )}

          {ticket_type === "SIM card" && (
            <div className="flex flex-col gap-y-4">
              <div className="flex gap-x-3 text-[#5D5D5F]">
                <img alt="" width={18} src={staticFiles.icons.sim_card} />
                <div className="flex flex-col">
                  <span className="text-sm text-[#5D5D5F]">sim 현장 가격: ${adultSitePrice}</span>
                </div>
              </div>
            </div>
          )}

          {ticket_type !== "SIM card" && Number(adultPrice) !== 0 ? (
            <div>
              <SpaceY />

              <div className="flex gap-x-3 text-[#5D5D5F]">
                <img alt="" width={18} src={staticFiles.icons.card_adult} />
                <div className="flex flex-col">
                  <span className="text-sm text-[#5D5D5F]">
                    성인 현장 판매가: ${adultSitePrice}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}

          {ticket_type !== "SIM card" && Number(childPrice) !== 0 ? (
            <div>
              <div className="flex gap-x-3">
                <img alt="" width={18} src={staticFiles.icons.card_baby} />
                <span className="text-sm text-[#5D5D5F]">
                  아동 현장 판매가: ${childSitePrice}
                </span>
                <span className="text-sm text-[#5D5D5F]">{childNote}</span>
              </div>

              <div className="ml-[30px]">
                {ageLimit ? (
                  <div className="text-sm text-[#5D5D5F] font-semibold">{`만 ${ageLimit} 세 이하 무료`}</div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <SpaceY />
        <MainButton
          text="자세히 보기"
          onClick={() => navigate(`/product-detail/${id}`)}
          containerClassName="w-full text-base h-12"
        />
      </div>

      {/* web version */}
    
      <div className="justify-between hidden w-full py-8 bg-white sm:flex gap-x-4 rounded-b-3xl">
     
        <div
          className="w-1/4 flex items-center justify-center
         max-w-[400px] relative mx-4"
        >
          {/* <img className="object-cover h-full" src={image} /> */}
          <div className="relative">
            <img alt="" className="object-cover h-56 w-96" src={image} />
            {card_image && <img alt="" className="absolute top-0 right-0 h-[45px] w-[65px]" src={card_image} />}
            <div
              className={`absolute p-3 text-sm text-white top-[0px] ${premiumStyle}`}
              style={{ opacity }}
            >
              {/* <div className="absolute" style={{ borderRightColor: premiumStyle}}> */}
              {title}
              {/* </div> */}
            </div>
          </div>
        </div>
        <div className="relative flex flex-col w-4/12 mx-4 font-poppins gap-y-3">
          <span className="text-xl text-[#5D5D5F]">{kr_name}</span>
          <SpaceY />
          <div className="flex gap-x-3 text-[#5D5D5F]">
            <img className="fill-black" alt="" width={18} src={staticFiles.icons.volume_high} />
            <span className="text-sm text-darkGray">{availability}</span>
          </div>
          {ticket_type === "SIM card" && (
            <div className="flex gap-x-3 text-[#5D5D5F]">
              <img alt="" width={18} src={staticFiles.icons.sim_card} />
              <div className="flex flex-col">
                <span className="text-sm text-[#5D5D5F]">Sim 현장 가격: ${adultSitePrice}</span>
              </div>
            </div>
          )}
          {ticket_type !== "SIM card" && Number(adultPrice) !== 0 ? (
            <div className="flex gap-x-3 text-[#5D5D5F]">
              <img alt="" width={18} src={staticFiles.icons.card_adult} />
              <div className="flex flex-col">
                <span className="text-sm text-[#5D5D5F]">성인 현장 판매가: ${adultSitePrice}</span>
              </div>
            </div>
          ) : (
            <></>
          )}

          {ticket_type !== "SIM card" && Number(childPrice) !== 0 ? (
            <div>
              <div className="flex gap-x-3">
                <img alt="" width={18} src={staticFiles.icons.card_baby} />
                <span className="text-sm text-[#5D5D5F]">
                  아동 현장 판매가: ${childSitePrice}
                </span>
                <span className="text-sm text-[#5D5D5F]">{childNote}</span>
              </div>

              <div className="ml-[30px]">
                {ageLimit ? (
                  <div className="text-sm text-[#5D5D5F] font-semibold">{`만 ${ageLimit} 세 이하 무료`}</div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="flex flex-col items-center justify-center border-l border-gray gap-y-7"></div>
        <div className="flex flex-col items-center justify-center w-1/4 px-4 border-gray gap-y-7">
          {ticket_type === "SIM card" && (
            <div>
              <span className="mr-2 text-sm font-poppins text-gray">Sim 가격</span>
              <span className="text-xl font-poppins text-[#5D5D5F]">${adultPrice}</span>
            </div>
          )}
          {ticket_type !== "SIM card" && Number(adultPrice) !== 0 ? (
            <div>
              <span className="mr-2 text-sm font-poppins text-gray">성인 가격</span>
              <span className="text-xl font-poppins text-[#5D5D5F]">${adultPrice}</span>
            </div>
          ) : (
            <></>
          )}
          {ticket_type !== "SIM card" && Number(childPrice) !== 0 ? (
            <div>
              <span className="mr-2 text-sm font-poppins text-gray">아동 가격</span>
              <span className="text-xl font-poppins text-[#5D5D5F]">${childPrice}</span>
            </div>
          ) : (
            <></>
          )}
          <MainButton
            text="자세히 보기"
            onClick={() => navigate(`/product-detail/${id}`)}
            containerClassName="w-full text-base h-12"
          />
        </div>
        <div className="flex flex-col items-center justify-center"></div>
      </div>
    </>
  );
};


