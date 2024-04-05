import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../redux/actions/user";
import { formatDateNoTime } from "../utils/utils";
import { formatDate } from "../utils/utils";
import ReactStars from "react-rating-stars-component";
import { fetchAllRecipes, fetchUserFavs } from "../redux/actions/recipes";
import { Link } from "react-router-dom";
import { jwtDecode as jwt_decode } from "jwt-decode";
import ChangePassword from "./ChangePassword";

import { ToastContainer } from "react-toastify";

function UserProfile() {
  const dispatch = useDispatch();

  //getting the userid from the token using jwt-decode
  const token = useSelector((state) => state.auth.loggedProfile);

  let userId = "";

  if (token) {
    const decodedToken = jwt_decode(token);
    const pathway = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
    userId = decodedToken[pathway];
  }

  dispatch(fetchUserInfo(userId));

  useEffect(() => {
    dispatch(fetchAllRecipes());
    if (userId) {
      dispatch(fetchUserFavs(userId));
    }
  }, [userId]);

  const userInfo = useSelector((state) => state.user.userInfo);
  const recipes = useSelector((state) => state.recipes.recipes);
  const userFavs = useSelector((state) => state.recipes.userFavs);

  const [modalShow, setModalShow] = useState(false);

  return (
    <div>
      <ToastContainer />
      {userInfo && (
        <div className="container">
          <h1>{userInfo.username}</h1>
          <p>{userInfo.name}</p>
          <p>{userInfo.surname}</p>
          <p>{userInfo.email}</p>
          <button className="btn btn-dark" onClick={() => setModalShow(true)}>
            Change password
          </button>
          <ChangePassword show={modalShow} onHide={() => setModalShow(false)} />
          <p>{formatDateNoTime(userInfo.dateOfBirth)}</p>
          <div>
            <h3>Comments</h3>
            {userInfo.comments &&
              userInfo.comments.map((comment) => {
                const recipe = recipes && recipes.find((recipe) => recipe.idRecipe === comment.recipeIdFk);
                return (
                  recipe && (
                    <div key={comment.idComment}>
                      <Link to={`/recipe/${recipe.idRecipe}`}>{recipe.nameRecipe}</Link>
                      <p>{comment.commentText}</p>
                      <p>{formatDate(comment.datePosted)}</p>
                    </div>
                  )
                );
              })}
          </div>

          <div>
            <h3>Ratings</h3>
            {userInfo.ratings &&
              userInfo.ratings.map((rating) => {
                const recipe = recipes && recipes.find((recipe) => recipe.idRecipe === rating.idRecipeFk);
                return (
                  recipe && (
                    <div key={rating.idRating}>
                      <Link to={`/recipe/${recipe.idRecipe}`}>{recipe.nameRecipe}</Link>
                      <ReactStars
                        count={5}
                        size={30}
                        value={rating.ratingValue / 2}
                        isHalf={true}
                        edit={false}
                        char="✪"
                      />
                    </div>
                  )
                );
              })}
          </div>
          <div>
            <h3>Favorite recipes</h3>
            {userFavs &&
              userFavs.map((fav) => {
                const recipe = recipes && recipes.find((recipe) => recipe.idRecipe === fav.idRecipeFk);
                return (
                  recipe && (
                    <div key={fav.idUserFav}>
                      <Link to={`/recipe/${recipe.idRecipe}`}>{recipe.nameRecipe}</Link>
                    </div>
                  )
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
