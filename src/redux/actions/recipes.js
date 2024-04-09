import { fetchWithAuth } from "../../utils/interceptor";
import { url } from "../../utils/utils";
import {
  setAllRecipes,
  setSingleRecipe,
  setUserFavs,
  clearSingleRecipe,
  setTopRecipes,
} from "../reducers/recipeReducer";

export const fetchAllRecipes = () => async (dispatch) => {
  try {
    const response = await fetch(url + "api/recipe");
    if (response.ok) {
      const data = await response.json();

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
    const response = await fetchWithAuth(url + `api/recipe/${id}`, {
      headers: {
        contentType: "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();

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
    const response = await fetchWithAuth(url + "api/recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

export const editRecipe = (id, recipeObj) => async (dispatch) => {
  try {
    const response = await fetchWithAuth(url + `api/recipe/edit/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
       
      },
      body: JSON.stringify(recipeObj),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      dispatch({ type: "EDIT_RECIPE", payload: data });
    } else {
      throw new Error("Edit recipe failed");
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteRecipe = (id) => async (dispatch) => {
  try {
    const response = await fetchWithAuth(url + `api/recipe/delete/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      dispatch({ type: "DELETE_RECIPE", payload: id });
    } else {
      throw new Error("Delete recipe failed");
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchTopRecipes = () => async (dispatch) => {
  try {
    const response = await fetch(url + "api/recipe/top");
    if (response.ok) {
      const data = await response.json();
      dispatch(setTopRecipes(data));
    } else {
      throw new Error("Fetch top recipes failed");
    }
  } catch (error) {
    console.log(error);
  }
};

export const addUserFav = (userFavObj) => async (dispatch) => {
  try {
    const response = await fetchWithAuth(url + "api/userfavs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userFavObj),
    });
    if (response.ok) {
      dispatch({ type: "ADD_USER_FAV", payload: userFavObj });
    } else {
      throw new Error("Add user fav failed");
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserFav = (id) => async (dispatch) => {
  try {
    const response = await fetchWithAuth(url + `api/userfavs/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      dispatch({ type: "DELETE_USER_FAV", payload: id });
    } else {
      throw new Error("Delete user fav failed");
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserFavs = (id) => async (dispatch) => {
  try {
    const response = await fetchWithAuth(url + `api/userfavs/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();

      dispatch(setUserFavs(data));
    } else {
      throw new Error("Fetch user favs failed");
    }
  } catch (error) {
    console.log(error);
  }
};

export const addComment = (commentObj) => async (dispatch) => {
  try {
    const response = await fetchWithAuth(url + "api/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
       
      },
      body: JSON.stringify(commentObj),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      dispatch({ type: "ADD_COMMENT", payload: data });
    } else {
      throw new Error("Add comment failed");
    }
  } catch (error) {
    console.log(error);
  }
};

export const softDeleteComment = (id) => async (dispatch) => {
  try {
    const response = await fetchWithAuth(url + `api/comment/delete/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      dispatch({ type: "SOFT_DELETE_COMMENT", payload: id });
    } else {
      throw new Error("Soft delete comment failed");
    }
  } catch (error) {
    console.log(error);
  }
};
