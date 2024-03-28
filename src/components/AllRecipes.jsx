import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRecipes } from "../redux/actions/recipes";

function AllRecipes() {
  const recipes = useSelector((state) => state.recipes) || { recipes: [] };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllRecipes());
  }, []);

  return (
    <div>
      <h1>All recipes</h1>
      <div className="container">
        <div className="row">
          {recipes.recipes &&
            recipes.recipes.map((recipe) => {
              return (
                <div className="col-4" key={recipe.idRecipe}>
                  <div className="card">
                    <img
                      src={recipe.mainImg}
                      className="card-img-top"
                      alt={"img" + recipe.idRecipe}
                      style={{ width: "100%", height: "50vh", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{recipe.nameRecipe}</h5>
                      <p className="card-text">{recipe.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default AllRecipes;
