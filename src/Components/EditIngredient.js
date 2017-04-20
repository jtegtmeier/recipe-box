import React, {PropTypes} from 'react'

class EditIngredient extends React.Component {
  render() {
    return (
      <div>
        <div className="txt-input ingredientName">Ingredient1</div>
        <div className="txt-input ingredientValue">1</div>
        <div className="txt-input ingredientUnitType">cup</div>
        <div className="buttons">
          <div className="btn saveIngredient">Edit</div>
          <div className="btn deleteIngredient">-</div>
        </div>
      </div>
    )
  }
}

export default EditIngredient;
