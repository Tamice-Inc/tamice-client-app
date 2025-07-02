import { ReactNode } from "react";

export const Card: React.FC<{
  header?: JSX.Element;
  footer?: JSX.Element;
  children: ReactNode;
}> = ({ header, footer, children }) => {
  const lineClass = "border border-gray rounded w-full my-3";
  return (
    <div className="flex flex-col justify-between items-center p-5 bg-white font-poppins text-sm">
      {header && (
        <>
          {header}
          <hr className={lineClass} />
        </>
      )}

      {children}
      {footer && (
        <>
          <hr className={lineClass} />
          {footer}
        </>
      )}
    </div>
  );
};
