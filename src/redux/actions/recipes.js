import { token, url } from "../../utils/utils";
import { setAllRecipes, setSingleRecipe, setUserFavs } from "../reducers/recipeReducer";

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


//need to test this
export const addUserFav = (userFavObj) => async (dispatch) => {
  try {
    const response = await fetch(url + "api/userfavs", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token()}`,
      },
      body: JSON.stringify(userFavObj),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      dispatch({ type: "ADD_USER_FAV", payload: data });
    } else {
      throw new Error("Add user fav failed");
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserFav = (id) => async (dispatch) => {
  try {
    const response = await fetch(url + `api/userfavs/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
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
    const response = await fetch(url + `api/userfavs/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
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
    const response = await fetch(url + "api/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token()}`,
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
    const response = await fetch(url + `api/comment/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token()}`,
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
}