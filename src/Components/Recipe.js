import React from 'react'
import PropTypes from 'prop-types'
import {uniqueId} from 'lodash'
import Ingredient from './Ingredient'

class Recipe extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      id: this.props.id,
      name: this.props.name,
      prepTimeMinutes: this.props.prepTimeMinutes,
      instructions: this.props.instructions,
      ingredients: this.props.ingredients,
      isEditing: this.props.isEditing
    }

    this.editRecipeClicked = this.editRecipeClicked.bind(this);
    this.submitRecipeClicked = this.submitRecipeClicked.bind(this);
    this.deleteRecipeClicked = this.deleteRecipeClicked.bind(this);
    this.addIngredientClicked = this.addIngredientClicked.bind(this);
    this.handleRecipeInputChanged = this.handleRecipeInputChanged.bind(this);
    this.handleIngredientUpdated = this.handleIngredientUpdated.bind(this);
    this.handleDeleteIngredient = this.handleDeleteIngredient.bind(this);
  }

  editRecipeClicked(){
    this.setState({
      isEditing: true,
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
      id: uniqueId('ingredient-'),
      name: 'New Ingredient',
      amount: 0,
      unit: 'NONE'
    }
    this.setState({
      ingredients: this.state.ingredients.concat([newIngredient])
    })
  }

  handleIngredientUpdated(updatedId, evt) {
  this.setState({
    ingredients: this.state.ingredients.map((ingredient) => {
      if (ingredient.id === updatedId)
        return {
          ...ingredient,
          [evt.target.name]: evt.target.value
        }
      return ingredient
    })
  })
}

  handleRecipeInputChanged(evt){
    evt.preventDefault()
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleDeleteIngredient(ingredient){
    this.setState({
      ingredients: this.state.ingredients.filter((i) => {
        return i.id !== ingredient.id
      })
    })
  }

  render() {
    const Ingredients = this.state.ingredients.map((ingredient) =>
      <Ingredient
        className="Ingredient"
        key={ingredient.id}
        id={ingredient.id}
        name={ingredient.name}
        amount={ingredient.amount}
        unit={ingredient.unit}
        onUpdate={this.handleIngredientUpdated}
        onDeleteIngredient={this.handleDeleteIngredient}
        isEditing={this.state.isEditing}
      />
    )

    return (
      <div className={(this.state.isEditing ? "" : "viewonly")}>
        <div className="recipeName">
          <input
            type="text"
            name="name"
            className="recipeInput"
            placeholder="enter minutes for prep..."
            value={this.state.name}
            {...(this.state.isEditing ? {} : {disabled: "disabled"})}
            onChange={this.handleRecipeInputChanged} />
        </div>
        <div>
          <h4>Prep-time</h4>
          <input
            type="text"
            name="prepTimeMinutes"
            className="recipeInput"
            placeholder="enter minutes for prep..."
            value={this.state.prepTimeMinutes}
            {...(this.state.isEditing ? {} : {disabled: "disabled"})}
            onChange={this.handleRecipeInputChanged} />
        </div>
        <div>
          <h4>Instructions</h4>
          <input
            type="text"
            name="instructions"
            className="recipeInput"
            placeholder="enter instructions..."
            value={this.state.instructions}
            {...(this.state.isEditing ? {} : {disabled: "disabled"})}
            onChange={this.handleRecipeInputChanged} />
        </div>
        <div>
          <h4>Ingredients</h4>
          {Ingredients}
          <button className="btn addIngredient"
            onClick={this.addIngredientClicked}>Add Ingredient
          </button>
        </div>
        <button className="btn editRecipe"
          onClick={this.editRecipeClicked}
          {...(this.state.isEditing ? {hidden: true} : {hidden: false})}>
          Edit Recipe
        </button>
        <button className="btn submitRecipe"
          onClick={this.submitRecipeClicked}
          {...(this.state.isEditing ? {hidden: false} : {hidden: true})}>
          Submit Recipe
        </button>
        <button className="btn deleteRecipe"
          onClick={this.deleteRecipeClicked}>Delete Recipe</button>
      </div>
    )
  }
}

Recipe.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  prepTimeMinutes: PropTypes.number,
  instructions: PropTypes.string,
  ingredients: PropTypes.array.isRequired,
  onDeleteRecipe: PropTypes.func.isRequired,
  onUpdateRecipe: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired
}

export default Recipe
