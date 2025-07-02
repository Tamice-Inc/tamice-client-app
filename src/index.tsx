import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(  
  <GoogleOAuthProvider clientId="921265253311-je1nk30if6qi2ivkf8det0ivbi1st6qb.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider> 
);
