import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleRecipe } from "../redux/actions/recipes";
import { formatDate, formatDateNoTime } from "../utils/utils";


function Recipe() {
  const { id } = useParams();

  const recipe = useSelector((state) => state.recipes.singleRecipe);
  const ingredientsAndCategories = useSelector((state) => state.ingredientsAndCategories.ingredientsAndCategories);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleRecipe(id));
  }, [id]);

  

  return (
    <div>
      {recipe ? (
        <div className="container my-5">
          <h1>{recipe.nameRecipe}</h1>
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
            {recipe.recipeCategories &&
              recipe.recipeCategories.map((category) => {
                if (ingredientsAndCategories.categories) {
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
