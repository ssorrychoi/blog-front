import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { baseURL } from "../common/config";

export default function Join() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isEmailChecked, setIsEmailChecked] = useState("yet");
  const [isPasswordSame, setIsPasswordSame] = useState(false);
  const [joinResult, setJoinResult] = useState(false);

  const checkEmail = async () => {
    const { data } = await axios.get(`${baseURL}/auth/email?email=${email}`);
    setIsEmailChecked(data.result);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEmailChecked || isEmailChecked === "yet") {
      alert("email 중복확인 플리즈!");
      return;
    }
    if (!isPasswordSame) {
      alert("패스워드 확인좀");
      return;
    }
    if (!e.target.nickname.value || !email || !password) {
      alert("모든 필드 입력 필수임.");
      return;
    }
    const { data } = await axios.post(`${baseURL}/auth/join`, {
      name: e.target.nickname.value,
      email,
      password
    });
    if (data.result) {
      setJoinResult(true);
    } else {
      alert("회원가입 실패ㅠㅠ 빈산님에게 문의ㄱㄱ");
    }
  };

  return (
    <>
      {joinResult && <Redirect to="/login" />}
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label>NickName</label>
          <input
            name="nickname"
            type="text"
            class="form-control"
            placeholder="Enter your Nickname in this blog"
          />
        </div>
        <div class="form-group">
          <label>Email address</label>
          <input
            type="email"
            class="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setIsEmailChecked("yet");
              setEmail(e.target.value);
            }}
          />
        </div>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={checkEmail}
        >
          이메일 중복체크
        </button>
        <small>
          {isEmailChecked === "yet"
            ? "중복체크를 해주세요"
            : isEmailChecked
            ? "이 이메일 사용 가능"
            : "Nope"}
        </small>
        <div class="form-group">
          <label>Password</label>
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setIsPasswordSame(e.target.value === password2);
            }}
          />
        </div>
        <div class="form-group">
          <label>Password Confirm</label>
          <input
            type="password"
            class="form-control"
            placeholder="Password Confirm"
            value={password2}
            onChange={(e) => {
              setPassword2(e.target.value);
              setIsPasswordSame(e.target.value === password);
            }}
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
        <small>{isPasswordSame ? null : "비밀번호가 다릅니다"}</small>
      </form>
    </>
  );
}
