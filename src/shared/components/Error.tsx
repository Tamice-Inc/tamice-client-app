// Component that is used for Errors
const Error = ({ error }: { error: string }) => {
  // Base url
  const baseUrl = window.location.port
    ? `${window.location.protocol}//${window.location.hostname}:${window.location.port}`
    : `${window.location.protocol}//${window.location.hostname}`;

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5">
      <h1 className="text-xl">
        시스템 에러 - 1분 뒤에 닫기를 눌러주시고 다시 시도해주세요!
      </h1>
      <button
        className="w-[100px]  text-base font-poppins text-white bg-blue py-2 h-12 rounded text-base"
        onClick={() => (window.location.href = baseUrl)}
      >
        닫기
      </button>
    </div>
  );
};

export default Error;
