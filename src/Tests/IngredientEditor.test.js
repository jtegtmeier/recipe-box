import React from 'react'
import {shallow, mount, render} from 'enzyme'
import {expect} from 'chai'
import IngredientEditor from '../Stateless/IngredientEditor'


describe('Recipe', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    render(<IngredientEditor
      id="testIngredient"
      ingredientBody={{name: ""}}
      isEditing={true}
      onDelete={()=>"onDelete"}
      onUpdate={()=>"onUpdate"}
      />, div)
  })
})
