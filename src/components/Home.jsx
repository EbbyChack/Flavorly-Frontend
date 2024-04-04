import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchIngredientsAndCategories } from "../redux/actions/ingAndCat";

import { ToastContainer, toast } from "react-toastify";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIngredientsAndCategories());
  }, []);

  return (
    <div>
      <ToastContainer />
      <h1>Welcome to Flavorly</h1>
    </div>
  );
}

export default Home;
