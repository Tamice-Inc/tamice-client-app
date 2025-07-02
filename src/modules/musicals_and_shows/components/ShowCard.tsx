import { musicState } from "../../../App";
import { staticFiles } from "../../../shared";

// Type for ShowCard Component Definition
export type ShowCardProps = {
  product_id: string;
  product_code: string;
  name: string;
  price: string;
  product_date_time: string;
  regular_price: number;
  description: string;
  sell_price: string;
  include: string;
  title_kr: string;
};

export const ShowCard: React.FC<ShowCardProps> = ({
  product_id,
  product_code,
  name = "musical product title",
  price,
  product_date_time,
  regular_price,
  description,
  sell_price,
  include,
}) => {
  // Create a navigate instance from useNavigate Hook
  // const navigate = useNavigate();

  // Define Global State variables
  const [selectedMusic, setSelectedMusic] = musicState.useState();

  // Define Component State variables
  // const [selected, setSelected] = useState(false);

  // Function to handle State change
  const handleStateChange = () => {
    localStorage.setItem("music", product_id);
    localStorage.setItem(
      "musicData",
      JSON.stringify({
        product_id,
        product_code,
        name,
        description,
        product_date_time,
        regular_price,
        sell_price,
        price,
        include,
        title_kr: "",
      })
    );

    setSelectedMusic({ music_id: product_id });
  };

  return (
    <>
      <div
        className="flex items-center w-full py-4 bg-white sm:flex gap-x-4 text-dark"
        onClick={handleStateChange}
        style={{ cursor: "pointer" }}
      >
        <div className="flex items-center justify-center w-1/12">
          <img
            width={20}
            src={
              selectedMusic.music_id == product_id
                ? staticFiles.icons.green_check
                : staticFiles.icons.black_check
            }
          />
        </div>
        <div className="flex-col w-7/12 font-poppins">
          <span className="seat-location text-[#5D5D5F]">{description}</span>
        </div>
        {/* <div className="flex flex-col w-3/12 font-poppins">
          <span className="text-center text-[#5D5D5F]" style={{ textDecorationLine: 'line-through' }}>${regular_price || "0"}</span>
        </div> */}
        <div className="flex-col w-2/12 p-2 border-l border-gray gap-y-7">
          <div className="flex-col text-center">
            {/* <span className="mr-2 text-sm font-poppins text-gray">From</span> */}
            <span className="font-poppins text-[#5D5D5F]">
              $
              {price
                ? parseFloat(String(Number(price) + 10)).toFixed(2)
                : "0.00"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
