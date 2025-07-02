import Carousel from "better-react-carousel";
import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { staticFiles } from "../../shared";
import { ServiceCard, ServiceCardProps } from "../about/components/ServiceCard";
import { cityIdState } from "../../App";

export const ProductsLayout: React.FC<{
  children: ReactNode;
  sectionTitle: string;
  sectionDescription: any;
}> = ({ children, sectionDescription, sectionTitle }) => {
  const [cityId] = cityIdState.useState();

  const location = useLocation();
  const [currentPath, setCurrentPath] = useState("");

  let sectionTitleContent = sectionTitle;
  let sectionDescriptionContent = sectionDescription;

  useEffect(() => {
    setCurrentPath(location?.pathname);
  }, [location]);

  console.log(currentPath, 'CURRENT PATH LINE 25')

  // Customise based on the route
  if (currentPath === "/ny/package-tour/ba-pass" && cityId === 1) {
    sectionTitleContent = "뉴욕 빅애플패스 이용방법";
    sectionDescriptionContent = (
      <div>
        <p>✅ 빅애플패스 빅2~빅12 중 원하는 상품을 선택하여 구매해 주세요.</p>
        <p>✅ 단품 구매 (빅1) 는 각 상품의 ‘자세히 보기’ 를 클릭하여 구매하실 수 있습니다.</p>
        <p>✅ 아동의 경우 입장지마다 무료 입장 가능한 연령 혹은 불가능 여부를 꼭 확인하시고 구매해 주세요.</p>
        <p>
          ✅ <img className="inline w-[20px] h-[20px]" src={staticFiles.icons.calendar} />
          달력 아이콘이 있는 상품은 클릭하여 날짜/시간을 지정해야 구매가 가능합니다.
        </p>
        <p>
          ✅ 달력 아이콘이 있는 상품은 클릭하여 날짜/시간을 지정해야 구매가 가능합니다.
        </p>
        <p>
          ✅ <img className="inline w-[18px] h-[18px]" src={staticFiles.icons.black_medal} />{" "}
          프리미엄: $9이 추가됩니다.
        </p>
        <p>
          ✅ <img className="inline w-[18px] h-[18px]" src={staticFiles.icons.gold_medal} />{" "}
          프리미엄S: $18이 추가됩니다.
        </p>
        {/* FOR DELUX TICKETS */}
        <p>
          ✅ <img className="inline w-[18px] h-[18px]" src={staticFiles.icons.blue_medal} />{" "}
          디럭스: 상품마다 추가 금액이 다릅니다. ($20 이상) 상품페이지를 꼭 확인해 주세요.
        </p>
        <p>✅ 한 빅애플패스 상품 내에서 입장지 중복선택은 불가능 합니다.</p>
      </div>
    );
  } else if (currentPath === "/ny/package-tour/city-pass" && cityId === 1) {
    sectionTitleContent = "뉴욕 시티패스";
    sectionDescriptionContent = "";
  } else if (currentPath === "/ny/package-tour/explore-pass" && cityId === 1) {
    sectionTitleContent = "뉴욕 익스플로러패스";
    sectionDescriptionContent = "";
  } else if (currentPath === "/ny/city-attractions/observations" && cityId === 1) {
    sectionTitleContent = "뉴욕 전망대";
    sectionDescriptionContent = (
      <div>
        <p>
          ✅ 탑오브더락, 서밋, 윈윌드, 엣지, 엠파이어 스테이트 빌딩까지! 뉴욕의 모든 전망대를
          타미스로 쉽고 빠르게 예약하세요!
        </p>
      </div>
    );
  } else if (currentPath === "/ny/city-attractions/museum-gallery" && cityId === 1) {
    sectionTitleContent = "뉴욕 미술관/박물관";
    sectionDescriptionContent = (
      <div>
        <p>
          ✅ 다양한 미술관, 박물관을 내 입맛대로 골라보는 재미! 뉴욕에서 꼭 가봐야하는 모마,
          메트로폴리탄 미술관 뿐만 아니라 타미스가 준비한 여러 미술관/박물관도 즐기실 수 있습니다.
        </p>
      </div>
    );
  } else if (currentPath === "/ny/city-attractions/rides-cruises" && cityId === 1) {
    sectionTitleContent = "뉴욕 크루즈";
    sectionDescriptionContent = (
      <div>
        <p>
          ✅ 세계를 향해 자유의 가치를 횃불처럼 밝히고 있는 여신! 자유의 여신상을 만나려면 크루즈를
          탑승해보세요! 마천루가 만들어내는 스카이라인도 허드슨 강을 따라 즐기실 수 있습니다.
        </p>
      </div>
    );
  } else if (currentPath === "/ny/city-attractions/activities" && cityId === 1) {
    sectionTitleContent = "뉴욕 액티비티";
    sectionDescriptionContent = (
      <div>
        <p>
          ✅ 센트럴파크에서 자전거도 타고 영화에서만 보던 스케이트를 타고 싶다면? 뉴욕의 여러 스포츠
          경기들도 타미스를 통해 만나보실 수 있어요!
        </p>
      </div>
    );
  } else if (currentPath === "/ny/city-attractions/bus" && cityId === 1) {
    sectionTitleContent = "뉴욕 버스투어";
    sectionDescriptionContent = (
      <div>
        <p>
          ✅ 2층버스를 타고 즐기는 맨하탄 한바퀴!, 맨하탄에서 핫하게 떠오르고 있는 더라이드도
          만나보세요.
        </p>
      </div>
    );
  } else if (currentPath === "/ny/city-attractions/airport" && cityId === 1) {
    sectionTitleContent = "JFK/뉴왁 공항셔틀";
    sectionDescriptionContent = (
      <div>
        <p>
          ✅ 공항에 도착했는데 어떻게 가야할까? 여러 방법이 있지만 가장 효율적이고 가성비 좋은
          타미스 공항셔틀을 이용하세요!{" "}
        </p>
        <p>
          ✅ 한국에서 출발한 대한항공/아시아나/에어프레미아 고객의 스케쥴에 맞게 운영하고 있습니다.
        </p>
        <p>
          ✅ 특히 뉴왁공항 셔틀은 에어프레미아 승무원 공식 지정 셔틀 업체의 차량을 이용하고 있으며,
          500만불 보험에 가입되어 있어 더욱 신뢰할 수 있습니다.
        </p>
      </div>
    );
  } else if (currentPath === "/ny/guide-tour/manhattan-day" && cityId === 1) {
    sectionTitleContent = "뉴욕 데이 투어";
    sectionDescriptionContent = (
      <div>
        <p>
          ✅ 맨하탄 구석구석을 뉴요커 한국인 가이드와 함께 즐겨 보세요. 겉만 보고 가는 여행을 의미
          있는 여행으로 만들어 드립니다.{" "}
        </p>
      </div>
    );
  } else if (currentPath === "/ny/guide-tour/manhattan-night" && cityId === 1) {
    sectionTitleContent = "뉴욕 야경 투어";
    sectionDescriptionContent = (
      <div>
        <p>
          ✅ 뉴욕 여행의 필수인 야경투어. 낯설고 어려울 수 있는 뉴욕의 밤거리를 타미스의 뉴요커
          한국인 가이드와 함께 안전하게 둘러보시고 멋진 사진과 추억도 담아가세요.{" "}
        </p>
      </div>
    );
  } else if (currentPath === "/ny/guide-tour/doson-tour" && cityId === 1) {
    sectionTitleContent = "미술관 도슨트 투어";
    sectionDescriptionContent = (
      <div>
        <p>
          ✅ 미술책에서만 보던 거장의 작품들을 도슨트의 설명과 함께 듣는다면 감동이 배가 됩니다.
          타미스의 검증된 미술관 도슨트와 미술관에서 공식적으로 인정하는 투어로 안심하고 즐기세요!{" "}
        </p>
      </div>
    );
  } else if (currentPath === "/ny/guide-tour/un-tour" && cityId === 1) {
    sectionTitleContent = "유엔 투어";
    sectionDescriptionContent = "";
  } else if (currentPath === "/ny/guide-tour/neighbour-tour" && cityId === 1) {
    sectionTitleContent = "뉴욕 근교 투어";
    sectionDescriptionContent = (
      <div>
        <p>
          ✅ 미국의 수도 워싱턴 D.C. 하버드, MIT 등 명문대의 도시 보스턴, 그리고 세계 3대 폭포 중
          하나인 나이아가라 까지!{" "}
        </p>
        <p>
          ✅ 10여년 간의 노하우로 준비한 타미스의 투어로 고객님들의 즐겁고 편안한 여행을
          도와드립니다.{" "}
        </p>
      </div>
    );
  } else if (currentPath === "/ny/musicals_view" && cityId === 1) {
    sectionTitleContent = "브로드웨이 뮤지컬";
    sectionDescriptionContent = (
      <div>
        <p>
          ✅ 뮤지컬의 본고장, 세계 최고의 브로드웨이 뮤지컬을 내 예산에 맞게 원하는 섹션에서
          즐겨보세요!{" "}
        </p>
      </div>
    );
  } else if (currentPath === "/ny/sim-card") {
    sectionTitleContent = "미국 유심/eSIM";
    sectionDescriptionContent = (
      <div>
        <p>
          ✅ 너무나도 많은 유심/eSIM 정보 속에 타미스가 고르고 고른 가성비 최고의 유심/eSIM을
          만나보세요!{" "}
        </p>
      </div>
    );
  } else if (currentPath === "/sf/package-tour/ba-pass" && cityId === 36) {
    sectionTitleContent = "샌프란 빅애플패스 이용방법";
    sectionDescriptionContent = (
      <div>
        <p>✅ 빅애플패스 빅2~빅5 중 원하는 상품을 선택하여 구매해 주세요.</p>
        <p>✅ 단품 구매 (빅1) 는 각 상품의 ‘자세히 보기’ 를 클릭하여 구매하실 수 있습니다.</p>
        <p>✅ 아동의 경우 입장지마다 무료 입장 가능한 연령 혹은 불가능 여부를 꼭 확인하시고 구매해 주세요.</p>
        <p>
          ✅ <img className="inline w-[20px] h-[20px]" src={staticFiles.icons.calendar} />
          달력 아이콘이 있는 상품은 클릭하여 날짜/시간을 지정해야 구매가 가능합니다.
        </p>
        <p>
          ✅ 빅애플패스로 묶어서 구매하는 것보다 단품으로 구매하는 것이 저렴한 경우가 있습니다. 꼭 확인하시고 구매해 주세요.
        </p>
        <p>
          ✅ <img className="inline w-[18px] h-[18px]" src={staticFiles.icons.black_medal} />{" "}
          프리미엄: $9이 추가됩니다.
        </p>
        <p>
          ✅ <img className="inline w-[18px] h-[18px]" src={staticFiles.icons.gold_medal} />{" "}
          프리미엄S: $18이 추가됩니다.
        </p>
        {/* FOR DELUX TICKETS */}
        <p>
          ✅ <img className="inline w-[18px] h-[18px]" src={staticFiles.icons.blue_medal} />{" "}
          디럭스: 상품마다 추가 금액이 다릅니다. ($20 이상) 상품페이지를 꼭 확인해 주세요.
        </p>
        <p>✅ 한 빅애플패스 상품 내에서 입장지 중복선택은 불가능 합니다.</p>
      </div>
    ); 
  } else if (currentPath === "/sf/package-tour/city-pass" && cityId === 36) {
    sectionTitleContent = "샌프란시스코 시티패스";
    sectionDescriptionContent = "";
  } else if (currentPath === "/sf/package-tour/explore-pass" && cityId === 36) {
    sectionTitleContent = "샌프란시스코 익스플로러패스";
    sectionDescriptionContent = "";
  } else if (/*"/sf/city-attractions/cruise-bustour"*/currentPath === "/sf/city-attractions/cruise-bustour" && cityId === 36) {
    sectionTitleContent = "샌프란시스코 크루즈/버스투어";
    sectionDescriptionContent = "";
  }
   else if (currentPath === "/sf/guide-tour/sf-museum" && cityId === 36) {
    sectionTitleContent = "샌프란시스코 미술관/박물관";
    sectionDescriptionContent = "";
  } else if (currentPath === "/sf/city-attractions/activities" && cityId === 36) {
    sectionTitleContent = "샌프란시스코 액티비티";
    sectionDescriptionContent = "";
  } else if (currentPath === "/boston/package-tour/ba-pass" && cityId === 56) {
    sectionTitleContent = "보스턴 빅애플패스 이용방법";
    sectionDescriptionContent = (
      <div>
        <p>✅ 빅애플패스 빅2~빅5 중 원하는 상품을 선택하여 구매해 주세요.</p>
        <p>✅ 단품 구매 (빅1) 는 각 상품의 ‘자세히 보기’ 를 클릭하여 구매하실 수 있습니다.</p>
        <p>✅ 아동의 경우 입장지마다 무료 입장 가능한 연령 혹은 불가능 여부를 꼭 확인하시고 구매해 주세요.</p>
        <p>
          ✅ <img className="inline w-[20px] h-[20px]" src={staticFiles.icons.calendar} />
          달력 아이콘이 있는 상품은 클릭하여 날짜/시간을 지정해야 구매가 가능합니다.
        </p>
        <p>
          ✅ 빅애플패스로 묶어서 구매하는 것보다 단품으로 구매하는 것이 저렴한 경우가 있습니다. 꼭 확인하시고 구매해 주세요.
        </p>
        <p>
          ✅ <img className="inline w-[18px] h-[18px]" src={staticFiles.icons.black_medal} />{" "}
          프리미엄: $9이 추가됩니다.
        </p>
        <p>
          ✅ <img className="inline w-[18px] h-[18px]" src={staticFiles.icons.gold_medal} />{" "}
          프리미엄S: $18이 추가됩니다.
        </p>
        {/* FOR DELUX TICKETS */}
        <p>
          ✅ <img className="inline w-[18px] h-[18px]" src={staticFiles.icons.blue_medal} />{" "}
          디럭스: 상품마다 추가 금액이 다릅니다. ($20 이상) 상품페이지를 꼭 확인해 주세요.
        </p>
        <p>✅ 한 빅애플패스 상품 내에서 입장지 중복선택은 불가능 합니다.</p>
      </div>
    );
  } else if (currentPath === "/boston/ivy-league" && cityId === 56) {
    sectionTitleContent = "보스턴 아이비리그 투어";
    sectionDescriptionContent = "";
  } else if (currentPath === "/boston/observation-cruise" && cityId === 56) {
    sectionTitleContent = "보스턴 전망대/크루즈";
    sectionDescriptionContent = "";
  } else if (currentPath === "/boston/bus" && cityId === 56) {
    sectionTitleContent = "보스턴 버스투어";
    sectionDescriptionContent = "";
  } else if (currentPath === "/boston/gallery-museum" && cityId === 56) {
    sectionTitleContent = "보스턴 미술관/박물관";
    sectionDescriptionContent = "";
  } else if (currentPath === "/nf/package-tour/ba-pass" && cityId === 57) { 
    sectionTitleContent = "나이아가라 빅애플패스 이용방법";
    sectionDescriptionContent = (
      <div>
        <p>✅ 빅애플패스 빅2~빅5 중 원하는 상품을 선택하여 구매해 주세요.</p>
        <p>✅ 단품 구매 (빅1) 는 각 상품의 ‘자세히 보기’ 를 클릭하여 구매하실 수 있습니다.</p>
        <p>✅ 아동의 경우 입장지마다 무료 입장 가능한 연령 혹은 불가능 여부를 꼭 확인하시고 구매해 주세요.</p>
        <p>
          ✅ 달력 아이콘이 있는 상품은 클릭하여 날짜/시간을 지정해야 구매가 가능합니다.
        </p>
        <p>
          ✅ 빅애플패스로 묶어서 구매하는 것보다 단품으로 구매하는 것이 저렴한 경우가 있습니다. 꼭 확인하시고 구매해 주세요.
        </p>
        <p>
          ✅ <img className="inline w-[18px] h-[18px]" src={staticFiles.icons.black_medal} />{" "}
          프리미엄: $5이 추가됩니다.
        </p>
        <p>
          ✅ <img className="inline w-[18px] h-[18px]" src={staticFiles.icons.gold_medal} />{" "}
          프리미엄S: $10이 추가됩니다.
        </p>
        {/* FOR DELUX TICKETS */}
        <p>
          ✅ <img className="inline w-[18px] h-[18px]" src={staticFiles.icons.blue_medal} />{" "}
          디럭스: 상품마다 추가 금액이 다릅니다. ($20 이상) 상품페이지를 꼭 확인해 주세요.
        </p>
        <p>✅ 한 빅애플패스 상품 내에서 입장지 중복선택은 불가능 합니다.</p>
      </div>
    );
  } else if (currentPath === "/nf/cruise" && cityId === 57) {
    sectionTitleContent = "나이아가라 크루즈";
    sectionDescriptionContent = "";
  } else if (currentPath === "/nf/entry" && cityId === 57) {
    sectionTitleContent = " 나이아가라 입장지";
    sectionDescriptionContent = "";
  } else if (currentPath === "/nf/activity" && cityId === 57) {
    sectionTitleContent = " 나이아가라 액티비티";
    sectionDescriptionContent = "";
  } else if (currentPath === "/nf/tour" && cityId === 57) {
    sectionTitleContent = " 나이아가라 투어";
    sectionDescriptionContent = "";
  } else if (currentPath === "/nf/sim" && cityId === 57) {
    sectionTitleContent = " 캐나다 유심";
    sectionDescriptionContent = "";
  } else if (currentPath === "/ls/package-tour/ba-pass" && cityId === 58) {
    sectionTitleContent = " 라스베가스/캐년 빅애플패스 이용방법";
    sectionDescriptionContent = (
      <div>
        <p>✅ 빅애플패스 빅2~빅5 중 원하는 상품을 선택하여 구매해 주세요.</p>
        <p>✅ 단품 구매 (빅1) 는 각 상품의 ‘자세히 보기’ 를 클릭하여 구매하실 수 있습니다.</p>
        <p>✅ 아동의 경우 입장지마다 무료 입장 가능한 연령 혹은 불가능 여부를 꼭 확인하시고 구매해 주세요.</p>
        <p>
          ✅ <img className="inline w-[20px] h-[20px]" src={staticFiles.icons.calendar} />
          달력 아이콘이 있는 상품은 클릭하여 날짜/시간을 지정해야 구매가 가능합니다.
        </p>
        <p>
          ✅ 빅애플패스로 묶어서 구매하는 것보다 단품으로 구매하는 것이 저렴한 경우가 있습니다. 꼭 확인하시고 구매해 주세요.
        </p>
        <p>
          ✅ <img className="inline w-[18px] h-[18px]" src={staticFiles.icons.black_medal} />{" "}
          프리미엄: $5이 추가됩니다.
        </p>
        <p>
          ✅ <img className="inline w-[18px] h-[18px]" src={staticFiles.icons.gold_medal} />{" "}
          프리미엄S: $10이 추가됩니다.
        </p>
        {/* FOR DELUX TICKETS */}
        <p>
          ✅ <img className="inline w-[18px] h-[18px]" src={staticFiles.icons.blue_medal} />{" "}
          디럭스: 상품마다 추가 금액이 다릅니다. ($20 이상) 상품페이지를 꼭 확인해 주세요.
        </p>
        <p>✅ 한 빅애플패스 상품 내에서 입장지 중복선택은 불가능 합니다.</p>
      </div>
    );
  } else if (currentPath === "/ls/ls-entry" && cityId === 58) {
    sectionTitleContent = " 라스베가스 입장지";
    sectionDescriptionContent = "";
  } else if (currentPath === "/ls/canyon-entry" && cityId === 58) {
    sectionTitleContent = "캐년 입장지";
    sectionDescriptionContent = "";
  } else if (currentPath === "/cy/show" && cityId === 58) {
    sectionTitleContent = "라스베가스 쇼";
    sectionDescriptionContent = "";
  } else if (currentPath === "/cy/camping-car" && cityId === 58) {
    sectionTitleContent = "빅애플캐년 캠핑카 투어";
    sectionDescriptionContent = (
      <div>
        <p>✅ 올 인클루시브 캠핑카 자유 여행</p>
        <p>✅ 6박7일+ 캠핑카, 캠핑장, 일정, 주요 입장지까지 원클릭 예약</p>
        <p>✅ 모든 정보는 타미스에서 드리니 일정만 고르세요!</p>
        <p>✅ 여행의 품격 최고, 가성비 최고, 추억은 덤</p>
        <p>✅ 캐년 캠핑카 자유 여행 나도 할 수 있어!</p>
      </div>
    );
  } else if (currentPath === "/cy/canyon-tour" && cityId === 58) {
    sectionTitleContent = " 캐년 패키지 투어";
    sectionDescriptionContent = "";
  }

  else if (currentPath === "/hls/package-tour/ba-pass" && cityId === 59) {
    sectionTitleContent = "하와이/LA/샌디에고 빅애플패스 이용방법";
    sectionDescriptionContent = (
      <div>
        <p>✅ 빅애플패스 빅2~빅7 중 원하는 상품을 선택하여 구매해 주세요.</p>
        <p>✅ 단품 구매 (빅1) 는 각 상품의 ‘자세히 보기’ 를 클릭하여 구매하실 수 있습니다.</p>
        <p>✅ 아동의 경우 입장지마다 무료 입장 가능한 연령 혹은 불가능 여부를 꼭 확인하시고 구매해 주세요.</p>
        <p>
          ✅ <img className="inline w-[20px] h-[20px]" src={staticFiles.icons.calendar} />
          달력 아이콘이 있는 상품은 클릭하여 날짜/시간을 지정해야 구매가 가능합니다.
        </p>
        <p>
          ✅ 빅애플패스로 묶어서 구매하는 것보다 단품으로 구매하는 것이 저렴한 경우가 있습니다. 꼭 확인하시고 구매해 주세요.
        </p>
        <p>
          ✅ <img className="inline w-[18px] h-[18px]" src={staticFiles.icons.black_medal} />{" "}
          프리미엄: $9이 추가됩니다.
        </p>
        <p>
          ✅ <img className="inline w-[18px] h-[18px]" src={staticFiles.icons.gold_medal} />{" "}
          프리미엄S: $18이 추가됩니다.
        </p>
        {/* FOR DELUX TICKETS */}
        <p>
          ✅ <img className="inline w-[18px] h-[18px]" src={staticFiles.icons.blue_medal} />{" "}
          디럭스: 상품마다 추가 금액이 다릅니다. ($20 이상) 상품페이지를 꼭 확인해 주세요.
        </p>
        <p>✅ 한 빅애플패스 상품 내에서 입장지 중복선택은 불가능 합니다.</p>
      </div>
    );
  }

  else if (currentPath === "/hls/city/hawaii" && cityId === 59) {
    sectionTitleContent = " 하와이";
    sectionDescriptionContent = "";
  }
  else if (currentPath === "/hls/city/losangeles" && cityId === 59) {
    sectionTitleContent = "로스앤젤레스";
    sectionDescriptionContent = "";
  }

  else if (currentPath === "/hls/city/santacatalina" && cityId === 59) {
    sectionTitleContent = "산타 카탈리나";
    sectionDescriptionContent = "";
  }

  else if (currentPath === "/hls/city/sandiego" && cityId === 59) {
    sectionTitleContent = "샌디에고";
    sectionDescriptionContent = "";
  }

  return (
    <div className="flex flex-col items-center w-full">
      <Carousel
        cols={1}
        rows={1}
        loop={true}
        containerClassName="py-[5vh] flex md:hidden w-[95%] justify-center pt-[5vh]"
        // arrowLeft={() => null}
        // arrowRight={() => null}
      >
        {services.map((s) => (
          <Carousel.Item key={JSON.stringify(s)}>
            <div className="max-w-[400px]">
              <ServiceCard {...s} />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="max-w-[1300px]">
        <div className="py-[5vh] gap-4 hidden md:flex flex-row md:flex-row w-full justify-center pt-[5vh]">
          {services.map((s) => (
            <ServiceCard key={JSON.stringify(s)} {...s} />
          ))}
        </div>
      </div>

      {/* <SpaceY /> */}
      <div className="bg-[#F2F2F2] w-[98.9vw] min-h-[600px] pb-[20vh] pt-[4rem] flex justify-center">
        <div className="flex flex-col max-w-[1300px] w-full px-4">
          <span className="flex mb-16 text-xl font-medium font-poppins gap-x-4">
            <img alt="" src={staticFiles.icons.heart} width="20" />
            {sectionTitle != "Sim Card" ? (
              <TitleCom content={sectionTitleContent} />
            ) : (
              <TitleCom content={sectionTitleContent} />
            )}
          </span>
          <span className="font-poppins gap-x-4 mb-16 text-[#5D5D5F]">
            {sectionDescriptionContent}
          </span>
          {children}
        </div>
      </div>
    </div>
  );
};

const TitleCom = ({ content }: any) => {
  return <div>{content}</div>;
};

const services: ServiceCardProps[] = [
  {
    title: "숨김없는 정직한 운영",
    description:
      "타미스는 수수료 등 숨겨진 비용, 거짓된 내용없이 뉴욕을 방문하는 고객님들이 믿고 맡기실 수 있도록 정직하게 운영하고 있습니다.",
    icon: staticFiles.icons.honest,
  },
  {
    title: "유연한 환불과 변경",
    description:
      "항상 고객을 먼저 생각하는 타미스는 다른 업체가 따라올 수 없는 유연한 환불 및 변경, 다운/업그레이드 정책을 운영함으로써 자유여행에 최적화되어 있습니다. ",
    icon: staticFiles.icons.refundlayout,
  },
  {
    title: "신속한 응대 및 실시간 상담 서비스",
    description:
      "타미스는 한국, 미동부시간 오전 9시부터 오후 6시까지 신속한 응대와 상담을 위해 노력하고 있습니다. 여행 전 상담에서부터 여행 중, 여행 후까지 뉴욕 현지 본사와 한국 지사를 통해 언제, 어디서든 편리한 서비스를 누려보세요! ",
    icon: staticFiles.icons.communicate,
  },
];
