// MusicalView.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetMusicals } from "../../shared/hooks";
import "./style.css";

export const MusicalView = () => {
  const navigate = useNavigate();
  const [selectedPrice, setSelectedPrice] = useState(null);
  const { tickets } = useGetMusicals({
    category: 57,
    guideFilter: true,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="musical-grid-container">
      {tickets?.map((ticket) => (
        <div
          key={ticket.id}
          className="musical-card"
          onClick={() => navigate(`/musicals_view/${ticket.id}`)}
        >
          <img src={ticket.image} alt={ticket.name} className="musical-image min-h-3/4" />
          <div className="musical-info w-full flex-row justify-center items-center">
            <div className="musical-title w-full sm:h-auto flex-row">
              <h3 className=" text-left text-[11px] sm:text-[15px] font-bold">{ticket.name}</h3>
              <h3 className="text-left  font-black text-[13px] sm:text-[20px] font-bold"> {ticket.kr_name}</h3>
            </div>

            <div className="flex justify-end items-center">
              <p className="musical-price flex justify-end items-center line-through mx-4">
                ${ticket.adultSitePrice}
              </p>
              <p className="musical-price flex justify-end items-center mr-4 text-[20px] text-black">
                ${ticket.adultPrice} ~
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
