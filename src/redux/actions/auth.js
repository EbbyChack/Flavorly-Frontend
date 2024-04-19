import { toast } from "react-toastify";
import { url } from "../../utils/utils";
import { login, logout } from "../reducers/authReducer";
import { clearUserInfo } from "../reducers/userReducer";

export const fetchLogin = (path, loginObj) => async (dispatch) => {
  try {
    const response = await fetch(url + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginObj),
    });
    if (response.ok) {
      const data = await response.text();
      toast.success("Login successful");

      dispatch(login(data));
    } else {
      const error = await response.text();
      toast.error(error);
      throw new Error("Login failed");
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchLogout = () => async (dispatch) => {
  try {
    dispatch(logout());
    dispatch(clearUserInfo());
  } catch (error) {
    console.log(error);
  }
};

export const fetchRegister = (path, registerObj) => async (dispatch) => {
  try {
    const response = await fetch(url + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerObj),
    });
    if (response.ok) {
      const data = await response.text();
      toast.success("Register successful");
    
    } else {
      const error = await response.text();
      toast.error(error);
      throw new Error("Register failed");
    }
  } catch (error) {
    console.log(error);
    return error.message;
  }
};
