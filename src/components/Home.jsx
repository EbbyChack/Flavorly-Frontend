import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchIngredientsAndCategories } from "../redux/actions/ingAndCat";
import { fetchLogout } from "../redux/actions/auth";
import { ToastContainer, toast } from "react-toastify";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIngredientsAndCategories());
  }, []);

  const handleLogout = () => {
    dispatch(fetchLogout());
    toast.success("Logout successful");
  };

  return (
    <div>
      <ToastContainer />
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/allrecipes">All Recipes</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <button
            onClick={() => {
              handleLogout();
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Home;
