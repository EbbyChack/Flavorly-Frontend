import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRecipes } from "../redux/actions/recipes";
import { Link } from "react-router-dom";
import CreateRecipeForm from "./CreateRecipeForm";
import { setUserFavs } from "../redux/reducers/recipeReducer";

function AdminRecipes() {
  const recipes = useSelector((state) => state.recipes) || { recipes: [] };
  const ingredientsAndCategories = useSelector((state) => state.ingredientsAndCategories.ingredientsAndCategories);

  const [activePage, setActivePage] = useState(1);
  const recipesPerPage = 8;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllRecipes());
  }, []);

  useEffect(() => {
    dispatch(setUserFavs());
  }, []);

  // Pagination
  const indexOfLastRecipe = activePage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.recipes && recipes.recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const handleNextPage = () => {
    if (activePage < Math.ceil(recipes.recipes.length / recipesPerPage)) {
      setActivePage(activePage + 1);
    }
  };

  const handlePrevPage = () => {
    if (activePage > 1) {
      setActivePage(activePage - 1);
    }
  };

  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="allRecipesBackground longerPage">
      <div className="container">
        <CreateRecipeForm show={modalShow} onHide={() => setModalShow(false)} />
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="headings2">All recipes</h1>
          <button className="addRecipeBtn" onClick={() => setModalShow(true)}>
            Add recipe
          </button>
        </div>

        <div className="row g-4 justify-content-center justify-content-sm-start">
          {currentRecipes &&
            currentRecipes.map((recipe) => {
              return (
                <div className="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-3" key={recipe.idRecipe}>
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
                                <p className="card-description">{recipe.description}</p>
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
                                <Link to={`/recipe/${recipe.idRecipe}`} className="mobile-special-button">
                                  View recipe
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
          {/* Pagination */}
          {recipes.recipes && recipes.recipes.length > recipesPerPage && (
            <div className="d-flex justify-content-center mt-4">
              {activePage > 1 && (
                <button className="paginationBtn me-2" onClick={handlePrevPage}>
                  Previous
                </button>
              )}
              {activePage < Math.ceil(recipes.recipes.length / recipesPerPage) && (
                <button className="paginationBtn" onClick={handleNextPage}>
                  Next
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminRecipes;
