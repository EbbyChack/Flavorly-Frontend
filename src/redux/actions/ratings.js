import { token, url } from "../../utils/utils";
import { setAverageRating } from "../reducers/ratingsReducer";

export const fetchAverageRating = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(url + `api/Rating/average/${id}`, {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(setAverageRating(data));
      } else {
        throw new Error("Fetch average rating failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
