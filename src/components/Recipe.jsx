import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleRecipe } from "../redux/actions/recipes";
import { formatDate, formatDateNoTime } from "../utils/utils";
import { addNewRating, fetchAverageRating, updateRating } from "../redux/actions/ratings";
import ReactStars from "react-rating-stars-component";
import { jwtDecode as jwt_decode } from "jwt-decode";
import YouTube from "react-youtube";

function Recipe() {
  //getting the id from the url
  const { id } = useParams();

  //getting the recipe from the store
  const recipe = useSelector((state) => state.recipes.singleRecipe);

  //getting ingredients and categories from the store
  const ingredientsAndCategories = useSelector((state) => state.ingredientsAndCategories.ingredientsAndCategories);

  //getting the average rating from the store
  const averageRating = useSelector((state) => state.ratings.averageRating);

  //getting the userid from the token using jwt-decode
  const token = useSelector((state) => state.auth.loggedProfile);
  const decodedToken = jwt_decode(token);
  const pathway = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
  const userId = decodedToken[pathway];

  const dispatch = useDispatch();

  //fetching the recipe
  useEffect(() => {
    dispatch(fetchSingleRecipe(id));
  }, [id]);

  //fetching the average rating
  useEffect(() => {
    if (recipe) {
      dispatch(fetchAverageRating(id));
    }
  }, [id, addNewRating, updateRating]);

  //function to add a new rating
  const newRating = (value) => {
    const ratingObj = {
      idRecipeFk: id,
      idUserFk: userId,
      ratingValue: value * 2,
    };
    dispatch(addNewRating(ratingObj)).then(() => {
      dispatch(fetchAverageRating(id));
    });
  };
  //checking if the user has rated the recipe and getting the user rating
  const userHasRated = recipe.ratings && recipe.ratings.some((rating) => rating.idUserFk == userId);
  const userRating = recipe.ratings && recipe.ratings.find((rating) => rating.idUserFk == userId);

  //function to update the rating
  const updateRatingFunc = (value) => {
    const ratingObj = {
      idRecipeFk: id,
      idUserFk: userId,
      ratingValue: value * 2,
    };

    const ratingId = userRating.idRating;

    dispatch(updateRating(ratingId, ratingObj)).then(() => {
      // Fetch the updated average rating after updating the rating
      dispatch(fetchAverageRating(id));
    });
  };

  return (
    <div>
      {recipe ? (
        <div className="container my-5">
          <h1>{recipe.nameRecipe}</h1>
          <h2>Rating:</h2>

          <ReactStars count={5} value={averageRating.averageRating} size={60} isHalf={true} edit={false} />
          <h6>N° ratings: {averageRating.numberOfRatings ? averageRating.numberOfRatings : 0}</h6>

          <img
            src={recipe.mainImg}
            alt={"img" + recipe.idRecipe}
            style={{ width: "50%", height: "40vh", objectFit: "cover" }}
          />
          <img
            src={recipe.img2}
            alt={"img" + recipe.idRecipe}
            style={{ width: "50%", height: "40vh", objectFit: "cover" }}
          />
          <img
            src={recipe.img3}
            alt={"img" + recipe.idRecipe}
            style={{ width: "50%", height: "40vh", objectFit: "cover" }}
          />
          <p>{recipe.description}</p>
          <p>{recipe.cookingTime}</p>
          <p>Servings: For {recipe.servings}</p>
          <p>Difficulty: {recipe.difficulty}</p>
          <p>{formatDateNoTime(recipe.dateAdded)}</p>
          <h2>Categories</h2>
          <ul>
            {/* mapping through the categories and getting the category name */}
            {recipe.recipeCategories &&
              recipe.recipeCategories.map((category) => {
                if (ingredientsAndCategories.categories) {
                  //searching for the category name
                  const categoryDetails = ingredientsAndCategories.categories.find(
                    (cat) => cat.idCategory === category.idCategoryFk
                  );
                  return (
                    <li key={category.idCategoryFk}>
                      {categoryDetails ? categoryDetails.categoryName : "Category not found"}
                    </li>
                  );
                }
                return null;
              })}
          </ul>
          <h2>Ingredients</h2>
          {recipe.recipeIngredients &&
            recipe.recipeIngredients.map((ingredient) => {
              if (ingredientsAndCategories.ingredients) {
                const ingredientDetails = ingredientsAndCategories.ingredients.find(
                  (ing) => ing.idIngredient === ingredient.idIngredientFk
                );
                return (
                  <li key={ingredient.idIngredientFk}>
                    {ingredientDetails ? ingredientDetails.nameIngredient : "Ingredient not found"}
                  </li>
                );
              }
              return null;
            })}
          <h2>Instructions</h2>
          <p>{recipe.instructions}</p>
          <iframe width="100%" height="515" src={recipe.videoUrl}></iframe>

          <div>
            {userHasRated ? <h2>Update your rating</h2> : <h2>Rate this recipe</h2>}
            <ReactStars
              count={5}
              size={60}
              value={userHasRated ? userRating.ratingValue / 2 : 0}
              isHalf={true}
              edit={true}
              onChange={(value) => (userHasRated ? updateRatingFunc(value) : newRating(value))}
            />
          </div>

          <div>
            <h2>Comments</h2>
            <div className="row">
              {recipe.comments && recipe.comments.length > 0 ? (
                recipe.comments.map((comment) => {
                  return (
                    <div className="col-12 bg-light" key={comment.idComment}>
                      <div className="row">
                        <div className="col-4">
                          <p>{comment.username}</p>
                          <p>{comment.commentText}</p>
                        </div>
                        <div className="col-4">
                          <p>{formatDate(comment.datePosted)}</p>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>No comments yet</p>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Recipe;
