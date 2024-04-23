import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addRecipe } from "../redux/actions/recipes";

import { ToastContainer, toast } from "react-toastify";
import ReactSelect from "react-select";

function CreateRecipeForm(props) {
  const [namerecipe, setNamerecipe] = useState("");
  const [description, setDescription] = useState("");
  const [cookingtime, setCookingtime] = useState("");
  const [servings, setServings] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [instructions, setInstructions] = useState("");
  const [mainimg, setMainimg] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [videourl, setVideourl] = useState("");
  const [ingredientsid, setIngredientsid] = useState([]);
  const [categoriesid, setCategoriesid] = useState([]);

  const ingredientsAndCategories = useSelector((state) => state.ingredientsAndCategories.ingredientsAndCategories);

  const ingredientsOptions = ingredientsAndCategories.ingredients.map((ingredient) => ({
    value: ingredient.idIngredient,
    label: ingredient.nameIngredient,
  }));

  const categoriesOptions = ingredientsAndCategories.categories.map((category) => ({
    value: category.idCategory,
    label: category.categoryName,
  }));

  const dispatch = useDispatch();
  const notify = () => toast.error("Please fill all fields!");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !namerecipe ||
      !description ||
      !cookingtime ||
      !servings ||
      !difficulty ||
      !instructions ||
      !mainimg ||
      !img2 ||
      !img3 ||
      !videourl ||
      !ingredientsid ||
      !categoriesid
    ) {
      notify();
      return;
    }
    const recipeObj = {
      namerecipe,
      description,
      cookingtime,
      servings,
      difficulty,
      instructions,
      mainimg,
      img2,
      img3,
      videourl,
      recipeIngredientsIds: ingredientsid,
      recipeCategoriesIds: categoriesid,
    };

    dispatch(addRecipe(recipeObj));
    props.onHide();
    toast.success("Recipe added successfully");

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  return (
    <div>
      <ToastContainer />
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Add recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="namerecipe">Recipe Name</label>
              <input
                type="text"
                className="form-control"
                id="namerecipe"
                placeholder="Enter Recipe Name"
                value={namerecipe}
                onChange={(e) => setNamerecipe(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                id="description"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cookingtime">Cooking Time</label>
              <input
                type="text"
                className="form-control"
                id="cookingtime"
                placeholder="Enter Cooking Time"
                value={cookingtime}
                onChange={(e) => setCookingtime(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="servings">Servings</label>
              <input
                type="number"
                className="form-control"
                id="servings"
                placeholder="Enter Servings"
                value={servings}
                onChange={(e) => setServings(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="difficulty">Difficulty</label>
              <select
                className="form-control"
                id="difficulty"
                value={difficulty}
               
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="" disabled>Select Difficulty</option>
                <option value="Super easy">Super easy</option>
                <option value="Easy">Easy</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="instructions">Instructions</label>
              <textarea
                className="form-control"
                id="instructions"
                placeholder="Enter Instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="mainimg">Main Image </label>
              <input
                type="text"
                className="form-control"
                id="mainimg"
                placeholder="Enter Main Image URL"
                value={mainimg}
                onChange={(e) => setMainimg(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="img2">Image 2 </label>
              <input
                type="text"
                className="form-control"
                id="img2"
                placeholder="Enter Image 2 URL"
                value={img2}
                onChange={(e) => setImg2(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="img3">Image 3 </label>
              <input
                type="text"
                className="form-control"
                id="img3"
                placeholder="Enter Image 3 URL"
                value={img3}
                onChange={(e) => setImg3(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="videourl">Video URL</label>
              <input
                type="text"
                className="form-control"
                id="videourl"
                placeholder="Enter Video URL"
                value={videourl}
                onChange={(e) => setVideourl(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="ingredientsid">Ingredients ID</label>
              <ReactSelect
                isMulti
                options={ingredientsOptions}
                onChange={(selected) => setIngredientsid(selected.map((item) => item.value))}
              />
            </div>

            <div className="form-group">
              <label htmlFor="categoriesid">Categories ID</label>
              <ReactSelect
                isMulti
                options={categoriesOptions}
                onChange={(selected) => setCategoriesid(selected.map((item) => item.value))}
              />
            </div>

            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-dark mt-3 ">
                Add
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CreateRecipeForm;
