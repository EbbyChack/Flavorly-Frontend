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

  const quickRecipes =
    recipes.recipes &&
    recipes.recipes.filter((recipe) => {
      const [time, unit] = recipe.cookingTime.split(" ");
      return unit === "minutes" && parseInt(time) <= 20;
    });

  const italianRecipes =
    recipes.recipes &&
    recipes.recipes.filter((recipe) => recipe.recipeCategories.some((category) => category.idCategoryFk === 2));

  return (
    <div className="container-fluid pt-5 newBg">
      <ToastContainer />
      {/* <div className="topHomeBanner mx-5">
        <h1 className="text-center">Flavorly</h1>
        <p className="">Dive into a world where every dish tells a story and every flavor ignites a sensation.</p>
        <p>
          Whether you're a culinary enthusiast, an adventurous foodie, or simply seeking to elevate your palate. Our
          team of seasoned chefs and food experts is dedicated to bringing you the finest culinary experiences,
          transforming ordinary meals into extraordinary delights.
        </p>
        <p> So, just lay back and savor the flavor.</p>
      </div> */}

      <BentoGrid recipes={topRecipes} />
      {recipes.recipes && <RecipesCarousel title={"Quick recipes"} recipes={quickRecipes} />}
      {recipes.recipes && <RecipesCarousel title={"Italian dishes"} recipes={italianRecipes} />}
   
    </div>
  );
}

export default Home;
