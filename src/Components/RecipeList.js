import React from 'react'
import PropTypes from 'prop-types'
import {uniqueId} from 'lodash'
import Recipe from './Recipe'

class RecipeList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      recipes: this.props.recipes
    }

    this.handleUpdateRecipe = this.handleUpdateRecipe.bind(this);
    this.addRecipeClicked = this.addRecipeClicked.bind(this);
    this.handleDeleteRecipe = this.handleDeleteRecipe.bind(this);
  }

  handleUpdateRecipe(updatedRecipe){
    this.setState({
      recipes: this.state.recipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      )
    })
  }

  addRecipeClicked() {
    const newRecipe = {
      id: uniqueId('recipe-'),
      name: 'New Recipe',
      ingredients: [],
      isEditing: true
    }
    this.setState({
      recipes: [...this.state.recipes, newRecipe]
    })
  }

  handleDeleteRecipe(recipe) {
    this.setState({
      recipes: this.state.recipes.filter((i) => {
        return i.id !== recipe.id
      })
    })
  }

  render() {
    let recipes = []
    this.state.recipes.forEach((recipe) => {
      recipes.push(<Recipe className="Recipe"
      key={recipe.id}
      id={recipe.id}
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
