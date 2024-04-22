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
import {
  faHourglass,
  faPencil,
  faTachographDigital,
  faTachometerAlt,
  faTrash,
  faUser,
  faUserCircle,
  faUtensils,
  faHeart as solidHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import EditRecipeForm from "./EditRecipeForm";
import DeleteModal from "./DeleteModal";
import { clearSingleRecipe } from "../redux/reducers/recipeReducer";
import { clearAverageRating } from "../redux/reducers/ratingsReducer";

function AdminRecipe() {
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
        <div className="recipeBg">
          <div className="recipeContainer">
            <div className="topSec d-flex flex-column flex-md-row justify-content-between">
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
                <h1>{recipe.nameRecipe}</h1>
                <p>{recipe.description}</p>

               
              </div>
              <div className="d-flex justify-content-end align-items-center mb-2 mb-md-0">
                <button className="adminBtns edit me-2" onClick={() => setModalShow(true)}>
                  <FontAwesomeIcon icon={faPencil} />
                </button>
                <button className="adminBtns delete" onClick={() => setDeleteModalShow(true)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <EditRecipeForm show={modalShow} onHide={() => setModalShow(false)} />
                <DeleteModal id={id} show={deleteModalShow} onHide={() => setDeleteModalShow(false)} />
              </div>
            </div>
            <div className="middleSec">
              <div className="recipeImgsContainer">
                <div>
                  <img src={recipe.mainImg} alt="Main" className="recipeImg" />
                </div>
                <div className="secondCont">
                  <img src={recipe.img2} alt="Secondary 1" className="recipeImgSec" />
                  <img src={recipe.img3} alt="Secondary 2" className="recipeImgSec" />
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <div className="DetailsSec ">
                  <div className="ingredientsSec">
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
                  </div>
                  <div className="recipeDetails">
                    <div>
                      <FontAwesomeIcon icon={faHourglass} className="icon" />
                      <b>Ready in: </b>
                      <span>{recipe.cookingTime}</span>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faUtensils} className="icon" />
                      <b>Servings: </b>
                      <span>{recipe.servings}</span>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faTachometerAlt} className="icon" />
                      <b>Difficulty: </b>
                      <span>{recipe.difficulty}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="instructions">
                <h2>Instructions</h2>
                <p>{recipe.instructions}</p>
              </div>

              <iframe width="100%" className="recipeVideo" src={recipe.videoUrl}></iframe>
            </div>

            

           
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default AdminRecipe;
