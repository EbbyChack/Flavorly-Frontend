import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRecipes, fetchUserFavs } from "../redux/actions/recipes";
import { Link, useNavigate } from "react-router-dom";
import { setUserFavs } from "../redux/reducers/recipeReducer";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import FilterSidebar from "./FilterSidebar";
import { Pagination } from "react-bootstrap";

function AllRecipes() {
  const recipes = useSelector((state) => state.recipes) || { recipes: [] };

  const ingredientsAndCategories = useSelector((state) => state.ingredientsAndCategories.ingredientsAndCategories);

  const userFavs = useSelector((state) => state.recipes.userFavs);

  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const [activePage, setActivePage] = useState(1);
  const recipesPerPage = 9;

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

  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
  };

  const handleCategoriesChange = (e) => {
    const value = parseInt(e.target.value);
    if (selectedCategories.includes(value)) {
      setSelectedCategories(selectedCategories.filter((category) => category !== value));
    } else {
      setSelectedCategories([...selectedCategories, value]);
    }
  };

  const clearCat = () => {
    setSelectedCategories([]);
  };

  const clearIng = () => {
    setSelectedIngredients([]);
  };

  const handleIngredientsChange = (e) => {
    const value = parseInt(e.target.value);
    if (selectedIngredients.includes(value)) {
      setSelectedIngredients(selectedIngredients.filter((ingredient) => ingredient !== value));
    } else {
      setSelectedIngredients([...selectedIngredients, value]);
    }
  };

  const filteredRecipes =
    recipes.recipes &&
    recipes.recipes.filter(
      (recipe) =>
        recipe.nameRecipe.toLowerCase().includes(searchTerm) &&
        (selectedCategories.length === 0 ||
          recipe.recipeCategories.some((category) => selectedCategories.includes(category.idCategoryFk))) &&
        (selectedIngredients.length === 0 ||
          recipe.recipeIngredients.some((ingredient) => selectedIngredients.includes(ingredient.idIngredientFk)))
    );

  // Pagination
  const indexOfLastRecipe = activePage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes && filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const handleNextPage = () => {
    if (activePage < Math.ceil(filteredRecipes.length / recipesPerPage)) {
      setActivePage(activePage + 1);
    }
  };

  const handlePrevPage = () => {
    if (activePage > 1) {
      setActivePage(activePage - 1);
    }
  };

  return (
    <div className="allRecipesBackground longerPage ">
      <div className="row justify-content-center">
        <div className="col-12 col-xl-2 bigFilter">
          <FilterSidebar
            handleCategoriesChange={handleCategoriesChange}
            handleIngredientsChange={handleIngredientsChange}
            clearCat={clearCat}
            clearIng={clearIng}
          />
        </div>
        <div className="col-12 col-md-10">
          <div className="row g-4 justify-content-center justify-content-sm-start">
            <div className="d-flex justify-content-between">
              <h1 className="headings2">All recipes</h1>
              <div className="search">
                <input
                  type="text"
                  className="search__input"
                  placeholder="Search a recipe"
                  onChange={handleSearchChange}
                />
                <button className="search__button">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </div>
            <div className="col-12 col-xl-2 smallFilter">
              <FilterSidebar
                handleCategoriesChange={handleCategoriesChange}
                handleIngredientsChange={handleIngredientsChange}
                clearCat={clearCat}
                clearIng={clearIng}
              />
            </div>
            {currentRecipes && currentRecipes.length > 0 ? (
              currentRecipes.map((recipe) => {
                const isFav = userFavs && userFavs.some((fav) => fav.idRecipeFk === recipe.idRecipe);
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
              })
            ) : (
              <div className="d-flex justify-content-center">
                <h3>No recipes found</h3>
              </div>
            )}

            {/* Pagination */}
            {filteredRecipes && filteredRecipes.length > recipesPerPage && (
              <div className="d-flex justify-content-center mt-4">
                {activePage > 1 && (
                  <button className="paginationBtn me-2" onClick={handlePrevPage}>
                    Previous
                  </button>
                )}
                {activePage < Math.ceil(filteredRecipes.length / recipesPerPage) && (
                  <button className="paginationBtn" onClick={handleNextPage}>
                    Next
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllRecipes;
