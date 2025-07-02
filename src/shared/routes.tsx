import { createHashRouter, createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { LogInView } from "../modules/authentication/LogInView";
import { PageLayout, CoverTypes } from "../modules/page_layout/PageLayout";
import { SignUpView } from "../modules/authentication/SignUpView";
import { LandingView } from "../modules/landing/LandingView";
import { MainView } from "../modules/main/MainView";
import { NotFound } from "./components/NotFound";
import { ForgotPasswordView } from "../modules/authentication/ForgotPasswordView";
import { CreatePasswordView } from "../modules/authentication/CreatePasswordView";
import { RegisterView } from "../modules/authentication/RegisterView";
import { NonMemberLogInView } from "../modules/authentication/NonMemberLogInView";
import { MyAccountView } from "../modules/authentication/MyAccountView";
import { EditAccountView } from "../modules/authentication/EditAccountView";
import { SuccessActionView } from "../modules/authentication/SuccessActionView";
import { DeleteAccountView } from "../modules/authentication/DeleteAccountView";
import { ContactView } from "../modules/contact/ContactView";
import { 여행정보View } from "../modules/여행정보/여행정보View";
import { AboutView } from "../modules/about/AboutView";
import { SFTripView } from "../modules/SFTripView/SFTripView";
import { WebPageView } from "../modules/web_page/WebPageView";
import { ProductsLayout } from "../modules/page_layout/ProductsLayout";
import { BigApplePassView } from "../modules/package_tour/BigApplePassView";
import { NYExploreView } from "../modules/package_tour/NYExploreView";
import { NYCityPassView } from "../modules/package_tour/NYCityPassView";
import { ObservationsView } from "../modules/city_attractions/ObservationsView";
import { RidesAndCruisesView } from "../modules/city_attractions/RidesAndCruisesView";
import { ProductDetailView } from "../modules/product_detail/ProductDetailView";
import { ShowDetailView } from "../modules/product_detail/ShowDetailView";
import { ProductDetailLayout } from "../modules/page_layout/ProductDetailLayout";
import { WebPageLayout } from "../modules/page_layout/WebPageLayout";
import { CartView } from "../modules/cart/CartView";
import { NoAuthCheckoutView } from "../modules/cart/NoAuthCheckoutView";
import { BookingsLayout } from "../modules/page_layout/BookingsLayout";
import { BookingsView } from "../modules/bookings/BookingsView";
import { MuseumAndGallery } from "../modules/city_attractions/MuseumAndGalleryView";
import { Activities } from "../modules/city_attractions/ActivitiesView";
import { Bus } from "../modules/city_attractions/BusView";
import { Airport } from "../modules/city_attractions/AirportView";
import { SFMuseumTourView } from "../modules/guide_tour/SFMuseumTourView";
import { ManhattanDayTourView } from "../modules/guide_tour/ManhattanDayTourView";
import { ManhattanNightTourView } from "../modules/guide_tour/ManhattanNightTourView";
import { DosonTourView } from "../modules/guide_tour/DosonTourView";
import { UNTourView } from "../modules/guide_tour/UNTourView";
import { NeighbourTourView } from "../modules/guide_tour/NeighbourTourView";
import { CanyonEntranceView } from "../modules/las_show/CanyonEntranceView";
import { LasEntranceView } from "../modules/las_show/LasEntranceView";
import { SimCardView } from "../modules/sim_card/SimCardView";
import Checkout from "../modules/cart/Checkout";
import PaymentForm from "../modules/cart/PaymentForm";
import { FooterReturnPolicy } from "../modules/page_layout/components/FooterReturnPolicy";
import { MusicalCalendar } from "../modules/musicals_and_shows/MusicalCalendar";
import { MusicalView } from "../modules/musicals_and_shows/";
import { MusicalsAndShowsView } from "../modules/musicals_and_shows/MusicalsAndShowsView";
import { BostonIvyLeagueView } from "../modules/boston/BostonIvyLeagueView";
import { BostonObservationsView } from "../modules/boston/BostonObservationView";
import { BostonBusView } from "../modules/boston/BostonBusView";
import { BostonMuseumView } from "../modules/boston/BostonMuseumView";
import { FallCruiseView } from "../modules/niagara_falls/FallCruiseView";
import { FallEntryView } from "../modules/niagara_falls/FallEntryView";
import { FallActivityView } from "../modules/niagara_falls/FallActivityView";
import { FallSimView } from "../modules/niagara_falls/FallSimView";
import { FallTourView } from "../modules/niagara_falls/FallTourView";
import { LasVegasShowView } from "../modules/las_show/LasVegasShowView";
import { LasCampingCarView } from "../modules/las_show/LasCampingCarView";
import { LasCanyonTourView } from "../modules/las_show/LasCanyonTourView";
import { BostonEventView } from "../modules/boston/BostonEventView";
import { LasVegasEventView } from "../modules/las_show/LasVegasEventView";
import { FallEventView } from "../modules/niagara_falls/FallEventView";
import { HawaiiView } from "../modules/hawaii/HawaiiView";
import { LosAngelesView } from "../modules/hawaii/LosAngelesrView";
import { SantaCatalinaView } from "../modules/hawaii/SantaCatalinaView";
import { SanDiegoView } from "../modules/hawaii/SanDiegoView";
import { HawaiiEventView } from "../modules/hawaii/HawaiiEvent";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PageLayout cover={CoverTypes.LANDING}>
        <LandingView />
      </PageLayout>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/ny/main",
    element: (
      <PageLayout cover={CoverTypes.NORMAL}>
        <MainView />
      </PageLayout>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/sf/main",
    element: (
      <PageLayout cover={CoverTypes.NORMAL}>
        <MainView />
      </PageLayout>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/hls/main",
    element: (
      <PageLayout cover={CoverTypes.NORMAL}>
        <MainView />
      </PageLayout>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/nf/main",
    element: (
      <PageLayout cover={CoverTypes.NORMAL}>
        <MainView />
      </PageLayout>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/boston/main",
    element: (
      <PageLayout cover={CoverTypes.NORMAL}>
        <MainView />
      </PageLayout>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/ls/main",
    element: (
      <PageLayout cover={CoverTypes.NORMAL}>
        <MainView />
      </PageLayout>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/user",
    element: (
      <PageLayout cover={CoverTypes.NORMAL}>
        <Outlet />
      </PageLayout>
    ),
    errorElement: <NotFound />,
    children: [
      {
        path: "sign-up",
        element: <SignUpView />,
      },
      {
        path: "log-in",
        element: <LogInView />,
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordView />,
      },
      {
        path: "create-password",
        element: <CreatePasswordView />,
      },
      {
        path: "register",
        element: <RegisterView />,
      },
      {
        path: "my-account",
        element: <MyAccountView />,
      },
      {
        path: "edit-account",
        element: <EditAccountView />,
      },
      {
        path: "update-success",
        element: <SuccessActionView msg="Your account has been updated successfully." />,
      },
      {
        path: "delete-success",
        element: <SuccessActionView msg="Your account has been deleted successfully. " />,
      },
      {
        path: "delete-user",
        element: <DeleteAccountView />,
      },
      {
        path: "non-member-order-lookup",
        element: <NonMemberLogInView />,
      },
    ],
  },
  {
    path: "/contact",
    element: (
      <PageLayout cover={CoverTypes.NORMAL}>
        <ContactView />
      </PageLayout>
    ),
  },
  {
    path: "/sf-trip-info",
    element: (
      <PageLayout cover={CoverTypes.NORMAL}>
        <SFTripView />
      </PageLayout>
    ),
  },
  {
    path: "/trip-info",
    element: (
      <PageLayout cover={CoverTypes.NORMAL}>
        <여행정보View />
      </PageLayout>
    ),
  },

  {
    path: "/ny/trip-info",
    element: (
      <PageLayout cover={CoverTypes.NORMAL}>
        <여행정보View />
      </PageLayout>
    ),
  },

  {
    path: "/boston-trip-info",
    element: (
      <PageLayout cover={CoverTypes.NORMAL}>
        <BostonEventView />
      </PageLayout>
    ),
  },

  {
    path: "/hls/city/event",
    element: (
      <PageLayout cover={CoverTypes.NORMAL}>
        <HawaiiEventView />
      </PageLayout>
    ),
  },

  {
    path: "/lv-trip-info",
    element: (
      <PageLayout cover={CoverTypes.NORMAL}>
        <LasVegasEventView />
      </PageLayout>
    ),
  },

  {
    path: "/nf-trip-info",
    element: (
      <PageLayout cover={CoverTypes.NORMAL}>
       <FallEventView/>
      </PageLayout>
    ),
  },
  {
    path: "/about",
    element: (
      <PageLayout cover={CoverTypes.NORMAL}>
        <AboutView />
      </PageLayout>
    ),
  },

  {
    path: "/trip-info",
    element: (
      <PageLayout cover={CoverTypes.NORMAL}>
        <여행정보View />
      </PageLayout>
    ),
  },
  // {
  //   path: "/webpage/:id",
  //   element: (
  //     <PageLayout cover={CoverTypes.NORMAL}>

  //     </PageLayout>
  //   ),
  // },
  {
    path: "/webpage/:id",
    element: (
      <WebPageLayout>
        <WebPageView />
      </WebPageLayout>
    ),
  },
  {
    path: "/ny/package-tour",
    element: (
      <PageLayout cover={CoverTypes.NORMAL}>
        <Outlet />
      </PageLayout>
    ),
    children: [
      {
        path: "ba-pass",
        element: (
          <ProductsLayout sectionDescription={" "} sectionTitle="뉴욕 빅애플패스 이용방법">
            <BigApplePassView />
          </ProductsLayout>
        ),
      },
      {
        path: "city-pass",
        element: (
          <ProductsLayout
            sectionDescription="뉴욕 시티패스(NEW YORK CityPass)는 뉴욕 관광 명소 5곳의 입장권들을 하나로 모은 패스입니다. 일종의 뉴욕 투어티켓 할인세트이자 각 5곳의 관광지에서 입장권을 사느라 일일이 줄 서서 기다릴 필요도 없어 시간 절약도 가능한 패스입니다."
            sectionTitle="City Pass"
          >
            <NYCityPassView />
          </ProductsLayout>
        ),
      },
      {
        path: "explore-pass",
        element: (
          <ProductsLayout
            sectionDescription="뉴욕 익스플로러패스는 80+의 폭넓은 입장지와 어트랙션, 투어들 중에서 2, 3, 4, 5, 6, 7, 10가지를 선택하여 할인된 가격으로 사용할 수 있는 패스입니다."
            sectionTitle="City Explore Pass"
          >
            <NYExploreView />
          </ProductsLayout>
        ),
      },
    ],
  },

  {
    path: "/package-tour",
    element: (
      <PageLayout cover={CoverTypes.NORMAL}>
        <Outlet />
      </PageLayout>
    ),
    children: [
      {
        path: "ba-pass",
        element: (
          <ProductsLayout sectionDescription={" "} sectionTitle="뉴욕 빅애플패스 이용방법">
            <BigApplePassView />
          </ProductsLayout>
        ),
      },
      {
        path: "city-pass",
        element: (
          <ProductsLayout
            sectionDescription="뉴욕 시티패스(NEW YORK CityPass)는 뉴욕 관광 명소 5곳의 입장권들을 하나로 모은 패스입니다. 일종의 뉴욕 투어티켓 할인세트이자 각 5곳의 관광지에서 입장권을 사느라 일일이 줄 서서 기다릴 필요도 없어 시간 절약도 가능한 패스입니다."
            sectionTitle="City Pass"
          >
            <NYCityPassView />
          </ProductsLayout>
        ),
      },
      {
        path: "explore-pass",
        element: (
          <ProductsLayout
            sectionDescription="뉴욕 익스플로러패스는 80+의 폭넓은 입장지와 어트랙션, 투어들 중에서 2, 3, 4, 5, 6, 7, 10가지를 선택하여 할인된 가격으로 사용할 수 있는 패스입니다."
            sectionTitle="City Explore Pass"
          >
            <NYExploreView />
          </ProductsLayout>
        ),
      },
    ],
  },

  {
    path: "/sf/package-tour",
    element: (
      <PageLayout cover={CoverTypes.NORMAL}>
        <Outlet />
      </PageLayout>
    ),
    children: [
      {
        path: "ba-pass",
        element: (
          <ProductsLayout sectionDescription={" "} sectionTitle="뉴욕 빅애플패스 이용방법">
            <BigApplePassView />
          </ProductsLayout>
        ),
      },
      {
        path: "city-pass",
        element: (
          <ProductsLayout
            sectionDescription="뉴욕 시티패스(NEW YORK CityPass)는 뉴욕 관광 명소 5곳의 입장권들을 하나로 모은 패스입니다. 일종의 뉴욕 투어티켓 할인세트이자 각 5곳의 관광지에서 입장권을 사느라 일일이 줄 서서 기다릴 필요도 없어 시간 절약도 가능한 패스입니다."
            sectionTitle="City Pass"
          >
            <NYCityPassView />
          </ProductsLayout>
        ),
      },
      {
        path: "explore-pass",
        element: (
          <ProductsLayout
            sectionDescription="뉴욕 익스플로러패스는 80+의 폭넓은 입장지와 어트랙션, 투어들 중에서 2, 3, 4, 5, 6, 7, 10가지를 선택하여 할인된 가격으로 사용할 수 있는 패스입니다."
            sectionTitle="City Explore Pass"
          >
            <NYExploreView />
          </ProductsLayout>
        ),
      },
    ],
  },

  {
    path: "/hls/package-tour",
    element: (
      <PageLayout cover={CoverTypes.NORMAL}>
        <Outlet />
      </PageLayout>
    ),
    children: [
      {
        path: "ba-pass",
        element: (
          <ProductsLayout sectionDescription={" "} sectionTitle="뉴욕 빅애플패스 이용방법">
            <BigApplePassView />
          </ProductsLayout>
        ),
      },
      {
        path: "city-pass",
        element: (
          <ProductsLayout
            sectionDescription="뉴욕 시티패스(NEW YORK CityPass)는 뉴욕 관광 명소 5곳의 입장권들을 하나로 모은 패스입니다. 일종의 뉴욕 투어티켓 할인세트이자 각 5곳의 관광지에서 입장권을 사느라 일일이 줄 서서 기다릴 필요도 없어 시간 절약도 가능한 패스입니다."
            sectionTitle="City Pass"
          >
            <NYCityPassView />
          </ProductsLayout>
        ),
      },
      {
        path: "explore-pass",
        element: (
          <ProductsLayout
            sectionDescription="뉴욕 익스플로러패스는 80+의 폭넓은 입장지와 어트랙션, 투어들 중에서 2, 3, 4, 5, 6, 7, 10가지를 선택하여 할인된 가격으로 사용할 수 있는 패스입니다."
            sectionTitle="City Explore Pass"
          >
            <NYExploreView />
          </ProductsLayout>
        ),
      },
    ],
  },

  {
    path: "/ls/package-tour",
    element: (
      <PageLayout cover={CoverTypes.NORMAL}>
        <Outlet />
      </PageLayout>
    ),
    children: [
      {
        path: "ba-pass",
        element: (
          <ProductsLayout sectionDescription={" "} sectionTitle="뉴욕 빅애플패스 이용방법">
            <BigApplePassView />
          </ProductsLayout>
        ),
      },
      // {
      //   path: "city-pass",
      //   element: (
      //     <ProductsLayout
      //       sectionDescription="뉴욕 시티패스(NEW YORK CityPass)는 뉴욕 관광 명소 5곳의 입장권들을 하나로 모은 패스입니다. 일종의 뉴욕 투어티켓 할인세트이자 각 5곳의 관광지에서 입장권을 사느라 일일이 줄 서서 기다릴 필요도 없어 시간 절약도 가능한 패스입니다."
      //       sectionTitle="City Pass"
      //     >
      //       <NYCityPassView />
      //     </ProductsLayout>
      //   ),
      // },
      // {
      //   path: "explore-pass",
      //   element: (
      //     <ProductsLayout
      //       sectionDescription="뉴욕 익스플로러패스는 80+의 폭넓은 입장지와 어트랙션, 투어들 중에서 2, 3, 4, 5, 6, 7, 10가지를 선택하여 할인된 가격으로 사용할 수 있는 패스입니다."
      //       sectionTitle="City Explore Pass"
      //     >
      //       <NYExploreView />
      //     </ProductsLayout>
      //   ),
      // },
    ],
  },

  {
    path: "/nf/package-tour",
    element: (
      <PageLayout cover={CoverTypes.NORMAL}>
        <Outlet />
      </PageLayout>
    ),
    children: [
      {
        path: "ba-pass",
        element: (
          <ProductsLayout sectionDescription={" "} sectionTitle="뉴욕 빅애플패스 이용방법">
            <BigApplePassView />
          </ProductsLayout>
        ),
      },
      {
        path: "city-pass",
        element: (
          <ProductsLayout
            sectionDescription="뉴욕 시티패스(NEW YORK CityPass)는 뉴욕 관광 명소 5곳의 입장권들을 하나로 모은 패스입니다. 일종의 뉴욕 투어티켓 할인세트이자 각 5곳의 관광지에서 입장권을 사느라 일일이 줄 서서 기다릴 필요도 없어 시간 절약도 가능한 패스입니다."
            sectionTitle="City Pass"
          >
            <NYCityPassView />
          </ProductsLayout>
        ),
      },
      {
        path: "explore-pass",
        element: (
          <ProductsLayout
            sectionDescription="뉴욕 익스플로러패스는 80+의 폭넓은 입장지와 어트랙션, 투어들 중에서 2, 3, 4, 5, 6, 7, 10가지를 선택하여 할인된 가격으로 사용할 수 있는 패스입니다."
            sectionTitle="City Explore Pass"
          >
            <NYExploreView />
          </ProductsLayout>
        ),
      },
    ],
  },

  {
    path: "/boston/package-tour",
    element: (
      <PageLayout cover={CoverTypes.NORMAL}>
        <Outlet />
      </PageLayout>
    ),
    children: [
      {
        path: "ba-pass",
        element: (
          <ProductsLayout sectionDescription={" "} sectionTitle="뉴욕 빅애플패스 이용방법">
            <BigApplePassView />
          </ProductsLayout>
        ),
      },
      {
        path: "city-pass",
        element: (
          <ProductsLayout
            sectionDescription="뉴욕 시티패스(NEW YORK CityPass)는 뉴욕 관광 명소 5곳의 입장권들을 하나로 모은 패스입니다. 일종의 뉴욕 투어티켓 할인세트이자 각 5곳의 관광지에서 입장권을 사느라 일일이 줄 서서 기다릴 필요도 없어 시간 절약도 가능한 패스입니다."
            sectionTitle="City Pass"
          >
            <NYCityPassView />
          </ProductsLayout>
        ),
      },
      {
        path: "explore-pass",
        element: (
          <ProductsLayout
            sectionDescription="뉴욕 익스플로러패스는 80+의 폭넓은 입장지와 어트랙션, 투어들 중에서 2, 3, 4, 5, 6, 7, 10가지를 선택하여 할인된 가격으로 사용할 수 있는 패스입니다."
            sectionTitle="City Explore Pass"
          >
            <NYExploreView />
          </ProductsLayout>
        ),
      },
    ],
  },

  {
    path: "/city-attractions",
    element: (
      <PageLayout cover={CoverTypes.NORMAL}>
        <Outlet />
      </PageLayout>
    ),
    children: [
      {
        path: "observations",
        element: (
          <ProductsLayout
            sectionDescription="Text Goes here - Scenic, Rids/Cruises, Museum/Gallery page contents/layout are the same"
            sectionTitle="샌프란시스코 크루즈/버스투어로"
          >
            <ObservationsView />
          </ProductsLayout>
        ),
      },
      {
        path: "museum-gallery",
        element: (
          <ProductsLayout
            sectionDescription="Text Goes here - Scenic, Rids/Cruises, Museum/Gallery page contents/layout are the same"
            sectionTitle="Museum Gallery"
          >
            <MuseumAndGallery />
          </ProductsLayout>
        ),
      },
      {
        path: "rides-cruises",
        element: (
          <ProductsLayout
            sectionDescription="Text Goes here - Scenic, Rids/Cruises, Museum/Gallery page contents/layout are the same"
            sectionTitle="Rides/Cruises"
          >
            <RidesAndCruisesView />
          </ProductsLayout>
        ),
      },
      {
        path: "activities",
        element: (
          <ProductsLayout
            sectionDescription="Text Goes here - Scenic, Rids/Cruises, Museum/Gallery page contents/layout are the same"
            sectionTitle="Activities"
          >
            <Activities />
          </ProductsLayout>
        ),
      },
      {
        path: "bus",
        element: (
          <ProductsLayout
            sectionDescription="Text Goes here - Scenic, Rids/Cruises, Museum/Gallery page contents/layout are the same"
            sectionTitle="Bus"
          >
            <Bus />
          </ProductsLayout>
        ),
      },
      {
        path: "airport",
        element: (
          <ProductsLayout
            sectionDescription="Text Goes here - Scenic, Rids/Cruises, Museum/Gallery page contents/layout are the same"
            sectionTitle="Airport"
          >
            <Airport />
          </ProductsLayout>
        ),
      },
    ],
  },
  // NEW YORK
  {
    path: "/ny/city-attractions",
    element: (
      <PageLayout cover={CoverTypes.NORMAL}>
        <Outlet />
      </PageLayout>
    ),
    children: [
      {
        path: "observations",
        element: (
          <ProductsLayout
            sectionDescription="Text Goes here - Scenic, Rids/Cruises, Museum/Gallery page contents/layout are the same"
            sectionTitle="샌프란시스코 크루즈/버스투어로"
          >
            <ObservationsView />
          </ProductsLayout>
        ),
      },
      {
        path: "museum-gallery",
        element: (
          <ProductsLayout
            sectionDescription="Text Goes here - Scenic, Rids/Cruises, Museum/Gallery page contents/layout are the same"
            sectionTitle="Museum Gallery"
          >
            <MuseumAndGallery />
          </ProductsLayout>
        ),
      },
      {
        path: "rides-cruises",
        element: (
          <ProductsLayout
            sectionDescription="Text Goes here - Scenic, Rids/Cruises, Museum/Gallery page contents/layout are the same"
            sectionTitle="Rides/Cruises"
          >
            <RidesAndCruisesView />
          </ProductsLayout>
        ),
      },
      {
        path: "activities",
        element: (
          <ProductsLayout
            sectionDescription="Text Goes here - Scenic, Rids/Cruises, Museum/Gallery page contents/layout are the same"
            sectionTitle="Activities"
          >
            <Activities />
          </ProductsLayout>
        ),
      },
      {
        path: "bus",
        element: (
          <ProductsLayout
            sectionDescription="Text Goes here - Scenic, Rids/Cruises, Museum/Gallery page contents/layout are the same"
            sectionTitle="Bus"
          >
            <Bus />
          </ProductsLayout>
        ),
      },
      {
        path: "airport",
        element: (
          <ProductsLayout
            sectionDescription="Text Goes here - Scenic, Rids/Cruises, Museum/Gallery page contents/layout are the same"
            sectionTitle="Airport"
          >
            <Airport />
          </ProductsLayout>
        ),
      },
    ],
  },
  // SAN FRANCISCO
  {
    path: "/sf/city-attractions",
    element: (
      <PageLayout cover={CoverTypes.NORMAL}>
        <Outlet />
      </PageLayout>
    ),
    children: [
      {
        // path: "observations",
        path: "cruise-bustour",
        element: (
          <ProductsLayout
            sectionDescription="Text Goes here - Scenic, Rids/Cruises, Museum/Gallery page contents/layout are the same"
            sectionTitle="샌프란시스코 크루즈/버스투어로"
          >
            <ObservationsView />
          </ProductsLayout>
        ),
      },
      {
        path: "activities",
        element: (
          <ProductsLayout
            sectionDescription="Text Goes here - Scenic, Rids/Cruises, Museum/Gallery page contents/layout are the same"
            sectionTitle="Activities"
          >
            <Activities />
          </ProductsLayout>
        ),
      },
    ],
  },

  {
    path: "/guide-tour",
    element: (
      <PageLayout cover={CoverTypes.NORMAL}>
        <Outlet />
      </PageLayout>
    ),
    children: [
      {
        path: "manhattan-day",
        element: (
          <ProductsLayout
            sectionDescription="Text Goes here - Scenic, Rids/Cruises, Museum/Gallery page contents/layout are the same"
            sectionTitle="Manhattan day"
          >
            <ManhattanDayTourView />
          </ProductsLayout>
        ),
      },
      {
        path: "sf-museum",
        element: (
          <ProductsLayout
            sectionDescription="Text Goes here - Scenic, Rids/Cruises, Museum/Gallery page contents/layout are the same"
            sectionTitle="Museum"
          >
            <SFMuseumTourView />
          </ProductsLayout>
        ),
      },
      {
        path: "manhattan-night",
        element: (
          <ProductsLayout
            sectionDescription="Text Goes here - Scenic, Rids/Cruises, Museum/Gallery page contents/layout are the same"
            sectionTitle="Manhattan night"
          >
            <ManhattanNightTourView />
          </ProductsLayout>
        ),
      },
      {
        path: "doson-tour",
        element: (
          <ProductsLayout
            sectionDescription="Text Goes here - Scenic, Rids/Cruises, Museum/Gallery page contents/layout are the same"
            sectionTitle="Doson Tour"
          >
            <DosonTourView />
          </ProductsLayout>
        ),
      },

      {
        path: "un-tour",
        element: (
          <ProductsLayout
            sectionDescription="Text Goes here - Scenic, Rids/Cruises, Museum/Gallery page contents/layout are the same"
            sectionTitle="UN Tour"
          >
            <UNTourView />
          </ProductsLayout>
        ),
      },

      {
        path: "neighbour-tour",
        element: (
          <ProductsLayout
            sectionDescription="Text Goes here - Scenic, Rids/Cruises, Museum/Gallery page contents/layout are the same"
            sectionTitle="Neighbour Tour"
          >
            <NeighbourTourView />
          </ProductsLayout>
        ),
      },
    ],
  },
  // NEW YORK
  {
    path: "/ny/guide-tour",
    element: (
      <PageLayout cover={CoverTypes.NORMAL}>
        <Outlet />
      </PageLayout>
    ),
    children: [
      {
        path: "manhattan-day",
        element: (
          <ProductsLayout
            sectionDescription="Text Goes here - Scenic, Rids/Cruises, Museum/Gallery page contents/layout are the same"
            sectionTitle="Manhattan day"
          >
            <ManhattanDayTourView />
          </ProductsLayout>
        ),
      },
      {
        path: "sf-museum",
        element: (
          <ProductsLayout
            sectionDescription="Text Goes here - Scenic, Rids/Cruises, Museum/Gallery page contents/layout are the same"
            sectionTitle="Museum"
          >
            <SFMuseumTourView />
          </ProductsLayout>
        ),
      },
      {
        path: "manhattan-night",
        element: (
          <ProductsLayout
            sectionDescription="Text Goes here - Scenic, Rids/Cruises, Museum/Gallery page contents/layout are the same"
            sectionTitle="Manhattan night"
          >
            <ManhattanNightTourView />
          </ProductsLayout>
        ),
      },
      {
        path: "doson-tour",
        element: (
          <ProductsLayout
            sectionDescription="Text Goes here - Scenic, Rids/Cruises, Museum/Gallery page contents/layout are the same"
            sectionTitle="Doson Tour"
          >
            <DosonTourView />
          </ProductsLayout>
        ),
      },

      {
        path: "un-tour",
        element: (
          <ProductsLayout
            sectionDescription="Text Goes here - Scenic, Rids/Cruises, Museum/Gallery page contents/layout are the same"
            sectionTitle="UN Tour"
          >
            <UNTourView />
          </ProductsLayout>
        ),
      },

      {
        path: "neighbour-tour",
        element: (
          <ProductsLayout
            sectionDescription="Text Goes here - Scenic, Rids/Cruises, Museum/Gallery page contents/layout are the same"
            sectionTitle="Neighbour Tour"
          >
            <NeighbourTourView />
          </ProductsLayout>
        ),
      },
    ],
  },
  //SAN FRANCISCO
  {
    path: "/sf/guide-tour",
    element: (
      <PageLayout cover={CoverTypes.NORMAL}>
        <Outlet />
      </PageLayout>
    ),
    children: [
      {
        path: "manhattan-day",
        element: (
          <ProductsLayout
            sectionDescription="Text Goes here - Scenic, Rids/Cruises, Museum/Gallery page contents/layout are the same"
            sectionTitle="Manhattan day"
          >
            <ManhattanDayTourView />
          </ProductsLayout>
        ),
      },
      {
        path: "sf-museum",
        element: (
          <ProductsLayout
            sectionDescription="Text Goes here - Scenic, Rids/Cruises, Museum/Gallery page contents/layout are the same"
            sectionTitle="Museum"
          >
            <SFMuseumTourView />
          </ProductsLayout>
        ),
      },
      {
        path: "manhattan-night",
        element: (
          <ProductsLayout
            sectionDescription="Text Goes here - Scenic, Rids/Cruises, Museum/Gallery page contents/layout are the same"
            sectionTitle="Manhattan night"
          >
            <ManhattanNightTourView />
          </ProductsLayout>
        ),
      },
    ],
  },

  // NIAGRA
  {
    path: "/nf/guide-tour",
    element: (
      <PageLayout cover={CoverTypes.NORMAL}>
        <Outlet />
      </PageLayout>
    ),
    children: [
      {
        path: "manhattan-day",
        element: (
          <ProductsLayout
            sectionDescription="Text Goes here - Scenic, Rids/Cruises, Museum/Gallery page contents/layout are the same"
            sectionTitle="Manhattan day"
          >
            <ManhattanDayTourView />
          </ProductsLayout>
        ),
      },
      {
        path: "sf-museum",
        element: (
          <ProductsLayout
            sectionDescription="Text Goes here - Scenic, Rids/Cruises, Museum/Gallery page contents/layout are the same"
            sectionTitle="Museum"
          >
            <SFMuseumTourView />
          </ProductsLayout>
        ),
      },
      {
        path: "manhattan-night",
        element: (
          <ProductsLayout
            sectionDescription="Text Goes here - Scenic, Rids/Cruises, Museum/Gallery page contents/layout are the same"
            sectionTitle="Manhattan night"
          >
            <ManhattanNightTourView />
          </ProductsLayout>
        ),
      },
    ],
  },

  // {
  //   path: "/ls",
  //   element: (
  //     <PageLayout cover={CoverTypes.NORMAL}>
  //       <Outlet />
  //     </PageLayout>
  //   ),
  //   children: [
  //     {
  //       path: "show",
  //       element: (
  //         <ProductsLayout sectionDescription="Text Goes here..." sectionTitle="Las Entrance">
  //           <LasEntranceView />
  //         </ProductsLayout>
  //       ),
  //     },
  //     {
  //       path: "canyon",
  //       element: (
  //         <ProductsLayout sectionDescription="Text Goes here..." sectionTitle="Caynon Entrance">
  //           <CanyonEntranceView />
  //         </ProductsLayout>
  //       ),
  //     },
  //   ],
  // },

  {
    path: "/ls",
    element: (
      <PageLayout cover={CoverTypes.NORMAL}>
        <Outlet />
      </PageLayout>
    ),
    children: [
      {
        path: "ls-entry",
        element: (
          <ProductsLayout sectionDescription="Text Goes here..." sectionTitle="Las Entrance">
            <LasEntranceView />
          </ProductsLayout>
        ),
      },

      {
        path: "canyon-entry",
        element: (
          <ProductsLayout sectionDescription="Text Goes here..." sectionTitle="Las Entrance">
            <CanyonEntranceView />
          </ProductsLayout>
        ),
      },



      // {
      //   path: "camping-car",
      //   element: (
      //     <ProductsLayout sectionDescription="Text Goes here..." sectionTitle="Bos bus">
      //      <LasCampingCarView/>
      //     </ProductsLayout>
      //   ),
      // },
      // {
      //   path: "canyon-tour",
      //   element: (
      //     <ProductsLayout sectionDescription="Text Goes here..." sectionTitle="Bos museum">
      //       <LasCanyonTourView />
      //     </ProductsLayout>
      //   ),
      // },
    ],
  },

  {
    path: "/cy",
    element: (
      <PageLayout cover={CoverTypes.NORMAL}>
        <Outlet />
      </PageLayout>
    ),
    children: [
      {
        path: "show",
        element: (
          <ProductsLayout sectionDescription="Text Goes here..." sectionTitle="Las Entrance">
            <LasVegasShowView />
          </ProductsLayout>
        ),
      },

      {
        path: "camping-car",
        element: (
          <ProductsLayout sectionDescription="Text Goes here..." sectionTitle="Bos bus">
            <LasCampingCarView />
          </ProductsLayout>
        ),
      },
      {
        path: "canyon-tour",
        element: (
          <ProductsLayout sectionDescription="Text Goes here..." sectionTitle="Bos museum">
            <LasCanyonTourView />
          </ProductsLayout>
        ),
      },
    ],
  },

  {
    path: "/boston",
    element: (
      <PageLayout cover={CoverTypes.NORMAL}>
        <Outlet />
      </PageLayout>
    ),
    children: [
      {
        path: "ivy-league",
        element: (
          <ProductsLayout sectionDescription="Text Goes here..." sectionTitle="Bos ivy-league">
            <BostonIvyLeagueView />
          </ProductsLayout>
        ),
      },

      {
        path: "observation-cruise",
        element: (
          <ProductsLayout
            sectionDescription="Text Goes here..."
            sectionTitle="Bos observation-cruise"
          >
            <BostonObservationsView />
          </ProductsLayout>
        ),
      },

      {
        path: "bus",
        element: (
          <ProductsLayout sectionDescription="Text Goes here..." sectionTitle="Bos bus">
            <BostonBusView />
          </ProductsLayout>
        ),
      },
      {
        path: "gallery-museum",
        element: (
          <ProductsLayout sectionDescription="Text Goes here..." sectionTitle="Bos museum">
            <BostonMuseumView />
          </ProductsLayout>
        ),
      },
    ],
  },

  {
    path: "/nf",
    element: (
      <PageLayout cover={CoverTypes.NORMAL}>
        <Outlet />
      </PageLayout>
    ),
    children: [
      {
        path: "cruise",
        element: (
          <ProductsLayout sectionDescription="Text Goes here..." sectionTitle="Bos ivy-league">
            <FallCruiseView />
          </ProductsLayout>
        ),
      },

      {
        path: "entry",
        element: (
          <ProductsLayout
            sectionDescription="Text Goes here..."
            sectionTitle="Bos observation-cruise"
          >
            <FallEntryView />
          </ProductsLayout>
        ),
      },

      {
        path: "activity",
        element: (
          <ProductsLayout sectionDescription="Text Goes here..." sectionTitle="Bos bus">
            <FallActivityView />
          </ProductsLayout>
        ),
      },

      {
        path: "tour",
        element: (
          <ProductsLayout sectionDescription="Text Goes here..." sectionTitle="Bos bus">
            <FallTourView />
          </ProductsLayout>
        ),
      },

      {
        path: "sim",
        element: (
          <ProductsLayout sectionDescription="Text Goes here..." sectionTitle="Bos bus">
            <FallSimView />
          </ProductsLayout>
        ),
      },

      // {
      //   path: "sim-card",
      //   element: (
      //     <ProductsLayout sectionDescription="Text Goes here..." sectionTitle="Bos bus">
      //       <FallSimView />
      //     </ProductsLayout>
      //   ),
      // },
    ],
  },



  {
    path: "/hls/city",
    element: (
      <PageLayout cover={CoverTypes.NORMAL}>
        <Outlet/>
      </PageLayout>
    ),
    children: [
      {
        path: "hawaii",
        element: (
          <ProductsLayout sectionDescription="Text Goes here..." sectionTitle="Las Entrance">
            <HawaiiView/>
          </ProductsLayout>
        ),
      },

      {
        path: "losangeles",
        element: (
          <ProductsLayout sectionDescription="Text Goes here..." sectionTitle="Bos bus">
            <LosAngelesView />
          </ProductsLayout>
        ),
      },
      {
        path: "santacatalina",
        element: (
          <ProductsLayout sectionDescription="Text Goes here..." sectionTitle="Bos museum">
            <SantaCatalinaView />
          </ProductsLayout>
        ),
      },

      {
        path: "sandiego",
        element: (
          <ProductsLayout sectionDescription="Text Goes here..." sectionTitle="Bos museum">
            <SanDiegoView />
          </ProductsLayout>
        ),
      },




    ],
  },



  // {
  //   path: "/musicals-and-shows",
  //   element: (
  //     <PageLayout cover={CoverTypes.SHOWS}>
  //       <ProductsLayout
  //         sectionDescription="뉴욕 빅애플패스(New York Big Apple Pass)는 뉴욕을 방문하는 여행객들과 로컬들이 즐겨 찾는 관광명소 TOP 37을 자유롭게 선택하여 최대 64%까지 할인받을 수 있는 뉴욕 여행의 필수템이에요! 여행 경비를 절반으로 값싸게. 명소마다 일일이 티켓을 구매하는 번거로움이 한방에 해결하고 더 많은 뉴욕의 구석구석을 방문하며 스마트한 뉴욕 여행을 즐겨보세요."
  //         sectionTitle="Broadway Musicals / Shows"
  //       >
  //         <MusicalsAndShowsView />
  //       </ProductsLayout>
  //     </PageLayout>
  //   ),
  // },

  {
    path: "/sim-card",
    element: (
      <PageLayout cover={CoverTypes.NORMAL}>
        <ProductsLayout sectionDescription="" sectionTitle="Sim Card">
          <SimCardView />
        </ProductsLayout>
      </PageLayout>
    ),
  },

  {
    path: "/ny/sim-card",
    element: (
      <PageLayout cover={CoverTypes.NORMAL}>
        <ProductsLayout sectionDescription="" sectionTitle="Sim Card">
          <SimCardView />
        </ProductsLayout>
      </PageLayout>
    ),
  },
  {
    path: "/musicals_view",
    element: (
      <PageLayout cover={CoverTypes.SHOWS}>
        <ProductsLayout sectionDescription="" sectionTitle="Broadway Musicals / Shows">
          <MusicalView />
        </ProductsLayout>
      </PageLayout>
    ),
  },

  {
    path: "/ny/musicals_view",
    element: (
      <PageLayout cover={CoverTypes.SHOWS}>
        <ProductsLayout sectionDescription="" sectionTitle="Broadway Musicals / Shows">
          <MusicalView />
        </ProductsLayout>
      </PageLayout>
    ),
  },

  {
    path: "/ny/musicals_view/:id",
    element: (
      <PageLayout cover={CoverTypes.NONE}>
        <ProductDetailLayout>
          <MusicalCalendar />
        </ProductDetailLayout>
      </PageLayout>
    ),
  },

  {
    path: "/musicals_view/:id",
    element: (
      <PageLayout cover={CoverTypes.NONE}>
        <ProductDetailLayout>
          <MusicalCalendar />
        </ProductDetailLayout>
      </PageLayout>
    ),
  },
  {
    path: "/musicals-and-shows/:date/:time/:id/:name/:kr_name",
    element: (
      <PageLayout cover={CoverTypes.NONE}>
        <ProductDetailLayout>
          <MusicalsAndShowsView />
        </ProductDetailLayout>
      </PageLayout>
    ),
  },

  {
    path: "/product-detail/:id",
    element: (
      <PageLayout cover={CoverTypes.NONE}>
        <ProductDetailLayout>
          <ProductDetailView />
        </ProductDetailLayout>
      </PageLayout>
    ),
  },
  {
    path: "/show-detail/:id",
    element: (
      <PageLayout cover={CoverTypes.NONE}>
        <ProductDetailLayout>
          <ShowDetailView />
        </ProductDetailLayout>
      </PageLayout>
    ),
  },
  {
    path: "/cart",
    element: (
      <PageLayout cover={CoverTypes.NORMAL}>
        <CartView />
      </PageLayout>
    ),
  },
  {
    path: "/no-auth-checkout",
    element: (
      <PageLayout cover={CoverTypes.NONE}>
        <NoAuthCheckoutView />
      </PageLayout>
    ),
  },
  {
    path: "/checkout",
    element: (
      <PageLayout cover={CoverTypes.NONE}>
        <Checkout />
      </PageLayout>
    ),
  },
  {
    path: "/stripe",
    element: (
      <PageLayout cover={CoverTypes.NONE}>
        <PaymentForm />
      </PageLayout>
    ),
  },
  {
    path: "/my-page",
    element: (
      <PageLayout cover={CoverTypes.NORMAL_WITHOUT_TEXT} backgroundColor="bg-[#f2f2f2]">
        <BookingsLayout>
          <BookingsView />
        </BookingsLayout>
      </PageLayout>
    ),
  },

  {
    path: "/return-policy",
    element: (
      <PageLayout cover={CoverTypes.NORMAL}>
        <FooterReturnPolicy />
      </PageLayout>
    ),
  },

  { path: "*", element: <Navigate to="/" replace /> },
]);
