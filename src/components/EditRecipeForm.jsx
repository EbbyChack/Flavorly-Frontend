import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { editRecipe } from "../redux/actions/recipes";

import { ToastContainer, toast } from "react-toastify";
import ReactSelect from "react-select";

function EditRecipeForm(props) {
  const singleRecipe = useSelector((state) => state.recipes.singleRecipe);

  const ingredientsAndCategories = useSelector((state) => state.ingredientsAndCategories.ingredientsAndCategories);

  const ingredientsOptions = ingredientsAndCategories.ingredients.map((ingredient) => ({
    value: ingredient.idIngredient,
    label: ingredient.nameIngredient,
  }));

  const categoriesOptions = ingredientsAndCategories.categories.map((category) => ({
    value: category.idCategory,
    label: category.categoryName,
  }));

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

  useEffect(() => {
    if (singleRecipe && singleRecipe.recipeIngredients && singleRecipe.recipeCategories) {
      const currentRecipeIngredients = ingredientsOptions.filter((option) =>
        singleRecipe.recipeIngredients.some((ingredient) => ingredient.idIngredientFk === option.value)
      );

      const currentRecipeCategories = categoriesOptions.filter((option) =>
        singleRecipe.recipeCategories.some((category) => category.idCategoryFk === option.value)
      );

      setNamerecipe(singleRecipe.nameRecipe);
      setDescription(singleRecipe.description);
      setCookingtime(singleRecipe.cookingTime);
      setServings(singleRecipe.servings);
      setDifficulty(singleRecipe.difficulty);
      setInstructions(singleRecipe.instructions);
      setMainimg(singleRecipe.mainImg);
      setImg2(singleRecipe.img2);
      setImg3(singleRecipe.img3);
      setVideourl(singleRecipe.videoUrl);
      setIngredientsid(currentRecipeIngredients);
      setCategoriesid(currentRecipeCategories);
    }
  }, [singleRecipe.recipeIngredients]);

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

     const ingredientsValues = ingredientsid.map((item) => item.value);
     const categoriesValues = categoriesid.map((item) => item.value);

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
      recipeIngredientsIds: ingredientsValues,
      recipeCategoriesIds: categoriesValues,
    };

    dispatch(editRecipe(singleRecipe.idRecipe, recipeObj));
    console.log("recipeObj", recipeObj);
    props.onHide();
    toast.success("Recipe edited successfully");

      setTimeout(() => {
        window.location.reload();
      }, 1000);
  };

  return (
    <div>
      <ToastContainer />

      {singleRecipe.recipeIngredients && (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Edit recipe</Modal.Title>
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
                  //   defaultValue={singleRecipe.nameRecipe}
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
                  //   defaultValue={singleRecipe.description}
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
                  //   defaultValue={singleRecipe.cookingTime}
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
                  //   defaultValue={singleRecipe.servings}
                  value={servings}
                  onChange={(e) => setServings(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="difficulty">Difficulty</label>
                <input
                  type="text"
                  className="form-control"
                  id="difficulty"
                  placeholder="Enter Difficulty"
                  //   defaultValue={singleRecipe.difficulty}
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="instructions">Instructions</label>
                <textarea
                  className="form-control"
                  id="instructions"
                  placeholder="Enter Instructions"
                  //   defaultValue={singleRecipe.instructions}
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
                  //   defaultValue={singleRecipe.mainImg}
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
                  //   defaultValue={singleRecipe.img2}
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
                  //   defaultValue={singleRecipe.img3}
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
                  //   defaultValue={singleRecipe.videoUrl}
                  value={videourl}
                  onChange={(e) => setVideourl(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="ingredientsid">Ingredients ID</label>
                <ReactSelect
                  isMulti
                  options={ingredientsOptions}
                  defaultValue={ingredientsid}
                  //   defaultValue={ingredientsOptions.filter((option) =>
                  //     singleRecipe.recipeIngredients.some((ingredient) => ingredient.idIngredientFk === option.value)
                  //   )}
                  onChange={(selected) => setIngredientsid(selected.map((item) => item))}
                />
              </div>

              <div className="form-group">
                <label htmlFor="categoriesid">Categories ID</label>
                <ReactSelect
                  isMulti
                  options={categoriesOptions}
                  defaultValue={categoriesid}
                  //   defaultValue={categoriesOptions.filter((option) =>
                  //     singleRecipe.recipeCategories.some((category) => category.idCategoryFk === option.value)
                  //   )}
                  onChange={(selected) => setCategoriesid(selected.map((item) => item))}
                />
              </div>

              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-dark mt-3 ">
                  Edit
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}

export default EditRecipeForm;
