import { useNavigate } from "react-router-dom";
import { Card } from "../../../shared/components/Card";

export const AccountCard: React.FC<{
  col1: JSX.Element;
  col2: JSX.Element;
  col3: JSX.Element;
}> = ({ col1, col2, col3 }) => {
  const navigate = useNavigate();
  return (
    <Card
      header={
        <div className="flex justify-between items-center w-full">
          <span
            className="text-blue font-medium cursor-pointer"
            onClick={() => navigate("/user/my-account")}
          >
            회원 정보
          </span>
          <span
            className="text-gray underline cursor-pointer"
            onClick={() => navigate("/user/edit-account")}
          >
            개인정보 수정
          </span>
        </div>
      }
    >
      <div className="flex w-full gap-8 flex-col md:flex-row">
        <div className="flex flex-col items-center md:w-2/12 w-full text-[#5D5D5F]">{col1}</div>
        <div className="flex flex-col items-center md:w-5/12 w-full text-[#5D5D5F]">{col2}</div>
        <div className="flex flex-col items-center md:w-5/12 w-full text-[#5D5D5F]">{col3}</div>
      </div>
    </Card>
  );
};
