describe('LambdaTest Website XHR', () => {

    beforeEach("NAvigate to LambdaTest", () => {
        cy.visit('https://accounts.lambdatest.com/login')
    })
    it('Perform Login and verify XHR', () => {

        cy.intercept({method: 'GET', url: '/api/user/organization/team'}).as('team')
        cy.intercept({method: 'GET', url: '/ltms/organization/total-sessions'}).as('session')
        
        cy.fixture('lambdaUser').as('user')
        cy.get('@user').then(user => {
            cy.get('#email').type(user.user)
            cy.get('#password').type(user.password, { log: false })
            cy.get('#login-button').click()
        })

        cy.wait('@team').its('response.statusCode').should('eq', 200)

        cy.get('@team').its('response.body').should('have.a.property', "data")

        cy.get('@team').then(team => {
            expect(team.response.statusCode).to.eql(200)
            expect(team.response.body.data[0]).to.have.property("name", "Magin Bianchi")
            expect(team.response.body.data[0]).to.have.property("role", "Admin")
        })

        cy.wait('@session').its('response.statusCode').should('eq', 200)

        cy.get('@session').then(session => {
            expect(session.response.statusCode).to.eql(200)
            expect(session.response.body).to.have.property("screenshotTestCount", 0)
        })

        cy.getCookie('user_id', {timeout: 10000}).should('have.property', 'value', '946399')
    })
})