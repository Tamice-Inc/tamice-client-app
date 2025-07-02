import axios from "axios";
import React, { useState, useEffect } from "react";
import parsePhoneNumberFromString from "libphonenumber-js";
import { getName } from "country-list";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { error } from "console";
import { staticFiles } from "../../shared";
import { PUBLIC_URL } from "../../shared";
import { API } from "../../shared";
import { MainButton } from "../../shared/components/Buttons";
import { SpaceY } from "../../shared/components/Utils";
import { AccountCard } from "./components/AccountCard";

const fakeProfile = {
  picture: `${PUBLIC_URL}/fake/fake_profile_user.png`,
};
export const MyAccountView = () => {
  const [profile, setProfile] = useState<any>({
    name: "David Lee",
    email: "xxx@gmail.com",
    phone: "1-777-777-777",
    koreanName: "이XX",
    country: "USA",
  });
  const navigate = useNavigate();

  const checkTokenExpiration = () => {
    const token = localStorage.getItem("authToken");

    if (token) {
      const decodedToken: any = jwtDecode(token);

      const currentTime = Date.now() / 1000; // Convert current time to seconds

      if (decodedToken.exp < currentTime) {
        // Token has expired, force logout here
        // For example, clear the token from local storage and redirect the user to the login page
        localStorage.removeItem("authToken");
        localStorage.removeItem("loginData");
        localStorage.removeItem("order_number");
        localStorage.removeItem("useremail");

        navigate("/");
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(checkTokenExpiration, 1000); // Check token expiration every second
    return () => clearInterval(intervalId); // Clear the interval when the component unmounts
  }, []);

  React.useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const result = await axios.get(`${API}/profile`, { headers });
      if (result.status === 200) {
        console.log(result.data);
        const phonenum = result.data.user.phone;
        const parsedPhoneN = result.data.user.phone
          ? parsePhoneNumberFromString(phonenum)
          : undefined;
        const countryCode = parsedPhoneN?.country;
        // let countryName = "";
        // if (countryCode){
        //   countryName = getName(countryCode as string);
        // }
        interface dataCredential {
          aud: string;
          azp: string;
          email: string;
          email_verified: boolean;
          exp: number;
          family_name: string;
          given_name: string;
          iss: string;
          jti: string;
          name: string;
          nbf: number;
          picture: string;
          sub: string;
        }
        const countryName = countryCode ? getName(countryCode) : undefined;
        console.log(countryName);
        const loginData = localStorage.getItem("loginData");
        if (loginData == "email") {
          setProfile({
            name: result.data.user.name,
            email: result.data.user.email,
            koreanName: "이XX",
            country: countryName,
            phone: result.data.user.phone,
            firstname: result.data.user.firstname,
            lastname: result.data.user.lastname,
          });
        } else if (loginData == "google") {
          setProfile({
            name: localStorage.getItem("name"),
            email: localStorage.getItem("email"),
            koreanName: "이XX",
            country: "",
            phone: "",
            firstname: result.data.user.firstname,
            lastname: result.data.user.lastname,
          });
        }
      } else {
        console.log("Error: " + result.status);
      }
    }
  };
  const deleteUser = async () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios
        .post(`${API}/delete-my-user`, { headers })
        .then((res) => {
          console.log("scueesfull delete");
          // Handle the response data or perform any necessary actions upon successful registration
        })
        .catch((error) => {
          console.log("Error:", error);
          // Handle the error or display an appropriate message
        });
    }
  };

  const bodyRowClass = "flex w-full justify-between";

  const [showPopup, setShowPopup] = useState(false);

  const handleDelete = () => {
    // Whatever your deleteUser function does.
    deleteUser();
    // Close the popup after deleting
    setShowPopup(false);
  };

  type CustomPopupProps = {
    show: boolean;
    onConfirm: () => void;
    onCancel: () => void;
  };
  const CustomPopup: React.FC<CustomPopupProps> = ({ show, onConfirm, onCancel }) => {
    if (!show) return null;

    return (
      <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full ">
        <div className="flex flex-col bg-white justify-between p-8 rounded w-1/3 gap-8 shadow-xl min-w-[350px] max-w-[500px] min-h-[250px] z-50">
          <div className="flex flex-col justify-center block w-full">
            <div className="flex flex-col items-center justify-center block w-full">
              <img src={staticFiles.images.logo} width="100" alt="tamice logo" />
            </div>
          </div>
          <div className="w-full text-[#5D5D5F] text-center">
            현재까지의 모든 기록이 사라지며 복구가 불가능합니다. 계정을 <br /> 삭제하시려면{" "}
            <span className="underline text-blue"> service@tamice.com </span> 으로 연락주시기
            바랍니다.
          </div>
          <div className="flex justify-center">
            <button className="px-4 py-2 text-white bg-gray-300 rounded bg-blue" onClick={onCancel}>
              확인
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-[600px] flex flex-col items-center pt-[5vh] pb-[20vh] w-full">
      <SpaceY />
      <span className="text-2xl font-bold font-volkhov text-dark\">회원 정보</span>
      <SpaceY /> <SpaceY />
      <div className="w-[70vw] max-w-[900px]">
        <AccountCard
          col1={<img width="50" src={fakeProfile.picture} alt="user avatar" />}
          col2={
            <>
              <div className={bodyRowClass}>
                <span className="text-xs sm:text-sm text-[#5D5D5F]">영문명:</span>
                <span className="text-xs sm:text-sm text-[#5D5D5F]">
                  {profile.firstname} {profile.lastname}
                </span>
              </div>
              <SpaceY />
              <div className={bodyRowClass}>
                <span className="text-xs sm:text-sm text-[#5D5D5F]">이메일:</span>
                <span className="text-xs sm:text-sm text-[#5D5D5F]">{profile.email}</span>
              </div>
              <SpaceY />
              <div className={bodyRowClass}>
                <span className="text-xs sm:text-sm text-[#5D5D5F]">전화번호:</span>
                <span className="text-xs sm:text-sm text-[#5D5D5F]">{profile.phone}</span>
              </div>
            </>
          }
          col3={
            <>
              <div className={bodyRowClass}>
                <span className="text-xs sm:text-sm text-[#5D5D5F]">한글명:</span>
                <span className="text-xs sm:text-sm text-[#5D5D5F]">{profile.name}</span>
              </div>
              <SpaceY />
              <div className={bodyRowClass}>
                <span className="text-xs sm:text-sm text-[#5D5D5F]">국가:</span>
                <span className="text-xs sm:text-sm text-[#5D5D5F]">{profile.country}</span>
              </div>
            </>
          }
        />
        <SpaceY />
        <SpaceY />
        <SpaceY />
        <div>
          <div className="flex justify-end w-full">
            <MainButton text="계정 삭제" onClick={() => setShowPopup(true)} />
          </div>

          <CustomPopup
            show={showPopup}
            onConfirm={handleDelete}
            onCancel={() => setShowPopup(false)}
          />
        </div>
      </div>
    </div>
  );
};
