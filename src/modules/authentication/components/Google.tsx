import React, { useEffect, useState } from 'react'
import { GoogleLogin, useGoogleLogin, GoogleOAuthProvider, } from '@react-oauth/google'
import { google, Auth } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { resolve } from 'path';
import jwtDecode from 'jwt-decode'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GetUserData } from '../../../shared/hooks';
import { API } from "../../../shared";

export const GoogleSignInButton : React.FC = () => {
  const navigate = useNavigate();
  interface dataCredential{
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
  // Google SignIn Handler

  const signWithGoogleHandler = (response: any) => {
    if (response && response.credential && response.clientId) {
      console.log(response);
    
    const USER_CREDENTIAL:dataCredential = jwtDecode(response.credential);
    const userLoginData = JSON.parse(JSON.stringify(USER_CREDENTIAL));
    localStorage.setItem("authToken", `Bearer ${response.access_token}`);
    localStorage.setItem("loginData", "google");
    localStorage.setItem("email", userLoginData.email);
    localStorage.setItem("name", userLoginData.given_name + " " + userLoginData.family_name);
    // const { email } = USER_CREDENTIAL;
    const userEmail : string = USER_CREDENTIAL.email;
    toast.success("Login Successful!");
    navigate("/my-page");
    console.log(userEmail);
    console.log(typeof(userEmail));
    console.log(`Bearer ${response.access_token}`);
    // const password = "123456";
    const { email, password } = response.data; // Destructure the email and password from the data object
    toast.success("asf");
    axios
      .post(`${API}/login`, {
        userEmail,
        password,
      })
      .then((res) => {
        console.log("response", res.data);
        localStorage.setItem("authToken", res.data.token);

        toast.success("Login Successful!");
        navigate("/my-page");
      })
      .catch((error) => {
        toast.error(error.response.data.error);
        console.log("Error:", error);
        console.log("response erro", error.response.data);
      });
    }else{
      toast.error("Sign In Failed!");
    }
  };
  return(
  <div className='googleButton'>
  <GoogleLogin
    logo_alignment='center'
    size='large'
    width='300'
    text = "signin_with"
    onSuccess={signWithGoogleHandler}
    onError={() => {
      console.log('Login Failed');
    }}
  />
  </div>
  );
};

export const GoogleSignUpButton : React.FC = () => {

  const navigate = useNavigate();
  interface dataCredential{
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



  // Google SignUp Handler
  const signWithGoogleHandler = (response: any) => {
    if (response && response.credential && response.clientId) {
      console.log(response);
      const payload = {
        credential: response.credential,
      };
      const USER_CREDENTIAL:dataCredential = jwtDecode(response.credential);
      const { given_name, family_name, email } = USER_CREDENTIAL;

    console.log(USER_CREDENTIAL);
    console.log(typeof(USER_CREDENTIAL));
    // localStorage.setItem("authToken", response.credential);
    console.log(USER_CREDENTIAL.given_name);
      const data: {
        firstname: string;
        lastname: string;
        email: string;
        email_confirmation: string;
        password: string;
        password_confirmation: string;
        phone: string;
      } = {
        firstname: given_name,
        lastname: family_name,
        email: email,
        email_confirmation: email,
        // firstname: "John",
        // lastname: "Patto",
        // email: "admin@gmail.com",
        // email_confirmation: "admin@gmail.com",
        password: '123456',
        password_confirmation: '123456',
        phone: "123456789",
      };
      console.log(data);
      handleRegister(data);
    }
  };

  
  const handleRegister = async (data: any) => {
    await axios
      .post(
        `${API}/register`,
        data
      )
      .then((res) => {
        console.log("response=========", res.data);
        toast.success("Sign Up Successful!");
        navigate("/user/log-in");
      })
      .catch((error) => {
        console.log("Error:", error);
        console.log("Response Data:", error.response.data);
        toast.error("Sign Up Failed!");
      });
  };
  return(
  <div className='googleButton'>
  <GoogleLogin
    logo_alignment='center'
    size='large'
    width='300'
    text = "signup_with"
    onSuccess={signWithGoogleHandler}
    onError={() => {
      console.log('Signup Failed');
    }}
  />
  </div>
  );
};