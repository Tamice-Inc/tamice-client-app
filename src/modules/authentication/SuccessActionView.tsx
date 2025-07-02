import { SpaceY } from "../../shared/components/Utils";

export const SuccessActionView: React.FC<{ msg: string }> = ({ msg }) => (
  <div className="min-h-[600px] flex flex-col items-center pt-[5vh] pb-[20vh] w-full">
    <SpaceY />
    <SpaceY />
    <span className="text-sm font-poppins">{msg}</span>
  </div>
);
