import { useState } from "react";
import { staticFiles } from "../../../shared";
import { CheckBox } from "../../../shared/components/Inputs";
import { SpaceY } from "../../../shared/components/Utils";
import { MedalEnum } from "../../cart/components/CardInfo";

export const ScheduleButton: React.FC<{
  icon: string;
}> = ({ icon }) => {
  const [open, setOpen] = useState(false);
  const [affirmativeSelected, setAffirmativeSelected] = useState(false);

  return (
    <div className="flex justify-center items-center group relative inline-block">
      <img
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer"
        src={icon}
        width={18}
        alt={icon}
      />

      {open && (
        <div className="absolute flex flex-col bg-white z-[100] top-[100%] py-5 px-5 min-h-[200px] min-w-[300px] rounded-b drop-shadow-xl">
          <div className="flex w-full">
            <div className="w-1/3" />
            <span className="w-1/3 flex justify-center font-poppins font-medium items-center">
              Schedule
            </span>
            <div className="w-1/3 flex justify-end items-center">
              <img
                onClick={() => setOpen(false)}
                className="cursor-pointer"
                src={staticFiles.icons.remove}
              />
            </div>
          </div>
          <SpaceY />
          <div className="flex w-full">Ticket Name: Top of The Rock</div>
          <SpaceY />
          <div className="flex w-full">
            You have purchased multiple tickets for Oder Number: TM123456. Would
            you like to book the same date?
          </div>
          <SpaceY />
          <div className="w-full flex justify-evenly">
            <div>
              <CheckBox
                value={affirmativeSelected}
                onCheck={() => setAffirmativeSelected((prev) => !prev)}
              />
             예
            </div>
            <div>
              <CheckBox
                value={!affirmativeSelected}
                onCheck={() => setAffirmativeSelected((prev) => !prev)}
              />
              아니오
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export type PropsBookingCard = {
  name: string;

  quantity: number;
  itemId: number;
  adult_child: "성인" | "아동";

  includes?: {
    scheduledDate: string | undefined;
    name: string;
    medal: MedalEnum;
    addition?: number;
    downloadStatus: string;
  }[];
};

const col2 = "flex justify-center w-1/3 md:w-[20%]";
const col3 = "flex justify-center w-1/3 md:w-[20%]";
const col4 = "hidden md:flex justify-center w-[20%]";
const col5 = "flex justify-center w-1/3 md:w-[10%]";
const col6 = "hidden md:flex flex justify-center w-[20%]";
const col7 = "hidden md:flex justify-center w-1/3 md:w-[10%]";

const medalImages = {
  [MedalEnum.GOLD]: staticFiles.icons.gold_medal,

  [MedalEnum.SILVER]: staticFiles.icons.black_medal,

  [MedalEnum.DELUX]: staticFiles.icons.blue_medal,
};

export const BookingCard: React.FC<PropsBookingCard> = ({
  adult_child,
  name,
  itemId,
  quantity,
  includes,
}) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex flex-col gap-y-3 pb-4 w-full">
      <div
        className={`flex font-poppins text-darkGray border border-dashed border-gray rounded-t cursor-pointer`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className={`text-blue font-medium ${col2}`}>{name}</span>
        <div className={`${col3}`}>{adult_child}</div>
        <div className={`${col4}`}></div>
        <div className={`${col5}`}>{quantity}</div>
        <div className={`${col6}`}></div>
        <div className={`${col7}`}>{itemId}</div>
      </div>

      {open &&
        includes?.map((included) => (
          <div className="flex font-poppins text-darkGray">
            <span className={`underline flex items-center ${col2}`}>
              <div className="w-1/4">
                {included.medal !== MedalEnum.NONE && (
                  <img src={medalImages[included.medal]} />
                )}
              </div>
              <span className="w-3/4">{included.name}</span>
            </span>
            <div className={`${col3}`}></div>
            <div className={`${col4}`}>
              {included.scheduledDate ? (
                included.scheduledDate
              ) : (
                <div className="flex gap-x-2 w-full justify-start items-center">
                  <ScheduleButton icon={staticFiles.icons.calendar} />
                  Schedule
                </div>
              )}
            </div>
            <div className={`${col5}`}></div>
            <div className={`${col6}`}>{included.downloadStatus}</div>
            <div className={`${col7}`}></div>
          </div>
        ))}
    </div>
  );
};
