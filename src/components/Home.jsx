import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchIngredientsAndCategories } from "../redux/actions/ingAndCat";

import { ToastContainer, toast } from "react-toastify";
import { fetchTopRecipes } from "../redux/actions/recipes";
import BentoGrid from "./BentoGrid";
import Pippo from "./Pippo";



function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIngredientsAndCategories());
    dispatch(fetchTopRecipes());
  }, []);

  const topRecipes = useSelector((state) => state.recipes.topRecipes);

  return (
    <div>
      <ToastContainer />
      <h1>Welcome to Flavorly</h1>
      <BentoGrid recipes={topRecipes} />
     
    </div>
  );
}

export default Home;
