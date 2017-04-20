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
          <div className="Ingredient">
            <div className="ingredientName">Ingredient2</div>
            <div className="ingredientValue">2</div>
            <div className="ingredientUnitType">oz</div>
          </div>
        </div>
        <div className="btnEditRecipe">Edit</div>
        <div className="btnDeleteRecipe">DeleteRecipe -</div>

        <div className="EditRecipe hidden">
          <div className="recipeName editable">Recipe New/Edit</div>
          <div className="inputIngredientList">
            <div className="Ingredient">
              <div className="ingredientName editable">Ingredient New/Edit</div>
              <div className="ingredientValue editable">5</div>
              <div className="ingredientUnitType editable">tsp</div>
              <div className="btnEditIngredient">Edit</div>
              <div className="btnDeleteIngredient">DeleteIngredient -</div>
            </div>
            <div className="btnAddIngredient">AddIngredient +</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Recipe
