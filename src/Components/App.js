import React, {Component} from 'react'
import '../Style/App.css'

import RecipeList from './RecipeList'

const unitTypes = {
  'NONE': 'None',
  'CUP': 'Cup',
  'OZ': 'Ounce',
  'TBS': 'Tablespoon',
  'TS': 'Teaspoon',
  'GALLON': 'Gallon',
  'LITER': 'Liter',
  'GRAM': 'Gram',
  'PINCH': 'Pinch'
}

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      encrypted: false,
      recipes: [
        {
          name: 'Pie',
          prepTimeMinutes: '40',
          instructions: 'Make a pie. It is easy!',
          ingredients: [
            {
              name: 'flower',
              amount: 2,
              unit: 'CUP'
            }, {
              name: 'apple',
              amount: 5,
              unit: 'NONE'
            }
          ]
        }
      ]
    }
  }

  updateRecipe(index, updatedRecipe){
    const updatedRecipes = this.state.recipes
    updatedRecipes[index] = updatedRecipe
    this.setState({
      recipes: updatedRecipes
    })
  }

  addRecipe(recipe){
    this.setState({
      recipes: this.state.recipes.push(recipe)
    })
  }

  render() {
    return (
      <div className="App">
        <header>Header</header>

        <RecipeList className="RecipeList"/>

        <div className="Crypto">
          <div className="Encrypt">
            if recipe-box exists and unencrypted
            <div className="btnEncryptRecipeList"></div>
            <div className="inputPassword">Pass1</div>
            <div className="inputPassword">Pass2</div>
          </div>
          <div className="Decrypt hidden">
            if recipe-box in localstorage and encrypted
            <div className="btnDecryptRecipeList"></div>
            <div className="inputPassword">Pass1</div>
          </div>
        </div>
        <footer>Footer</footer>
      </div>
    )
  }
}
