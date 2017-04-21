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
    this.handleChange = this.handleChange.bind(this);
  }

  deleteIngredientClicked(){
    this.props.onDeleteIngredient(this.props.name)
  }

  handleChange(evt){
    this.props.onUpdate()
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
          onChange={this.handleChange}/>
        <input type="text"
          className="ingredientValue"
          value={this.props.amount}
          onChange={this.handleChange}/>
        <select className="ingredientUnitType"
          value={this.props.unit}
          onChange={this.handleChange}>
          {options}
        </select>
        <button className="btn deleteIngredient" onClick={this.deleteIngredientClicked}>Delete Ingredient</button>
      </div>
    )
  }
}

Ingredient.propTypes = {
  name: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  unit: PropTypes.string,
  isEditing: PropTypes.bool.isRequired,
  onDeleteIngredient: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
}

export default Ingredient;
