import { Controller, useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useNavigate } from "react-router-dom";
import { MainButton } from "../../shared/components/Buttons";
import { MainInput } from "../../shared/components/Inputs";
import { SpaceY } from "../../shared/components/Utils";
import { NonMemberLoginValidator } from "./utils/validations";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { staticFiles } from "../../shared";
import { API } from "../../shared";
import { orderLookupState } from "../../App";
const resolver = classValidatorResolver(NonMemberLoginValidator);

export const NonMemberLogInView = () => {
  const navigate = useNavigate();
  const [orderLookup, setOrderLookup] = orderLookupState.useState();

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      order_number: "",
    },
    // resolver,
  });

  // Function to set email error
  const setEmailError = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (regex.test(email)) {
      return clearErrors("email");
    } else {
      return setError("email", {
        message: "이메일 형식이 올바르지 않습니다.",
      });
    }
  };

  // Function to set order Number error
  const setOrderError = (order: string) => {
    const hasNineDigitsOnly = /^\d{9}$/.test(order);

    if (hasNineDigitsOnly) {
      return clearErrors("order_number");
    } else {
      return setError("order_number", {
        message: "주문번호는 숫자 9자리 입니다. 입력하신 내용을 다시 확인해 주세요.",
      });
    }
  };

  const onSubmit = async (data: { email: string; order_number: string }) => {
    const { email, order_number } = data;
    axios
      .get(`${API}/order-lookup?email=${email}&order_number=${order_number}`)
      .then(({ data }) => {
        // toast.success("Non-Member Login Successful!");
        localStorage.setItem("orderLoginNumber", order_number);
        localStorage.setItem("orderLoginEmail", email);

        setOrderLookup({ ...orderLookup, orderLoginNumber: order_number, orderLoginEmail: email });

        navigate(`/my-page?email=${email}&order_number=${order_number}`);
      })
      .catch((error) => {
        toast.error(
          <>
            <p>
              마이페이지 조회에 실패했습니다.
              <br /> 입력하신 내용을 다시 확인해 주세요.
            </p>
          </>
        );
      });
  };

  return (
    <div className="min-h-[600px] w-[300px] flex flex-col items-center pt-[5vh] pb-[25vh]">
      <SpaceY />
      <span className="w-[400px] text-2xl font-bold font-volkhov text-dark text-center">
        마이페이지
      </span>
      <div className="w-[300px] py-4  font-normal font-poppins text-[16px]">
        번거로운 로그인 기능. 패스워드 필요 없이 빠르고 간편하게 고객님의 구매정보를 확인하실 수
        있습니다. 상품 구매 시 입력한 고객님의 이메일 주소와 상품 구매 후 받으신 주문번호를 이용하여
        쉽고 간단하게 조회하세요.{" "}
      </div>
      <SpaceY /> <SpaceY />
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
      <Controller
        name="order_number"
        rules={{ required: true }}
        control={control}
        render={({ field }) => (
          <MainInput
            value={field.value}
            error={field.value ? errors.order_number?.message : ""}
            placeholder="주문번호"
            onChange={(text) => {
              field.onChange(text);
              setOrderError(text);
            }}
          />
        )}
      />
      <SpaceY />
      <div className="w-[300px]">
        <MainButton text="마이페이지" onClick={handleSubmit(onSubmit)} />
      </div>
      {/* <img src={staticFiles.icons.warning} /> */}
      <div className="p-6 font-poppins text-[16px]">
        조회에 어려움이 있으시다면 타미스로 문의해 주세요.
      </div>
    </div>
  );
};
