import React from 'react'
//import cyrpto from 'cyrpto-js'
import '../Style/App.css'

import RecipeList from './RecipeList'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      encrypted: false,
      recipes: [
        {
          name: 'Pie',
          prepTimeMinutes: 40,
          instructions: 'Make a pie. It is so easy!',
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

  handleUpdateRecipes(updatedRecipes) {
    this.setState({recipes: updatedRecipes})
  }

  encryptRecipeList(password) {
    this.setState({
      encrypted: true,
      recipes: crypto.encrypt(JSON.stringify(this.state.recipes), password)
    })
  }

  decryptRecipeList(password) {
    this.setState({
      encrypted: false,
      recipes: JSON.parse(crypto.decrypt(this.state.recipes, password))
    })
  }

  render() {
    return (
      <div className="App">
        <header>Header</header>

        <RecipeList className="RecipeList" recipes={this.state.recipes} onUpdateRecipes={this.handleUpdateRecipes}/>

        <div className="Crypto hidden">
          <div className="Encrypt">
            <button className="btn encryptRecipeList">Encrypt</button>
            <input type="text" className="pass" placeholder="enter encryption password"/>
            <input type="text" className="pass" placeholder="re-enter password"/>
          </div>
          <div className="Decrypt">
            <button className="btn decryptRecipeList">Decrypt</button>
            <input type="text" className="inputPassword" placeholder="enter password to decrypt..."/>
          </div>
        </div>
        <footer>Footer</footer>
      </div>
    )
  }
}
