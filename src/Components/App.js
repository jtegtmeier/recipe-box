import React from 'react'
import randomcolor from 'randomcolor'
import '../Style/App.css'
import '../../node_modules/font-awesome/css/font-awesome.min.css'

import RecipeBook from './RecipeBook'
import sampleRecipeBook from '../Settings/SampleRecipeBook.json'

export default class App extends React.Component {
  constructor(){
    super()
    this.savedRecipeBook = JSON.parse(
      localStorage.getItem("RecipeBookCreatedByJakeTegtmeier")
    ) || sampleRecipeBook

    this.headerText = "Recipe Book"
    this.headerColors = randomcolor({
      count: this.headerText.length,
      luminosity: 'bright',
      seed: 15
      })
    console.log(this.headerColors)
    this.headerColorText = this.headerColors.map((v,i)=>{
      return (
        <span key={i} style={{color: v}}>
          {this.headerText[i]}
        </span>
      )
    })
  }

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
    console.log(this.headerColorText)
    return (
      <div className="App">
        <header>{this.headerColorText}</header>

        <RecipeBook
          recipes={this.savedRecipeBook.recipes}
          lastUniqueId={this.savedRecipeBook.lastUniqueId}
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
        <footer>By: Jacob Tegtmeier</footer>
      </div>
    )
  }
}
