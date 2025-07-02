/* eslint-disable jsx-a11y/anchor-is-valid */
import { Controller, useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useNavigate, useLocation } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import { GoogleButton, MainButton, NaverButton } from "../../shared/components/Buttons";
import { MainInput, PasswordInput } from "../../shared/components/Inputs";
import { SpaceY } from "../../shared/components/Utils";
import { API, API_OAUTH } from "../../shared";
import { LoginValidator } from "./utils/validations";
import axios from "axios";
import React, { useState,useEffect } from "react";
import { GoogleSignInButton } from "./components/Google";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import NaverLogin from 'react-naver-login';

const resolver = classValidatorResolver(LoginValidator);

const extractParams = (url: string) => {
  const urlParams = new URLSearchParams(new URL(url).search);
  const redirect = urlParams.get("redirect");
  return { redirect };
};

export const LogInView = () => {
  const navigate = useNavigate();
  const { search } = useLocation(); // ?email=jlfl94@gmail.com&order_number=4388608
  let { redirect } = extractParams(`http://localhost:${process.env.REACT_APP_PORT}/my-page${search}`);

  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const {
    control,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    // resolver,
  });

  useEffect(()=>{
    const param = new URLSearchParams(window.location.search);
    const token = param.get('token');

    if(token){
      const fetchProfile = async () => {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const result = await axios.get(`${API}/profile`, { headers });
        if(result.status === 200){
          localStorage.setItem('authToken', token);
          localStorage.setItem('loginData', 'email');
          localStorage.setItem('role', result.data.user?.roles[0]?.id)
          localStorage.setItem('useremail',result.data.user?.email)

        }
      }
      fetchProfile()
      navigate("/my-page");
    }
  })

  const naverSubmit = () =>{
    window.location.href = `${API_OAUTH}/naver-login`;
  }
  const googleSubmit = () =>{
      window.location.href = `${API_OAUTH}/google-login`;
  }

  // Function to set password error
  const setPasswordError = (password: any) => {
    if (password.length < 6) {
      return setError("password", {
        message: "비밀번호는 6자 이상 입니다.",
      });
    } else {
      return clearErrors("password");
    }
  };

  // Function to set email error
  const setEmailError = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   
    if (regex.test(email)) {
      return clearErrors("email");
    } else {
      return setError("email", {
        message: "아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.",
      });
    }
  };

  const login = useGoogleLogin({
    onSuccess: async (response) => {
        const { access_token, expires_in } = response;
        const backendResponse = await fetch(`${API_OAUTH}/api/google-callback`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ access_token, expires_in }),
        });
        const data = await backendResponse.json();
        if (backendResponse.ok) {
            const fetchProfile = async () => {
              const headers = {
                Authorization: `Bearer ${data.token}`,
              };
              const result = await axios.get(`${API}/profile`, { headers });
              if(result.status === 200){
                localStorage.setItem('useremail',result.data.user?.email)
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('loginData', 'email');
                localStorage.setItem('role', result.data.user?.roles[0]?.id)
                navigate("/my-page");
              }
            }
            fetchProfile();
        } else {
            console.error('Error:', data.error);

        }
    },
    onError: (error) => {
        console.error('Google login failed', error);
    },
});

  const onSubmit = (data: { email: string; password: string }) => {
    const { email, password } = data; // Destructure the email and password from the data object
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email)) {
      setEmailError(email);
      return;
    }

    axios
      .post(`${API}/login`, {
        email,
        password,
      })
      .then((res: any) => {
        console.log("response", res);
        localStorage.setItem("useremail", email);
        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("loginData", "email");
        localStorage.setItem("role", res.data.role.id);
        // toast.success("Login Successful!");

        if (redirect) {
          navigate(`/${redirect}`);
        } else {
          navigate("/my-page");
        }
      })
      .catch((error: any) => {
        setIsError(true);
        if (error.response.data.error == "invalid_credentials") {
          setErrorMessage("아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.");
        } else {
          setErrorMessage(error.response.data.error);
        }
        // toast.error(error.response.data.error);
        console.log("Error:", error);
        console.log("response erro", error.response.data);
      });
  };

  const handleLogin = async (googleData: any) => {
    console.log("googleData", googleData)
    try {
      const res = await fetch(`${API}/google-auth`, {
        method: "POST",
        body: JSON.stringify({
          token: googleData.tokenId
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      alert("here")
      // const data = await res.json()
    } catch (error) {
      console.log("google auth error:", error);
    }
    // store returned user somehow
  }

  return (
    <div className="flex justify-center">
      <div className="min-h-[600px] flex flex-col items-center pt-[5vh] pb-[20vh] w-[300px]">
        <SpaceY />
        <span className="text-2xl font-bold font-volkhov text-dark">
          로그인
        </span>
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

                if (!text) {
                  setErrorMessage("");
                }
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
              placeholder="비밀번호"
              onChange={(text) => {
                // setPasswordError(text);
                if (!text) {
                  setErrorMessage("");
                }
                field.onChange(text);
              }}
            />
          )}
        />
        {isError && (
          <span className="w-[300px] text-sm pt-3 pl-2 font-poppins text-red ">
            {errorMessage}
          </span>
        )}
        <SpaceY /> <SpaceY />
        <hr className="border border-gray rounded w-[300px]" />
        <SpaceY /> <SpaceY />
        <a
          onClick={() => navigate("/user/forgot-password")}
          className="cursor-pointer font-poppins text-blue text-sm w-[300px] text-end text-base"
        >
          비밀번호 찾기
        </a>
        <SpaceY /> <SpaceY />
        <MainButton
          disabled={Boolean(Object.entries(errors).length)}
          text="로그인"
          onClick={handleSubmit(onSubmit)}
        />
        <SpaceY />
        {/* <SpaceY />
        <GoogleSignInButton />
        <SpaceY /> */}
        <GoogleButton text="구글로 로그인" onClick={login} />
        <SpaceY />
        {/* <NaverButton text="Naver Login" onClick={naverSubmit} /> */}
        {/*<NaverLogin
          clientId="YWR4TVtlFcwSDV0LqVa_"
          callbackUrl="https://www.tamice.com/user/log-in"
          render={(props) => (
            <NaverButton text="네이버로 로그인" onClick={props.onClick} />
          )}
          onSuccess={async(naverUser) => {
            console.log(naverUser, 'NAVER USER RESPONSE');
        const { email, id, name, profile_image } = naverUser;

            const backendResponse = await fetch(`${API_OAUTH}/api/naver-callback`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, id, name, profile_image }),
          });
          const data = await backendResponse.json();
          if (backendResponse.ok) {
              const fetchProfile = async () => {
                const headers = {
                  Authorization: `Bearer ${data.token}`,
                };
                const result = await axios.get(`${API}/profile`, { headers });
                if(result.status === 200){
                  localStorage.setItem('useremail',result.data.user?.email)
                  localStorage.setItem('authToken', data.token);
                  localStorage.setItem('loginData', 'email');
                  localStorage.setItem('role', result.data.user?.roles[0]?.id)
                  navigate("/my-page");
                }
              }
              fetchProfile();
              console.log(data, 'DATAAAAA')
          } else {
              console.error('Error:', data.error);
              alert(data.error)
  
          }
          }}
          onFailure={(result) => console.error(result)}
        />*/}
        <SpaceY />
        {/* <SpaceY />
        <SpaceY /> */}
        <a
          onClick={() => navigate("/user/sign-up?redirect=cart")}
          className="text-sm cursor-pointer font-base font-poppins text-blue"
        >
          회원가입
        </a>
        <SpaceY />
        <SpaceY />
        <hr className="border border-gray rounded w-[300px]" />
        <SpaceY />
        <SpaceY />
        <a
          onClick={() => navigate("/user/non-member-order-lookup")}
          className="text-sm cursor-pointer font-base font-poppins text-blue"
        >
          마이페이지
        </a>
      </div>
    </div>
  );
};
