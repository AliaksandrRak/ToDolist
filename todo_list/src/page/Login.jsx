import React, { useState } from "react";
import "./Login.sass";

import MyButton from "../utils/MyButton";
import MyTextField from "../utils/MyTextField";

function Login(props) {
  const [isErrorLogin, setIsErrorLogin] = useState(false);
  const [isErrorPassword, setIsErrorPassword] = useState(false);
  return (
    <div className="login">
      <div className="login-content">
        <div className="login-content-form">
          <div className="login-content-form-block">
          <MyTextField label="Login" isError={isErrorLogin} errorText="Пожалуйста, введите корректный Login"/>
          <MyTextField label="Password" isError={isErrorPassword} errorText="Пожалуйста, введите корректный Password"/>
          </div>

          <div className="login-content-form-footer">
            <MyButton click={() => {
                setIsErrorLogin(true);
                setIsErrorPassword(true);
              }}>Ok</MyButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
