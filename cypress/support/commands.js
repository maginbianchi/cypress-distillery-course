// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, password) => {
    cy.get('#UserName').type(username)
    cy.get('#Password').type(password)
    cy.get('.btn').click({ force: true })
})


Cypress.Commands.add('login2', (email, password) => {

    cy.session([email, password], () => {
        cy.visit('https://www.lambdatest.com')
        cy.contains('Login').click();
        cy.contains('Log in with Github').click();
        /* ==== End Cypress Studio ==== */

        cy.origin('https://www.github.com/',
            { args: [email, password] },
            ([email, password]) => {
                cy.get('#login').type(email);
                cy.get('#password').type(password);
                cy.get('[data-signin-label="Sign in"]').click();
            })

        cy.get('#WS_Realtime > .pt-43 > .pt-30').should('contain', 'Manual Testing');

    });

});