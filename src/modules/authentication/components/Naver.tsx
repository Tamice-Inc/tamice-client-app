import React from 'react';
// import NaverLogin, { NaverLoginProps } from 'react-naver-login';

const Naver: React.FC = () => {
  const onSuccess = (response: any) => {
    // Handle successful login
    console.log(response);
  };

  const onFailure = (error: any) => {
    // Handle login error
    console.error(error);
  };

  // const naverLoginProps: NaverLoginProps = {
  //   clientId: 'YOUR_CLIENT_ID',
  //   callbackUrl: 'YOUR_CALLBACK_URL',
  //   onSuccess,
  //   onFailure
  // };

  return (
    <div>
      {/* <NaverLogin {...naverLoginProps} /> */}
    </div>
  );
};

export default Naver;
