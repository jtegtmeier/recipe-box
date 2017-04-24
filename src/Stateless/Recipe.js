import React from 'react'
import PropTypes from 'prop-types'
import unitTypes from '../Settings/ingredientUnitTypes'
import '../Style/RecipeBook.css'

/*
Static recipe that is either shown or minimized

recives:
id: PropTypes.string.isRequired,
recipeBody: PropTypes.object,
onDeleteClicked: PropTypes.func.isRequired,
onEditClicked: PropTypes.func.isRequired,
onRecipeClicked: PropTypes.func.isRequired,
isOpen: PropTypes.bool

*/
const Recipe = (props) => {
  const recipeBody = props.recipeBody
  const style = {
    isMinimized: props.isOpen ? " maximize" : " minimize"
  }

  //send redipe deleted to RecipeBook
  function deleteRecipeClicked(evt){
    evt.preventDefault()
    props.onDeleteClicked(props.id)
  }

  //send redipe edited to RecipeBook
  function editClicked(evt){
    evt.preventDefault()
    props.onEditClicked(props.id)
  }

  //send redipe header clicked to RecipeBook
  function recipeClicked(evt){
    evt.preventDefault()
    props.onRecipeClicked(props.id)
  }

  //create array of ingredients from props
  let ingredients = []
  for(const ingredient in recipeBody.ingredients){
    let ingredientBody = recipeBody.ingredients[ingredient]
    ingredients.push(
      <li key={ingredient}>
        <div>{ingredientBody.name + " "
            + ingredientBody.amount + " "
            + (ingredientBody.unit ? unitTypes[ingredientBody.unit] : "")
            + (ingredientBody.unit !== 'NONE' && ingredientBody.amount > 0 ?
            "s" : "")}
        </div>
      </li>
    )
  }

  return (
    <form className="Recipe">
      <div className="recipeHead" onClick={recipeClicked}>
        <div className="recipeName">{recipeBody.name}</div>
        <button className="btn editRecipe"
          name="btnEditRecipe"
          onClick={editClicked}>
          Edit
        </button>
        <button className="btn deleteRecipe"
          onClick={deleteRecipeClicked}>
          <i className="fa fa-trash-o" aria-hidden="true"></i>
        </button>
      </div>
      <div className={style.isMinimized}>
        <div>
          <h3>Prep-time</h3>
          <div className="prepTime marginleft">
            {recipeBody.prepTimeMinutes + (recipeBody.prepTimeMinutes ? " Minutes" : "")}
          </div>
        </div>
        <div>
          <h3>Instructions</h3>
          <div className="instructions marginleft">{recipeBody.instructions}</div>
        </div>
        <div>
          <h3>Ingredients</h3>
          <ul>
            {ingredients}
          </ul>
        </div>
      </div>
    </form>
  )
}

Recipe.propTypes = {
  id: PropTypes.string.isRequired,
  recipeBody: PropTypes.object,
  onDeleteClicked: PropTypes.func.isRequired,
  onEditClicked: PropTypes.func.isRequired,
  onRecipeClicked: PropTypes.func.isRequired,
  isOpen: PropTypes.bool
}

Recipe.defaultProps = {
  recipeBody: {
    name: '',
    prepTimeMinutes: '',
    instructions: '',
    ingredients: undefined
  }
}

export default Recipe
