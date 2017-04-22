import React from 'react'
import PropTypes from 'prop-types'

const unitTypes = {
  'NONE': null,
  'CUP': 'Cup',
  'OZ': 'Ounce',
  'TBS': 'Tablespoon',
  'TS': 'Teaspoon',
  'GALLON': 'Gallon',
  'LITER': 'Liter',
  'GRAM': 'Gram',
  'PINCH': 'Pinch'
}

class Ingredient extends React.Component {
  constructor(props){
    super(props)

    this.deleteIngredientClicked = this.deleteIngredientClicked.bind(this);
    this.handleIngredientChanged = this.handleIngredientChanged.bind(this);
  }

  deleteIngredientClicked(){
    this.props.onDeleteIngredient(this.props)
  }

  handleIngredientChanged(evt){
    evt.preventDefault()
    this.props.onUpdate(this.props.id, evt)
  }

  render() {
    let options = []
    for(let unit in unitTypes){
      options.push(<option key={unit} value={unit}>
        {unitTypes[unit] ? (unitTypes[unit] + ((this.props.amount > 1) ? "s" : "")) : ""}
      </option>)
    }
    return (
      <div>
        <input type="text"
          className="ingredientName"
          value={this.props.name}
          name="name"
          {...(this.props.isEditing ? {} : {disabled: "disabled"})}
          onChange={this.handleIngredientChanged}/>
        <input type="text"
          className="ingredientValue"
          value={this.props.amount}
          name="amount"
          {...(this.props.isEditing ? {} : {disabled: "disabled"})}
          onChange={this.handleIngredientChanged}/>
        <select className="ingredientUnitType"
          value={this.props.unit}
          name="unit"
          {...(this.props.isEditing ? {} : {disabled: "disabled"})}
          onChange={this.handleIngredientChanged}>
          {options}
        </select>
        <button className="btn deleteIngredient" onClick={this.deleteIngredientClicked}>Delete Ingredient</button>
      </div>
    )
  }
}

Ingredient.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  unit: PropTypes.string,
  isEditing: PropTypes.bool.isRequired,
  onDeleteIngredient: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
}

export default Ingredient;
