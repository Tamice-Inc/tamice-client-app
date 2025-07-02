import { ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API } from "../../shared";
import { Footer } from "./components/Footer";
import { Top } from "./components/Top";
// import Carousel from "better-react-carousel";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { staticFiles } from "../../shared";
import { useGetTicket } from "../../shared/hooks";


export enum CoverTypes {
    NORMAL,
    NORMAL_WITHOUT_TEXT,
    INFO,
    SHOWS,
    NONE,
}

export const WebPageLayout: React.FC<{
    children: ReactNode;
    cover?: CoverTypes;
    backgroundColor?: string;
}> = ({ children, cover, backgroundColor = "bg-transparent" }) => {
    let { id } = useParams();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios
                    .get(
                        `${API}/templates/${id}/webpage`,
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

    // Add state to keep track of the active index of the Carousel
    const [activeIndex, setActiveIndex] = useState(0);

    // Define a click handler for the first image in the side panel
    const handleImageClick = (id: number) => {
        setActiveIndex(id);
    };

    if (loading) return (
        <div className={`flex flex-col items-center min-h-screen bg-[#F7F8FA] bg-no-repeat`}>
            <Top />
            <div className={` max-w-[1300px] w-full px-4`}>
                <Loading />
            </div>
            <Footer />
        </div>
    );
    
    if (error) return (
        <div className={`flex flex-col items-center min-h-screen bg-[#F7F8FA] bg-no-repeat`}>
            <Top />
            <div className={` max-w-[1300px] w-full px-4`}>
                <Error error={error} />
            </div>
            <Footer />
        </div>
    );

    return (
        <div
            className={`flex flex-col items-center min-h-screen bg-[#F7F8FA] bg-no-repeat`}
        >
            <Top />
            {
                (id == "56" || id == "55" || id == "54" || id == "22") ? 
                    <FooterCover id={id}/>:
                    <Cover header_main_image={data?.header_main_image?.url} first_phrase_header={data?.is_show_header === "1" ? data?.first_phrase_header : null} second_phrase_header={data?.is_show_header === "1" ? data?.second_phrase_header : null} />
            }
            <div className={` max-w-[1300px] w-full px-4`}>
                {children}
            </div>
            <Footer />
        </div>
    );
}

const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-16 h-16 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
        </div>
    );
};

const Error = ({ error }: { error: string }) => {
    return (
        <div className="flex items-center justify-center h-screen">
            <h1 className="text-xl">시스템 문제가 발생했습니다. 잠시 후 다시 시도해주세요! {error}</h1>
        </div>
    );
};


const Cover = ({ header_main_image, first_phrase_header, second_phrase_header }: { header_main_image: any, first_phrase_header: any, second_phrase_header: any }) => (
    <div className="w-full">
        {/* <img alt="" className="w-full" src={header_main_image} /> */}
        <div className="flex justify-center w-full h-1/2">
            <img className="object-cover object-center w-full h-[400px]" src={header_main_image} />
        </div>
        <div className="relative flex justify-center">
            <div className="absolute top-[-180px] lg:top-[-18vw] h-[180px] w-full z-10 flex items-center px-[5vw] max-w-[1300px]">

                <div className="flex-col hidden lg:flex">
                    {first_phrase_header && <span className="text-xl font-semibold text-white font-poppins md:text-3xl">
                        {first_phrase_header}
                    </span>}
                    {second_phrase_header && <span className="font-poppins text-[#EA87FA] text-sm md:text-2xl font-medium">
                        {second_phrase_header}
                    </span>}
                </div>
            </div>
        </div>
    </div>
);

const FooterCover = ({ id } : { id: any }) => {
    if (id == "56") {
        return (
            <div className="w-full">
                <div className="relative flex justify-center w-full h-1/2">
                    <img
                        className="object-cover object-center w-full h-[400px]"
                        src={staticFiles.images?.refund_cover_bg}
                        alt="Background"
                    />
                    <img
                        className="absolute lg:hidden top-[22vh] object-cover object-center h-[80px]"
                        src={staticFiles.images?.refund_mobile_bannerFont}
                        alt="Mobile Banner"
                    />
                    <img
                        // className="absolute hidden lg:block top-[18vh] object-cover object-center"
                        className="absolute hidden object-cover object-center transform -translate-x-1/2 -translate-y-1/2 lg:block top-1/2 left-1/2"
                        src={staticFiles.images?.refund_pc_bannerFont}
                        alt="PC Banner"
                    />
            </div>
            </div>
        );
    } else if (id == "55") {
        return (
            <div className="w-full">
                <div className="relative flex justify-center w-full h-1/2">
                    <img
                        className="object-cover object-center w-full h-[400px]"
                        src={staticFiles.images?.privacy_bg_cover}
                        alt="Background"
                    />
                    <img
                        className="absolute lg:hidden top-[22vh] object-cover object-center h-[80px]"
                        src={staticFiles.images?.refund_mobile_bannerFont}
                        alt="Mobile Banner"
                    />
                    <img
                        // className="absolute hidden lg:block top-[18vh] object-cover object-center"
                        className="absolute hidden object-cover object-center transform -translate-x-1/2 -translate-y-1/2 lg:block top-1/2 left-1/2"
                        src={staticFiles.images?.refund_pc_bannerFont}
                        alt="PC Banner"
                    />
            </div>
            </div>
        );
    } else if (id == "54") {
        return (
            <div className="w-full">
                <div className="relative flex justify-center w-full h-1/2">
                    <img
                        className="object-cover object-center w-full h-[400px]"
                        src={staticFiles.images?.use_term_bg_cover}
                        alt="Background"
                    />
                    <img
                        className="absolute lg:hidden top-[22vh] object-cover object-center h-[80px]"
                        src={staticFiles.images?.refund_mobile_bannerFont}
                        alt="Mobile Banner"
                    />
                    <img
                        // className="absolute hidden lg:block top-[18vh] object-cover object-center"
                        className="absolute hidden object-cover object-center transform -translate-x-1/2 -translate-y-1/2 lg:block top-1/2 left-1/2"
                        src={staticFiles.images?.refund_pc_bannerFont}
                        alt="PC Banner"
                    />
            </div>
            </div>
        );
    } else {
        return (
            <div className="w-full">
                <div className="relative flex justify-center w-full h-1/2">
                    <img
                        className="object-cover object-center w-full h-[400px]"
                        src={staticFiles.images?.travel_term_bg_cover}
                        alt="Background"
                    />
                    <img
                        className="absolute lg:hidden top-[22vh] object-cover object-center h-[80px]"
                        src={staticFiles.images?.refund_mobile_bannerFont}
                        alt="Mobile Banner"
                    />
                    <img
                        // className="absolute hidden lg:block top-[18vh] object-cover object-center"
                        className="absolute hidden object-cover object-center transform -translate-x-1/2 -translate-y-1/2 lg:block top-1/2 left-1/2"
                        src={staticFiles.images?.refund_pc_bannerFont}
                        alt="PC Banner"
                    />
            </div>
            </div>
        );
    }
}