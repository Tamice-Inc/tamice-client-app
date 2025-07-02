import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cityIdState, menuState } from "../../../App";
import { convertLink } from "../../../shared/components/Utils";
import { useGetContents } from "../../../shared/hooks";

export const FooterReturnPolicy = () => {
  const [menu] = menuState.useState();
  const [cityId] = cityIdState.useState();
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

  const { contents } = useGetContents({
    content_id: cityId === 1 ? 73 : 215,
    menu,
  });
  return (
    <div className="flex w-full gap-x-8 flex-col md:flex-row">
      <div className="flex flex-col w-full gap-y-4 p-4">
        <div
          dangerouslySetInnerHTML={{
            __html: convertLink(contents?.ticket_content.content || ""),
          }}
        ></div>
      </div>
    </div>
  );
};
