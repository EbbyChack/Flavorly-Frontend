import { toast } from "react-toastify";
import { url } from "../../utils/utils";
import { setUserInfo } from "../reducers/userReducer";
import { fetchWithAuth } from "../../utils/interceptor";

export const fetchUserInfo = (id) => async (dispatch) => {
  try {
    const response = await fetchWithAuth(url + `api/usersettings/${id}`, {
      headers: {
        contentType: "application/json",
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
    const response = await fetchWithAuth(url + `api/usersettings/updatepassword/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
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
