import React from 'react'
import randomcolor from 'randomcolor'
import RecipeBook from './RecipeBook'
import sampleRecipeBook from '../Settings/SampleRecipeBook.json'

import '../Style/App.css'
import '../../node_modules/font-awesome/css/font-awesome.min.css'

export default class App extends React.Component {
  constructor(){
    super()
    window.localStorage?
    this.savedRecipeBook = JSON.parse(localStorage.getItem("RecipeBookCreatedByJakeTegtmeier"))
    :this.savedRecipeBook = sampleRecipeBook

    this.headerText = "Recipe Book"
    this.headerColors = randomcolor({
      count: this.headerText.length,
      luminosity: 'bright',
      seed: 15
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
    this.headerColorText = this.headerColors.map((v,i)=>{
      return (
        <span key={i} style={{color: v}}>
          {this.headerText[i]}
        </span>
      )
    })

    return (
      <div className="App">
        <header>{this.headerColorText}</header>

        <RecipeBook savedRecipeBook={this.savedRecipeBook}/>

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
        <footer>
          <a href="https://github.com/jtegtmeier/recipe-box">
            See on Github
          </a>
          <div style={{fontSize: "0.8em"}}>
            Recipies stored in browser until you clear site history.
          </div>
          <div>By: <a href="https://github.com/jtegtmeier" >Jacob Tegtmeier</a></div>
        </footer>
      </div>
    )
  }
}
