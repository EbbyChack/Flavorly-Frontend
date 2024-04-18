import React from "react";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

function CommentsCarousel(props) {
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
                <div className="commentCard">
                  <Link to={`/recipe/${recipe.idRecipe}`}>
                    <img src={recipe.image} alt={recipe.title} className="commentCardImg" />
                  </Link>
                  <div className="commentCardInfo">
                    <h3>{recipe.title}</h3>
                  </div>
                </div>
              </div>
            );
          })}
      </Carousel>
    </div>
  );
}

export default CommentsCarousel;
