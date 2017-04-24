import React from 'react'
import PropTypes from 'prop-types'
import Recipe from '../Stateless/Recipe'
import RecipeEditor from '../Stateless/RecipeEditor'


/*
Recipe Book Component that holds recipe states and renders their views

recives:
onEncryptRecipes: PropTypes.func, (not implemented yet)
recipes: PropTypes.object
lastUniqueId: PropTypes.number

*/
class RecipeBook extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      recipes: this.props.recipes || {},
      recipeOpen: 'recipe-test',
      recipeEditing: undefined,
      lastUniqueId: this.props.lastUniqueId || 0
    }

    this.addRecipeClicked = this.addRecipeClicked.bind(this);
    this.handleRecipeClicked = this.handleRecipeClicked.bind(this);
    this.handleRecipeUpdated = this.handleRecipeUpdated.bind(this);
    this.handleRecipeEditing = this.handleRecipeEditing.bind(this);
    this.handleRecipeSubmited = this.handleRecipeSubmited.bind(this);
    this.handleRecipeDeleted = this.handleRecipeDeleted.bind(this);
  }

  componentDidUpdate(nextProps, nextState) {
    if(!this.state.recipeEditing){
      localStorage.setItem("RecipeBookCreatedByJakeTegtmeier", JSON.stringify(this.state))
    }
  }

  //set state of updated recipe
  handleRecipeUpdated(RecipeId, updatedRecipe){
    this.setState({
      recipes: {
        ...this.state.recipes,
        [RecipeId]: updatedRecipe
      }
    })
  }

  //set state of recipe submited (not being edited)
  handleRecipeSubmited(){
    this.setState({
      recipeEditing: undefined
    })
  }

  //set state of new emptey recipe added
  addRecipeClicked() {
    if(!this.state.recipeEditing){
      const newRecipeId =  "recipe-" + (1 + this.state.lastUniqueId)
      this.handleRecipeUpdated(newRecipeId)
      this.setState({
        recipeOpen: newRecipeId,
        recipeEditing: newRecipeId,
        lastUniqueId: (this.state.lastUniqueId + 1)
      })
    }
  }

  //set state of recipe currently being viewed
  handleRecipeClicked(recipeId){
    this.setState({
      recipeOpen: recipeId,
    })
  }

  //set state of recipe currently being edited
  handleRecipeEditing(recipeId){
    this.setState({
      recipeEditing: recipeId
    })
  }

  //set state of recipe deleted
  handleRecipeDeleted(recipeId) {
    const updatedRecipeBook = this.state.recipes
    delete updatedRecipeBook[recipeId]
    this.setState({
      recipes: {...updatedRecipeBook},
      recipeEditing: undefined
    })
  }

  render() {
    let recipes = []
    const recipeToEdit = (recipe) =>
      <RecipeEditor
        key={recipe}
        id={recipe}
        recipeBody={this.state.recipes[recipe]}
        onDeleteClicked={this.handleRecipeDeleted}
        onRecipeUpdated={this.handleRecipeUpdated}
        onSubmitClicked={this.handleRecipeSubmited}
        isOpen={recipe === this.state.recipeOpen}
      />

    const recipeToShow = (recipe) =>
      <Recipe
        key={recipe}
        id={recipe}
        recipeBody={this.state.recipes[recipe]}
        onDeleteClicked={this.handleRecipeDeleted}
        onEditClicked={this.handleRecipeEditing}
        onRecipeClicked={this.handleRecipeClicked}
        isOpen={recipe === this.state.recipeOpen}
      />

    for(const recipe in this.state.recipes){
      recipes.push(recipe === this.state.recipeEditing ?
        recipeToEdit(recipe) :
        recipeToShow(recipe)
      )
    }

    return (
      <div className="RecipeBook">
        {recipes}
        <button className="btn addRecipe"
          onClick={this.addRecipeClicked}>
          <i className="fa fa-plus-square-o" aria-hidden="true"></i> Add Recipe
        </button>
      </div>
    )
  }
}

RecipeBook.propTypes = {
  onEncryptRecipes: PropTypes.func,
  recipes: PropTypes.object,
  lastUniqueId: PropTypes.number
}

export default RecipeBook;
