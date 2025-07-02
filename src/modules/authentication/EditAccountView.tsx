import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import jwtDecode from 'jwt-decode'
import { useNavigate } from "react-router-dom";
import parsePhoneNumberFromString from "libphonenumber-js";
import { getName } from "country-list";
import { toast } from "react-toastify";

import { useMutation } from "@tanstack/react-query";
import { poster } from "../../shared";
import { useAuth } from "../../shared/hooks";
import { PUBLIC_URL } from "../../shared";
import { MainButton } from "../../shared/components/Buttons";
import { MainInput, PhoneInput } from "../../shared/components/Inputs";
import { SpaceY } from "../../shared/components/Utils";
import { API } from "../../shared";
import { AccountCard } from "./components/AccountCard";
import { EditAccountValidator } from "./utils/validations";

const fakeProfile = {
  picture: `${PUBLIC_URL}/fake/fake_profile_user.png`,
  name: "David Lee",
  email: "xxx@gmail.com",
  phone: "1-777-777-777",
  koreanName: "이XX",
  country: "USA",
};

const resolver = classValidatorResolver(EditAccountValidator);

export const EditAccountView = () => {
  const { authToken } = useAuth();
  const token = localStorage.getItem("authToken");
  const [phone, setPhone] = useState<string | undefined>(fakeProfile.phone);
  const [profile, setProfile] = useState<any>({
    name: "David Lee",
    email: "xxx@gmail.com",
    phone: "1-777-777-777",
    koreanName: "이XX",
    country: "USA",
    id: 0,
    company_id:"",
    firstname: "",
    lastname: "",
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

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const result = await axios.get(
        `${API}/profile`,
        { headers }
      );
      if (result.status === 200) {
        console.log(result.data);
        const phonenum = result.data.user.phone;
        const parsedPhoneN = phonenum ? parsePhoneNumberFromString(phonenum) : undefined;
        const countryCode = parsedPhoneN?.country;
        // let countryName = "";
        // if (countryCode){
        //   countryName = getName(countryCode as string);
        // }
        interface dataCredential {
          aud: string,
          azp: string,
          email: string,
          email_verified: boolean,
          exp: number,
          family_name: string,
          given_name: string,
          iss: string,
          jti: string,
          name: string,
          nbf: number,
          picture: string,
          sub: string
        };
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
            id: result.data.user.id,
            company_id: result.data.user.company_id,
            firstname: result.data.user.firstname,
            lastname: result.data.user.lastname,
          });
          setPhone(result.data.user.phone);         
          // setPhone("1-777-777-777");
        } else if (loginData == "google") {

          setProfile({
            name: localStorage.getItem("name"),
            email: localStorage.getItem("email"),
            koreanName: "이XX",
            country: "",
            phone: "",
          });
        }

      } else {
        console.log("Error: " + result.status);
      }
    }
  };

  const bodyRowClass = "flex w-full justify-between ";
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      phone: "",
      password: "",
      confirmPassword: "",
    },
    resolver,
  });

  const { mutateAsync: onUpdate } = useMutation(
    poster(`/profile-update`, token as string, "POST")
  );

  const onSubmit = async (data: { password: string; confirmPassword: string }) => {
    if (data.password !== data.confirmPassword)
      return setError("confirmPassword", {
        message: "비밀번호가 일치하지 않습니다.",
      });
    console.log(data, phone);

    const updatingData = {
      fullname: profile.name,
      firstname: profile.firstname,
      lastname: profile.lastname,
      company_id: profile.company_id,
      email: profile.email,
      email_confirmation: profile.email,
      phone: phone,
      password: data.password,
      password_confirmation: data.confirmPassword,
      role: 1,
      id: profile.id
    }

    await onUpdate({'phone': phone})
      .then(() => {
        toast.success("데이터가 성공적으로 업데이트되었습니다.");
        // toast.success("Data updated successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.error);
      })
      .finally(() => {
        // alert("finally")
      });
  };
  

  return (
    <div className="min-h-[600px] flex flex-col items-center pt-[5vh] pb-[20vh] w-full">
      <SpaceY />
      <span className="text-2xl font-bold font-volkhov text-dark">
      회원 정보 수정
      </span>
      <SpaceY />
      {/* <span className="text-sm font-poppins">
        Please update your phone number and password
      </span> */}
      <SpaceY /> <SpaceY />
      <div className="w-[70vw] max-w-[900px]">
        <AccountCard
          col1={<img width="50" src={profile.avatar ? profile.avatar : fakeProfile.picture} alt="user avatar" />}
          col2={
            <>
              <div className={bodyRowClass}>
                <span className="text-xs sm:text-sm text-[#5D5D5F]">영문명:</span>
                <span className="text-xs sm:text-sm text-[#5D5D5F]">{profile.firstname}{' '}{profile.lastname}</span>
              </div>
              <SpaceY />
              <div className={bodyRowClass}>
                <span className="text-xs sm:text-sm text-[#5D5D5F]">이메일:</span>
                <span className="text-xs sm:text-sm text-[#5D5D5F]">{profile.email}</span>
              </div>
              <SpaceY />
              <div className={bodyRowClass}>
                <span className="text-xs sm:text-sm text-[#5D5D5F]">전화번호:</span>
                
                <div className="flex flex-col">
                  <PhoneInput
                    number={phone}
                    // clearError={clearErrors}
                    // setError={() =>
                    //   setError("phone", {
                    //     message: "한국번호는 +82 10-1234-5678 형식으로 기입해주세요",
                    //   })
                    // }
                    // containerClassName="max-w-[200px] w-[13vw] min-w-[150px] h-12 text-xs sm:text-sm text-[#5D5D5F]"
                    // error={errors.phone?.message}
                    onChange={(value) => setPhone(value)}
                  />
                         <SpaceY />
                       <div className="p-1 text-sm text-darkGray font-poppins">한국번호는 10 1234 5678 형식으로 기입해 주세요.</div><br/>
                </div>
                
              </div>
              <SpaceY />
              
              {/* <div className={bodyRowClass}>
                <span className="text-xs sm:text-sm text-[#5D5D5F]">Password:</span>
                <div className="flex flex-col">
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <MainInput
                        value={field.value}
                        containerClassName="max-w-[200px] w-[13vw] min-w-[150px] h-12 text-xs sm:text-sm"
                        error={errors.password?.message}
                        isPassword
                        placeholder="Create a new password"
                        onChange={(value) => field.onChange(value)}
                      />
                    )}
                  />
                  <SpaceY />
                  <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                      <MainInput
                        value={field.value}
                        containerClassName="max-w-[200px] w-[13vw] min-w-[150px] h-12 text-xs sm:text-sm"
                        error={errors.confirmPassword?.message}
                        isPassword
                        placeholder="Confirm password"
                        onChange={(value) => field.onChange(value)}
                      />
                    )}
                  />
                </div>
              </div> */}
            </>
          }
          col3={
            <>
              <div className={bodyRowClass}>
                <span className="text-xs sm:text-sm text-[#5D5D5F]" >한글명:</span>
                <span className="text-xs sm:text-sm text-[#5D5D5F]">{profile.name}</span>
              </div>
              <SpaceY />
              <div className={bodyRowClass}>
                <span className="text-xs sm:text-sm text-[#5D5D5F]">국가:</span>
                <span className="text-[#5D5D5F]">{profile.country}</span>
              </div>
            </>
          }
        />
        <SpaceY />
        <SpaceY />
        <SpaceY />
        <div className="flex justify-end w-full">
          <MainButton
            disabled={Boolean(Object.entries(errors).length)}
            text="Save"
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </div>
    </div>
  );
};
