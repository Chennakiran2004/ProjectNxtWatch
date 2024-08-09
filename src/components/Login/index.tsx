import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, Navigate } from "react-router-dom";

import { setCookie, getCookie } from "../../Constants/storageUtilities";
import fetchApi from "../../Constants/fetchUtilities";

import {
  LoginContainer,
  LoginCardContainer,
  WebsiteLogo,
  Label,
  Form,
  LoginButton,
  ShowPasswordLabel,
  LoginInput,
  ErrorMsg,
} from "./styledComponents";

const websiteLogo =
  "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const updateUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const updatePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordType(event.target.checked ? "text" : "password");
  };

  const onSubmitFailure = (errorMsg: string) => {
    setErrorMsg(errorMsg);
    setIsError(true);
  };

  const onSubmitSuccess = (jwtToken: string) => {
    setCookie("jwt_token", jwtToken, { expires: 30 });
    navigate("/");
    setIsError(false);
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const userDetails = { username, password };
    const apiUrl = "https://apis.ccbp.in/login";

    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };

    const response = await fetchApi(apiUrl, options);

    if (response.success) {
      onSubmitSuccess(response.data.jwt_token);
    } else {
      onSubmitFailure(response.data.error_msg);
    }
  };

  const jwtToken = getCookie();

  if (jwtToken !== undefined) {
    return <Navigate to="/" />;
  }

  return (
    <LoginContainer data-testid="Login container">
      <LoginCardContainer>
        <WebsiteLogo src={websiteLogo} alt="website logo" />
        <Form onSubmit={onSubmit}>
          <Label htmlFor="username">USERNAME</Label>
          <LoginInput
            type="text"
            id="username"
            placeholder="Username"
            onChange={updateUsername}
            value={username}
          />
          <Label htmlFor="password">PASSWORD</Label>
          <LoginInput
            id="password"
            data-testid="password"
            placeholder="Password"
            onChange={updatePassword}
            value={password}
            type={passwordType}
          />
          <input
            type="checkbox"
            id="showPassword"
            data-testid="showPassword"
            onChange={onCheckBox}
            className="showPassword"
          />
          <ShowPasswordLabel htmlFor="showPassword">
            Show Password
          </ShowPasswordLabel>
          <div>
            <LoginButton data-testid="login-button" type="submit">Login</LoginButton>
          </div>
          <ErrorMsg>{isError && `* ${errorMsg}`}</ErrorMsg>
        </Form>
      </LoginCardContainer>
    </LoginContainer>
  );
};

export default Login;
