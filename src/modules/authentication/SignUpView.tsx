import { useNavigate, useLocation } from "react-router-dom";
import {
  GhostButton,
  GoogleButton,
  NaverButton,
} from "../../shared/components/Buttons";
import { SpaceY } from "../../shared/components/Utils";
import { GoogleSignUpButton } from "./components/Google";

const extractParams = (url: string) => {
  const urlParams = new URLSearchParams(new URL(url).search);
  const redirect = urlParams.get("redirect");
  return { redirect };
};

export const SignUpView = () => {
  const navigate = useNavigate();
  const { search } = useLocation(); // ?email=jlfl94@gmail.com&order_number=4388608
  let { redirect } = extractParams(`http://localhost:${process.env.REACT_APP_PORT}/my-page${search}`);
  const registerUrl = redirect ? `/user/register?redirect=${redirect}` : "/user/register"

  return (
    <div className="min-h-[600px] flex flex-col items-center pt-[5vh] pb-[20vh] w-full">
      <SpaceY />
      <span className="text-2xl font-bold font-volkhov text-dark">회원가입</span>
      <SpaceY /> <SpaceY />
      <GhostButton
      
        text="계정 만들기"
        onClick={() => navigate(registerUrl)}
      />
      <SpaceY /> <SpaceY />
      <div className="w-[250px] flex justify-between items-center">
        {/* <hr className="border border-gray rounded w-[100px]" />
        <span className="font-medium font-poppins text xl">Or</span>
        <hr className="border border-gray rounded w-[100px]" /> */}
      </div>
      <SpaceY />
      {/* <GoogleSignUpButton/> */}
      {/* <SignOutButton/> */}
      <SpaceY />
      {/* <NaverButton text="Naver Sign Up" onClick={() => {}} /> */}
    </div>
  );
};
