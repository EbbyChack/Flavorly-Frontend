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
    <div className="container my-5">
      <ToastContainer />
      <div className="row justify-content-center">
        <div className="col-4">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmpassword">Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmpassword"
                placeholder="Enter Password Again"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
               
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
               
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              
              />
            </div>
            <div className="form-group">
              <label htmlFor="surname">Surname</label>
              <input
                type="text"
                className="form-control"
                id="surname"
                placeholder="Enter Surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input
                type="date"
                className="form-control"
                id="dateOfBirth"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                
              />
            </div>
            <button type="submit" className="btn btn-dark mt-3">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
