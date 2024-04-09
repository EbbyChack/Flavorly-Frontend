import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRecipes } from "../redux/actions/recipes";
import { Link, useNavigate } from "react-router-dom";
import CreateRecipeForm from "./CreateRecipeForm";
import { setUserFavs } from "../redux/reducers/recipeReducer";

function AdminRecipes() {
  const recipes = useSelector((state) => state.recipes) || { recipes: [] };
  const ingredientsAndCategories = useSelector((state) => state.ingredientsAndCategories.ingredientsAndCategories);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllRecipes());
  }, []);

  useEffect(() => {
    dispatch(setUserFavs());
  }, []);

  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="allRecipesBackground">
      <div className="container m-5">
        <CreateRecipeForm show={modalShow} onHide={() => setModalShow(false)} />
        <div className="d-flex justify-content-between align-items-center">
          <h1>All recipes</h1>
          <button className="btn btn-dark" onClick={() => setModalShow(true)}>
            Add recipe
          </button>
        </div>

        <div className="row g-4 justify-content-center justify-content-sm-start">
          {recipes.recipes &&
            recipes.recipes.map((recipe) => {
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
                                <Link to={`/adminrecipe/${recipe.idRecipe}`} className="special-button">
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

export default AdminRecipes;
