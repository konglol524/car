import React from 'react'
import DateReserve from './DateReserve'

describe('<DateReserve />', () => {
  let testObj:{dateHandler:Function, locationHandler: Function}   
 
  beforeEach(()=>{
    testObj = {
      dateHandler: ()=>{},
      locationHandler: ()=>{}
    }
    cy.spy(testObj, 'locationHandler').as("locationSpy")
  })
 
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<DateReserve onDateChange={testObj.dateHandler}
    onLocationChange={testObj.locationHandler}/>)
    cy.get('#location1').parent().click().get('ul>li[data-value="CNX"]').click();
    cy.get("@locationSpy").should('be.calledOnce');
    cy.get("@locationSpy").should("be.calledWith", 'CNX');
  })
})