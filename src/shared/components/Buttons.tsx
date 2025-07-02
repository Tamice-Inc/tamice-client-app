import { staticFiles } from "..";

export const GhostButton: React.FC<{
  text: string;
  onClick: () => void;
  disabled?: boolean;
  containerClassName?: string;
}> = ({ text, onClick, disabled, containerClassName = "w-[300px]" }) => {
  const className = `font-poppins font-base text-blue border border-gray py-2 h-12 ${containerClassName}`;
  const disabledClass = `font-poppins font-base text-blue border border-gray py-2 cursor-not-allowed ${containerClassName}`;
  return (
    <button
      className={disabled ? disabledClass : className}
      onClick={() => !disabled && onClick()}
    >
      {text}
    </button>
  );
};

export const MainButton: React.FC<{
  text: string;
  onClick: () => void;
  disabled?: boolean;
  containerClassName?: string;
  
}> = ({ text, onClick, disabled, containerClassName = "h-12 w-full rounded text-base" }) => {
  const className = `font-poppins text-white bg-blue py-2 h-12 rounded text-base ${containerClassName}`;
  const disabledClass = `font-poppins text-white bg-blue py-2 h-12 cursor-not-allowed text-base ${containerClassName}`;
  return (
    <button
      className={disabled ? disabledClass : className}
      onClick={() => !disabled && onClick()}
    >
      {text}
    </button>
  );
};

export const SecondaryButton: React.FC<{
  text: string;
  onClick: () => void;
  disabled?: boolean;
}> = ({ text, onClick, disabled }) => {
  const className =
    "font-poppins font-medium text-white bg-gray w-full py-2 h-12 rounded";
  const disabledClass =
    "font-poppins font-medium text-white bg-gray w-full py-2 cursor-not-allowed rounded";
  return (
    <button
      className={disabled ? disabledClass : className}
      onClick={() => !disabled && onClick()}
    >
      {text}
    </button>
  );
};

export const GoogleButton: React.FC<{ text: string; onClick: () => void }> = ({
  text,
  onClick,
}) => (
  <button
    className="font-poppins font-base border border-gray w-[300px] h-12 flex items-center"
    onClick={() => onClick()}
  >
    <div className="grow w-1/4 flex justify-center items-center">
      <img src={staticFiles.icons.google} alt="google icon" width="35" />
    </div>
    <div className="grow w-1/2">{text}</div>
    <div className="grow w-1/4" />
  </button>
);

export const NaverButton: React.FC<{ text: string; onClick: () => void }> = ({
  text,
  onClick,
}) => (
  <button
    className="font-poppins font-base border border-gray w-[300px] h-12 flex items-center"
    onClick={() => onClick()}
  >
    <div className="grow w-1/4 flex justify-center items-center">
      <img src={staticFiles.icons.naver} alt="naver icon" width="35" />
    </div>
    <div className="grow w-1/2">{text}</div>
    <div className="grow w-1/4" />
  </button>
);
