describe('Blog ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Testy Tester',
      username: 'tester',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('blog app')
  })

  it('user can login', function() {
    cy.contains('login')
      .click()
    cy.get('#username')
      .type('tester')
    cy.get('#password')
      .type('salainen')
    cy.contains('log in')
      .click()
    cy.contains('Testy Tester logged in')
  })

  it('user can logout', function() {
    cy.contains('login')
      .click()
    cy.get('#username')
      .type('tester')
    cy.get('#password')
      .type('salainen')
    cy.contains('log in')
      .click()
    cy.contains('logout')
      .click()
    cy.contains('login')
  })

  it('user can add blog', function() {
    cy.contains('login')
      .click()
    cy.get('#username')
      .type('tester')
    cy.get('#password')
      .type('salainen')
    cy.contains('log in')
      .click()
    cy.contains('new blog')
      .click()
    cy.get('#title')
      .type('Test title')
    cy.get('#author')
      .type('Test author')
    cy.get('#url')
      .type('http://www.test.com/')
    cy.contains('save')
      .click()
    cy.contains('Test title')
  })
})