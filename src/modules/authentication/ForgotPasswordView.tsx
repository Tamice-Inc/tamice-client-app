import { Controller, useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { toast } from "react-toastify";
import axios from "axios";

import { API } from "../../shared";
import { MainButton } from "../../shared/components/Buttons";
import { MainInput } from "../../shared/components/Inputs";
import { SpaceY } from "../../shared/components/Utils";
import { ForgotPasswordValidator } from "./utils/validations";

const resolver = classValidatorResolver(ForgotPasswordValidator);

export const ForgotPasswordView = () => {
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver,
  });

  // Function to set email error
  const setEmailError = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (regex.test(email)) {
      return clearErrors("email");
    } else {
      return setError("email", {
        message: "잘못된 이메일 주소 입니다.",
      });
    }
  };

  const onSubmit = async (data: { email: string }) => {
    try {
      if (data.email == "")
        return setError("email", {
          message: "이메일을 입력해주세요",
        });

      const response = await axios.post(`${API}/forgot-password`, { email: data.email });
      toast.success("이메일을 성공적으로 전송했습니다.");
    } catch (error: any) {
      console.log("error:", error);
      if (error?.response?.status == 500) {
        toast.error("내부 서버 오류입니다. 나중에 다시 시도해주세요!!");
      } else {
        toast.error("회원 가입되어 있지 않은 계정입니다.");
      }
    }
  };

  return (
    <div className="flex justify-center">
      <div className="min-h-[600px] w-[300px] flex flex-col  items-center pt-[60px]">
        {/* <SpaceY /> */}
        <span className="text-2xl font-bold font-volkhov text-dark">
          비밀번호 찾기
        </span>
        <SpaceY /> <SpaceY />
        <div className="w-full text-[16px] text-left font-poppins">
          <span>이메일을 입력해주세요</span>
        </div>
        <SpaceY />
        <Controller
          name="email"
          rules={{ required: true }}
          control={control}
          render={({ field }) => (
            <MainInput
              value={field.value}
              error={field.value ? errors.email?.message : ""}
              placeholder="이메일"
              onChange={(text) => {
                field.onChange(text);
                setEmailError(text);
              }}
            />
          )}
        />
        <SpaceY />
        <MainButton
          disabled={Boolean(Object.entries(errors).length)}
          onClick={handleSubmit(onSubmit)}
          text="비밀번호 초기화"
        />
      </div>
    </div>
  );
};
