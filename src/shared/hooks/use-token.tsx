// useTokenExpiration.js
import jwtDecode, { JwtPayload } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useTokenExpiration = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        const decodedToken: JwtPayload = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        const timeToExpire = decodedToken.exp || 0;
        if (timeToExpire < currentTime) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("loginData");
          localStorage.removeItem("order_number");
          localStorage.removeItem("useremail");

          navigate("/");
        }
      }
    };

    const intervalId = setInterval(checkTokenExpiration, 1000);
    return () => clearInterval(intervalId);
  }, [navigate]);
};

export default useTokenExpiration;
