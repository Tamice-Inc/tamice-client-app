import { useNavigate } from "react-router-dom";
import { staticFiles } from "..";

export const Logo: React.FC<{ whiteText?: boolean }> = ({ whiteText }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/")}
      className="flex flex-col justify-center items-center mb-2 w-[150px] xl:cursor-pointer xl:mb-0"
    >
      <img src={staticFiles.images.logo} width="100" alt="tamice logo" />
      <span
        className={`mt-1 font-poppins font-medium text-xs ${
          whiteText ? "text-white" : "text-[#5D5D5F]"
        }`}
      >

      </span>
    </div>
  );
};
