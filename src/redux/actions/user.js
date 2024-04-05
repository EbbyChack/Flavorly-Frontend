import { toast } from "react-toastify";
import { token, url } from "../../utils/utils";
import { setUserInfo } from "../reducers/userReducer";

export const fetchUserInfo = (id) => async (dispatch) => {
  try {
    const response = await fetch(url + `api/usersettings/${id}`, {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(setUserInfo(data));
    } else {
      throw new Error("Fetch user info failed");
    }
  } catch (error) {
    console.log(error);
  }
};

export const changePassword = (id, passwordObj) => async (dispatch) => {
  try {
    const response = await fetch(url + `api/usersettings/updatepassword/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token()}`,
      },
      body: JSON.stringify(passwordObj),
    });
    if (response.ok) {
      toast.success("Password changed successfully");
    } else {
      throw new Error("Password change failed");
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};
