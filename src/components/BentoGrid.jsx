import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function BentoGrid(props) {
  const rowColumnValues = [
    [6, 3, 3], // Values for the first row
    [3, 4, 5],
    [4, 5, 3],
  ];

  const recipes = props.recipes;
  let cardIndex = 0;

  return (
    <div className="container ">
      {recipes && (
        <div className="d-flex justify-content-center">
          <Col xs={12} className="colBento border border-1">
            <div className="scrollable-row">
              {Array(100)
                .fill()
                .map((_, rowIndex) => {
                  // Generate 100 rows
                  const rowValues = rowColumnValues[rowIndex % rowColumnValues.length];
                  return (
                    <Row key={rowIndex} className="g-2 m-1">
                      {rowValues.map((value, columnIndex) => {
                        const card = recipes[cardIndex++ % recipes.length];
                        return (
                          <Col key={`${rowIndex}-${columnIndex}`} xs={12} md={value}>
                            {card && (
                              <Link to={`/recipe/${card.idRecipe}`}>
                                <Card key={card.idRecipe}>
                                  <Card.Img src={card.mainImg} alt="Card image" className="bentoImg" />
                                  <Card.ImgOverlay>
                                    <Card.Title>{card.nameRecipe}</Card.Title>
                                    <Card.Text>{card.description}</Card.Text>
                                  </Card.ImgOverlay>
                                </Card>
                              </Link>
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
