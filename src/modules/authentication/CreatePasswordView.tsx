import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { MainButton } from "../../shared/components/Buttons";
import { MainInput, PasswordInput } from "../../shared/components/Inputs";
import { SpaceY } from "../../shared/components/Utils";
import { CreatePasswordValidator } from "./utils/validations";
import { API } from "../../shared";

const resolver = classValidatorResolver(CreatePasswordValidator);

export const CreatePasswordView = () => {
  // Getting token and email from url from email notification
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');
  const token = queryParams.get('token');
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    // resolver,
  });

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

  // Function to set password confirmation erro
  const setPasswordConformError = (text: any) => {
    if (password !== text && confirmPassword !== text)
      return setError("confirmPassword", {
        message: "비밀번호가 일치하지 않습니다.!",
      });
    else return clearErrors("confirmPassword");
  };

  const onSubmit = async (data: { password: string; confirmPassword: string }) => {
    const { password, confirmPassword } = data;

    if (password !== confirmPassword) {
      return setError("confirmPassword", {
        message: "비밀번호가 일치하지 않습니다.",
      });
    }
    try {
      const res = await  axios
      .post(`${API}/reset-password`, {
        email,
        password,
        password_confirmation: confirmPassword,
        token,
      });


      // console.log("response", res.data[1]);
      // //console.log("response", res, res.data[1]);
      // localStorage.setItem("useremail", email || "");
      // localStorage.setItem("authToken", res.data[1].token);
      // localStorage.setItem("loginData", "email");
      // localStorage.setItem("role", res.data[1].role.id);
      toast.success("고객님의 비밀번호 수정이 성공적으로 되었습니다.!");


      // Redirect to my booking page
      // navigate("/my-bookings");

      // Redirect to login page
      navigate("/user/log-in");
    } catch (error) {
      toast.error("시스템 문제가 발생했습니다. 잠시 후 다시 시도해주세요!");
      console.log("Error:", error);
    }
  };

  return (
    <div className="min-h-[600px] flex flex-col items-center pt-[5vh] pb-[20vh] w-full">
      <SpaceY />
      <span className="text-2xl font-bold font-volkhov text-dark">
      비밀번호 재설정
      </span>
      <SpaceY /> <SpaceY />
      <span className="text-sm font-poppins">
      소중한 고객님의 정보 보호를 위해 비밀번호를 재설정 해주세요. 
      </span>
      <SpaceY /> <SpaceY /> <SpaceY />
      <Controller
        name="password"
        rules={{ required: true }}
        control={control}
        render={({ field }) => (
          <PasswordInput
            containerClassName="w-[300px]"
            error={field.value ? errors.password?.message : ""}
            isPassword
            placeholder="새 비밀번호"
            value={field.value}
            onChange={(value) => {
              field.onChange(value);
              setPasswordError(value);
              setPasswordConformError(value);
              setPassword(value);
            }}
          />
        )}
      />
      <SpaceY />
      <Controller
        name="confirmPassword"
        rules={{ required: true }}
        control={control}
        render={({ field }) => (
          <PasswordInput
            containerClassName="w-[300px]"
            error={field.value ? errors.confirmPassword?.message : ""}
            value={field.value}
            isPassword
            placeholder="비밀번호 재입력"
            onChange={(value) => {
              field.onChange(value);
              setPasswordConformError(value);
              setConfirmPassword(value);
            }}
          />
        )}
      />
      <SpaceY />
      <MainButton
        containerClassName="w-[300px]"
        disabled={Boolean(Object.entries(errors).length)}
        text="비밀번호 변경"
        onClick={handleSubmit(onSubmit)}
      />
    </div>
  );
};
