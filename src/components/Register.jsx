import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchRegister } from "../redux/actions/auth";
import { ToastContainer, toast } from "react-toastify";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const notifyPassword = () => toast.error("Passwords do not match!");
    const notify = () => toast.error("Please fill all fields!");

    if (password !== confirmpassword) {
      notifyPassword();
      return;
    }

    if (!username || !password || !email || !name || !surname || !dateOfBirth) {
      notify();
      return;
    }

    const registerObj = {
      username,
      password,
      email,
      name,
      surname,
      dateOfBirth,
    };

    dispatch(fetchRegister("api/Auth/register", registerObj));
  };
  return (
    <div className="loginBg longerPage">
      <div className="py-5">
        <ToastContainer />
        <div className="row justify-content-center">
          <div className="col-10 col-sm-8 col-md-6 col-lg-4 col-xl-3">
            <div className="register-form-container">
              <p className="formTitle">Register</p>
              <form className="loginForm" onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="login-input"
                  id="username"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <input
                  type="password"
                  className="login-input"
                  id="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <input
                  type="password"
                  className="login-input"
                  id="confirmpassword"
                  placeholder="Enter Password Again"
                  value={confirmpassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <input
                  type="email"
                  className="login-input"
                  id="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="text"
                  className="login-input"
                  id="name"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <input
                  type="text"
                  className="login-input"
                  id="surname"
                  placeholder="Enter Surname"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />

                <input
                  type="date"
                  className="login-input"
                  id="dateOfBirth"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />

                <button type="submit" className="form-btn">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
