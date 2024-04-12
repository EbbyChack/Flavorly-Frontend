import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faSearch } from "@fortawesome/free-solid-svg-icons";

function FilterSidebar({ handleCategoriesChange, handleIngredientsChange, clearCat, clearIng }) {
  const [isOpen, setIsOpen] = useState(true);
  const [ingSearchTerm, setIngSearchTerm] = useState("");
  
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const clearCategories = () => {
    clearCat();
    ingredientsAndCategories.categories.forEach((category) => {
        const checkbox = document.getElementById(`category-${category.idCategory}`);
        if (checkbox) {
          checkbox.checked = false;
        }
    });
  };

  const clearIngredients = () => {
    clearIng();
    ingredientsAndCategories.ingredients.forEach((ingredient) => {
        const checkbox = document.getElementById(`ingredient-${ingredient.idIngredient}`);
        if (checkbox) {
          checkbox.checked = false;
        }
    }
    );
  };

  const ingredientsAndCategories = useSelector((state) => state.ingredientsAndCategories.ingredientsAndCategories);

  const filteredIngredients = ingredientsAndCategories.ingredients
    .filter((ingredient) => ingredient.nameIngredient.toLowerCase().includes(ingSearchTerm.toLowerCase()))
    .slice(0, 20);
  return (
    <div>
      <div className="filterSidebar">
        <button onClick={handleClick} className="filterBtn">
          Filter <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} id="chevron" />
        </button>
        {isOpen && (
          <>
            <div className="d-flex justify-content-between align-items-center filterType">
              <h3>Categories</h3>
              <button onClick={clearCategories} className="clearBtn">
                Clear all
              </button>
            </div>

            {ingredientsAndCategories.categories.map((category) => (
              <span key={category.idCategory}>
                <input
                  type="checkbox"
                  id={`category-${category.idCategory}`}
                  value={category.idCategory}
                  onChange={handleCategoriesChange}
                />
                <label htmlFor={`category-${category.idCategory}`}>{category.categoryName}</label>
              </span>
            ))}
            <div className="d-flex justify-content-between align-items-center filterType">
              <h3>Ingredients</h3>
              <button onClick={clearIngredients} className="clearBtn">
                Clear all
              </button>
            </div>
            <div className="search mb-2">
              <input
                type="text"
                className="search__input"
                placeholder="Search ingredients"
                value={ingSearchTerm}
                onChange={(e) => setIngSearchTerm(e.target.value)}
              />
              <button className="search__button">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
            {filteredIngredients.map((ingredient) => (
              <span key={ingredient.idIngredient}>
                <input
                  type="checkbox"
                  id={`ingredient-${ingredient.idIngredient}`}
                  value={ingredient.idIngredient}
                  onChange={handleIngredientsChange}
                />
                <label htmlFor={`ingredient-${ingredient.idIngredient}`}>{ingredient.nameIngredient}</label>
              </span>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default FilterSidebar;
