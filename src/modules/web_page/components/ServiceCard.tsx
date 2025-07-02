export type ServiceCardProps = {
  icon: string;
  title: string;
  description: string;
};

export const ServiceCard: React.FC<ServiceCardProps> = ({
  description,
  icon,
  title,
}) => (
  <div className="gap-y-3 flex flex-col items-center text-poppins rounded-b-xl px-5 py-5 w-full min-w-[200px] drop-shadow-xl bg-white text-[#5D5D5F]">
    <img width="45" src={icon} alt="service icon" />
    <span className="text-center">{title}</span>
    <div className="text-sm">{description}</div>
  </div>
);
