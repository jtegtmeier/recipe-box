import React from 'react'
import {shallow, mount, render} from 'enzyme'
import {expect} from 'chai'
import RecipeEditor from '../Stateless/RecipeEditor'


describe('RecipeEditor', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    render(<RecipeEditor
      id="testRecipeEditor"
      recipeBody={{name: ""}}
      onDeleteClicked={()=>"onDeleteClicked"}
      onSubmitClicked={()=>"onSubmitClicked"}
      onRecipeUpdated={()=>"onRecipeUpdated"}
      shouldAlert={false}
      />, div)
  })
})
