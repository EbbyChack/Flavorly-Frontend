import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRecipes, fetchUserFavs } from "../redux/actions/recipes";
import { Link, useNavigate } from "react-router-dom";
import { setUserFavs } from "../redux/reducers/recipeReducer";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

function AllRecipes() {
  const recipes = useSelector((state) => state.recipes) || { recipes: [] };

  const ingredientsAndCategories = useSelector((state) => state.ingredientsAndCategories.ingredientsAndCategories);

  const userFavs = useSelector((state) => state.recipes.userFavs);

  const dispatch = useDispatch();

  //getting the userid from the token using jwt-decode
  const token = useSelector((state) => state.auth.loggedProfile);

  let userId = "";

  if (token) {
    const decodedToken = jwt_decode(token);
    const pathway = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
    userId = decodedToken[pathway];
  }

  useEffect(() => {
    dispatch(fetchAllRecipes());
  }, []);

  useEffect(() => {
    dispatch(fetchUserFavs(userId));
  }, []);

  return (
    <div className="allRecipesBackground">
      <div className="container m-5">
        <div className="d-flex justify-content-between align-items-center">
          <h1>All recipes</h1>
        </div>

        <div className="row g-4 justify-content-center justify-content-sm-start">
          {recipes.recipes &&
            recipes.recipes.map((recipe) => {
              const isFav = userFavs && userFavs.some((fav) => fav.idRecipeFk === recipe.idRecipe);
              return (
                <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3" key={recipe.idRecipe}>
                  <div className="CustomCard">
                    <div className="content">
                      <div className="back">
                        <div className="back-content">
                          <img src={recipe.mainImg} className="CustomCard-img" alt={"img" + recipe.idRecipe} />
                          <div className="back-content-text">
                            <div>
                              {recipe.recipeCategories &&
                                recipe.recipeCategories.map((category) => {
                                  if (ingredientsAndCategories.categories) {
                                    //searching for the category name
                                    const categoryDetails = ingredientsAndCategories.categories.find(
                                      (cat) => cat.idCategory === category.idCategoryFk
                                    );
                                    return (
                                      <small className="badge me-1" key={category.idCategoryFk}>
                                        {categoryDetails ? categoryDetails.categoryName : "Category not found"}
                                      </small>
                                    );
                                  }
                                  return null;
                                })}
                            </div>

                            <div className="description">
                              <p className="d-flex justify-content-between align-items-center">
                                <strong>{recipe.nameRecipe}</strong>
                                <FontAwesomeIcon className="heartIcon" icon={isFav ? solidHeart : null} />
                              </p>

                              <p className="card-footer">
                                {recipe.cookingTime} | &nbsp; {recipe.servings} Servings
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="front">
                        <div className="front-content">
                          <img src={recipe.mainImg} className="CustomCard-img-front" alt={"img" + recipe.idRecipe} />
                          <div className="back-content-text">
                            <div>
                              {recipe.recipeCategories &&
                                recipe.recipeCategories.map((category) => {
                                  if (ingredientsAndCategories.categories) {
                                    //searching for the category name
                                    const categoryDetails = ingredientsAndCategories.categories.find(
                                      (cat) => cat.idCategory === category.idCategoryFk
                                    );
                                    return (
                                      <small className="badge me-1" key={category.idCategoryFk}>
                                        {categoryDetails ? categoryDetails.categoryName : "Category not found"}
                                      </small>
                                    );
                                  }
                                  return null;
                                })}
                            </div>
                            <div className="description">
                              <div>
                                <p className="d-flex justify-content-between align-items-center">
                                  <strong>{recipe.nameRecipe}</strong>
                                  <FontAwesomeIcon className="heartIcon" icon={isFav ? solidHeart : null} />
                                </p>
                                <p className="card-subtitle">Description:</p>
                                <p>{recipe.description}</p>
                                <p className="card-subtitle">Difficulty:</p>
                                <p>{recipe.difficulty}</p>
                              </div>
                              <p className="card-footer">
                                {recipe.cookingTime} | &nbsp; {recipe.servings} Servings
                              </p>
                              <div className="d-flex justify-content-center">
                                <Link to={`/recipe/${recipe.idRecipe}`} className="special-button">
                                  <button to={`/recipe/${recipe.idRecipe}`} className="view-recipe">
                                    <span className="circle" aria-hidden="true">
                                      <span className="icon arrow"></span>
                                    </span>
                                    <span className="button-text">View recipe</span>
                                  </button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default AllRecipes;
