import { Fragment, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { staticFiles } from "..";
import { cityIdState } from "../../App";

export type NavBarElement = {
  path: string;
  name: string;
  dropdownElements?: {
    name: string;
    subPath: string;
    id?: number;
    category_id?: number;
  }[];
  hideDropdownOnMobile?: boolean;
};

const itemClass =
  "px-8 py-2 font-poppins text-sm hover:bg-lightBlue/[.1] rounded-sm text-dark flex justify-center items-center whitespace-nowrap";
const selectedItemClass = "bg-lightBlue/[.1]";

const dropdownContainer = "group relative inline-block";

export const NavBar: React.FC<{
  elements: NavBarElement[];
  isMobile?: boolean;
  handleSignOut?: any;
  setDropdownOpen?: any;
}> = ({ elements, isMobile, handleSignOut, setDropdownOpen }) => {
  // Define navigate and location instance from useNavigate and useLocation Hook
  const navigate = useNavigate();
  const location = useLocation();

  // Define cityId Global state
  const [cityId, setCityId] = cityIdState.useState();

  // Define component state
  const [selected, setSelected] = useState(-1);

  // Mobile View
  if (isMobile) {
    return (
      <div className={"flex flex-col"}>
        {elements.map((el, index) => (
          <Fragment key={index}>
            {el.dropdownElements && el.dropdownElements.length > 0 && !el.hideDropdownOnMobile ? (
              <button
                className={`flex flex-col px-2 py-2 font-poppins bg-white text-sm rounded-sm text-black justify-center items-center whitespace-nowrap ${
                  location.pathname !== "/" &&
                  (el.path.includes(location.pathname) ||
                    location.pathname.includes(el.path))
                    ? `${selectedItemClass}`
                    : ""
                } group/second relative inline-block`}
                onClick={() => {
                  if (index === selected) {
                    setSelected(-1);
                  } else {
                    setSelected(index);
                  }
                }}
              >
                <div className="flex justify-between w-full">
                  {el.name}
                  <img src={staticFiles.icons.down_arrow} />
                </div>
                {index === selected && (
                  <ul className={`top-[100%] font-poppins font-normal text-black min-w-full flex flex-col`}>
                    {el.dropdownElements.map((de, subindex) => (
                      <li
                        key={subindex}
                        className="px-5 py-4 hover:bg-lightBlue/[.1] cursor-pointer flex"
                        onClick={() => {
                          navigate(el.path + "/" + de.subPath);
                          setDropdownOpen(false);
                        }}
                      >
                        {de.name}
                      </li>
                    ))}
                  </ul>
                )}
              </button>
            ) : (
              <button
                className={`flex px-2 py-2 font-poppins text-sm hover:bg-lightBlue/[.1] cursor-pointer rounded-sm text-black items-center whitespace-nowrap ${
                  location.pathname !== "/" &&
                  el.path.includes(location.pathname)
                    ? selectedItemClass
                    : ""
                }`}
                onClick={() => {
                  const authToken = localStorage.getItem("authToken");
                  const loginData = localStorage.getItem("loginData");
                  const orderLoginData = localStorage.getItem("orderLoginNumber") ? true : false;

                  const loginState = (authToken && loginData) || orderLoginData;

                  if (index + 1 === elements.length && loginState) {
                    handleSignOut();
                  }

                  navigate(el.path);
                  setDropdownOpen(false);
                }}
              >
                {el.name}
              </button>
            )}
          </Fragment>
        ))}
      </div>
    );
  }

  // Desktop View
  return (
    <div className={"flex"}>
      {cityId == 36 && (
        <Fragment>
          {elements.map((el, index) => (
            <Fragment key={index}>
              {el.dropdownElements && el.dropdownElements.length > 1 && !((index == 2 && cityId == 36) || (index == 3 && cityId == 36)) ? (
                <button
                  className={`${itemClass} ${
                    location.pathname !== "/" &&
                    (el.path.includes(location.pathname) ||
                      location.pathname.includes(el.path))
                      ? `${selectedItemClass}`
                      : ""
                  } ${dropdownContainer}`}
                  onClick={() => {
                    console.log('CC');
                    navigate(el.path + "/" + el.dropdownElements?.[0].subPath);
                  }}
                >
                  {el.name}
                  <ul className="absolute hidden group-hover:flex group-hover:flex-col bg-white top-[100%] z-[100] font-poppins text-black min-w-full rounded-b-lg shadow-2xl">
                    {el.dropdownElements.map((de, subindex) => (
                      <li
                        key={subindex}
                        className="px-5 py-4 hover:bg-lightBlue/[.1] cursor-pointer flex"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(el.path + "/" + de.subPath);
                        }}
                      >
                        {de.name}
                      </li>
                    ))}
                  </ul>
                </button>
              ) : (
                <button
                  className={`${itemClass} ${
                    location.pathname !== "/" && el.path.includes(location.pathname) ? selectedItemClass : ""
                  }`}
                  onClick={() => {
                    navigate(el.path);
                  }}
                >
                  {el.name}
                </button>
              )}
            </Fragment>
          ))}
        </Fragment>
      )}

      {cityId != 36 && (
        <Fragment>
          {elements.map((el, index) => (
            <Fragment key={index}>
              {el.dropdownElements && el.dropdownElements.length > 1 ? (
                <button
                  className={`${itemClass} ${
                    location.pathname !== "/" &&
                    (el.path.includes(location.pathname) || el.dropdownElements?.filter(e=>location.pathname.includes(e.subPath))?.length > 0)
                      ? `${selectedItemClass}`
                      : ""
                  } ${dropdownContainer}`}
                  onClick={(e) => {
                    // if (el.name !== "뉴욕입장권" && el.name !== "가이드투어") {
                    //   navigate(el.path + "/" + el.dropdownElements?.[0].subPath);
                    // } else {
                    //   e.preventDefault();
                    // }
                    navigate(el.path + "/" + el.dropdownElements?.[0].subPath);

                  }}
                >
                  {el.name}
                  <ul className="absolute hidden group-hover:flex group-hover:flex-col bg-white top-[100%] z-[100] font-poppins text-black min-w-full rounded-b-lg shadow-2xl">
                    {el.dropdownElements.map((de, subindex) => (
                      <li
                        key={subindex}
                        className="px-5 py-4 hover:bg-lightBlue/[.1] cursor-pointer flex"
                        onClick={(e) => {
                          if (de.name !== "뉴욕입장권" && de.name !== "가이드투어" && de.name !== "브로드웨이 뮤지컬") {
                            e.stopPropagation();
                            navigate(el.path + "/" + de.subPath);
                          } else {
                            e.preventDefault();
                          }
                        }}
                      >
                        {de.name}
                      </li>
                    ))}
                  </ul>
                </button>
              ) : (
                <button
                  className={`${itemClass} ${
                    location.pathname !== "/" && el.path.includes(location.pathname) ? selectedItemClass : ""
                  }`}
                  onClick={(e) => {
                    if (el.name !== "뉴욕입장권" && el.name !== "가이드투어") {
                      navigate(el.path);
                    } else {
                      e.preventDefault();
                    }
                  }}
                >
                  {el.name}
                </button>
              )}
            </Fragment>
          ))}
        </Fragment>
      )}
    </div>
  );
};

export type HashNavBarElement = {
  hash: string;
  name: string;
};
