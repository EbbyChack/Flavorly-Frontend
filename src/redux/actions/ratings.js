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

 export const addNewRating = (addRatingObj) => {
   return async (dispatch) => {
     try {
       const response = await fetch(url + `api/Rating`, {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${token()}`,
         },
         body: JSON.stringify(addRatingObj),
       });
       if (response.ok) {
        dispatch({ type: 'ADD_RATING', payload: addRatingObj });;
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
        const response = await fetch(url + `api/Rating/${ratingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token()}`,
          },
          body: JSON.stringify(updateRatingObj),
        });
        if (response.ok) {
          dispatch({ type: 'UPDATE_RATING', payload: updateRatingObj });
        } else {
          throw new Error("Update rating failed");
        }
      } catch (error) {
        console.log(error);
      }
    };
  }
