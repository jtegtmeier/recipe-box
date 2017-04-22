import React from 'react'
//import cyrpto from 'cyrpto-js'
import '../Style/App.css'

import RecipeBook from './RecipeBook'

export default class App extends React.Component {
  encryptRecipeBook(password) {
    this.setState({
      encrypted: true,
      recipes: crypto.encrypt(JSON.stringify(this.state.recipes), password)
    })
  }

  decryptRecipeBook(password) {
    this.setState({
      encrypted: false,
      recipes: JSON.parse(crypto.decrypt(this.state.recipes, password))
    })
  }

  render() {
    const sample = {
      'recipe-test': {
        name: 'Pie',
        prepTimeMinutes: 40,
        instructions: 'Make a pie. It is so easy!',
        ingredients: {
          'ingredienttest-1': {
            name: 'flower',
            amount: 2,
            unit: 'CUP'
          },
          'ingredienttest-3': {
            name: 'apple',
            amount: 5,
            unit: 'NONE'
          }
        },
        isEditing: false
      }
    }
    return (
      <div className="App">
        <header>Header</header>

        <RecipeBook className="RecipeBook"
          recipes={sample}
          onEncryptRecipes={this.encryptRecipeBook}/>

        <div className="Crypto" hidden="hidden">
          <div className="Encrypt">
            <button className="btn encryptRecipeBook">Encrypt</button>
            <input type="text" className="pass" placeholder="enter encryption password"/>
            <input type="text" className="pass" placeholder="re-enter password"/>
          </div>
          <div className="Decrypt">
            <button className="btn decryptRecipeBook">Decrypt</button>
            <input type="text" className="inputPassword" placeholder="enter password to decrypt..."/>
          </div>
        </div>
        <footer>Footer</footer>
      </div>
    )
  }
}
