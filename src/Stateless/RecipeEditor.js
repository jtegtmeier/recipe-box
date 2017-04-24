import React from 'react'
import PropTypes from 'prop-types'
import {uniqueId} from 'lodash'
import Ingredient from './Ingredient'
import '../Style/RecipeBook.css'

/*
Static recipe editing component that sends updates on recipes to the RecipeBook

recives:
id: PropTypes.string.isRequired,
recipeBody: PropTypes.object,
onRecipeUpdated: PropTypes.func.isRequired,
onDeleteClicked: PropTypes.func.isRequired,
onSubmitClicked: PropTypes.func.isRequired

*/
const RecipeEditor = (props) => {
  const recipeBody = props.recipeBody

  //send recipe changes to RecipeBook
  function recipeChanged(evt){
    evt.preventDefault()
    props.onRecipeUpdated(props.id, {
      ...recipeBody,
      [evt.target.name]: evt.target.value
    })
  }

  //send updated ingredients to RecipeBook
  function updateIngredients(updatedIngredients) {
    props.onRecipeUpdated(props.id, {
      ...recipeBody,
      ingredients: updatedIngredients
    })
  }

  //send changes of ingredient values to updateIngredients
  function ingredientChanged(ingredientId, updatedIngredient){
    updateIngredients({
      ...recipeBody.ingredients,
      [ingredientId]: updatedIngredient
    })

  }

  //send new emptey ingredient id to ingredientChanged
  function addIngredient(evt){
    evt.preventDefault()
    ingredientChanged(uniqueId('ingredient-'))
  }

  //delete the ingredient and send the updated ingredients to updateIngredients
  function deleteIngredient(ingredientID){
    const updatedIngredients = recipeBody.ingredients
    delete updatedIngredients[ingredientID]
    updateIngredients(updatedIngredients)
  }

  //send submit to RecipeBook if it passes validation
  function submitRecipeEvent(evt){
    evt.preventDefault()
    //check if recipe and all ingredients have a name
    //do not send submit to RecipeBook if they do not
    if(props.recipeBody.name.match('.*\\w+.*')
      &&(
        !recipeBody.ingredients
        ||
          Object.keys(recipeBody.ingredients).every((ingredient) => (
            recipeBody.ingredients[ingredient] &&
            recipeBody.ingredients[ingredient].name.match('.*\\w+.*')
          )
      ))
    ){
      props.onSubmitClicked()
    }
  }

  //send recipe deleted to RecipeBook
  function deleteRecipeClicked(evt){
    evt.preventDefault()
    props.onDeleteClicked(props.id)
  }

  //create array of Ingredient Components
  let ingredients = []
  for(const ingredient in recipeBody.ingredients){
    ingredients.push(
      <Ingredient
        id={ingredient}
        key={ingredient}
        ingredientBody={recipeBody.ingredients[ingredient]}
        onDelete={deleteIngredient}
        onUpdate={ingredientChanged}
        isEditing={true}
      />
    )
  }

  return (
    <form className="Recipe"
      onSubmit={submitRecipeEvent}>
      <div className="recipeHead">
        <input
          type="text"
          name="name"
          required="required"
          pattern=".*\w+.*"
          className="recipeInput recipeName"
          size="4"
          placeholder="new name..."
          value={recipeBody.name}
          onChange={recipeChanged} />
        <button className="btn submitRecipe"
          name="btnSubmitRecipe"
          onClick={submitRecipeEvent}>
          <i className="fa fa-check" aria-hidden="true"></i>
        </button>
        <button className="btn deleteRecipe"
          onClick={deleteRecipeClicked}>
          <i className="fa fa-trash-o" aria-hidden="true"></i>
        </button>
      </div>
      <div>
        <div>
          <h3>Prep-time</h3>
          <input
            type="number"
            name="prepTimeMinutes"
            className="prepTimeInput marginleft"
            placeholder="None"
            value={recipeBody.prepTimeMinutes}
            onChange={recipeChanged} />
        </div>
        <div>
          <h3>Instructions</h3>
          <textarea
            type="text"
            name="instructions"
            className="instructionsInput marginleft"
            placeholder="None"
            value={recipeBody.instructions}
            onChange={recipeChanged} />
        </div>
        <div>
          <h3>Ingredients</h3>
          <table>
            <thead>
              <tr><th>Name</th><th>Amount</th><th>Measurment</th></tr>
            </thead>
            <tbody>
              {ingredients}
            </tbody>
          </table>
          <button className="btn addIngredient marginleft"
            onClick={addIngredient}>
            <i className="fa fa-plus-square-o" aria-hidden="true"></i> Add Ingredient
          </button>
        </div>
      </div>
    </form>
  )
}

RecipeEditor.propTypes = {
  id: PropTypes.string.isRequired,
  recipeBody: PropTypes.object,
  onRecipeUpdated: PropTypes.func.isRequired,
  onDeleteClicked: PropTypes.func.isRequired,
  onSubmitClicked: PropTypes.func.isRequired
}

RecipeEditor.defaultProps = {
  recipeBody: {
    name: '',
    prepTimeMinutes: '',
    instructions: '',
    ingredients: undefined
  }
}

export default RecipeEditor
