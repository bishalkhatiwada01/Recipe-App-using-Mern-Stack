import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";

import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";

export const EditRecipe = ({route}) => {
  const userID = useGetUserID();
  const navigate = useNavigate();
  const location = useLocation();
console.log(route.params);
  const [cookies, _] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    // name: recipeData?.name ||"",
    // description: recipeData?.description || "",
    // ingredients: recipeData?.ingredients || [],
    // instructions: recipeData?.instructions || "",
    // imageUrl: recipeData?.imageUrl || "",
    // cookingTime: recipeData?.cookingTime || 0,
    // userOwner: recipeData?.userOwner || userID,
  });

  useEffect(() => {
    console.log(location);
  },[location])


  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(
        "http://localhost:3001/update",
        { ...recipe },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("Recipe Updated");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-recipe">
      <h2>Update Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={recipe.name}
          onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={recipe.description}
          onChange={handleChange}
        ></textarea>
        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredient, index) => (
          <input
            key={index}
            type="text"
            name="ingredients"
            value={ingredient}
            onChange={(event) => handleIngredientChange(event, index)}
          />
        ))}
        <button type="button" onClick={handleAddIngredient}>
          Add Ingredient
        </button>
        <label htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          value={recipe.instructions}
          onChange={handleChange}
        ></textarea>
        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={recipe.imageUrl}
          onChange={handleChange}
        />
        <label htmlFor="cookingTime">Cooking Time (minutes)</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          value={recipe.cookingTime}
          onChange={handleChange}
        />
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};
