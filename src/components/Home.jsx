import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchIngredientsAndCategories } from '../redux/actions/ingAndCat';

function Home() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIngredientsAndCategories());
  }, []);

  return (
    <div>
        <ul>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/allrecipes">All Recipes</Link></li>
        </ul>
    </div>
  )
}

export default Home