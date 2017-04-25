import React from 'react'
import PropTypes from 'prop-types'
import unitTypes from '../Settings/ingredientUnitTypes'

const IngredientEditor = (props) => {
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
    <tr>
      <td>
      <input type="text"
        className="ingredientName"
        value={ingredientBody.name}
        name="name"
        required="required"
        pattern=".*\w+.*"
        autoFocus="autoFocus"
        onChange={ingredientChanged}/>
      </td>
      <td>
      <input type="number"
        min="0"
        className="ingredientAmount"
        value={ingredientBody.amount}
        name="amount"
        onChange={ingredientChanged}/>
      </td>
      <td>
      <select className="ingredientUnitType"
        value={ingredientBody.unit}
        name="unit"
        onChange={ingredientChanged}>
        {options}
      </select>
      </td>
      <td>
      <div className="btn btnDelete"
        onClick={deleteIngredientClicked}>
        <i className="fa fa-trash-o" aria-hidden="true"></i>
      </div>
      </td>
    </tr>
  )
}

IngredientEditor.propTypes = {
  id: PropTypes.string.isRequired,
  ingredientBody: PropTypes.object,
  isEditing: PropTypes.bool,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func
}

IngredientEditor.defaultProps = {
  ingredientBody: {
    name: '',
    amount: '',
    unit: unitTypes.NONE
  }
}

export default IngredientEditor
