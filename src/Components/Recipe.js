import React, {PropTypes} from 'react'

class Recipe extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div className="recipeName">Recipe1</div>
        <div className="IngredientList">
          <div className="Ingredient">
            <div className="ingredientName">Ingredient1</div>
            <div className="ingredientValue">1</div>
            <div className="ingredientUnitType">cup</div>
          </div>
          <div className="Ingredient"/>
        </div>
        <div className="btn editRecipe">Edit</div>
        <div className="btn deleteRecipe">DeleteRecipe -</div>
      </div>
    )
  }
}

export default Recipe
