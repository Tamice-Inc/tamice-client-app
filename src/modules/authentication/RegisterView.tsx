import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import PasswordStrengthBar from "react-password-strength-bar";
import axios from "axios";
import { strict } from "assert";
import { toast } from "react-toastify";

import { RegisterValidator } from "./utils/validations";
import { MainButton } from "../../shared/components/Buttons";
import { API } from "../../shared";
import { CheckBox, MainInput, PasswordInput, PhoneInput } from "../../shared/components/Inputs";
import { SpaceY } from "../../shared/components/Utils";

const resolver = classValidatorResolver(RegisterValidator);

// Function to extract params from the given url
const extractParams = (url: string) => {
  const urlParams = new URLSearchParams(new URL(url).search);
  const redirect = urlParams.get("redirect");
  return { redirect };
};

// Register Page Component
export const RegisterView = () => {
  // Create a navigate instance from useNavigate Hook
  const navigate = useNavigate();

  // Define search variable to get params from the given url
  const { search } = useLocation(); // ?email=jlfl94@gmail.com&order_number=4388608

  // Extract redirect url from the given url using extractParams function
  let { redirect } = extractParams(`http://localhost:${process.env.REACT_APP_PORT}/my-page${search}`);

  // Define component state variables
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [termsAndConditions, setTermsAndConditions] = useState(false);

  // Define useForm instance
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
    clearErrors,
  } = useForm({
    defaultValues: {
      koreanFullName: "",
      firstname: "",
      lastname: "",
      email: "",
      email_confirmation: "",
      password: "",
      password_confirmation: "",
      phone: "",
    },
    // resolver,
  });

  // Function to handle submit action
  const onSubmit = (data: {
    koreanFullName: string;
    firstname: string;
    lastname: string;
    email: string;
    email_confirmation: string;
    password: string;
    password_confirmation: string;
    phone: string | undefined;
  }) => {
    // Add phonenumber from state to formData
    data.phone = phoneNumber;

    // Call handleRegister function to register by calling BE api
    handleRegister(data);
  };

  // Function to set password confirmation erro
  const setPasswordConformError = (text: any) => {
    if (password !== text && confirmPassword !== text)
      return setError("password_confirmation", {
        message: "비밀번호가 일치하지 않습니다!",
      });
    else return clearErrors("password_confirmation");
  };

  // Function to set email confirmation error
  const setEmailConfirmError = (text: string) => {
    if (email === text || confirmEmail === text) {
      return clearErrors("email_confirmation");
    } else {
      return setError("email_confirmation", {
        message: "이메일이 일치하지 않습니다!",
      });
    }
  };

  // Function to set email error
  const setEmailError = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (regex.test(email)) {
      return clearErrors("email");
    } else {
      return setError("email", {
        message: "유효하지 않은 이메일 주소 입니다.",
      });
    }
  };

  // Function to check if firstname contains numbers
  const checkFirstNameContainNumbers = (text: string) => {
    let num = (text.match(/[0-9]/g) || []).length;

    if (num > 0) {
      return setError("firstname", {
        message: "Please remove the numbers from the name since there are digits present!",
      });
    } else {
      return clearErrors("firstname");
    }
  };

  // Function to check if firstname contains numbers
  const checkkoreanFullNameContainNumbers = (text: string) => {
    let num = (text.match(/[0-9]/g) || []).length;

    if (num > 0) {
      return setError("koreanFullName", {
        message: "Please remove the numbers from the name since there are digits present!",
      });
    } else {
      return clearErrors("koreanFullName");
    }
  };

  // Function to check if lastname contains numbers
  const checkLastNameContainNumbers = (text: string) => {
    let num = (text.match(/[0-9]/g) || []).length;

    if (num > 0) {
      return setError("lastname", {
        message: "Please remove the numbers from the name since there are digits present!",
      });
    } else {
      return clearErrors("lastname");
    }
  };

  // Function to set password error
  const setPasswordError = (password: any) => {
    let caps, small, num, specialSymbol;
    if (password.length < 6) {
      return setError("password", {
        message: "비밀번호는 6자 이상 입니다.",
      });
    } else {
      caps = (password.match(/[A-Z]/g) || []).length;
      small = (password.match(/[a-z]/g) || []).length;
      num = (password.match(/[0-9]/g) || []).length;
      specialSymbol = (password.match(/\W/g) || []).length;
      if (caps < 1) {
        return setError("password", {
          message: "대문자 1개를 넣어주세요",
        });
      } else if (small < 1) {
        return setError("password", {
          message: "소문자 1개를 넣어주세요",
        });
      } else if (num < 1) {
        return setError("password", {
          message: "숫자 1개를 넣어주세요",
        });
      } else if (specialSymbol < 1) {
        return setError("password", {
          message: "기호 하나를 추가해야 합니다: @$! % * ? &",
        });
      }
      return clearErrors("password");
    }
  };

  // Function to handle register action
  const handleRegister = async (data: any) => {
    data.role = 5;
    axios
      .post(`${API}/register`, data)
      .then((res) => {
        toast.success("Registered Successfully!");
        if (redirect) {
          navigate(`/user/log-in?redirect=${redirect}`);
        } else {
          navigate("/user/log-in");
        }
      })
      .catch((error) => {
        // Define err to store response data
        const err = error.response.data;
        console.log("error after calling registe api:", error.response.data, err.errors?.email);

        // Show email duplicate toast only if reponse has email related error
        if (err.errors?.email) {
          toast.error(err.errors.email[0]);
        } else {
          toast.error(`시스템 에러! ${error.response.data.message}`);
        }
      });
  };

  return (
    <div className="flex justify-center">
      <div className="min-h-[600px] w-[300px] flex flex-col  items-center pt-[5vh] pb-[20vh]">
        <SpaceY />
        <span className="text-2xl font-bold font-volkhov text-dark">회원가입</span>
        <SpaceY /> <SpaceY />
        <span className="text-[16px] font-poppins">
          타미스의 회원이 되어보세요! 손쉬운 티켓관리 및 미국에 대한 생생한 정보를 빠르게 받아보실
          수 있습니다.
        </span>
        <SpaceY /> <SpaceY /> <SpaceY />
        <Controller
          name="koreanFullName"
          rules={{ required: true }}
          control={control}
          render={({ field }) => (
            <MainInput
              value={field.value}
              error={errors.koreanFullName?.message}
              placeholder="Full Name (한국이름) *"
              onChange={(text) => {
                checkkoreanFullNameContainNumbers(text);
                field.onChange(text);
              }}
            />
          )}
        />
        <SpaceY />
        <Controller
          name="firstname"
          rules={{ required: true }}
          control={control}
          render={({ field }) => (
            <MainInput
              value={field.value}
              error={errors.firstname?.message}
              placeholder="영문이름 *"
              onChange={(text) => {
                checkFirstNameContainNumbers(text);
                field.onChange(text);
              }}
            />
          )}
        />
        <SpaceY />
        <Controller
          name="lastname"
          rules={{ required: true }}
          control={control}
          render={({ field }) => (
            <MainInput
              value={field.value}
              error={errors.lastname?.message}
              placeholder="영문성 *"
              onChange={(text) => {
                checkLastNameContainNumbers(text);
                field.onChange(text);
              }}
            />
          )}
        />
        <SpaceY />
        <Controller
          name="email"
          rules={{ required: true }}
          control={control}
          render={({ field }) => (
            <MainInput
              value={field.value}
              error={field.value ? errors.email?.message : ""}
              placeholder="이메일 *"
              onChange={(text) => {
                field.onChange(text);
                setEmailError(text);
                setEmail(text);

                setEmailConfirmError(text);
              }}
            />
          )}
        />
        <SpaceY />
        <Controller
          name="email_confirmation"
          rules={{ required: true }}
          control={control}
          render={({ field }) => (
            <MainInput
              value={field.value}
              error={field.value ? errors.email_confirmation?.message : ""}
              placeholder="이메일 재입력 *"
              onChange={(text) => {
                setEmailConfirmError(text);
                setConfirmEmail(text);
                field.onChange(text);
              }}
            />
          )}
        />
        <SpaceY />
        <Controller
          name="password"
          rules={{ required: true }}
          control={control}
          render={({ field }) => (
            <PasswordInput
              value={field.value}
              error={field.value ? errors.password?.message : ""}
              isPassword
              placeholder="비밀번호 *"
              onChange={(text) => {
                setPasswordError(text);
                field.onChange(text);
                setPassword(text);
                setPasswordConformError(text);
              }}
            />
          )}
        />
        <PasswordStrengthBar style={{ width: 300 }} password={password} />
        <SpaceY />
        <Controller
          name="password_confirmation"
          rules={{ required: true }}
          control={control}
          render={({ field }) => (
            <PasswordInput
              value={field.value}
              error={field.value ? errors.password_confirmation?.message : ""}
              isPassword
              placeholder="비밀번호 재입력 *"
              onChange={(text) => {
                setPasswordConformError(text);
                field.onChange(text);
                setConfirmPassword(text);
              }}
            />
          )}
        />
        <SpaceY />
        <PhoneInput
          number={phoneNumber}
          // error={errors.phone?.message}
          // setError={() =>
          //   setError("phone", {
          //     message: "한국번호는 +82 10-1234-5678 형식으로 기입해주세요",
          //   })
          // }
          // clearError={() => clearErrors("phone")}
          onChange={(text) => {
            setPhoneNumber(text);
          }}
        />
        <SpaceY />
        <div className="p-1 text-sm text-darkGray font-poppins">한국번호는 10 1234 5678 형식으로 기입해 주세요.</div><br/>
       
        <div className="flex justify-between items-center w-[300px]">
          <CheckBox
            value={termsAndConditions}
            onCheck={() => setTermsAndConditions((prev) => !prev)}
            containerClass="w-2/12"
          />
          <div className="w-11/12 text-[16px] font-poppins">
            <span
              className="text-blue-500 underline cursor-pointer "
              onClick={() => window.open('/webpage/54', '_blank')}
            >
              이용약관
            </span>
            과{" "}
            <span
              className="text-blue-500 underline cursor-pointer "
              onClick={() => window.open('/webpage/55', '_blank')}
            >
              개인정보처리방침
            </span>
            에 동의합니다.
          </div>
          
        </div>
        <SpaceY />
        <SpaceY />
        <MainButton
          disabled={Boolean(Object.entries(errors).length) || !termsAndConditions}
          text="회원가입"
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </div>
  );
};
