import React from 'react'
import {shallow, mount, render} from 'enzyme'
import {expect} from 'chai'
import Recipe from '../Stateless/Recipe'


describe('Recipe', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    render(<Recipe
      id="testRecipe"
      recipeBody={{name: "testName"}}
      onDeleteClicked={()=>"onDeleteClicked"}
      onEditClicked={()=>"onEditClicked"}
      onRecipeClicked={()=>"onRecipeClicked"}
      isOpen={false}
      />, div)
  })
})
