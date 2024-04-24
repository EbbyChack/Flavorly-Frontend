import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function BentoGrid(props) {
  // Array of values for the columns in each row
  const rowColumnValues = [
    [6, 3, 3], 
    [3, 4, 5],
    [4, 5, 3],
  ];

  // Get the recipes from the props
  const recipes = props.recipes;
  // Initialize the card index
  let cardIndex = 0;

  return (
    <div className="mx-1 mx-md-5 ">
      <h1 className="headings">
        ━━━<span>Top rated recipes</span>━━━
      </h1>
      
      {recipes && (
        <div className="d-flex justify-content-center">
          <Col xs={12} className="colBento">
            <div className="scrollable-row">
              {/* Generate an array with 100 elements, which is filled with undefined values(using fill() method) and then map over it to generate 100 rows. */}
              {Array(100)
                .fill()
                .map((_, rowIndex) => {
                  // Get the values for the columns in the row
                  const rowValues = rowColumnValues[rowIndex % rowColumnValues.length];
                  return (
                    <Row key={rowIndex} className="g-2 m-1">
                      {rowValues.map((value, columnIndex) => {
                        // recipe will cycle through the recipes in recipes as cardIndex increments
                        const recipe = recipes[cardIndex++ % recipes.length];
                        return (
                          // Create a column with the value from the rowValues array
                          <Col key={`${rowIndex}-${columnIndex}`} md={12} lg={value}>
                            {recipe && (
                              <>
                                <Link to={`/recipe/${recipe.idRecipe}`}>
                                  <div className="BentoCustomCard">
                                    <div className="content">
                                      <div className="back">
                                        <div className="back-content">
                                          <img
                                            src={recipe.mainImg}
                                            className="CustomCard-img"
                                            alt={"img" + recipe.idRecipe}
                                          />
                                          <div className="back-content-text">
                                            <div className="description">
                                              <p className="">
                                                <strong>{recipe.nameRecipe}</strong>
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
                                          <img
                                            src={recipe.mainImg}
                                            className="CustomCard-img-front"
                                            alt={"img" + recipe.idRecipe}
                                          />
                                          <div className="back-content-text">
                                            <div className="description">
                                              <div className="bento-card-text">
                                                <p className="d-flex justify-content-between align-items-center">
                                                  <strong>{recipe.nameRecipe}</strong>
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
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              </>
                            )}
                          </Col>
                        );
                      })}
                    </Row>
                  );
                })}
            </div>
          </Col>
        </div>
      )}
    </div>
  );
}

export default BentoGrid;
