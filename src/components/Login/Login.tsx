import { Button } from "@mui/material";
import React from "react";
import { auth, provider } from "../../utils/Firebase";
import "./Login.css";

export default function Login() {
  const handleSignIn = () => {
    auth.signInWithPopup(provider).catch((error) => {
      alert(error.message);
    });
  };
  return (
    <div className="login">
      <div className="login__logo">
        <img
          src={
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"
          }
          alt=""
        />
      </div>
      <Button onClick={handleSignIn}>Sign In</Button>
    </div>
  );
}
