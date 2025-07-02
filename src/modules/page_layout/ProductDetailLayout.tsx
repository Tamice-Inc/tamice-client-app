import { ReactNode, useEffect, useState } from "react";
// import Carousel from "better-react-carousel";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { staticFiles } from "../../shared";
import { useGetTicket } from "../../shared/hooks";

export const ProductDetailLayout: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { ticket } = useGetTicket();
  // Add state to keep track of the active index of the Carousel
  const [activeIndex, setActiveIndex] = useState(4);
  const [images, setImages] = useState([]);

  // Define a click handler for the first image in the side panel
  const handleImageClick = (id: number) => {
    setActiveIndex(id);
  };

  useEffect(() => {
    let tempImages = ticket?.gallery_images?.map((item: any) => item.url) || [];

    if (ticket?.card_image?.url) {
      tempImages.push(ticket?.card_image?.url);
    }

    setActiveIndex(tempImages.length - 1);
    setImages(tempImages);
  }, [ticket]);
  
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex w-full">
        {/* <Carousel
          cols={1}
          rows={1}
          loop
          containerClassName="flex items-center justify-center border-2 border-transparent w-full lg:w-1/2"
          arrowLeft={
            <div className="absolute left-[30%] top-[45%] z-[1] cursor-pointer lg:left-[5%]">
              <img src={staticFiles.icons.left_arrow} />
            </div>
          }
          arrowRight={
            <div className="absolute right-[30%] top-[45%] z-[1] cursor-pointer lg:right-[5%]">
              <img src={staticFiles.icons.right_arrow} />
            </div>
          }
          // Set the active index of the Carousel based on the state
          activeIndex={activeIndex}
        >
          {images.map((img: string) => (
            <Carousel.Item key={img}>
              <div className="flex justify-center min-h-full">
                <img className="transition-opacity duration-300 hover:opacity-75" src={img} />
              </div>
            </Carousel.Item>
          ))}
        </Carousel> */}
        <Carousel
          className="flex items-center justify-center w-full border-2 border-transparent lg:w-1/2"
          showArrows={true}
          infiniteLoop={true}
          showThumbs={false}
          selectedItem={activeIndex}
          interval={3000}
          onChange={(index: number) => setActiveIndex(index)}
          renderArrowPrev={(onClickHandler: () => void, hasPrev: boolean) =>
            hasPrev && (
              <div
                className="absolute left-0 top-[50%] z-[1] cursor-pointer lg:left-[5%]"
                onClick={onClickHandler}
              >
                <img src={staticFiles.icons.left_arrow} />
              </div>
            )
          }
          renderArrowNext={(onClickHandler: () => void, hasNext: boolean) =>
            hasNext && (
              <div
                className="absolute right-0 top-[50%] z-[1] cursor-pointer lg:right-[5%]"
                onClick={onClickHandler}
              >
                <img src={staticFiles.icons.right_arrow} />
              </div>
            )
          }
        >
          {images.slice(0, images.length).map((img: string) => (
            <div className="flex justify-center min-h-full w-full aspect-[4/3.5]">
              <img className="object-cover object-center w-full h-full transition-opacity duration-300 hover:opacity-75" src={img} />
            </div>
          ))}
        </Carousel>
        <div className="w-1/4 hidden lg:flex border-[3px] border-transparent flex-col gap-y-1">
          <div className="flex justify-center w-full h-1/2 aspect-video">
            <img className="object-cover object-center w-full h-full aspect-video" src={images[0]} onClick={() => handleImageClick(0)} />
          </div>
          <div className="flex justify-center w-full h-1/2 aspect-video">
            <img className="object-cover object-center w-full h-full aspect-video" src={images[2]} onClick={() => handleImageClick(2)} />
          </div>
        </div>
        <div className="w-1/4 hidden lg:flex border-[3px] border-transparent flex-col gap-y-1">
          <div className="flex justify-center w-full h-1/2 aspect-video">
            <img className="object-cover object-center w-full h-full aspect-video" src={images[1]} onClick={() => handleImageClick(1)} />
          </div>
          <div className="flex justify-center w-full h-1/2 aspect-video">
            <img className="object-cover object-center w-full h-full aspect-video" src={images[3]} onClick={() => handleImageClick(3)} />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};
