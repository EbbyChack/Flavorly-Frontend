import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchIngredientsAndCategories } from "../redux/actions/ingAndCat";

import { ToastContainer, toast } from "react-toastify";
import { fetchTopRecipes } from "../redux/actions/recipes";
import BentoGrid from "./BentoGrid";
import RecipesCarousel from "./RecipesCarousel";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIngredientsAndCategories());
    dispatch(fetchTopRecipes());
  }, []);

  const topRecipes = useSelector((state) => state.recipes.topRecipes);
  const recipes = useSelector((state) => state.recipes);

  const quickRecipes = recipes.recipes && recipes.recipes.filter(recipe => {
    const [time, unit] = recipe.cookingTime.split(' ');
    return unit === 'minutes'  && parseInt(time) <= 20;
  });
    
  const italianRecipes = recipes.recipes && recipes.recipes.filter(recipe => {
    return recipe.recipeCategories === 'Italian';
  });
  

  return (
    <div className="container-fluid">
      <ToastContainer />
      <div className="topHomeBanner mx-5">
        <h1 className="text-center">Welcome to Bento</h1>
        <p className="text-center">
          Bento is a recipe sharing platform where you can find and share recipes with people all around the world.
        </p>
      </div>

      <BentoGrid recipes={topRecipes} />
      {recipes.recipes && <RecipesCarousel title={"Quick recipes"} recipes={quickRecipes} />}
      {recipes.recipes && <RecipesCarousel title={"Italian dishes"} recipes={quickRecipes} />}
      
    </div>
  );
}

export default Home;
