import { fetchWithAuth } from "../../utils/interceptor";
import { url } from "../../utils/utils";
import { setAverageRating } from "../reducers/ratingsReducer";

export const fetchAverageRating = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetchWithAuth(url + `api/Rating/average/${id}`, {
        headers: {
          contentType: "application/json",
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

export const addNewRating = (addRatingObj) => {
  return async (dispatch) => {
    try {
      const response = await fetchWithAuth(url + `api/Rating`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addRatingObj),
      });
      if (response.ok) {
        dispatch({ type: "ADD_RATING", payload: addRatingObj });
      } else {
        throw new Error("Add rating failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateRating = (ratingId, updateRatingObj) => {
  return async (dispatch) => {
    try {
      const response = await fetchWithAuth(url + `api/Rating/${ratingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateRatingObj),
      });
      if (response.ok) {
        dispatch({ type: "UPDATE_RATING", payload: updateRatingObj });
      } else {
        throw new Error("Update rating failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
