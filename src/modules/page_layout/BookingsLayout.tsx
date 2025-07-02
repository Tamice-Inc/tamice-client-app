import { ReactNode, useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../shared";
import { SpaceY, convertLink } from "../../shared/components/Utils";

export const BookingsLayout: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchData = async () => {
          setLoading(true);
          try {
              const response = await axios
                  .get(
                      `${API}/templates/83/webpage`,
                  );

              console.log(response)
              setData(response.data)
          } catch (error: any) {
              console.log(error);
              setError(error?.message);
          } finally {
              setLoading(false);
          }
      }

      fetchData();
  }, []);

  return (
    <div className="min-h-[100px] flex flex-col justify-center w-full">
      <SpaceY />
      <div className="flex flex-col w-full p-8 bg-white gap-y-10">
        <div
            dangerouslySetInnerHTML={{
              __html: convertLink(data?.content_page || ""),
            }}
          >
        </div>
      </div>
      <SpaceY />
      {children} <SpaceY />
    </div>
  );
};
