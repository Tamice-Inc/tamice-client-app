import moment from "moment";
import { staticFiles } from "../../../shared";
import { AiOutlineDelete } from "react-icons/ai";
export const cartViewFirstColClassName = "flex justify-center w-2/12";
export const cartViewRestColClassName = "flex justify-center grow w-2/12";

export enum MedalEnum {
  GOLD,
  SILVER,
  DELUX,
  NONE,
}

export type PropsCardInfo = {
  name: string;
  price: number;
  quantity: number;
  addition: number;
  subtotal: number;
  type?: string;
  onDelete: () => void;
  includes?: {
    scheduledDate?: string;
    name: string;
    medal: MedalEnum;
    addition?: number;
  }[];
};

const medalImages = {
  [MedalEnum.GOLD]: staticFiles.icons.gold_medal,
  [MedalEnum.SILVER]: staticFiles.icons.black_medal,
  [MedalEnum.DELUX]: staticFiles.icons.blue_medal,
};

export const CardInfo: React.FC<PropsCardInfo> = ({
  addition,
  name,
  type,
  price,
  quantity,
  subtotal,
  includes,
  onDelete,
}) => {
  return (
    <div className="flex flex-col pt-4 gap-y-3">
      <div className="flex border border-dashed rounded-t font-poppins text-darkGray border-gray">
        <span
          className={`${cartViewFirstColClassName}  text-blue font-medium underline cursor-pointer`}
        >
          {name}
        </span>
        <div className={cartViewRestColClassName}>{type}</div>{" "}
        <div className={cartViewRestColClassName}> </div>
        <div className={cartViewRestColClassName}> </div>
        <div className={`${cartViewRestColClassName} hidden md:flex`}>
          ${price}
        </div>
        <div className={`${cartViewRestColClassName} `}>{quantity}</div>
        <div className={`${cartViewRestColClassName}`}>${addition}</div>
        <div className={`${cartViewRestColClassName}`}>${subtotal}</div>
        <div
          className={`${`${cartViewRestColClassName}`} text-blue underline cursor-pointer hidden md:flex`}
        >
          <span>edit</span>
          <div onClick={onDelete}>
            <AiOutlineDelete size={28} />
          </div>
        </div>
      </div>

      {includes?.map((included) => (
        <div className="flex font-poppins text-darkGray">
          <span
            className={`${cartViewFirstColClassName} underline flex items-center`}
          >
            <div className="w-1/4">
              {included.medal !== MedalEnum.NONE && (
                <img src={medalImages[included.medal]} />
              )}
            </div>

            <span className="w-3/4">{included.name}</span>
          </span>
          <span className="flex justify-center w-3/12 grow"></span>
          <div className={`${cartViewRestColClassName} hidden md:flex`}>
            {moment(included.scheduledDate).format("LL")}
          </div>
          <div className={`${cartViewRestColClassName}`}></div>
          <div className={`${cartViewRestColClassName}`}></div>
          <div className={`${cartViewRestColClassName}`}>
            {included.addition && "$" + included.addition}
          </div>
          <div className={`${cartViewRestColClassName}`}></div>
          <div className={`${cartViewRestColClassName} hidden md:flex`}></div>
        </div>
      ))}
    </div>
  );
};
