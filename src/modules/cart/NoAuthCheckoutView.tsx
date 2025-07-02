import { MainButton, SecondaryButton } from "../../shared/components/Buttons";
import { SpaceY } from "../../shared/components/Utils";
import { useNavigate } from "react-router-dom";
export const NoAuthCheckoutView = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center px-[5vw] py-[20vh] max-w-[1300px] w-full px-4">
      <div className="w-full text-2xl font-bold leading-tight text-center font-volkhov text-dark lg:text-3xl">
      결제방식을 선택해 주세요
      </div>
      <SpaceY />
      <SpaceY />
      <SpaceY />
      <div className="flex flex-col md:flex-row w-full">
        <div className="flex flex-col items-center w-full p-10 text-center font-poppins gap-y-5">
          <div className="flex flex-col h-3/4 gap-y-5">
            <div className="w-full">로그인/회원가입 후 결제하기</div>
            
          </div>
          <MainButton text="로그인/회원가입" onClick={() => {
            navigate("/user/log-in?redirect=cart");
          }} />
        </div>
        <div className="w-full text-xl font-bold leading-tight text-center font-volkhov md:hidden text-dark lg:text-3xl">
          Or
        </div>
        <div className="flex flex-col items-center w-full p-10 text-center md:border-l md:border-darkGray font-poppins gap-y-5">
          <div className="flex flex-col h-3/4 gap-y-5">
            <div>비회원으로 결제하기</div>
            {/* <div>
              You can create a free Tamice Member profile at any point during
              the checkout process
            </div> */}
          </div>
          <SecondaryButton
            text="비회원"
            onClick={() => {
              navigate("/cart?guestCheckout=true");
            }}
          />
        </div>
      </div>
    </div>
  );
};
