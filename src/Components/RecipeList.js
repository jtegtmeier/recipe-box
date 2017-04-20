import React, { PropTypes } from 'react'
import Recipe from './Recipe'

class RecipeList extends React.Component {
  constructor(props){
    super(props)
  }
  render () {
    return(
      <div>
        <Recipe className="Recipe"/>
        <div className="btnAddRecipe">Add Recipe +</div>
      </div>
    )
  }
}

export default RecipeList;
