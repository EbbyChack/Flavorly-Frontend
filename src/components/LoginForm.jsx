import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchLogin } from "../redux/actions/auth";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginObj = {
      username,
      password,
    };
    dispatch(fetchLogin("api/Auth/login", loginObj));
    navigate("/");
  };
  return (
    <div className="loginBg longerPage">
      <div className="py-5">
        <ToastContainer />
        <div className="row justify-content-center">
          <div className="col-10 col-sm-8 col-md-6 col-lg-4 col-xl-3">
            <div className="login-form-container">
              <p className="formTitle">Welcome back!</p>
              <form className="loginForm" onSubmit={handleSubmit}>
                <input
                  type="username"
                  className="login-input"
                  id="exampleusername"
                  aria-describedby="emailHelp"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <input
                  type="password"
                  className="login-input"
                  id="exampleInputPassword1"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" className="form-btn">
                  Log in
                </button>
              </form>
              <p className="sign-up-label">
                Don't have an account? <Link to="/register">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
