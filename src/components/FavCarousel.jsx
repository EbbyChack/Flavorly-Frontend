import React from "react";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";

function FavCarousel(props) {
  const recipes = props.recipes;
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const CustomLeftArrow = ({ onClick, ...rest }) => {
    return (
      <button onClick={onClick} {...rest} className="custom-arrow-left">
        {" "}
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
    );
  };
  const CustomRightArrow = ({ onClick, ...rest }) => {
    return (
      <button onClick={onClick} {...rest} className="custom-arrow-right">
        {" "}
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    );
  };

  const ingredientsAndCategories = useSelector((state) => state.ingredientsAndCategories.ingredientsAndCategories);
  return (
    <div className="CarouselCustom container  ">
      <h1 className="headings">
        ━━━<span>{props.title}</span>━━━
      </h1>

      <Carousel
        swipeable={true}
        draggable={true}
        responsive={responsive}
        infinite={true}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="transform 300ms ease-in-out"
        transitionDuration={500}
        containerClass="carousel-container"
        itemClass="carousel-item-padding-40-px"
        partialVisible={true}
        arrows={true}
      >
        {recipes &&
          recipes.map((recipe) => {
            return (
              <div key={recipe.idRecipe} className="mx-2 py-2 px-1">
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
                              <FontAwesomeIcon className="heartIcon" icon={solidHeart} />
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
                                <FontAwesomeIcon className="heartIcon" icon={solidHeart} />
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
          })}
      </Carousel>
    </div>
  );
}

export default FavCarousel;
