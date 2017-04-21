import React from 'react'
import PropTypes from 'prop-types'
import Ingredient from './Ingredient'

class IngredientList extends React.Component {
  constructor(){
    super(props)

    this.state = {
      ingredients: this.props.ingredients,
      isEditing: this.props.isEditing
    }

    this.handleAddIngredient = this.handleAddIngredient.bind(this);
    this.handleDeleteIngredient = this.handleDeleteIngredient.bind(this);
    this.addIngredientClicked = this.addIngredientClicked.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    this.props.onIngredientsChanged(this.state.ingredients)
  }

  handleAddIngredient(ingredient){
    this.setState({
      ingredients: this.state.ingredients.push(ingredient)
    })
  }

  handleDeleteIngredient(ingredient){
    this.setState({
      ingredients: this.state.ingredients.filter((i) => {
        return i != ingredient
      })
    })
  }

  addIngredientClicked(){
    //open new ingredient spot
  }

  render () {
    let ingredients = []
    this.state.ingredients.forEach((ingredient) => {
      ingredients.push(<Ingredient
        className="Ingredient"
        name={ingredient.name}
        value={ingredient.value}
        unit={ingredient.uint}
        onDeleteIngredient={this.handleDeleteIngredient}
        isEditing={ingredient.isEditing}
      />)
    })
    return(
      <div>
        {ingredients}
        <button
          className="btn addIngredient"
          onClick={this.addIngredientClicked}>Add Ingredient</button>
      </div>
    )
  }
}

IngredientList.PropTypes = {
  ingredients: PropTypes.array.isRequired,
  isEditing: PropTypes.bool.isRequired,
  onIngredientsChanged: PropTypes.func.isRequired
}

export default IngredientList;
