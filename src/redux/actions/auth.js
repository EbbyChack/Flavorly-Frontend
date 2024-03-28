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

      dispatch(login(data));
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    console.log(error);
  }
};
