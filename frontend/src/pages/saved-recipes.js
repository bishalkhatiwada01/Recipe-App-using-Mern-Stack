import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, []);

  const handleEdit = (recipeData) => {
    console.log(recipeData);
    navigate('/edit-recipe',{state: {...recipeData}})
  }

  const handleDelete = () => {

  }

  return (
    <div>
      <h1>Saved Recipes</h1>
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <div style={{display:"flex", justifyContent: "space-between"}}>
              <div>
              <h2>{recipe.name}</h2>
              </div>
              <div>
              <button onClick={() =>handleEdit(recipe)}> Edit</button>
              <button onClick={() =>handleDelete(recipe)} style={{marginLeft: 20}}> Delete</button>
              </div>

            </div>
            <p>{recipe.description}</p>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
