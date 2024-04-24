describe('Cars', () => {
  it('Should fetch cars and display', () => {
    cy.intercept({
      method: 'GET',
      url: 'http://localhost:5000/api/v1/cars'}, req=>{
        delete req.headers['if-none-match']
    }).as('getCars')

    //Visit Homepage
    cy.visit('/')
    cy.get('a[href="/car"]').should('exist')
    cy.get('a[href="/car"]').click()

    //At Car page
    var cars:string[] = []
    cy.wait(2000)
    cy.wait('@getCars').should(({request, response})=>{
      expect(response?.statusCode).equal(200)
      expect(response?.body.data).be.not.null
      expect(response?.body.data).to.have.length(response?.body.count)
      cars = response?.body.data
    }).then(()=>{
      console.log(cars)
      //Assert Display
      cars.forEach(car => {
        cy.contains(car.model).should('be.visible')
      })
    })
  })
})