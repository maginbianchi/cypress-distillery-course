describe('Sessions: it allows to not log in into each test', () => {
    
    beforeEach("Call for each test", () => {
        cy.fixture('user').as('user')

        cy.get('@user').then(user => {
            cy.session([Cypress.env().username, user.password], ()=> {
                cy.visit('/')
        
                cy.contains('Login').click()
                cy.url().should('include', '/Account/Login')
                cy.login(Cypress.env().username, user.password)
            })
        })
    })

    it('First test using sessions', () => {
        cy.visit('/')
        cy.contains('Employee List').click()
        
        cy.get('.table').find('tr').as('rows')

        // cy.get('@rows').then(rows => {
        //     cy.wrap(rows).click({ multiple: true })
        // })

        //Wrap
        cy.wrap({name: 'Magin'}).should('have.property', 'name').and('eq', 'Magin')

        cy.get('.table').find('tr > td').then(td => {
            cy.wrap(td).contains('John').parent().contains('Benefits').click()
        })
    })

    it('Second test using sessions', () => {
        cy.visit('/')
        cy.contains('Employee List').click()
        
        cy.get('.table').find('tr').as('rows')

        // cy.get('@rows').then(rows => {
        //     cy.wrap(rows).click({ multiple: true })
        // })

        //Wrap
        cy.wrap({name: 'Magin'}).should('have.property', 'name').and('eq', 'Magin')

        cy.get('.table').find('tr > td').then(td => {
            cy.wrap(td).contains('John').parent().contains('Benefits').click()
        })
    })
})