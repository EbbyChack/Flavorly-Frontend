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

  //test
  const testObject = {
    userId: 3,
    username: "poski",
    email: "lallygar1@gmail.com",
    name: "Laura",
    surname: "Garulli",
    dateOfBirth: "1999-08-23",
    comments: [
      {
        idComment: 8,
        userIdFk: 3,
        recipeIdFk: 14,
        commentText: "ciao",
        datePosted: "2024-04-03T00:02:58.067",
        isActive: true,
        recipeIdFkNavigation: null,
        userIdFkNavigation: null,
      },
      {
        idComment: 11,
        userIdFk: 3,
        recipeIdFk: 14,
        commentText: "prova",
        datePosted: "2024-04-03T00:11:11.167",
        isActive: true,
        recipeIdFkNavigation: null,
        userIdFkNavigation: null,
      },
      {
        idComment: 12,
        userIdFk: 3,
        recipeIdFk: 11,
        commentText: "prova",
        datePosted: "2024-04-03T15:53:19.903",
        isActive: true,
        recipeIdFkNavigation: null,
        userIdFkNavigation: null,
      },
      {
        idComment: 16,
        userIdFk: 3,
        recipeIdFk: 22,
        commentText: "Fatto cosi è spaziale!! ",
        datePosted: "2024-04-09T14:35:39.5",
        isActive: true,
        recipeIdFkNavigation: null,
        userIdFkNavigation: null,
      },
    ],
    ratings: [
      {
        idRating: 15,
        idUserFk: 3,
        idRecipeFk: 10,
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
        idRating: 17,
        idUserFk: 3,
        idRecipeFk: 13,
        ratingValue: 10,
        idRecipeFkNavigation: null,
        idUserFkNavigation: null,
      },
      {
        idRating: 18,
        idUserFk: 3,
        idRecipeFk: 14,
        ratingValue: 5,
        idRecipeFkNavigation: null,
        idUserFkNavigation: null,
      },
      {
        idRating: 23,
        idUserFk: 3,
        idRecipeFk: 16,
        ratingValue: 9,
        idRecipeFkNavigation: null,
        idUserFkNavigation: null,
      },
      {
        idRating: 24,
        idUserFk: 3,
        idRecipeFk: 17,
        ratingValue: 9,
        idRecipeFkNavigation: null,
        idUserFkNavigation: null,
      },
      {
        idRating: 25,
        idUserFk: 3,
        idRecipeFk: 18,
        ratingValue: 1,
        idRecipeFkNavigation: null,
        idUserFkNavigation: null,
      },
      {
        idRating: 26,
        idUserFk: 3,
        idRecipeFk: 19,
        ratingValue: 8,
        idRecipeFkNavigation: null,
        idUserFkNavigation: null,
      },
    ],
  };

  let userId = "";

  if (token) {
    const decodedToken = jwt_decode(token);
    const pathway = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
    userId = decodedToken[pathway];
  }
  useEffect(() => {
    dispatch(fetchUserInfo(userId));
  }, [userId]);

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
