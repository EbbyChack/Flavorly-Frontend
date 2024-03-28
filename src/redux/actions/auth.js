import { toast } from "react-toastify";
import { url } from "../../utils/utils";
import { login } from "../reducers/authReducer";

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
      dispatch(login(data));
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
