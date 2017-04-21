import React from 'react'
import PropTypes from 'prop-types'
import Ingredient from './Ingredient'

class Recipe extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: this.props.name,
      prepTimeMinutes: this.props.prepTimeMinutes,
      instructions: this.props.instructions,
      ingredients: this.props.ingredients,
      isEditing: false
    }

    this.editRecipeClicked = this.editRecipeClicked.bind(this);
    this.submitRecipeClicked = this.submitRecipeClicked.bind(this);
    this.deleteRecipeClicked = this.deleteRecipeClicked.bind(this);
    this.addIngredientClicked = this.addIngredientClicked.bind(this);
    this.handleIngredientsUpdated = this.handleIngredientsUpdated.bind(this);
    this.handleDeleteIngredient = this.handleDeleteIngredient.bind(this);
  }

  editRecipeClicked(){
    this.setState({
      isEditing: true
    })
  }

  deleteRecipeClicked(){
    this.props.onDeleteRecipe(this.state)
  }

  submitRecipeClicked(){
    this.setState({
      isEditing: false
    })
    this.props.onUpdateRecipe(this.state)
  }

  addIngredientClicked(){
    const newIngredient = {
      name: 'New Ingredient',
      amount: 0,
      unit: 'NONE'
    }
    this.setState({
      ingredients: this.state.ingredients.concat([newIngredient])
    })
  }

  handleIngredientChanged(){
    
  }

  handleIngredientsUpdated(updatedIngredients){
    this.setState({
      ingredients: updatedIngredients
    })
  }

  handleDeleteIngredient(ingredient){
    this.setState({
      ingredients: this.state.ingredients.filter((i) => {
        return i.name !== ingredient
      })
    })
  }

  render() {
    let ingredients = []
    this.state.ingredients.forEach((ingredient, index) => {
      ingredients.push(<Ingredient
        className="Ingredient"
        key={index}
        name={ingredient.name}
        amount={ingredient.amount}
        unit={ingredient.unit}
        onUpdate={this.handleIngredientChanged}
        onDeleteIngredient={this.handleDeleteIngredient}
        isEditing={this.state.isEditing}
      />)
    })

    return (
      <div>
        <div className="recipeName">{this.state.name}</div>
        <div>
          <h4>Prep-time</h4>
          <input
            type="text"
            className={"recipeText " + (this.state.isEditing ? "" : "viewonly")}
            placeholder="enter minutes for prep..."
            value={this.state.prepTimeMinutes} />
        </div>
        <div>
          <h4>Instructions</h4>
          <input
            type="text"
            className={"recipeText " + (this.state.isEditing ? "" : "viewonly")}
            placeholder="enter instructions..."
            value={this.state.instructions} />
        </div>
        <div>
          <h4>Ingredients</h4>
          {ingredients}
          <button className="btn addIngredient"
            onClick={this.addIngredientClicked}>Add Ingredient
          </button>
        </div>
        <button className={"btn editRecipe " + (this.state.isEditing ? "hidden" : "")}
          onClick={this.editRecipeClicked}>Edit Recipe</button>
        <button className={"btn submitRecipe " + (this.state.isEditing ? "" : "hidden")}
          onClick={this.submitRecipeClicked}>Submit Recipe</button>
        <button className="btn deleteRecipe"
          onClick={this.deleteRecipeClicked}>Delete Recipe</button>
      </div>
    )
  }
}

Recipe.propTypes = {
  name: PropTypes.string.isRequired,
  prepTimeMinutes: PropTypes.number,
  instructions: PropTypes.string,
  ingredients: PropTypes.array.isRequired,
  onDeleteRecipe: PropTypes.func.isRequired,
  onUpdateRecipe: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired
}

export default Recipe
