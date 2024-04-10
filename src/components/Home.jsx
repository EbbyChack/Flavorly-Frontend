import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchIngredientsAndCategories } from "../redux/actions/ingAndCat";

import { ToastContainer, toast } from "react-toastify";
import { fetchTopRecipes } from "../redux/actions/recipes";
import BentoGrid from "./BentoGrid";
import RecipesCarousel from "./RecipesCarousel";
import HomeBackground from "../assets/video/HomeBackground.mp4";
import savor from "../assets/img/savor.png";
import Eyes from "./Eyes";

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
    <div className="homeBg">
      <ToastContainer />
      <div className="topHomeBanner ">
        <video autoPlay loop muted id="myVideo">
          <source src={HomeBackground} type="video/mp4" />
        </video>
        <div className="videoText">
          <p className="">Dive into a world where every dish tells a story and every flavor ignites a sensation.</p>
          <p>Whether you're a culinary enthusiast, an adventurous foodie, or simply seeking to elevate your palate.</p>
          <p>
            Our team of seasoned chefs and food experts is dedicated to bringing you the finest culinary experiences,
            transforming ordinary meals into extraordinary delights.
          </p>
          <p className=" d-inline"> So, just layback and savor the flavor!</p>
        </div>
      </div>

      <div className="px-5">
        <BentoGrid recipes={topRecipes} />
        {/* <div className="mx-5 my-3">
          
          <Eyes />
        </div> */}

        {recipes.recipes && <RecipesCarousel title={"Quick recipes"} recipes={quickRecipes} />}
        {recipes.recipes && <RecipesCarousel title={"Italian dishes"} recipes={italianRecipes} />}
      </div>
      <Eyes />
    </div>
  );
}

export default Home;
