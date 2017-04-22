import React from 'react'
import PropTypes from 'prop-types'
import {uniqueId} from 'lodash'
import Ingredient from './Ingredient'

const Recipe = (props) => {
  const recipeBody = props.recipeBody

  function recipeChanged(evt){
    evt.preventDefault()
    props.onUpdate(props.id, {
      ...recipeBody,
      [evt.target.name]: evt.target.value
    })
  }

  function updateIngredients(updatedIngredients) {
    props.onUpdate(props.id, {
      ...recipeBody,
      ingredients: updatedIngredients
    })
  }

  function ingredientChanged(ingredientId, updatedIngredient){
    updateIngredients({
      ...recipeBody.ingredients,
      [ingredientId]: updatedIngredient
    })
  }

  function addIngredient(evt){
    evt.preventDefault()
    ingredientChanged(uniqueId('ingredient-'))
  }

  function deleteIngredient(ingredientID){
    const updatedIngredients = recipeBody.ingredients
    delete updatedIngredients[ingredientID]
    updateIngredients(updatedIngredients)
  }

  function editingToggle(evt){
    evt.preventDefault()
    props.onUpdate(props.id, {
      ...recipeBody,
      isEditing: !recipeBody.isEditing
    })
  }

  function deleteRecipeClicked(evt){
    evt.preventDefault()
    props.onDelete(props.id)
  }

  let ingredients = []
  for(const ingredient in recipeBody.ingredients){
    ingredients.push(
      <Ingredient className="Ingredient"
        key={ingredient}
        id={ingredient}
        ingredientBody={recipeBody.ingredients[ingredient]}
        onDelete={deleteIngredient}
        onUpdate={ingredientChanged}
        isEditing={recipeBody.isEditing}
      />
    )
  }

  return (
    <div className={(recipeBody.isEditing ? "" : "viewonly")}>
      <div className="recipeName">
        <input
          type="text"
          name="name"
          className="recipeInput"
          placeholder="enter a new name..."
          value={recipeBody.name}
          {...(recipeBody.isEditing ? {} : {disabled: "disabled"})}
          onChange={recipeChanged} />
      </div>
      <div>
        <h4>Prep-time</h4>
        <input
          type="text"
          name="prepTimeMinutes"
          className="recipeInput"
          placeholder="enter minutes for prep..."
          value={recipeBody.prepTimeMinutes}
          {...(recipeBody.isEditing ? {} : {disabled: "disabled"})}
          onChange={recipeChanged} />
      </div>
      <div>
        <h4>Instructions</h4>
        <input
          type="text"
          name="instructions"
          className="recipeInput"
          placeholder="enter instructions..."
          value={recipeBody.instructions}
          {...(recipeBody.isEditing ? {} : {disabled: "disabled"})}
          onChange={recipeChanged} />
      </div>
      <div>
        <h4>Ingredients</h4>
        {ingredients}
        <button className="btn addIngredient"
          onClick={addIngredient}
          {...(recipeBody.isEditing ? {} : {hidden: "hidden"})}>
          Add Ingredient
        </button>
      </div>
      <button className="btn editRecipe"
        name="btnEditRecipe"
        onClick={editingToggle}
        {...(recipeBody.isEditing ? {hidden: "hidden"} : {})}>
        Edit Recipe
      </button>
      <button className="btn submitRecipe"
        name="btnSubmitRecipe"
        onClick={editingToggle}
        {...(recipeBody.isEditing ? {} : {hidden: "hidden"})}>
        Submit Recipe
      </button>
      <button className="btn deleteRecipe"
        onClick={deleteRecipeClicked}>Delete Recipe</button>
    </div>
  )
}

Recipe.propTypes = {
  id: PropTypes.string.isRequired,
  recipeBody: PropTypes.object,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
}

Recipe.defaultProps = {
  recipeBody: {
    name: '',
    prepTimeMinutes: '',
    instructions: '',
    ingredients: undefined,
    isEditing: true
  }
}

export default Recipe
