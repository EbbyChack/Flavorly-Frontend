import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addComment,
  addUserFav,
  deleteUserFav,
  fetchSingleRecipe,
  fetchUserFavs,
  softDeleteComment,
} from "../redux/actions/recipes";
import { formatDate, formatDateNoTime } from "../utils/utils";
import { addNewRating, fetchAverageRating, updateRating } from "../redux/actions/ratings";
import ReactStars from "react-rating-stars-component";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash, faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

import { clearSingleRecipe } from "../redux/reducers/recipeReducer";
import { clearAverageRating } from "../redux/reducers/ratingsReducer";

function Recipe() {
  //test
  const testObject = {
    idRecipe: 11,
    nameRecipe: "Aglio e olio",
    description: "Aglio e olio",
    cookingTime: "10 minutes",
    servings: 2,
    difficulty: "super easy",
    instructions: "put aglio put olio and BAM",
    mainImg:
      "https://www.fattoincasadabenedetta.it/wp-content/uploads/2022/02/SPAGHETTI-AGLIO-OLIO-E-PEPERONCINO-sito-6.jpg",
    img2: "https://www.fattoincasadabenedetta.it/wp-content/uploads/2022/02/SPAGHETTI-AGLIO-OLIO-E-PEPERONCINO-sito-6.jpg",
    img3: "https://www.fattoincasadabenedetta.it/wp-content/uploads/2022/02/SPAGHETTI-AGLIO-OLIO-E-PEPERONCINO-sito-6.jpg",
    videoUrl: "https://www.youtube.com/embed/bJUiWdM__Qw?si=_6pt-8W75aoSH8KU",
    dateAdded: "2024-03-26",
    isActive: true,
    comments: [
      {
        idComment: 12,
        userIdFk: 3,
        username: "poski",
        recipeIdFk: 0,
        commentText: "prova",
        datePosted: "2024-04-03T15:53:19.903",
        isActive: false,
      },
    ],
    ratings: [
      {
        idRating: 13,
        idUserFk: 7,
        idRecipeFk: 11,
        ratingValue: 10,
        idRecipeFkNavigation: null,
        idUserFkNavigation: null,
      },
      {
        idRating: 16,
        idUserFk: 3,
        idRecipeFk: 11,
        ratingValue: 8,
        idRecipeFkNavigation: null,
        idUserFkNavigation: null,
      },
      {
        idRating: 19,
        idUserFk: 4,
        idRecipeFk: 11,
        ratingValue: 10,
        idRecipeFkNavigation: null,
        idUserFkNavigation: null,
      },
    ],
    recipeCategories: [
      {
        idRecipeCat: 15,
        idRecipeFk: 11,
        idCategoryFk: 2,
        idCategoryFkNavigation: null,
        idRecipeFkNavigation: null,
      },
    ],
    recipeIngredients: [
      {
        idRecipeIng: 36,
        idRecipeFk: 11,
        idIngredientFk: 3,
        idIngredientFkNavigation: null,
        idRecipeFkNavigation: null,
      },
      {
        idRecipeIng: 37,
        idRecipeFk: 11,
        idIngredientFk: 4,
        idIngredientFkNavigation: null,
        idRecipeFkNavigation: null,
      },
      {
        idRecipeIng: 38,
        idRecipeFk: 11,
        idIngredientFk: 1,
        idIngredientFkNavigation: null,
        idRecipeFkNavigation: null,
      },
    ],
    userFavorites: [
      {
        idUserFav: 36,
        idUserFk: 3,
        idRecipeFk: 11,
        idRecipeFkNavigation: null,
        idUserFkNavigation: null,
      },
    ],
  };
  //getting the id from the url
  const { id } = useParams();

  //getting the recipe from the store
  const recipe = useSelector((state) => state.recipes.singleRecipe);

  //getting ingredients and categories from the store
  const ingredientsAndCategories = useSelector((state) => state.ingredientsAndCategories.ingredientsAndCategories);

  //getting the average rating from the store
  const averageRating = useSelector((state) => state.ratings.averageRating);

  //getting userfavs from the store
  const userFavs = useSelector((state) => state.recipes.userFavs);

  //getting the userid from the token using jwt-decode
  const token = useSelector((state) => state.auth.loggedProfile);

  let userId = "";

  if (token) {
    const decodedToken = jwt_decode(token);
    const pathway = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
    userId = decodedToken[pathway];
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleRecipe(id));
    dispatch(fetchAverageRating(id));
    dispatch(fetchUserFavs(userId));

    return () => {
      dispatch(clearSingleRecipe());
      dispatch(clearAverageRating());
    };
  }, [id]);

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
  //need to test this

  //this line checks if the user has already liked the recipe
  const userHasLiked = userFavs && userFavs.some((fav) => fav.idRecipeFk == id);

  const userFav = userFavs && userFavs.find((fav) => fav.idRecipeFk == id);
  const userFavId = userFav ? userFav.idUserFav : null;

  //function to like the recipe
  const handleLike = () => {
    if (userHasLiked) {
      dispatch(deleteUserFav(userFavId)).then(() => {
        dispatch(fetchUserFavs(userId));
      });
    } else {
      const userFavObj = {
        idUserFk: userId,
        idRecipeFk: id,
      };
      dispatch(addUserFav(userFavObj)).then(() => {
        dispatch(fetchUserFavs(userId));
      });
    }
  };

  const [commentText, setCommentText] = useState("");
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const commentObj = {
      recipeIdFk: id,
      userIdFk: userId,
      commentText: commentText,
    };
    //need to test this
    //dispatching the action to add a comment
    dispatch(addComment(commentObj)).then(() => {
      // Fetch the updated recipe after adding the comment
      dispatch(fetchSingleRecipe(id));
    });
    setCommentText("");
  };

  const handleDeleteComment = (commentId) => {
    dispatch(softDeleteComment(commentId)).then(() => {
      // Fetch the updated recipe after deleting the comment
      dispatch(fetchSingleRecipe(id));
    });
  };
  const [modalShow, setModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);

  return (
    <div>
      {recipe ? (
        <div className="container my-5">
          <h1>{recipe.nameRecipe}</h1>
          <span onClick={handleLike} className="like-button text-danger m-3">
            <FontAwesomeIcon icon={userHasLiked ? solidHeart : regularHeart} />
          </span>

          {/* <button className="btn btn-dark" onClick={() => setModalShow(true)}>
            <FontAwesomeIcon icon={faPencil} />
          </button>
          <button className="btn btn-dark" onClick={() => setDeleteModalShow(true)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <EditRecipeForm show={modalShow} onHide={() => setModalShow(false)} />
          <DeleteModal id={id} show={deleteModalShow} onHide={() => setDeleteModalShow(false)} /> */}

          <h2>Rating:</h2>

          {averageRating.averageRating && (
            <ReactStars count={5} value={averageRating.averageRating} size={60} isHalf={true} edit={false} />
          )}
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
            {userRating && (
              <ReactStars
                count={5}
                size={60}
                value={userRating ? userRating.ratingValue / 2 : 0}
                isHalf={true}
                edit={true}
                onChange={(value) => updateRatingFunc(value)}
              />
            )}
            {!userHasRated && (
              <ReactStars count={5} size={60} isHalf={true} edit={true} onChange={(value) => newRating(value)} />
            )}
          </div>

          <div>
            <h2>Comments</h2>
            <div className="row">
              {recipe.comments && recipe.comments.length > 0 ? (
                recipe.comments.map((comment) => {
                  return (
                    <div className="col-12 bg-light rounded rounded-2 p-2 mb-2" key={comment.idComment}>
                      <div className="row">
                        <div className="col-2">
                          <p>{comment.username}</p>
                        </div>
                        <div className="col-4">
                          <p>{comment.commentText}</p>
                        </div>
                        <div className="col-5">
                          <p>{formatDate(comment.datePosted)}</p>
                        </div>
                        <div className="col-1">
                          {comment.userIdFk == userId && (
                            <button className="btn btn-dark" onClick={() => handleDeleteComment(comment.idComment)}>
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>No comments yet</p>
              )}
            </div>
            <div>
              <h6>Add a comment</h6>
              <form onSubmit={handleCommentSubmit} className="d-flex">
                <input
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write your comment here..."
                  className="form-control"
                />
                <button type="submit" className="btn btn-dark">
                  Post
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Recipe;
