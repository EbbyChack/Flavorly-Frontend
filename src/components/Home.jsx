import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchIngredientsAndCategories } from "../redux/actions/ingAndCat";

import { ToastContainer } from "react-toastify";
import { fetchTopRecipes } from "../redux/actions/recipes";
import BentoGrid from "./BentoGrid";
import RecipesCarousel from "./RecipesCarousel";
import HomeBackground from "../assets/video/HomeBackground.mp4";
import Eyes from "./Eyes";
import Sentences from "./Sentences";

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

  const amercianRecipes =
    recipes.recipes &&
    recipes.recipes.filter((recipe) => recipe.recipeCategories.some((category) => category.idCategoryFk === 9));

  const veganRecipes =
    recipes.recipes &&
    recipes.recipes.filter((recipe) => recipe.recipeCategories.some((category) => category.idCategoryFk === 11));

  return (
    <div className="homeBg">
      <ToastContainer />
      <div className="topHomeBanner ">
        <video autoPlay loop muted id="myVideo">
          <source src={HomeBackground} type="video/mp4" />
        </video>
        <div className="videoText">
          <Sentences />
        </div>
      </div>

      <div className="px-md-5">
        <BentoGrid recipes={topRecipes} />

        {recipes.recipes && <RecipesCarousel title={"Quick recipes"} recipes={quickRecipes} />}
        {recipes.recipes && <RecipesCarousel title={"Italian dishes"} recipes={italianRecipes} />}
        {recipes.recipes && <RecipesCarousel title={"American dishes"} recipes={amercianRecipes} />}
        {recipes.recipes && <RecipesCarousel title={"Vegan dishes"} recipes={veganRecipes} />}
      </div>
      <Eyes />
    </div>
  );
}

export default Home;
