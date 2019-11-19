import React, { useState } from "react";
import Axios from "axios";
import { baseURL } from "../common/config";
import { Redirect } from "react-router-dom"; //로그인했을때 메인페이지로 오게 하는 것

export default function Login({
  isLoggedIn,
  setIsLoggedIn,
  setIsAdmin,
  history
}) {
  const [loginState, setLoginState] = useState("init");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await Axios.post(`${baseURL}/auth/login`, {
      email: e.target.email.value,
      password: e.target.password.value
    });
    if (!data.result) {
      setLoginState("failed");
    } else {
      //console.log(data);

      //atob 라는 함수는 base64 decoding을 사용해서 객체로 사용하게 하는 함수이다.
      const { exp } = JSON.parse(atob(data.token.split(".")[1]));
      //console.log(exp);

      //언제 만료되는지를 날짜로 변환
      const expires = new Date(exp * 1000).toUTCString();
      //쿠키 세팅법
      document.cookie = `Authorization = JWT ${data.token}' expires=${expires}`;
      setIsAdmin(data.admin);
      setIsLoggedIn(true);
      setLoginState("success");
    }
  };

  return (
    <>
      {loginState === "success" ? <Redirect to="/" /> : null}
      <form onSubmit={handleSubmit}>
        <small>
          {loginState === "failed" && "이메일 혹은 비밀번호를 확인하세요"}
        </small>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            name="email"
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            name="password"
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => history.push("/join")}
        >
          Sign up
        </button>
      </form>
    </>
  );
}
