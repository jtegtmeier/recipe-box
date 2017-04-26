import React from 'react'
import {shallow, mount, render} from 'enzyme'
import {expect} from 'chai'
import RecipeBook from '../Components/RecipeBook'


describe('RecipeBook', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    render(<RecipeBook />, div)
  })

  it('sets state to recipebook passed into props', ()=>{
    const sampleRecipeBook = {recipes: {sampleRecipe: {name: "sampleName"}}}
    const wrapper = mount(<RecipeBook savedRecipeBook={sampleRecipeBook}/>);
    expect(wrapper.state()).to.equal(sampleRecipeBook);
  })

  // it('adds a recipe to the state when add recipe button clicked', ()=>{
  //
  // })

})
