import { staticFiles } from "../../../shared";

// Interface for confirmbox definition
interface ConfirmBoxProps {
  onConfirm: () => void;
}

const ConfirmBox: React.FC<ConfirmBoxProps> = ({ onConfirm }) => {
  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-opacity-50">
      <div className="flex flex-col justify-center bg-white gap-8 p-8 rounded-[10px] w-1/3 shadow-2xl w-[350px] h-[400px] z-50 h-auto">
        <div className="flex flex-col items-center justify-center block w-full">
          <img src={staticFiles.images.logo} width="100" alt="tamice logo" />
        </div>
        <div className="w-full text-black text-center text-lg mb-8">
          <h1>티켓 준비중입니다!</h1>
        </div>
        <div className="w-full h-auto text-black text-start">
          <p className="text-[#009eef]">
            <a href="https://pf.kakao.com/_AAelu" target="_blank">
              타미스 카카오톡 채널
            </a>
          </p>
          <br />
          <p>
            {" "}
            이메일 <span className="text-[#009eef]">
              (service@tamice.com)
            </span>{" "}
          </p>
          <br />
          <p> 전화 (646-684-4848) 로 </p>
          <br />
          <p> 문의해 주세요. </p>
        </div>

        {/* <div className="w-full text-black text-center">Thank you!</div> */}
        <div className="flex justify-center">
          <button
            className="px-4 py-2 mr-2 text-white bg-gray-300 rounded bg-blue"
            onClick={onConfirm}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBox;