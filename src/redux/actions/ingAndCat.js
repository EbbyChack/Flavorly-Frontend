import { url } from "../../utils/utils";
import { setIngredientsAndCategories } from "../reducers/ingAndCatReducer";


export const fetchIngredientsAndCategories = () => async (dispatch) => {
    try {
      const response = await fetch(url + `api/recipe/dropdowns`, {
        headers: {
          contentType: "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(setIngredientsAndCategories(data));
      } else {
        throw new Error("Fetch ingredients and categories failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
