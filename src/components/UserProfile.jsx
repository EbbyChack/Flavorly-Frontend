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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import RecipesCarousel from "./RecipesCarousel";
import FavCarousel from "./FavCarousel";
import CommentsCarousel from "./CommentsCarousel";

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

  const favRecipes =
    recipes && userFavs
      ? userFavs.map((fav) => recipes.find((recipe) => recipe.idRecipe === fav.idRecipeFk)).filter(Boolean)
      : [];

  const [numCommentsToShow, setNumCommentsToShow] = useState(3);

  const handleSeeMoreComments = () => {
    setNumCommentsToShow(userInfo.comments.length);
  };

  const handleSeeLessComments = () => {
    setNumCommentsToShow(3);
  };

  const [numRatingsToShow, setNumRatingsToShow] = useState(3);

  const handleSeeMoreRatings = () => {
    setNumRatingsToShow(userInfo.ratings.length);
  };

  const handleSeeLessRatings = () => {
    setNumRatingsToShow(3);
  };

  return (
    <div>
      <ToastContainer />
      {userInfo && (
        <div className="profileBg">
          <div className="profileContainer">
            <div className="userInfoSec">
              <div className="userInfoSec2">
                <h3>
                  {userInfo.name} {userInfo.surname}
                </h3>
                <p>@{userInfo.username}</p>
                <p>{userInfo.email}</p>
                <div>
                  <span onClick={() => setModalShow(true)}>Modify password</span>
                  <ChangePassword show={modalShow} onHide={() => setModalShow(false)} />
                </div>
              </div>
            </div>

            {favRecipes && <FavCarousel title={"Your favorite recipes"} recipes={favRecipes} />}

            <div className="commentsSec container">
              <h1 className="headings">
                ━━━<span>Comments</span>━━━
              </h1>
              <div className="row g-4">
                {userInfo.comments &&
                  userInfo.comments.slice(0, numCommentsToShow).map((comment) => {
                    const recipe = recipes && recipes.find((recipe) => recipe.idRecipe === comment.recipeIdFk);
                    return (
                      recipe && (
                        <div className="col-lg-6 col-xl-4" key={comment.idComment}>
                          <div className="singleComment">
                            <Link className="linkTo" to={`/recipe/${recipe.idRecipe}`}>
                              {recipe.nameRecipe}
                            </Link>
                            <p>"{comment.commentText}"</p>
                            <p className="time">{formatDate(comment.datePosted)}</p>
                          </div>
                        </div>
                      )
                    );
                  })}
              </div>
              {numCommentsToShow <= 3 ? (
                <div className="d-flex justify-content-end">
                  <span className=" seeMore " onClick={handleSeeMoreComments}>
                    See More...
                  </span>
                </div>
              ) : (
                <div className="d-flex justify-content-end">
                  <span className=" seeMore " onClick={handleSeeLessComments}>
                    See Less
                  </span>
                </div>
              )}
            </div>

            <div className="commentsSec container">
              <h1 className="headings">
                ━━━<span>Ratings</span>━━━
              </h1>
              <div className="row g-4">
                {userInfo.ratings &&
                  userInfo.ratings.slice(0, numRatingsToShow).map((rating) => {
                    const recipe = recipes && recipes.find((recipe) => recipe.idRecipe === rating.idRecipeFk);
                    return (
                      recipe && (
                        <div className="col-lg-6 col-xl-4" key={rating.idRating}>
                          <div className="profileRating">
                            <Link className="linkTo" to={`/recipe/${recipe.idRecipe}`}>
                              {recipe.nameRecipe}
                            </Link>
                            <ReactStars
                              count={5}
                              size={30}
                              value={rating.ratingValue / 2}
                              isHalf={true}
                              edit={false}
                              char="✪"
                            />
                          </div>
                        </div>
                      )
                    );
                  })}
              </div>
              {numRatingsToShow <= 3 ? (
                <div className="d-flex justify-content-end">
                  <span className=" seeMore " onClick={handleSeeMoreRatings}>
                    See More...
                  </span>
                </div>
              ) : (
                <div className="d-flex justify-content-end">
                  <span className=" seeMore " onClick={handleSeeLessRatings}>
                    See Less
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
