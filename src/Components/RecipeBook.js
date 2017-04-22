import React from 'react'
import PropTypes from 'prop-types'
import {uniqueId} from 'lodash'
import Recipe from '../Stateless/Recipe'

class RecipeBook extends React.Component {
  constructor(props) {
    super(props)

    this.state = this.props.recipes || {}

    this.updateRecipe = this.updateRecipe.bind(this);
    this.addRecipeClicked = this.addRecipeClicked.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
  }

  updateRecipe(RecipeId, updatedRecipe){
    this.setState({
      [RecipeId]: updatedRecipe
    })
  }

  addRecipeClicked() {
    this.updateRecipe(uniqueId('recipe-'))
  }

  deleteRecipe(recipeId) {
    const updatedRecipeBook = this.state
    delete updatedRecipeBook[recipeId]
    this.setState({
      ...updatedRecipeBook
    })
  }

  render() {
    let recipes = []
    for(const recipe in this.state){
      recipes.push(
        <Recipe className="Recipe"
          key={recipe}
          id={recipe}
          recipeBody={this.state[recipe]}
          onDelete={this.deleteRecipe}
          onUpdate={this.updateRecipe}
        />
      )
    }

    return (
      <div>
        {recipes}
        <button className="btn addRecipe"
          onClick={this.addRecipeClicked}>Add Recipe</button>
      </div>
    )
  }
}

RecipeBook.propTypes = {
  onEncryptRecipes: PropTypes.func,
  recipes: PropTypes.object
}

export default RecipeBook;
