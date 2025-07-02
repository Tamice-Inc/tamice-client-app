import { E164Number } from "libphonenumber-js";
import { useEffect, useState } from "react";
import { Icon } from "react-icons-kit";
import { eye } from "react-icons-kit/feather/eye";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import ReactPhoneInput, { Country } from "react-phone-number-input";
import { staticFiles } from "..";
import { phoneUtils } from "../utils";

export const MainInput: React.FC<{
  placeholder: string;
  onChange: (val: string) => void;
  isPassword?: boolean;
  error?: string;
  containerClassName?: string;
  value: string;
  disabled?: boolean;
}> = ({
  placeholder,
  onChange,
  isPassword,
  error,
  containerClassName = "w-full",
  value,
  disabled = false,
}) => (
  <div className={containerClassName}>
    <input
      disabled={disabled ? disabled : false}
      value={value}
      type={isPassword ? "password" : "text"}
      className="w-full h-12 p-2 border font-poppins border-gray"
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
    {error && (
      <span className="w-full text-xs font-poppins text-red">{error}</span>
    )}
  </div>
);

export const PasswordInput: React.FC<{
  placeholder: string;
  onChange: (val: string) => void;
  isPassword?: boolean;
  error?: string;
  containerClassName?: string;
  value: string;
  disabled?: boolean;
}> = ({
  placeholder,
  onChange,
  isPassword,
  error,
  containerClassName = "w-full",
  value,
  disabled = false,
}) => {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  return (
    <div className={`${containerClassName} relative`}>
      <input
        disabled={disabled ? disabled : false}
        value={value}
        type={type}
        className="w-full h-12 p-2 border font-poppins border-gray"
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      <span
        className="absolute right-0 flex items-center justify-around top-5"
        onClick={handleToggle}
      >
        <Icon className="absolute mr-10" icon={icon} size={15} />
      </span>
      {error && (
        <span className="w-full text-xs font-poppins text-red">{error}</span>
      )}
    </div>
  );
};

export const PhoneInput: React.FC<{
  onChange: (val: string | undefined) => void;
  error?: string;
  setError?: () => void;
  clearError?: () => void;
  containerClassName?: string;
  number: string | undefined;
  disabled?: boolean;
}> = ({
  onChange,
  error,
  setError,
  clearError,
  containerClassName = "w-[300px]",
  number,
  disabled = false,
}) => {
  const [code, setCode] = useState<Country>("KR");

  return (
    <div className={containerClassName}>
      <ReactPhoneInput
        maxLength={17}
        defaultCountry={code}
        onCountryChange={(val) => {
          if (val && number) {
            setCode(val);
          }
        }}
        className="w-full h-12 p-2 bg-white border font-poppins border-gray"
        placeholder="연락처 *"
        disabled={disabled ? disabled : false}
        value={number as E164Number}
        onChange={(val) => {
          onChange(val);
          if (!val) {
            return clearError && clearError();
          }

          if (!phoneUtils.isValidNumber(val || "", code)) {
            setError && setError();
          } else {
            clearError && clearError();
          }
        }}
      />
      {error && (
        <span className="w-full text-xs font-poppins text-red">{error}</span>
      )}
    </div>
  );
};

export const CheckBox: React.FC<{
  onCheck: () => void;
  containerClass?: string;
  value: boolean;
}> = ({ containerClass, value, onCheck }) => {
  if (containerClass)
    <div className={containerClass}>
      <input type="checkbox" className="border border-gray" />
    </div>;
  return (
    <input
      checked={value}
      type="checkbox"
      onClick={() => onCheck()}
      className="border border-gray"
    />
  );
};

export const SelectInput: React.FC<{
  containerClassName?: string;
  id?: string; // Add an id prop
  options: { text: string; value: string }[];
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}> = ({
  containerClassName = "w-[100%] flex",
  id,
  options,
  selected,
  setSelected,
}) => {
  useEffect(() => {
    if (!selected) {
      setSelected(options[0]?.value);
    }
  }, []);

  return (
    <div className={containerClassName}>
      {/* Render your select input here */}
      <select
        id={id} // Apply the id to the select element
        className=""
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        style={{
          width: "100%",
          height: "50px",
          border: "1px solid grey",
          WebkitAppearance: "none",
          MozAppearance: "none",
          background: "transparent",
          backgroundImage: `url(${staticFiles.icons.down_arrow})`,
          backgroundRepeat: "no-repeat",
          backgroundPositionX: "90%",
          backgroundPositionY: "center",
          borderRadius: "2px",
          // marginRight: '2rem',
          padding: "0rem 1rem 0rem 1rem",
          paddingRight: "2rem",
          outline: "none",
          color: "#5D5D5F",
          fontSize: "16px",
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};
