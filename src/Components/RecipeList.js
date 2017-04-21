import React from 'react'
import PropTypes from 'prop-types'
import Recipe from './Recipe'

class RecipeList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      recipes: this.props.recipes.map((recipe) => {
        recipe.isEditing = false
        return recipe
      })
    }

    this.handleUpdateRecipe = this.handleUpdateRecipe.bind(this);
    this.addRecipeClicked = this.addRecipeClicked.bind(this);
    this.handleDeleteRecipe = this.handleDeleteRecipe.bind(this);
  }

  handleUpdateRecipe(updatedRecipe) {
    let updatedRecipes = this.state.recipes.filter((i) => {
      return i.name !== updatedRecipe.name
    })
    updatedRecipes.push(updatedRecipe)
    this.setState({
      recipes: updatedRecipes
    })
  }

  addRecipeClicked() {
    const newRecipe = {
      name: 'New Recipe',
      ingredients: [],
      isEditing: true
    }
    this.handleUpdateRecipe(newRecipe)
  }

  handleDeleteRecipe(recipe) {
    this.setState({
      recipes: this.state.recipes.filter((i) => {
        return i.name !== recipe.name
      })
    })
  }

  render() {
    let recipes = []
    this.state.recipes.forEach((recipe, index) => {
      recipes.push(<Recipe className="Recipe"
      key={index}
      name={recipe.name}
      prepTimeMinutes={recipe.prepTimeMinutes}
      instructions={recipe.instructions}
      ingredients={recipe.ingredients}
      onDeleteRecipe={this.handleDeleteRecipe}
      onUpdateRecipe={this.handleUpdateRecipe}
      isEditing={recipe.isEditing}/>)
    })
    return (
      <div>
        {recipes}
        <button className="btn addRecipe"
          onClick={this.addRecipeClicked}>Add Recipe</button>
      </div>
    )
  }
}

RecipeList.propTypes = {
  onUpdateRecipes: PropTypes.func.isRequired,
  recipes: PropTypes.array.isRequired
}

export default RecipeList;
