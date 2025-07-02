import { MainButton, SecondaryButton } from "../../shared/components/Buttons";
import { SpaceY } from "../../shared/components/Utils";

export const DeleteAccountView: React.FC = () => (
  <div className="min-h-[600px] flex flex-col items-center pt-[5vh] pb-[20vh] w-full">
    <SpaceY />
    <SpaceY />
    <span className="font-poppins text-red text-sm w-[70vw] max-w-[650px] text-center">
      Do you want to delete your account from our database? If Yes, your data
      will be deleted permanently.
    </span>
    <SpaceY />
    <SpaceY />
    <span className="font-poppins text-red text-sm w-[70vw] max-w-[650px] text-center">
      Would you like to proceed?
    </span>
    <SpaceY />
    <SpaceY />
    <div className="flex justify-between w-[70vw] max-w-[650px]">
      <MainButton onClick={() => {}} text="No" />{" "}
      <SecondaryButton onClick={() => {}} text="Yes" />
    </div>
  </div>
);
