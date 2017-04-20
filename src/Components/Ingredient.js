import React, {PropTypes} from 'react'

class Ingredient extends React.Component {
  render() {
    return (
      <div>
        <div className="ingredientName">Ingredient1</div>
        <div className="ingredientValue">1</div>
        <div className="ingredientUnitType">cup</div>
        <div className="buttons">
          <div className="btn editIngredient">Edit</div>
          <div className="btn deleteIngredient">-</div>
        </div>
      </div>
    )
  }
}

export default Ingredient;
