import LoginPage from '../pages/login.page'

describe('Test using page model patter', ()=> {
    beforeEach("Call for each test", () => {
        cy.visit('/')
        cy.fixture('user').as('user')
    })
    it('LOGIN using page model', () => {
        cy.contains('Login').click()
        cy.url().should('include', '/Account/Login')

        cy.get('@user').then( user => {
            LoginPage.performLogin(user.username, user.password)
            LoginPage.clickLoginButton()
        })

    });
})