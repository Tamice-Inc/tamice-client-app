import { MainButton, SecondaryButton } from "./Buttons";

export const SplitOrdersModal: React.FC<{
  onDecline: () => void;
  onAccept: () => void;
}> = ({ onAccept, onDecline }) => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative my-6 mx-auto w-[300px]">
          {/*content*/}
          <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none p-5 gap-y-5">
            {/*header*/}
            <div className="flex items-start justify-center font-poppins font-medium text-darkGray">
              Split Orders
            </div>
            {/*body*/}
            <div className="flex flex-col gap-y-3">
              <div className="font-poppins text-darkGray">
                If you click Split Orders, you can manage individual ticket
                separately. Would you like to proceed?
              </div>
              <div className="font-poppins text-darkGray">
                Split Orders 을 누르시면 티켓을 따로 관리 할수 있습니다.
                원하시면 Yes 를 눌러주시고 개별 티켓을 관리하세요.
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-center gap-x-1">
              <MainButton text="YES" onClick={() => onAccept()} />
              <SecondaryButton text="NO" onClick={() => onDecline()} />
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};
