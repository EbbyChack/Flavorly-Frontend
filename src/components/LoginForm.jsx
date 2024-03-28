import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchLogin } from "../redux/actions/auth";
import { Link } from "react-router-dom";
import { Toast } from "bootstrap";
import { ToastContainer } from "react-toastify";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginObj = {
      username,
      password,
    };
    dispatch(fetchLogin("api/Auth/login", loginObj));
  };
  return (
    <div className="container my-5">
      <ToastContainer />
      <div className="row justify-content-center">
        <div className="col-4">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="exampleusername">Username</label>
              <input
                type="username"
                className="form-control "
                id="exampleusername"
                aria-describedby="emailHelp"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control "
                id="exampleInputPassword1"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-dark mt-3">
              Submit
            </button>
          </form>

          <div className="mt-3">
            <p>Don't have an account?</p>
            <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
