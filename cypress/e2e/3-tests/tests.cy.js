describe('Testing of EA App', () => {

    before("Call for a particular block (At the beginning)", () => {
        cy.log('Before all tests')
    })
    
    beforeEach("Call for each test", () => {
        cy.visit('/')
        cy.fixture('user').as('user')
    })

    after("Call for a particular block (At the end)", () => {
        cy.log('After all tests')
    })

    afterEach("Call for each test", () => {
        cy.url().should('include', 'eaapp')
    })

    it('First test to practice basic concepts', () => {
        cy.contains('Login').click()
        cy.url().should('include', '/Account/Login')

        cy.get('@user').then(user => {
            cy.login(Cypress.env().username, user.password)
        })

    });

    it('Variables and aliases', () => {
        cy.get('#loginLink').invoke('text').should('eql', 'Login')

        // Variables
        cy.get('#loginLink').then((link) => {
            const linkText = link.text()
            expect(linkText).is.eql('Login')
        })

        // Alias
        cy.get('#loginLink').then((link) => {
            const linkText = link.text()
            return linkText
        }).as('text')
        cy.get('@text').then(text => {
            expect(text).is.eql('Login')
        })

        cy.get('#loginLink').as('login')
        cy.get('@login').should('have.text', 'Login').click()    
        cy.url().should('include', '/Account/Login')

        cy.get('@user').then(user => {
            cy.login(user.username, user.password)
        })

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
        
    });

    it.skip('Testing EA site for assertion', () => {
        cy.visit('http://www.executeautomation.com/site')

        // Implicit assertion
        cy.get('[aria-label]="jum to slide 2', {timeout: 30000 }).should('have.class', 'ls-nav-active')
        
        // Explicit assertion
        cy.get('[aria-label]="jum to slide 2', {timeout: 30000 }).should(x =>{
            expect(x).to.have.class('ls-nav-active')
        })
    })
});