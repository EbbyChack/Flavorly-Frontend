import { token, url } from "../../utils/utils";
import { setAllRecipes, setSingleRecipe } from "../reducers/recipeReducer";

export const fetchAllRecipes = () => async (dispatch) => {
  try {
    const response = await fetch(url + "api/recipe");
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      dispatch(setAllRecipes(data));
    } else {
      throw new Error("Fetch all recipes failed");
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchSingleRecipe = (id) => async (dispatch) => {
  try {
    const response = await fetch(url + `api/recipe/${id}`, {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      dispatch(setSingleRecipe(data));
    } else {
      throw new Error("Fetch single recipe failed");
    }
  } catch (error) {
    console.log(error);
  }
};

export const addRecipe = (recipeObj) => async (dispatch) => {
  try {
    const response = await fetch(url + "api/recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token()}`,
      },
      body: JSON.stringify(recipeObj),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      dispatch({ type: "ADD_RECIPE", payload: data });
    } else {
      throw new Error("Add recipe failed");
    }
  } catch (error) {
    console.log(error);
  }
};
