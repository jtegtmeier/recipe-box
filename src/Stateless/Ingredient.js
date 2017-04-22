import React from 'react'
import PropTypes from 'prop-types'
import unitTypes from '../Settings/ingredientUnitTypes'

const Ingredient = (props) => {
  const ingredientBody = props.ingredientBody

  function deleteIngredientClicked(evt){
    evt.preventDefault()
    props.onDelete(props.id)
  }

  function ingredientChanged(evt){
    evt.preventDefault()
    props.onUpdate(props.id, {
      ...props.ingredientBody,
      [evt.target.name]: evt.target.value
    })
  }

  let options = []
  for(let unit in unitTypes){
    options.push(<option key={unit} value={unit}>
      {unitTypes[unit] ? (unitTypes[unit] + ((ingredientBody.amount > 1) ? "s" : "")) : ""}
    </option>)
  }

  return (
    <div>
      <input type="text"
        className="ingredientName"
        value={ingredientBody.name}
        name="name"
        {...(props.isEditing ? {} : {disabled: "disabled"})}
        onChange={ingredientChanged}/>
      <input type="text"
        className="ingredientValue"
        value={ingredientBody.amount}
        name="amount"
        {...(props.isEditing ? {} : {disabled: "disabled"})}
        onChange={ingredientChanged}/>
      <select className="ingredientUnitType"
        value={ingredientBody.unit}
        name="unit"
        {...(props.isEditing ? {} : {disabled: "disabled"})}
        onChange={ingredientChanged}>
        {options}
      </select>
      <button className="btn deleteIngredient"
        onClick={deleteIngredientClicked}
        {...(props.isEditing ? {} : {hidden: "hidden"})}>
        Delete Ingredient
      </button>
    </div>
  )
}

Ingredient.propTypes = {
  id: PropTypes.string.isRequired,
  ingredientBody: PropTypes.object,
  isEditing: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
}

Ingredient.defaultProps = {
  ingredientBody: {
    name: '',
    amount: '',
    unit: unitTypes.NONE
  }
}

export default Ingredient
