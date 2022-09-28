import '@percy/cypress'

describe('Visual testing using Percy', () => {

    beforeEach("Call for each test", () => {
        cy.visit('/')
        cy.fixture('user').as('user')
    })

    it('Percy I', () => {
        cy.percySnapshot('Home')

        cy.contains('Login').click()
        cy.url().should('include', '/Account/Login')

        cy.percySnapshot('Login')

        cy.get('@user').then(user => {
            cy.login(Cypress.env().username, user.password)
        })

        cy.percySnapshot('Login success')

    });

});