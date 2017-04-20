import React, {PropTypes} from 'react'

class Ingredient extends React.Component {
  render() {
    return (
      <div>
        <div className="ingredientName">Ingredient1</div>
        <div className="ingredientValue">1</div>
        <div className="ingredientUnitType">cup</div>
      </div>
    )
  }
}

export default Ingredient;
