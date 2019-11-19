import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import getCookie from "../common/getCookie";

export default function Nav({
  isLoggedIn,
  setIsLoggedIn,
  setIsAdmin,
  isAdmin
}) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const logout = () => {
    //만료시간을 현재시간으로 변경해서 쿠키를 파괴함.
    document.cookie = `Authorization=;expires=${new Date().toUTCString()}`;
    setIsLoggedIn(false);
    setIsAdmin(false);
  };
  useEffect(() => {
    setIsLoggedIn(document.cookie.includes("Authorization"));
    // admin 쿠키 유지
    if (document.cookie.includes("Authorization")) {
      const jwt = getCookie("Authorization").split(" ")[1];
      console.log(jwt);
      const payload = jwt.split(".")[1];
      console.log(payload);
      const { admin } = JSON.parse(atob(payload));
      console.log({ admin });
      setIsAdmin(admin);
    }
  }, []);
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light fixed-top"
      id="mainNav"
    >
      <div className="container">
        <a className="navbar-brand" href="index.html">
          쏘리초이's 블로그
        </a>
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          onClick={() => {
            setIsCollapsed(!isCollapsed);
            setIsMenuOpened(!isMenuOpened);
          }}
        >
          Menu
          <i className="fas fa-bars" />
        </button>
        <div
          className={`collapse navbar-collapse ${!isCollapsed && "show"}`}
          id="navbarResponsive"
        >
          <ul className="navbar-nav ml-auto">
            <li
              className="nav-item"
              onClick={() => {
                if (isMenuOpened) {
                  setIsCollapsed(!isCollapsed);
                  setIsMenuOpened(!isMenuOpened);
                }
              }}
            >
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            {isAdmin && (
              <li
                className="nav-item"
                onClick={() => {
                  if (isMenuOpened) {
                    setIsCollapsed(!isCollapsed);
                    setIsMenuOpened(!isMenuOpened);
                  }
                }}
              >
                <Link className="nav-link" to="/write">
                  POST
                </Link>
              </li>
            )}
            <li
              className="nav-item"
              onClick={() => {
                if (isMenuOpened) {
                  setIsCollapsed(!isCollapsed);
                  setIsMenuOpened(!isMenuOpened);
                }
              }}
            >
              {isLoggedIn ? (
                <a className="nav-link" onClick={logout}>
                  Logout
                </a>
              ) : (
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
