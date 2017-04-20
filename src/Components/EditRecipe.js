import React, {PropTypes} from 'react'

class EditRecipe extends React.Component {
  render() {
    return (
      <div>
        <div className="recipeName">Recipe New/Edit</div>
        <div className="IngredientList">
          <EditIngredient className="Ingredient"/>
          <div className="btn addIngredient">AddIngredient +</div>
        </div>
      </div>
    )
  }
}

export default EditRecipe;
